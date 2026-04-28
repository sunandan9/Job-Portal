import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import { UserPlus, Mail, Lock, User, ShieldCheck } from 'lucide-react';

const Register = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('student');
    const { register } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await register(name, email, password, role);
            navigate('/');
        } catch (err) {
            alert('Registration failed: ' + (err.response?.data?.message || err.message));
        }
    };

    const roles = ['student', 'employer', 'placement_officer', 'admin'];
    const roleLabels = {
        'student': 'Student',
        'employer': 'Employer',
        'placement_officer': 'Placement Officer',
        'admin': 'Admin'
    };

    return (
        <div style={{ 
            minHeight: '100vh', 
            background: '#eef2ff', 
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            padding: '1rem',
            fontFamily: 'system-ui, -apple-system, sans-serif'
        }}>
            <div style={{ 
                width: '100%', 
                maxWidth: '430px', 
                background: '#ffffff',
                borderRadius: '16px',
                padding: '2.5rem',
                boxShadow: '0 4px 20px rgba(0,0,0,0.05)'
            }}>
                <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
                    <div style={{
                        width: '64px',
                        height: '64px',
                        background: '#2563eb',
                        borderRadius: '50%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        margin: '0 auto 1.25rem auto'
                    }}>
                        <UserPlus size={30} color="#ffffff" />
                    </div>
                    <h2 style={{ color: '#1f2937', fontSize: '1.75rem', fontWeight: '700', marginBottom: '0.4rem' }}>
                        Create Account
                    </h2>
                    <p style={{ color: '#6b7280', fontSize: '0.95rem' }}>
                        Join the PlacementPortal network today
                    </p>
                </div>

                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                    {/* Role Selection */}
                    <div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.85rem', fontWeight: '600', color: '#4b5563', marginBottom: '0.5rem' }}>
                            <ShieldCheck size={16} /> Select Role
                        </div>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
                            {roles.map(r => (
                                <button
                                    key={r}
                                    type="button"
                                    onClick={() => setRole(r)}
                                    style={{
                                        padding: '0.75rem',
                                        borderRadius: '8px',
                                        fontSize: '0.9rem',
                                        fontWeight: '500',
                                        border: role === r ? '1px solid #2563eb' : '1px solid #e5e7eb',
                                        background: role === r ? '#eff6ff' : '#ffffff',
                                        color: role === r ? '#2563eb' : '#4b5563',
                                        cursor: 'pointer',
                                        transition: 'all 0.2s',
                                        display: 'block',
                                        width: '100%'
                                    }}
                                >
                                    {roleLabels[r]}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Full Name */}
                    <div>
                        <div style={{ fontSize: '0.85rem', fontWeight: '600', color: '#4b5563', marginBottom: '0.5rem' }}>
                            Full Name
                        </div>
                        <div style={{ 
                            display: 'flex', 
                            alignItems: 'center',
                            border: '1px solid #e5e7eb',
                            background: '#ffffff',
                            borderRadius: '8px',
                            padding: '0 1rem',
                            height: '46px'
                        }}>
                            <User size={18} color="#9ca3af" style={{ marginRight: '0.75rem' }} />
                            <input
                                type="text"
                                placeholder="e.g. John Doe"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                style={{
                                    border: 'none',
                                    background: 'transparent',
                                    width: '100%',
                                    outline: 'none',
                                    fontSize: '0.95rem',
                                    color: '#1f2937'
                                }}
                                required
                            />
                        </div>
                    </div>

                    {/* Email */}
                    <div>
                        <div style={{ fontSize: '0.85rem', fontWeight: '600', color: '#4b5563', marginBottom: '0.5rem' }}>
                            Email Address
                        </div>
                        <div style={{ 
                            display: 'flex', 
                            alignItems: 'center',
                            border: '1px solid #e5e7eb',
                            background: '#ffffff',
                            borderRadius: '8px',
                            padding: '0 1rem',
                            height: '46px'
                        }}>
                            <Mail size={18} color="#9ca3af" style={{ marginRight: '0.75rem' }} />
                            <input
                                type="email"
                                placeholder="john@example.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                style={{
                                    border: 'none',
                                    background: 'transparent',
                                    width: '100%',
                                    outline: 'none',
                                    fontSize: '0.95rem',
                                    color: '#1f2937'
                                }}
                                required
                            />
                        </div>
                    </div>

                    {/* Password */}
                    <div>
                        <div style={{ fontSize: '0.85rem', fontWeight: '600', color: '#4b5563', marginBottom: '0.5rem' }}>
                            Password
                        </div>
                        <div style={{ 
                            display: 'flex', 
                            alignItems: 'center',
                            border: '1px solid #e5e7eb',
                            background: '#ffffff',
                            borderRadius: '8px',
                            padding: '0 1rem',
                            height: '46px'
                        }}>
                            <Lock size={18} color="#9ca3af" style={{ marginRight: '0.75rem' }} />
                            <input
                                type="password"
                                placeholder="••••••••"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                style={{
                                    border: 'none',
                                    background: 'transparent',
                                    width: '100%',
                                    outline: 'none',
                                    fontSize: '0.95rem',
                                    color: '#1f2937'
                                }}
                                required
                            />
                        </div>
                    </div>

                    {/* Submit Button */}
                    <button 
                        type="submit"
                        style={{
                            width: '100%',
                            padding: '0.875rem',
                            background: '#2563eb',
                            color: '#ffffff',
                            border: 'none',
                            borderRadius: '8px',
                            fontSize: '0.95rem',
                            fontWeight: '600',
                            cursor: 'pointer',
                            marginTop: '0.5rem',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: '0.5rem'
                        }}
                    >
                        <UserPlus size={18} /> Register Now
                    </button>
                    
                    <div style={{ textAlign: 'center', marginTop: '0.5rem', fontSize: '0.85rem', color: '#6b7280' }}>
                        Already have an account? <Link to="/login" style={{ color: '#2563eb', textDecoration: 'none', fontWeight: '500' }}>Sign In</Link>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Register;
