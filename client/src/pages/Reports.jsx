import React, { useEffect, useState } from 'react';
import { mockApi } from '../services/mockApi';
import { User, Calendar, Building2, DollarSign, UserCog, ClipboardList } from 'lucide-react';

const Reports = () => {
    const [records, setRecords] = useState([]);

    useEffect(() => {
        const loadPlacements = async () => {
            try {
                const placements = await mockApi.getPlacements();
                setRecords(placements);
            } catch (error) {
                console.error('Failed to load placements:', error);
            }
        };

        loadPlacements();
    }, []);

    return (
        <div style={{ padding: '1rem 0', fontFamily: 'system-ui, -apple-system, sans-serif' }}>
            <header style={{ marginBottom: '3rem' }}>
                <div>
                    <h2 style={{ fontSize: '2.5rem', fontWeight: '800', color: '#1f2937' }}>
                        Placement <span style={{ color: '#2563eb' }}>Reports</span>
                    </h2>
                    <p style={{ color: '#6b7280', fontSize: '1.1rem' }}>Detailed tracking of successful student placements.</p>
                </div>
            </header>

            <div
                style={{ 
                    overflow: 'hidden', 
                    background: '#ffffff', 
                    borderRadius: '16px', 
                    border: '1px solid #e5e7eb',
                    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05)'
                }}
            >
                <div style={{ overflowX: 'auto' }}>
                    <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                        <thead>
                            <tr style={{ background: '#f8f9fa', color: '#4b5563', fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.05em', borderBottom: '1px solid #e5e7eb' }}>
                                <th style={{ padding: '1.5rem', fontWeight: '600' }}>Student</th>
                                <th style={{ padding: '1.5rem', fontWeight: '600' }}>Opportunity</th>
                                <th style={{ padding: '1.5rem', fontWeight: '600' }}>Company</th>
                                <th style={{ padding: '1.5rem', fontWeight: '600' }}>Salary Package</th>
                                <th style={{ padding: '1.5rem', fontWeight: '600' }}>Placement Date</th>
                                <th style={{ padding: '1.5rem', fontWeight: '600' }}>Managed By</th>
                            </tr>
                        </thead>
                        <tbody>
                            {records.map((record, index) => (
                                <tr
                                    key={record._id}
                                    style={{
                                        borderBottom: index === records.length - 1 ? 'none' : '1px solid #e5e7eb',
                                        transition: 'background 0.2s ease',
                                        cursor: 'default'
                                    }}
                                >
                                    <td style={{ padding: '1.5rem' }}>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                                            <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: '#eff6ff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                                <User size={16} color="#2563eb" />
                                            </div>
                                            <span style={{ fontWeight: '600', color: '#1f2937' }}>{record.studentName}</span>
                                        </div>
                                    </td>
                                    <td style={{ padding: '1.5rem', color: '#1f2937', fontWeight: '500' }}>{record.jobTitle}</td>
                                    <td style={{ padding: '1.5rem' }}>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#4b5563' }}>
                                            <Building2 size={16} /> {record.companyName}
                                        </div>
                                    </td>
                                    <td style={{ padding: '1.5rem' }}>
                                        <span style={{
                                            padding: '0.4rem 0.8rem',
                                            background: '#ecfdf5',
                                            color: '#10b981',
                                            borderRadius: '12px',
                                            fontSize: '0.85rem',
                                            fontWeight: '600'
                                        }}>
                                            {record.salaryOffered || 'N/A'}
                                        </span>
                                    </td>
                                    <td style={{ padding: '1.5rem' }}>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#6b7280', fontSize: '0.9rem' }}>
                                            <Calendar size={16} /> {new Date(record.dateOfPlacement).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}
                                        </div>
                                    </td>
                                    <td style={{ padding: '1.5rem' }}>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#6b7280' }}>
                                            <UserCog size={16} /> {record.placementOfficerName}
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                {records.length === 0 && (
                    <div style={{ padding: '4rem', textAlign: 'center', color: '#6b7280' }}>
                        <ClipboardList size={48} style={{ margin: '0 auto 1.5rem auto', opacity: 0.3 }} />
                        <p style={{ fontSize: '1.1rem' }}>No placement records found in the database.</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Reports;
