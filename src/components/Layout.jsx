import React from 'react';
import { useAuth } from '../context/AuthContext';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { LogOut, Home, Briefcase, FileText, BarChart, User } from 'lucide-react';

const Layout = ({ children }) => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    const navLinks = [
        { path: '/', label: 'Home', icon: Home, roles: ['student', 'employer', 'admin', 'placement_officer'] },
        { path: '/applications', label: 'Applications', icon: FileText, roles: ['student', 'employer', 'admin', 'placement_officer'] },
        { path: '/post-job', label: 'Post Job', icon: Briefcase, roles: ['employer', 'admin'] },
        { path: '/reports', label: 'Reports', icon: BarChart, roles: ['admin', 'placement_officer'] },
    ];

    return (
        <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
            <nav
                style={{
                    background: 'rgba(255, 255, 255, 0.85)',
                    backdropFilter: 'blur(12px)',
                    WebkitBackdropFilter: 'blur(12px)',
                    padding: '0.85rem 2.5rem',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    borderBottom: '1px solid rgba(255, 255, 255, 0.3)',
                    boxShadow: '0 4px 20px -2px rgba(0, 0, 0, 0.05)',
                    position: 'sticky',
                    top: 0,
                    zIndex: 100,
                    transition: 'all 0.3s ease'
                }}
            >
                <Link to="/" style={{ textDecoration: 'none' }} className="animate-fade-up">
                    <h1 style={{
                        fontSize: '1.6rem',
                        fontWeight: '800',
                        color: '#0f172a',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.6rem',
                        fontFamily: 'Outfit, sans-serif'
                    }}>
                        <div style={{ 
                            width: '36px', 
                            height: '36px', 
                            background: 'var(--primary-gradient)', 
                            borderRadius: '10px', 
                            display: 'flex', 
                            alignItems: 'center', 
                            justifyContent: 'center',
                            boxShadow: 'var(--shadow-primary)'
                        }}>
                            <Briefcase size={20} color="white" />
                        </div>
                        Placement<span className="gradient-text">Portal</span>
                    </h1>
                </Link>

                <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }} className="animate-fade-up stagger-1">
                    {navLinks.filter(link => !link.roles || link.roles.includes(user?.role)).map(link => {
                        const isActive = location.pathname === link.path;
                        return (
                            <Link
                                key={link.path}
                                to={link.path}
                                style={{
                                    color: isActive ? '#2563eb' : '#64748b',
                                    textDecoration: 'none',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '0.5rem',
                                    padding: '0.6rem 1.25rem',
                                    borderRadius: '10px',
                                    transition: 'all 0.25s cubic-bezier(0.4, 0, 0.2, 1)',
                                    background: isActive ? '#eff6ff' : 'transparent',
                                    fontWeight: isActive ? '600' : '500',
                                    fontSize: '0.95rem'
                                }}
                                onMouseEnter={(e) => {
                                    if (!isActive) {
                                        e.currentTarget.style.background = '#f8fafc';
                                        e.currentTarget.style.color = '#0f172a';
                                    }
                                }}
                                onMouseLeave={(e) => {
                                    if (!isActive) {
                                        e.currentTarget.style.background = 'transparent';
                                        e.currentTarget.style.color = '#64748b';
                                    }
                                }}
                            >
                                <link.icon size={18} />
                                {link.label}
                            </Link>
                        );
                    })}

                    <div style={{ width: '2px', height: '24px', background: 'var(--border-color)', margin: '0 1rem', borderRadius: '2px' }}></div>

                    {user ? (
                        <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                                <div style={{ 
                                    width: '40px', 
                                    height: '40px', 
                                    borderRadius: '12px', 
                                    background: 'var(--primary-light)', 
                                    display: 'flex', 
                                    alignItems: 'center', 
                                    justifyContent: 'center' 
                                }}>
                                    <User size={20} color="var(--primary)" />
                                </div>
                                <div style={{ display: 'flex', flexDirection: 'column' }}>
                                    <span style={{ fontSize: '0.9rem', fontWeight: '700', color: 'var(--text-main)', lineHeight: 1.2 }}>{user.name}</span>
                                    <span style={{ fontSize: '0.75rem', color: 'var(--primary)', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{user.role}</span>
                                </div>
                            </div>
                            <button
                                onClick={handleLogout}
                                style={{
                                    background: 'white',
                                    color: '#ef4444',
                                    padding: '0.6rem 1rem',
                                    borderRadius: '10px',
                                    fontSize: '0.9rem',
                                    border: '1px solid #fee2e2',
                                    boxShadow: 'var(--shadow-sm)',
                                    cursor: 'pointer',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '0.5rem',
                                    fontWeight: '600',
                                    transition: 'all 0.2s ease'
                                }}
                                onMouseEnter={(e) => {
                                    e.currentTarget.style.background = '#fef2f2';
                                    e.currentTarget.style.borderColor = '#fca5a5';
                                    e.currentTarget.style.transform = 'translateY(-1px)';
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.background = 'white';
                                    e.currentTarget.style.borderColor = '#fee2e2';
                                    e.currentTarget.style.transform = 'translateY(0)';
                                }}
                            >
                                <LogOut size={16} /> Logout
                            </button>
                        </div>
                    ) : (
                        <Link to="/login" style={{ 
                            color: 'white', 
                            background: 'var(--primary-gradient)',
                            textDecoration: 'none', 
                            fontWeight: '600', 
                            padding: '0.6rem 1.5rem',
                            borderRadius: '10px',
                            boxShadow: 'var(--shadow-primary)',
                            transition: 'all 0.2s ease'
                        }}>Login</Link>
                    )}
                </div>
            </nav>

            <main style={{ flex: 1, padding: '2.5rem 0', display: 'flex', flexDirection: 'column' }}>
                <div style={{ maxWidth: '1400px', margin: '0 auto', width: '100%', flex: 1 }}>
                    {children}
                </div>
            </main>
        </div>
    );
};

export default Layout;
