import React, { useEffect, useState } from 'react';
import { mockApi } from '../services/mockApi';
import { User, Calendar, Building2, DollarSign, UserCog, ClipboardList } from 'lucide-react';

const Reports = () => {
    const [records, setRecords] = useState([]);

    useEffect(() => {
        setRecords(mockApi.getPlacements());
    }, []);

    return (
        <div style={{ padding: '1rem 0' }}>
            <header style={{ marginBottom: '3rem' }}>
                <div className="animate-fade-in">
                    <h2 style={{ fontSize: '2.5rem', fontWeight: '800' }}>
                        Placement <span style={{ color: 'var(--primary)' }}>Reports</span>
                    </h2>
                    <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem' }}>Detailed tracking of successful student placements.</p>
                </div>
            </header>

            <div
                className="glass-morphism animate-slide-up stagger-1"
                style={{ overflow: 'hidden', padding: '1rem' }}
            >
                <div style={{ overflowX: 'auto' }}>
                    <table style={{ width: '100%', borderCollapse: 'separate', borderSpacing: '0 0.5rem', textAlign: 'left' }}>
                        <thead>
                            <tr style={{ color: 'var(--text-muted)', fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                                <th style={{ padding: '1.5rem' }}>Student</th>
                                <th style={{ padding: '1.5rem' }}>Opportunity</th>
                                <th style={{ padding: '1.5rem' }}>Company</th>
                                <th style={{ padding: '1.5rem' }}>Salary Package</th>
                                <th style={{ padding: '1.5rem' }}>Placement Date</th>
                                <th style={{ padding: '1.5rem' }}>Managed By</th>
                            </tr>
                        </thead>
                        <tbody>
                            {records.map((record, index) => (
                                <tr
                                    key={record._id}
                                    className={`animate-fade-in stagger-${(index % 5) + 1}`}
                                    style={{
                                        borderTop: '1px solid var(--glass-border)',
                                        transition: 'background 0.2s ease',
                                        cursor: 'default'
                                    }}
                                >
                                    <td style={{ padding: '1.5rem' }}>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                                            <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: 'rgba(99, 102, 241, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                                <User size={16} color="var(--primary)" />
                                            </div>
                                            <span style={{ fontWeight: '600' }}>{record.studentName}</span>
                                        </div>
                                    </td>
                                    <td style={{ padding: '1.5rem', color: 'var(--text-main)', opacity: 0.9 }}>{record.jobTitle}</td>
                                    <td style={{ padding: '1.5rem' }}>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-muted)' }}>
                                            <Building2 size={16} /> {record.companyName}
                                        </div>
                                    </td>
                                    <td style={{ padding: '1.5rem' }}>
                                        <span style={{
                                            padding: '0.4rem 0.8rem',
                                            background: 'rgba(16, 185, 129, 0.1)',
                                            color: '#10b981',
                                            borderRadius: '12px',
                                            fontSize: '0.85rem',
                                            fontWeight: '600'
                                        }}>
                                            {record.salaryOffered || 'N/A'}
                                        </span>
                                    </td>
                                    <td style={{ padding: '1.5rem' }}>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-muted)', fontSize: '0.9rem' }}>
                                            <Calendar size={16} /> {new Date(record.dateOfPlacement).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}
                                        </div>
                                    </td>
                                    <td style={{ padding: '1.5rem' }}>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-muted)' }}>
                                            <UserCog size={16} /> {record.placementOfficerName}
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                {records.length === 0 && (
                    <div style={{ padding: '4rem', textAlign: 'center', color: 'var(--text-muted)' }}>
                        <ClipboardList size={48} style={{ margin: '0 auto 1.5rem auto', opacity: 0.3 }} />
                        <p style={{ fontSize: '1.1rem' }}>No placement records found in the database.</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Reports;
