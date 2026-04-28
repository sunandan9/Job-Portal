import React, { useEffect, useState } from 'react';
import { api } from '../services/api';
import { useAuth } from '../context/AuthContext';
import { CheckCircle, XCircle, Clock, Search, Filter, User, Building2 } from 'lucide-react';

const Applications = () => {
    const [applications, setApplications] = useState([]);
    const { user } = useAuth();

    useEffect(() => {
        if (!user) return;
        const fetchApps = async () => {
            try {
                const apps = await api.getApplications();
                const jobs = await api.getJobs();
                const populatedApps = apps.map(app => ({
                    ...app,
                    job: jobs.find(j => j._id === app.jobId) || { title: 'Unknown Job', companyName: 'Unknown Company' }
                }));
                setApplications(populatedApps);
            } catch (err) {
                console.error('Failed to load applications:', err);
            }
        };
        fetchApps();
    }, [user]);

    const updateStatus = async (id, status) => {
        try {
            await api.updateApplicationStatus(id, status);
            setApplications(applications.map(app => app._id === id ? { ...app, status } : app));
        } catch (err) {
            alert('Failed to update status: ' + err.message);
        }
    };

    const markAsPlaced = async (app) => {
        const salary = prompt('Enter salary offered:');
        if (salary === null) return;

        try {
            await api.createPlacement({
                studentId: app.studentId,
                studentName: app.studentName,
                jobId: app.jobId,
                jobTitle: app.job?.title,
                companyName: app.job?.companyName || 'Company',
                salaryOffered: salary,
                placementOfficerName: user.name
            });
            alert('Student marked as PLACED!');
            updateStatus(app._id, 'accepted');
        } catch (err) {
            alert('Failed to create placement: ' + err.message);
        }
    };

    const getStatusStyle = (status) => {
        switch (status) {
            case 'accepted': return { icon: CheckCircle, color: '#10b981', bg: '#ecfdf5' };
            case 'rejected': return { icon: XCircle, color: '#ef4444', bg: '#fef2f2' };
            case 'shortlisted': return { icon: Clock, color: '#f59e0b', bg: '#fffbeb' };
            default: return { icon: Clock, color: '#6b7280', bg: '#f3f4f6' };
        }
    };

    return (
        <div style={{ padding: '1rem 0', fontFamily: 'system-ui, -apple-system, sans-serif' }}>
            <header style={{ marginBottom: '3rem', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: '1rem' }}>
                <div>
                    <h2 style={{ fontSize: '2.5rem', fontWeight: '800', color: '#1f2937' }}>
                        {user?.role === 'student' ? 'My ' : 'Review '}
                        <span style={{ color: '#2563eb' }}>Applications</span>
                    </h2>
                    <p style={{ color: '#6b7280', fontSize: '1.1rem' }}>Track and manage the recruitment pipeline.</p>
                </div>

                <div style={{ display: 'flex', gap: '1rem' }}>
                    <div style={{ position: 'relative' }}>
                        <Search size={18} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: '#9ca3af' }} />
                        <input
                            placeholder="Search applications..."
                            style={{
                                padding: '0.75rem 1rem 0.75rem 2.75rem',
                                background: '#ffffff',
                                border: '1px solid #e5e7eb',
                                borderRadius: '8px',
                                color: '#1f2937',
                                width: '260px',
                                outline: 'none'
                            }}
                        />
                    </div>
                </div>
            </header>

            <div style={{ display: 'grid', gap: '1.5rem' }}>
                {applications.map((app) => {
                    const style = getStatusStyle(app.status);
                    return (
                        <div
                            key={app._id}
                            style={{ padding: '1.5rem 2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: '#ffffff', border: '1px solid #e5e7eb', borderRadius: '12px', boxShadow: '0 1px 3px rgba(0,0,0,0.05)', flexWrap: 'wrap', gap: '1rem' }}
                        >
                            <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
                                <div style={{
                                    width: '48px',
                                    height: '48px',
                                    borderRadius: '12px',
                                    background: '#eff6ff',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center'
                                }}>
                                    {user?.role === 'student' ? <Building2 size={24} color="#2563eb" /> : <User size={24} color="#2563eb" />}
                                </div>
                                <div>
                                    <h3 style={{ fontSize: '1.15rem', marginBottom: '0.25rem', color: '#1f2937', fontWeight: '600' }}>{app.job?.title}</h3>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', flexWrap: 'wrap' }}>
                                        <p style={{ color: '#4b5563', fontSize: '0.9rem', fontWeight: '500' }}>
                                            {user?.role === 'student' ? (app.job?.companyName || 'Company') : `Applicant: ${app.studentName}`}
                                        </p>
                                        <div style={{ width: '4px', height: '4px', borderRadius: '50%', background: '#d1d5db' }}></div>
                                        <div style={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: '0.5rem',
                                            padding: '0.25rem 0.75rem',
                                            background: style.bg,
                                            borderRadius: '20px',
                                            color: style.color,
                                            fontSize: '0.85rem',
                                            fontWeight: '600'
                                        }}>
                                            <style.icon size={14} />
                                            <span style={{ textTransform: 'capitalize' }}>{app.status}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div style={{ display: 'flex', gap: '1rem' }}>
                                {['employer', 'admin', 'placement_officer'].includes(user?.role) && app.status === 'applied' && (
                                    <>
                                        <button
                                            onClick={() => updateStatus(app._id, 'shortlisted')}
                                            style={{
                                                padding: '0.6rem 1.2rem',
                                                background: '#fffbeb',
                                                color: '#f59e0b',
                                                fontSize: '0.9rem',
                                                border: '1px solid #fcd34d',
                                                borderRadius: '8px',
                                                fontWeight: '600',
                                                cursor: 'pointer'
                                            }}
                                        >
                                            Shortlist
                                        </button>
                                        <button
                                            onClick={() => updateStatus(app._id, 'rejected')}
                                            style={{
                                                padding: '0.6rem 1.2rem',
                                                background: '#fef2f2',
                                                color: '#ef4444',
                                                fontSize: '0.9rem',
                                                border: '1px solid #fecaca',
                                                borderRadius: '8px',
                                                fontWeight: '600',
                                                cursor: 'pointer'
                                            }}
                                        >
                                            Reject
                                        </button>
                                    </>
                                )}
                                {(user?.role === 'admin' || user?.role === 'placement_officer' || user?.role === 'employer') && app.status === 'shortlisted' && (
                                    <button
                                        onClick={() => markAsPlaced(app)}
                                        style={{ padding: '0.6rem 1.2rem', fontSize: '0.9rem', background: '#10b981', color: 'white', border: 'none', borderRadius: '8px', fontWeight: '600', cursor: 'pointer' }}
                                    >
                                        Accept & Mark as Placed
                                    </button>
                                )}
                            </div>
                        </div>
                    );
                })}
                {applications.length === 0 && (
                    <div style={{ textAlign: 'center', padding: '4rem', color: '#6b7280' }}>
                        <p>No applications to show yet.</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Applications;
