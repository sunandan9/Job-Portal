import React, { useEffect, useState } from 'react';
import { mockApi } from '../services/mockApi';
import { useAuth } from '../context/AuthContext';
import { Briefcase, MapPin, DollarSign, Clock, Building2, ArrowRight, TrendingUp, Users, FileText, Sparkles } from 'lucide-react';

const Home = () => {
    const [jobs, setJobs] = useState([]);
    const { user } = useAuth();
    const [activeTab, setActiveTab] = useState('Overview');
    const [stats, setStats] = useState({ placements: 0, students: 0, companies: 0, rate: '0%' });
    const [monthlyTrends, setMonthlyTrends] = useState([0, 0, 0, 0, 0]);
    const [industryData, setIndustryData] = useState([]);
    const [acceptedApps, setAcceptedApps] = useState([]);
    const [appliedJobs, setAppliedJobs] = useState(new Set());
    const [modalData, setModalData] = useState({ isOpen: false, title: '', items: [], type: '' });

    useEffect(() => {
        const loadData = async () => {
            try {
                const jobsData = await mockApi.getJobs();
                setJobs(jobsData);

                const users = await mockApi.getUsers();
                const studentsCount = users.filter(u => u.role === 'student' || u.role === 'Student').length;
                const companiesCount = users.filter(u => u.role === 'employer' || u.role === 'Employer').length;
                
                const apps = await mockApi.getApplications();
                const accepted = apps.filter(a => a.status === 'accepted' || a.status === 'hired');
                const placementsCount = accepted.length;
                setAcceptedApps(accepted);

                let calculatedRate = '0%';
                if (studentsCount > 0) {
                    calculatedRate = Math.min(100, Math.round((placementsCount / studentsCount) * 100)) + '%';
                }

                setStats({
                    placements: placementsCount,
                    students: studentsCount,
                    companies: companiesCount,
                    rate: calculatedRate,
                    studentsList: users.filter(u => u.role === 'student' || u.role === 'Student')
                });

                const currentMonthIdx = new Date().getMonth();
                const trends = [0, 0, 0, 0, 0];
                
                apps.filter(a => a.status === 'accepted' || a.status === 'hired').forEach(app => {
                    const appMonth = new Date(app.createdAt).getMonth();
                    const offset = currentMonthIdx - appMonth;
                    if (offset >= 0 && offset < 5) {
                        trends[4 - offset]++;
                    } else if (offset < 0) {
                        trends[4]++;
                    }
                });
                setMonthlyTrends(trends);

                const allJobs = jobsData;
                const companyPlacements = {};
                
                apps.filter(a => a.status === 'accepted' || a.status === 'hired').forEach(app => {
                    const job = allJobs.find(j => j._id === app.jobId);
                    const companyName = job ? job.company : 'Unknown';
                    companyPlacements[companyName] = (companyPlacements[companyName] || 0) + 1;
                });

                const colors = ['#3b82f6', '#10b981', '#f59e0b', '#ec4899', '#8b5cf6'];
                const data = Object.keys(companyPlacements).map((key, idx) => ({
                    name: key,
                    count: companyPlacements[key],
                    color: colors[idx % colors.length]
                })).sort((a,b) => b.count - a.count).slice(0, 4);
                
                setIndustryData(data);
            } catch (error) {
                console.error('Failed to load data:', error);
            }
        };

        loadData();
    }, []);

    useEffect(() => {
        const loadAppliedJobs = async () => {
            if (user && (user.role === 'Student' || user.role === 'student')) {
                try {
                    const studentApps = await mockApi.getApplications();
                    setAppliedJobs(new Set(studentApps.map(app => app.jobId)));
                } catch (error) {
                    console.error('Failed to load applications:', error);
                }
            }
        };

        loadAppliedJobs();
    }, [user]);

    const isStudent = user?.role === 'Student' || user?.role === 'student';

    const handleApply = async (jobId) => {
        if (!mockApi.applyForJob) return;
        
        try {
            await mockApi.applyForJob({
                jobId,
                studentId: user?.id,
                studentName: user?.name || user?.username || 'Student',
            });
            setAppliedJobs(prev => {
                const next = new Set(prev);
                next.add(jobId);
                return next;
            });
        } catch (error) {
            console.error('Failed to apply for job:', error);
            alert('Failed to apply for job');
        }
    };

    if (isStudent) {
        return (
            <div style={{ padding: '2rem 3.5rem', fontFamily: 'system-ui, -apple-system, sans-serif' }}>
                <header className="animate-fade-up" style={{ 
                    marginBottom: '4rem', 
                    background: 'var(--bg-card)', 
                    padding: '3rem', 
                    borderRadius: '24px', 
                    position: 'relative',
                    overflow: 'hidden',
                    border: '1px solid rgba(255,255,255,0.4)',
                    boxShadow: 'var(--shadow-lg)'
                }}>
                    <div style={{ position: 'absolute', top: '-50%', left: '-10%', width: '600px', height: '600px', background: 'radial-gradient(circle, rgba(37, 99, 235, 0.08) 0%, transparent 60%)', borderRadius: '50%', zIndex: 0 }}></div>
                    <div style={{ position: 'absolute', bottom: '-20%', right: '-10%', width: '400px', height: '400px', background: 'radial-gradient(circle, rgba(236, 72, 153, 0.08) 0%, transparent 60%)', borderRadius: '50%', zIndex: 0 }}></div>
                    
                    <div style={{ position: 'relative', zIndex: 1, maxWidth: '700px' }}>
                        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', background: '#eff6ff', color: '#2563eb', padding: '0.5rem 1rem', borderRadius: '20px', fontSize: '0.85rem', fontWeight: '600', marginBottom: '1.5rem' }}>
                            <Sparkles size={16} /> Welcome to your future
                        </div>
                        <h2 style={{ fontSize: '3.5rem', marginBottom: '1rem', fontWeight: '800', color: 'var(--text-main)', lineHeight: '1.1' }}>
                            Explore incredible <br />
                            <span className="gradient-text">Opportunities</span>
                        </h2>
                        <p style={{ color: 'var(--text-muted)', fontSize: '1.25rem', maxWidth: '600px', lineHeight: '1.6' }}>
                            Take the next step in your career. Discover and apply for roles that perfectly match your skills and aspirations.
                        </p>
                    </div>
                </header>

                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '2rem' }} className="animate-fade-up stagger-1">
                    <h3 style={{ fontSize: '1.5rem', fontWeight: '700', color: 'var(--text-main)' }}>Recommended for you</h3>
                    <div style={{ fontSize: '0.9rem', color: 'var(--text-muted)', fontWeight: '500' }}>Showing {jobs.length} roles</div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(360px, 1fr))', gap: '2rem' }}>
                    {jobs.map((job, index) => (
                        <div key={job._id || Math.random()} className={`premium-card animate-fade-up stagger-${(index % 5) + 1}`} style={{ padding: '2rem', display: 'flex', flexDirection: 'column' }}>
                            <div style={{ display: 'flex', gap: '1rem', marginBottom: '1.5rem' }}>
                                <div style={{ width: '56px', height: '56px', borderRadius: '14px', background: 'var(--primary-light)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                    <Building2 size={28} color="var(--primary)" />
                                </div>
                                <div style={{ flex: 1 }}>
                                    <h3 style={{ fontSize: '1.3rem', marginBottom: '0.25rem', color: 'var(--text-main)', fontWeight: '700', lineHeight: 1.2 }}>{job.title}</h3>
                                    <p style={{ color: 'var(--text-muted)', fontWeight: '500', fontSize: '1rem' }}>{job.companyName}</p>
                                </div>
                            </div>
                            
                            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem', marginBottom: '2rem' }}>
                                {job.location && (
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.85rem', color: 'var(--text-muted)', background: '#f8fafc', padding: '0.4rem 0.8rem', borderRadius: '8px', fontWeight: '500' }}>
                                        <MapPin size={14} /> {job.location}
                                    </div>
                                )}
                                {job.salary && (
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.85rem', color: '#10b981', background: '#ecfdf5', padding: '0.4rem 0.8rem', borderRadius: '8px', fontWeight: '600' }}>
                                        <DollarSign size={14} /> {job.salary}
                                    </div>
                                )}
                            </div>

                            {appliedJobs.has(job._id) ? (
                                <button className="primary" style={{ width: '100%', marginTop: 'auto', padding: '0.9rem', background: '#10b981', borderColor: '#10b981', cursor: 'default' }} disabled>
                                    Applied ✓
                                </button>
                            ) : (
                                <button className="primary" onClick={() => handleApply(job._id)} style={{ width: '100%', marginTop: 'auto', padding: '0.9rem' }}>
                                    Apply Now <ArrowRight size={18} />
                                </button>
                            )}
                        </div>
                    ))}
                    {jobs.length === 0 && (
                        <div className="premium-card animate-fade-up stagger-1" style={{ textAlign: 'center', padding: '5rem 2rem', color: 'var(--text-muted)', gridColumn: '1 / -1' }}>
                            <div style={{ width: '80px', height: '80px', background: '#f8fafc', borderRadius: '24px', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem auto' }}>
                                <Briefcase size={36} color="var(--primary)" style={{ opacity: 0.6 }} />
                            </div>
                            <h3 style={{ fontSize: '1.5rem', color: 'var(--text-main)', marginBottom: '0.5rem', fontWeight: '700' }}>No active opportunities</h3>
                            <p style={{ fontSize: '1.1rem' }}>We're working hard to bring you new roles. Check back later!</p>
                        </div>
                    )}
                </div>
            </div>
        );
    }

    // Dynamic Chart Computation Helpers
    const maxBarVal = Math.max(...monthlyTrends, 5); 
    const getBarHeight = (val) => `${Math.max(5, (val / maxBarVal) * 100)}%`; 
    
    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const currentM = new Date().getMonth();
    const xLabels = [4,3,2,1,0].map(offset => monthNames[(currentM - offset + 12) % 12]);

    const totalIndustryCount = industryData.reduce((acc, item) => acc + item.count, 0);
    let pieGradient = 'conic-gradient(#e2e8f0 0% 100%)';
    if (totalIndustryCount > 0) {
        let currentPercent = 0;
        const gradientStops = industryData.map(item => {
            const start = currentPercent;
            const size = (item.count / totalIndustryCount) * 100;
            currentPercent += size;
            return `${item.color} ${start}% ${currentPercent}%`;
        });
        pieGradient = `conic-gradient(${gradientStops.join(', ')})`;
    }

    // PLACEMENT OFFICER DASHBOARD
    return (
        <div style={{ padding: '2rem 3.5rem', minHeight: '100vh', fontFamily: 'system-ui, -apple-system, sans-serif' }}>
            
            {/* Modal Overlay */}
            {modalData.isOpen && (
                <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(15, 23, 42, 0.4)', backdropFilter: 'blur(4px)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center' }} onClick={() => setModalData({ ...modalData, isOpen: false })}>
                    <div style={{ background: '#ffffff', borderRadius: '16px', width: '500px', maxWidth: '90vw', maxHeight: '80vh', display: 'flex', flexDirection: 'column', boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)', overflow: 'hidden' }} onClick={e => e.stopPropagation()}>
                        <div style={{ padding: '1.5rem 2rem', borderBottom: '1px solid #e2e8f0', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: '#f8fafc' }}>
                            <h3 style={{ fontSize: '1.25rem', fontWeight: '700', color: '#1e293b', margin: 0 }}>{modalData.title}</h3>
                            <button onClick={() => setModalData({ ...modalData, isOpen: false })} style={{ background: 'none', border: 'none', fontSize: '1.5rem', cursor: 'pointer', color: '#64748b' }}>&times;</button>
                        </div>
                        <div style={{ padding: '2rem', overflowY: 'auto', flex: 1 }}>
                            {modalData.items.length === 0 ? (
                                <p style={{ textAlign: 'center', color: '#64748b' }}>No records found.</p>
                            ) : (
                                <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                                    {modalData.items.map((item, idx) => (
                                        <li key={idx} style={{ display: 'flex', alignItems: 'center', gap: '1rem', padding: '1rem', background: '#f8fafc', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
                                            <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'var(--primary-light)', color: 'var(--primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold' }}>
                                                {(modalData.type === 'placements' ? (item.studentName || 'S') : (item.name || item.username || 'U'))[0].toUpperCase()}
                                            </div>
                                            <div>
                                                <div style={{ fontWeight: '600', color: '#1e293b' }}>
                                                    {modalData.type === 'placements' ? (item.studentName || `Student ${item.studentId}`) : (item.name || item.username)}
                                                </div>
                                                <div style={{ fontSize: '0.85rem', color: '#64748b' }}>
                                                    {modalData.type === 'placements' ? `Placed at Job ID: ${item.jobId}` : `Registered Student`}
                                                </div>
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </div>
                    </div>
                </div>
            )}

            <header className="animate-fade-up" style={{ marginBottom: '3rem', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: '1rem' }}>
                <div>
                    <h1 style={{ fontSize: '2.5rem', fontWeight: '800', color: 'var(--text-main)', marginBottom: '0.25rem', letterSpacing: '-0.02em' }}>
                        Officer <span className="gradient-text">Dashboard</span>
                    </h1>
                    <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem' }}>
                        Track placement records and generate institutional reports
                    </p>
                </div>
                <div style={{ display: 'flex', gap: '1rem' }}>
                    <button className="primary" style={{ padding: '0.75rem 1.5rem', fontSize: '0.9rem' }}>Generate Report</button>
                </div>
            </header>

            {/* KPI Cards */}
            <div className="kpi-grid animate-fade-up stagger-1">
                <div className="kpi-card hover-lift" onClick={() => setModalData({ isOpen: true, title: 'Placed Students', items: acceptedApps, type: 'placements' })} style={{ cursor: 'pointer' }}>
                    <div className="kpi-info">
                        <h3>Total Placements</h3>
                        <div className="kpi-value">{stats.placements}</div>
                    </div>
                    <div className="kpi-icon icon-blue">
                        <TrendingUp size={24} />
                    </div>
                </div>
                <div className="kpi-card hover-lift" onClick={() => setModalData({ isOpen: true, title: 'Active Students', items: stats.studentsList || [], type: 'students' })} style={{ cursor: 'pointer' }}>
                    <div className="kpi-info">
                        <h3>Active Students</h3>
                        <div className="kpi-value">{stats.students}</div>
                    </div>
                    <div className="kpi-icon icon-green">
                        <Users size={24} />
                    </div>
                </div>
                <div className="kpi-card">
                    <div className="kpi-info">
                        <h3>Partner Companies</h3>
                        <div className="kpi-value">{stats.companies}</div>
                    </div>
                    <div className="kpi-icon icon-purple">
                        <Briefcase size={24} />
                    </div>
                </div>
                <div className="kpi-card">
                    <div className="kpi-info">
                        <h3>Placement Rate</h3>
                        <div className="kpi-value">{stats.rate}</div>
                    </div>
                    <div className="kpi-icon icon-orange">
                        <FileText size={24} />
                    </div>
                </div>
            </div>

            {/* Tabs */}
            <div className="tabs animate-fade-up stagger-2">
                <button className={`tab ${activeTab === 'Overview' ? 'active' : ''}`} onClick={() => setActiveTab('Overview')}>Overview</button>
                <button className={`tab ${activeTab === 'Placement Records' ? 'active' : ''}`} onClick={() => setActiveTab('Placement Records')}>Placement Records</button>
                <button className={`tab ${activeTab === 'Reports' ? 'active' : ''}`} onClick={() => setActiveTab('Reports')}>Reports</button>
            </div>

            {/* Content Switcher */}
            {activeTab === 'Overview' && (
                <div className="charts-grid animate-fade-up stagger-3">
                    {/* Bar Chart */}
                    <div className="premium-card" style={{ padding: '2rem' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                            <h3 style={{ fontSize: '1.25rem', fontWeight: '700', color: 'var(--text-main)', fontFamily: 'Outfit' }}>Monthly Placement Trends</h3>
                            <select style={{ padding: '0.4rem 0.8rem', borderRadius: '8px', border: '1px solid var(--border-color)', background: '#f8fafc', fontWeight: '500', color: 'var(--text-main)', outline: 'none' }}>
                                <option>This Year</option>
                                <option>Last Year</option>
                            </select>
                        </div>
                        <div style={{ position: 'relative', height: '260px', display: 'flex', flexDirection: 'column' }}>
                            {/* Y-axis grid */}
                            <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: '30px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                                {[maxBarVal, Math.floor(maxBarVal*0.75), Math.floor(maxBarVal*0.5), Math.floor(maxBarVal*0.25), 0].map((val, i) => (
                                    <div key={i} style={{ display: 'flex', alignItems: 'center' }}>
                                        <span style={{ width: '25px', fontSize: '0.8rem', color: '#94a3b8', textAlign: 'right', paddingRight: '12px', fontWeight: '500' }}>{val}</span>
                                        <div style={{ flex: 1, borderTop: '1px dashed #e2e8f0' }}></div>
                                    </div>
                                ))}
                            </div>

                            {/* Bars */}
                            <div style={{ display: 'flex', justifyContent: 'space-around', alignItems: 'flex-end', flex: 1, marginLeft: '30px', marginBottom: '30px', borderBottom: '1px solid #cbd5e1', position: 'relative', zIndex: 1, padding: '0 20px' }}>
                                {monthlyTrends.map((val, idx) => (
                                    <div key={idx} style={{ 
                                        width: '15%', 
                                        height: getBarHeight(val), 
                                        background: val === 0 ? '#e2e8f0' : 'var(--primary-gradient)', 
                                        borderRadius: '6px 6px 0 0', 
                                        cursor: 'pointer', 
                                        transition: 'all 0.5s ease',
                                        position: 'relative'
                                    }} 
                                    onMouseEnter={(e) => { e.target.style.opacity = 0.8; }} 
                                    onMouseLeave={(e) => { e.target.style.opacity = 1; }}>
                                        {val > 0 && <div style={{ position: 'absolute', top: '-25px', left: '50%', transform: 'translateX(-50%)', fontSize: '0.8rem', fontWeight: 'bold', color: 'var(--primary)' }}>{val}</div>}
                                    </div>
                                ))}
                            </div>

                            {/* X-axis labels */}
                            <div style={{ display: 'flex', justifyContent: 'space-around', marginLeft: '30px', position: 'absolute', bottom: 0, left: 0, right: 0 }}>
                                {xLabels.map((lbl, idx) => (
                                    <span key={idx} style={{ fontSize: '0.85rem', color: '#64748b', fontWeight: '500' }}>{lbl}</span>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Pie Chart */}
                    <div className="premium-card" style={{ padding: '2rem' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                            <h3 style={{ fontSize: '1.25rem', fontWeight: '700', color: 'var(--text-main)', fontFamily: 'Outfit' }}>Placements by Top Companies</h3>
                        </div>
                        {totalIndustryCount === 0 ? (
                            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '260px', color: 'var(--text-muted)', fontWeight: '500' }}>
                               No placement data yet
                            </div>
                        ) : (
                            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '260px', position: 'relative' }}>
                                <div style={{
                                    width: '200px',
                                    height: '200px',
                                    borderRadius: '50%',
                                    background: pieGradient,
                                    boxShadow: 'var(--shadow)',
                                    transition: 'transform 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
                                    cursor: 'pointer'
                                }}
                                onMouseEnter={(e) => e.target.style.transform = 'scale(1.05)'}
                                onMouseLeave={(e) => e.target.style.transform = 'scale(1)'}
                                ></div>
                                
                                {/* Legend */}
                                <div style={{ position: 'absolute', top: '5%', right: '0', display: 'flex', flexDirection: 'column', gap: '0.75rem', background: 'rgba(255,255,255,0.9)', padding: '1rem', borderRadius: '12px', boxShadow: 'var(--shadow-sm)', backdropFilter: 'blur(4px)' }}>
                                    {industryData.map((item, idx) => (
                                        <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.85rem', fontWeight: '600', color: '#1f2937' }}>
                                            <div style={{ width: '10px', height: '10px', borderRadius: '3px', background: item.color }}></div> 
                                            {item.name}: {item.count}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            )}

            {activeTab === 'Placement Records' && (
                <div className="premium-card animate-fade-up stagger-3" style={{ padding: '2.5rem' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                        <h3 style={{ fontSize: '1.5rem', fontWeight: '700', color: 'var(--text-main)', fontFamily: 'Outfit' }}>Recent Placements</h3>
                    </div>
                    {acceptedApps.length === 0 ? (
                        <div style={{ textAlign: 'center', padding: '4rem 2rem', color: 'var(--text-muted)' }}>
                            <div style={{ width: '80px', height: '80px', background: '#f8fafc', borderRadius: '24px', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem auto' }}>
                                <Briefcase size={36} color="var(--primary)" style={{ opacity: 0.6 }} />
                            </div>
                            <h3 style={{ fontSize: '1.25rem', color: 'var(--text-main)', marginBottom: '0.5rem', fontWeight: '700' }}>No placements on record yet</h3>
                            <p>Once a student accepts a job offer, it will appear here.</p>
                        </div>
                    ) : (
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                            {acceptedApps.map(app => (
                                <div key={app._id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1.5rem', border: '1px solid var(--border-color)', borderRadius: '12px', background: '#ffffff', boxShadow: 'var(--shadow-sm)' }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
                                        <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: '#eff6ff', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#2563eb' }}>
                                            <Users size={24} />
                                        </div>
                                        <div>
                                            <div style={{ fontWeight: '700', color: 'var(--text-main)', fontSize: '1.1rem', marginBottom: '0.2rem' }}>{app.studentName || `Student ID: ${app.studentId}`}</div>
                                            <div style={{ fontSize: '0.9rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                                <Briefcase size={14} /> Placed at Job ID: {app.jobId}
                                            </div>
                                        </div>
                                    </div>
                                    <div style={{ padding: '0.5rem 1rem', background: '#ecfdf5', color: '#059669', borderRadius: '8px', fontSize: '0.9rem', fontWeight: '600', border: '1px solid #a7f3d0' }}>
                                        Confirmed Hire
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            )}

            {activeTab === 'Reports' && (
                <div className="premium-card animate-fade-up stagger-3" style={{ padding: '5rem 2rem', textAlign: 'center' }}>
                    <div style={{ width: '80px', height: '80px', background: '#fff7ed', borderRadius: '24px', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem auto' }}>
                        <FileText size={36} color="#ea580c" />
                    </div>
                    <h3 style={{ fontSize: '1.5rem', fontWeight: '700', color: 'var(--text-main)', fontFamily: 'Outfit', marginBottom: '1rem' }}>Generate Custom Reports</h3>
                    <p style={{ color: 'var(--text-muted)', marginBottom: '2rem', maxWidth: '400px', margin: '0 auto 2rem auto', lineHeight: '1.6' }}>
                        Export detailed placement statistics, active job role metrics, and comprehensive student performance reviews.
                    </p>
                    <button className="primary" style={{ padding: '1rem 2rem' }} onClick={() => alert('Report generation is coming soon!')}>Download Institutional Report</button>
                </div>
            )}
        </div>
    );
};

export default Home;
