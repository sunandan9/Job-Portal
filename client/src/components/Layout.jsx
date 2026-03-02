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
                className="glass-morphism animate-slide-down"
                style={{
                    margin: '1.5rem',
                    padding: '0.75rem 2rem',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    position: 'sticky',
                    top: '1.5rem',
                    zIndex: 100,
                    backdropFilter: 'blur(20px)'
                }}
            >
                <Link to="/" style={{ textDecoration: 'none' }}>
                    <h1 style={{
                        fontSize: '1.75rem',
                        fontWeight: '800',
                        background: 'linear-gradient(135deg, #6366f1 0%, #ec4899 100%)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        letterSpacing: '-0.04em'
                    }}>
                        PlacementPortal
                    </h1>
                </Link>

                <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                    {navLinks.filter(link => !link.roles || link.roles.includes(user?.role)).map(link => (
                        <Link
                            key={link.path}
                            to={link.path}
                            style={{
                                color: location.pathname === link.path ? 'var(--primary)' : 'var(--text-main)',
                                textDecoration: 'none',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '0.6rem',
                                padding: '0.6rem 1rem',
                                borderRadius: '12px',
                                transition: 'all 0.2s ease',
                                background: location.pathname === link.path ? 'rgba(99, 102, 241, 0.1)' : 'transparent',
                                fontWeight: '500',
                                fontSize: '0.95rem'
                            }}
                        >
                            <link.icon size={20} strokeWidth={location.pathname === link.path ? 2.5 : 2} />
                            {link.label}
                        </Link>
                    ))}

                    <div style={{ width: '1px', height: '24px', background: 'var(--glass-border)', margin: '0 0.5rem' }}></div>

                    {user ? (
                        <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '0.4rem 0.8rem', background: 'rgba(255,255,255,0.05)', borderRadius: '20px' }}>
                                <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: 'var(--primary)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                    <User size={18} color="white" />
                                </div>
                                <div style={{ display: 'flex', flexDirection: 'column' }}>
                                    <span style={{ fontSize: '0.85rem', fontWeight: '600', color: 'var(--text-main)', lineHeight: 1.2 }}>{user.name}</span>
                                    <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)', textTransform: 'capitalize' }}>{user.role}</span>
                                </div>
                            </div>
                            <button
                                onClick={handleLogout}
                                style={{
                                    background: 'rgba(236, 72, 153, 0.1)',
                                    color: 'var(--secondary)',
                                    padding: '0.6rem 1rem',
                                    borderRadius: '12px',
                                    fontSize: '0.9rem'
                                }}
                            >
                                <LogOut size={18} /> Logout
                            </button>
                        </div>
                    ) : (
                        <Link to="/login" style={{ color: 'var(--primary)', textDecoration: 'none', fontWeight: '600' }}>Login</Link>
                    )}
                </div>
            </nav>

            <main
                className="animate-fade-in stagger-1"
                style={{ flex: 1, padding: '0 3rem 3rem 3rem', maxWidth: '1400px', margin: '0 auto', width: '100%' }}
            >
                {children}
            </main>
        </div>
    );
};

export default Layout;
