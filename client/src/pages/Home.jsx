import React, { useEffect, useState } from 'react';
import { mockApi } from '../services/mockApi';
import { useAuth } from '../context/AuthContext';
import { Briefcase, MapPin, DollarSign, Clock, Building2, ArrowRight, Star } from 'lucide-react';

const Home = () => {
    const [jobs, setJobs] = useState([]);
    const { user } = useAuth();

    useEffect(() => {
        setJobs(mockApi.getJobs());
    }, []);

    const handleApply = async (job) => {
        try {
            mockApi.applyForJob({
                jobId: job._id,
                studentId: user.id,
                job: job,
                studentName: user.name
            });
            alert('Application submitted successfully!');
        } catch (err) {
            alert('Failed to apply');
        }
    };

    return (
        <div style={{ paddingTop: '1rem' }}>
            <header style={{ marginBottom: '3rem' }}>
                <div className="animate-fade-in" style={{ animationDuration: '0.6s' }}>
                    <h2 style={{ fontSize: '2.5rem', marginBottom: '0.75rem', fontWeight: '800' }}>
                        Explore <span style={{ color: 'var(--primary)' }}>Opportunities</span>
                    </h2>
                    <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem', maxWidth: '600px' }}>
                        Take the next step in your career. Discover and apply for role that match your skills.
                    </p>
                </div>
            </header>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))', gap: '2rem' }}>
                {jobs.map((job, index) => (
                    <div
                        key={job._id}
                        className={`glass-morphism animate-slide-up stagger-${(index % 5) + 1}`}
                        style={{ padding: '2rem', display: 'flex', flexDirection: 'column', gap: '1.25rem', position: 'relative', overflow: 'hidden' }}
                    >
                        {/* Status Badge */}
                        <div style={{ position: 'absolute', top: '1.5rem', right: '1.5rem' }}>
                            <span style={{
                                fontSize: '0.75rem',
                                fontWeight: '700',
                                padding: '0.4rem 0.8rem',
                                background: 'rgba(99, 102, 241, 0.1)',
                                color: 'var(--primary)',
                                borderRadius: '12px',
                                textTransform: 'uppercase',
                                letterSpacing: '0.05em'
                            }}>
                                {job.status}
                            </span>
                        </div>

                        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                            <div style={{
                                width: '48px',
                                height: '48px',
                                borderRadius: '14px',
                                background: 'rgba(255,255,255,0.05)',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center'
                            }}>
                                <Building2 size={24} color="var(--primary)" />
                            </div>
                            <div>
                                <h3 style={{ fontSize: '1.25rem', marginBottom: '0.2rem' }}>{job.title}</h3>
                                <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', fontWeight: '500' }}>{job.companyName}</p>
                            </div>
                        </div>

                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1.25rem', fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                            <span style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                                <MapPin size={16} strokeWidth={2.5} /> {job.location || 'Remote'}
                            </span>
                            <span style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                                <DollarSign size={16} strokeWidth={2.5} /> {job.salary || 'Not specified'}
                            </span>
                        </div>

                        <div style={{
                            padding: '1rem',
                            background: 'rgba(255,255,255,0.02)',
                            borderRadius: '12px',
                            minHeight: '80px'
                        }}>
                            <p style={{ fontSize: '0.9rem', color: 'var(--text-main)', opacity: 0.8, display: '-webkit-box', WebkitLineClamp: '3', WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                                {job.description}
                            </p>
                        </div>

                        {user?.role === 'student' && (
                            <button
                                onClick={() => handleApply(job)}
                                className="primary"
                                style={{ width: '100%', marginTop: 'auto', padding: '0.8rem' }}
                            >
                                Apply Now <ArrowRight size={18} />
                            </button>
                        )}

                        {user?.role !== 'student' && (
                            <div style={{ marginTop: 'auto', display: 'flex', justifyContent: 'flex-end' }}>
                                <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                                    <Clock size={14} /> Posted 2 days ago
                                </span>
                            </div>
                        )}
                    </div>
                ))}
            </div>

            {jobs.length === 0 && (
                <div style={{ textAlign: 'center', padding: '4rem', color: 'var(--text-muted)' }} className="animate-fade-in">
                    <Briefcase size={48} style={{ margin: '0 auto 1rem auto', opacity: 0.5 }} />
                    <p fontSize="1.2rem">No active opportunities found. Check back later!</p>
                </div>
            )}
        </div>
    );
};

export default Home;
