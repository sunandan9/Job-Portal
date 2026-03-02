import React, { useState } from 'react';
import { mockApi } from '../services/mockApi';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Briefcase, MapPin, DollarSign, ListChecks, Type, FileText } from 'lucide-react';

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
            mockApi.createJob({
                ...formData,
                companyId: user.id,
                companyName: user.name,
                requirements: formData.requirements.split(',').map(r => r.trim())
            });
            alert('Job posted successfully!');
            navigate('/');
        } catch (err) {
            alert('Failed to post job');
        }
    };

    return (
        <div style={{ maxWidth: '800px', margin: '2rem auto' }}>
            <div className="glass-morphism animate-slide-up" style={{ padding: '3rem' }}>
                <header style={{ textAlign: 'center', marginBottom: '3rem' }}>
                    <div style={{
                        width: '56px',
                        height: '56px',
                        background: 'rgba(99, 102, 241, 0.1)',
                        borderRadius: '14px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        margin: '0 auto 1.5rem auto'
                    }}>
                        <Briefcase size={28} color="var(--primary)" />
                    </div>
                    <h2 style={{ fontSize: '2rem', fontWeight: '800' }}>Post a New Project</h2>
                    <p style={{ color: 'var(--text-muted)' }}>Share your requirements with top candidates</p>
                </header>

                <form onSubmit={handleSubmit} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
                    <div className="input-group" style={{ gridColumn: 'span 2' }}>
                        <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                            <Type size={16} /> Job Title
                        </label>
                        <input name="title" placeholder="e.g. Senior Frontend Engineer" value={formData.title} onChange={handleChange} required />
                    </div>

                    <div className="input-group">
                        <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                            <MapPin size={16} /> Location
                        </label>
                        <input name="location" placeholder="e.g. Remote, NY" value={formData.location} onChange={handleChange} />
                    </div>

                    <div className="input-group">
                        <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                            <DollarSign size={16} /> Salary Range
                        </label>
                        <input name="salary" placeholder="e.g. $120k - $150k" value={formData.salary} onChange={handleChange} />
                    </div>

                    <div className="input-group" style={{ gridColumn: 'span 2' }}>
                        <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                            <ListChecks size={16} /> Requirements (comma separated)
                        </label>
                        <input name="requirements" placeholder="React, Node.js, TypeScript..." value={formData.requirements} onChange={handleChange} />
                    </div>

                    <div className="input-group" style={{ gridColumn: 'span 2' }}>
                        <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                            <FileText size={16} /> Detailed Description
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
                                background: 'rgba(15, 23, 42, 0.4)',
                                border: '1px solid var(--glass-border)',
                                borderRadius: '12px',
                                color: 'white',
                                minHeight: '160px',
                                fontFamily: 'inherit',
                                resize: 'vertical'
                            }}
                        />
                    </div>

                    <div style={{ gridColumn: 'span 2', display: 'flex', gap: '1rem', marginTop: '1rem' }}>
                        <button type="submit" className="primary" style={{ flex: 1 }}>
                            Create Listing
                        </button>
                        <button
                            type="button"
                            onClick={() => navigate('/')}
                            style={{
                                padding: '0.75rem 1.5rem',
                                background: 'rgba(255,255,255,0.05)',
                                color: 'var(--text-main)',
                                borderRadius: '12px'
                            }}
                        >
                            Cancel
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default PostJob;
