import React, { useEffect, useState } from 'react';
import { mockApi } from '../services/mockApi';
import { useAuth } from '../context/AuthContext';
import { CheckCircle, XCircle, Clock, Search, Filter, User, Building2 } from 'lucide-react';

const Applications = () => {
    const [applications, setApplications] = useState([]);
    const { user } = useAuth();

    useEffect(() => {
        setApplications(mockApi.getApplications(user));
    }, [user]);

    const updateStatus = (id, status) => {
        mockApi.updateApplicationStatus(id, status);
        setApplications(applications.map(app => app._id === id ? { ...app, status } : app));
    };

    const markAsPlaced = (app) => {
        const salary = prompt('Enter salary offered:');
        if (salary === null) return;

        mockApi.createPlacement({
            studentId: app.studentId,
            studentName: app.studentName,
            jobId: app.jobId,
            jobTitle: app.job?.title,
            companyName: app.job?.companyName || 'Company',
            salaryOffered: salary,
            dateOfPlacement: new Date(),
            placementOfficerName: user.name
        });
        alert('Student marked as PLACED!');
        updateStatus(app._id, 'accepted');
    };

    const getStatusStyle = (status) => {
        switch (status) {
            case 'accepted': return { icon: CheckCircle, color: '#10b981', bg: 'rgba(16, 185, 129, 0.1)' };
            case 'rejected': return { icon: XCircle, color: '#ef4444', bg: 'rgba(239, 68, 68, 0.1)' };
            case 'shortlisted': return { icon: Clock, color: '#f59e0b', bg: 'rgba(245, 158, 11, 0.1)' };
            default: return { icon: Clock, color: 'var(--text-muted)', bg: 'rgba(148, 163, 184, 0.1)' };
        }
    };

    return (
        <div style={{ padding: '1rem 0' }}>
            <header style={{ marginBottom: '3rem', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
                <div className="animate-fade-in">
                    <h2 style={{ fontSize: '2.5rem', fontWeight: '800' }}>
                        {user?.role === 'student' ? 'My ' : 'Review '}
                        <span style={{ color: 'var(--primary)' }}>Applications</span>
                    </h2>
                    <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem' }}>Track and manage the recruitment pipeline.</p>
                </div>

                <div style={{ display: 'flex', gap: '1rem' }}>
                    <div style={{ position: 'relative' }}>
                        <Search size={18} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                        <input
                            placeholder="Search applications..."
                            style={{
                                padding: '0.75rem 1rem 0.75rem 2.75rem',
                                background: 'var(--glass)',
                                border: '1px solid var(--glass-border)',
                                borderRadius: '12px',
                                color: 'white',
                                width: '260px'
                            }}
                        />
                    </div>
                </div>
            </header>

            <div style={{ display: 'grid', gap: '1.5rem' }} className="animate-fade-in stagger-1">
                {applications.map((app, index) => {
                    const style = getStatusStyle(app.status);
                    return (
                        <div
                            key={app._id}
                            className={`glass-morphism animate-slide-up stagger-${(index % 5) + 1}`}
                            style={{ padding: '1.5rem 2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
                        >
                            <div style={{ display: 'flex', alignItems: 'center', gap: '2rem' }}>
                                <div style={{
                                    width: '48px',
                                    height: '48px',
                                    borderRadius: '12px',
                                    background: 'rgba(255,255,255,0.05)',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center'
                                }}>
                                    {user?.role === 'student' ? <Building2 size={24} color="var(--primary)" /> : <User size={24} color="var(--primary)" />}
                                </div>
                                <div>
                                    <h3 style={{ fontSize: '1.2rem', marginBottom: '0.25rem' }}>{app.job?.title}</h3>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                                        <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', fontWeight: '500' }}>
                                            {user?.role === 'student' ? (app.job?.companyName || 'Company') : `Applicant: ${app.studentName}`}
                                        </p>
                                        <div style={{ width: '4px', height: '4px', borderRadius: '50%', background: 'var(--glass-border)' }}></div>
                                        <div style={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: '0.5rem',
                                            padding: '0.2rem 0.8rem',
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
                                {(() => {
                                    console.log(`Checking app ${app._id}: userRole=${user?.role}, appStatus=${app.status}`);
                                    return null;
                                })()}
                                {user?.role === 'employer' && app.status === 'applied' && (
                                    <>
                                        <button
                                            onClick={() => updateStatus(app._id, 'shortlisted')}
                                            style={{
                                                padding: '0.6rem 1.2rem',
                                                background: 'rgba(245, 158, 11, 0.1)',
                                                color: '#f59e0b',
                                                fontSize: '0.9rem',
                                                border: '1px solid rgba(245, 158, 11, 0.2)'
                                            }}
                                        >
                                            Shortlist
                                        </button>
                                        <button
                                            onClick={() => updateStatus(app._id, 'rejected')}
                                            style={{
                                                padding: '0.6rem 1.2rem',
                                                background: 'rgba(239, 68, 68, 0.1)',
                                                color: '#ef4444',
                                                fontSize: '0.9rem',
                                                border: '1px solid rgba(239, 68, 68, 0.2)'
                                            }}
                                        >
                                            Reject
                                        </button>
                                    </>
                                )}
                                {(user?.role === 'admin' || user?.role === 'placement_officer') && app.status === 'shortlisted' && (
                                    <button
                                        onClick={() => markAsPlaced(app)}
                                        className="primary"
                                        style={{ padding: '0.6rem 1.2rem', fontSize: '0.9rem' }}
                                    >
                                        Mark as Placed
                                    </button>
                                )}
                            </div>
                        </div>
                    );
                })}
                {applications.length === 0 && (
                    <div style={{ textAlign: 'center', padding: '4rem', color: 'var(--text-muted)' }}>
                        <p>No applications to show yet.</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Applications;
