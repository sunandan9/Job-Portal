import React, { useState } from 'react';
import { mockApi } from '../services/mockApi';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { MapPin, DollarSign, ListChecks, Type, FileText, Send, X } from 'lucide-react';

const PostJob = () => {
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        location: '',
        salary: '',
        requirements: ''
    });
    const { user } = useAuth();
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await mockApi.createJob({
                ...formData,
                companyId: user.id,
                company: user.name,
                requirements: formData.requirements.split(',').map(r => r.trim())
            });
            alert('Job posted successfully!');
            navigate('/');
        } catch (err) {
            alert('Failed to post job: ' + err.message);
        }
    };

    return (
        <div style={{ maxWidth: '800px', margin: '2rem auto', fontFamily: 'system-ui, -apple-system, sans-serif' }}>
            <div className="premium-card animate-fade-up" style={{ padding: '3rem 4rem' }}>
                <header style={{ textAlign: 'center', marginBottom: '3rem' }}>
                    <div style={{
                        width: '64px',
                        height: '64px',
                        background: 'var(--primary-light)',
                        borderRadius: '50%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        margin: '0 auto 1.5rem auto'
                    }}>
                        <FileText size={32} color="var(--primary)" />
                    </div>
                    <h2 style={{ fontSize: '2.5rem', fontWeight: '800', color: '#1e293b', marginBottom: '0.5rem', fontFamily: 'Outfit' }}>
                        Post a New <span className="gradient-text">Project</span>
                    </h2>
                    <p style={{ color: '#64748b', fontSize: '1.15rem' }}>Share your requirements with top candidates</p>
                </header>

                <form onSubmit={handleSubmit} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
                    <div className="input-group" style={{ gridColumn: 'span 2' }}>
                        <label>
                            <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                <Type size={16} color="#4b5563" /> Job Title
                            </span>
                        </label>
                        <div className="input-container">
                            <input name="title" placeholder="e.g. Senior Frontend Engineer" value={formData.title} onChange={handleChange} required />
                        </div>
                    </div>

                    <div className="input-group">
                        <label>
                            <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                <MapPin size={16} color="#4b5563" /> Location
                            </span>
                        </label>
                        <div className="input-container">
                            <input name="location" placeholder="e.g. Remote, NY" value={formData.location} onChange={handleChange} />
                        </div>
                    </div>

                    <div className="input-group">
                        <label>
                            <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                <DollarSign size={16} color="#4b5563" /> Salary Range
                            </span>
                        </label>
                        <div className="input-container">
                            <input name="salary" placeholder="e.g. $120k - $150k" value={formData.salary} onChange={handleChange} />
                        </div>
                    </div>

                    <div className="input-group" style={{ gridColumn: 'span 2' }}>
                        <label>
                            <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                <ListChecks size={16} color="#4b5563" /> Requirements (comma separated)
                            </span>
                        </label>
                        <div className="input-container">
                            <input name="requirements" placeholder="React, Node.js, TypeScript..." value={formData.requirements} onChange={handleChange} />
                        </div>
                    </div>

                    <div className="input-group" style={{ gridColumn: 'span 2' }}>
                        <label>
                            <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                <FileText size={16} color="#4b5563" /> Detailed Description
                            </span>
                        </label>
                        <textarea
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            required
                            placeholder="Tell us about the role, team, and what you're looking for..."
                            style={{
                                width: '100%',
                                padding: '1rem',
                                background: '#ffffff',
                                border: '1px solid var(--border-color)',
                                borderRadius: '8px',
                                color: '#1f2937',
                                minHeight: '180px',
                                fontFamily: 'inherit',
                                resize: 'vertical',
                                fontSize: '0.95rem',
                                outline: 'none',
                                transition: 'all 0.2s'
                            }}
                            onFocus={(e) => {
                                e.target.style.borderColor = 'var(--primary)';
                                e.target.style.boxShadow = '0 0 0 3px var(--primary-light)';
                            }}
                            onBlur={(e) => {
                                e.target.style.borderColor = 'var(--border-color)';
                                e.target.style.boxShadow = 'none';
                            }}
                        />
                    </div>

                    <div style={{ gridColumn: 'span 2', display: 'flex', gap: '1rem', marginTop: '1.5rem' }}>
                        <button type="submit" className="primary" style={{ flex: 1, padding: '1rem', fontSize: '1.05rem' }}>
                            <Send size={18} /> Create Listing
                        </button>
                        <button
                            type="button"
                            onClick={() => navigate('/')}
                            style={{
                                padding: '1rem',
                                width: '140px',
                                background: '#f8fafc',
                                color: '#334155',
                                border: '1px solid #cbd5e1',
                                borderRadius: '10px',
                                fontWeight: '600',
                                fontSize: '1rem',
                                cursor: 'pointer',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                gap: '0.5rem',
                                transition: 'all 0.2s'
                            }}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.background = '#f1f5f9';
                                e.currentTarget.style.borderColor = '#94a3b8';
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.background = '#f8fafc';
                                e.currentTarget.style.borderColor = '#cbd5e1';
                            }}
                        >
                            <X size={18} /> Cancel
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default PostJob;
