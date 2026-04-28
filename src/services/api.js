const API_BASE = 'http://localhost:5000/api';

const getToken = () => localStorage.getItem('token');

const headers = () => ({
    'Content-Type': 'application/json',
    ...(getToken() ? { 'Authorization': `Bearer ${getToken()}` } : {})
});

const handleResponse = async (res) => {
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || 'Request failed');
    return data;
};

export const api = {
    // Auth
    login: async (email, password, role) => {
        const res = await fetch(`${API_BASE}/auth/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password, role })
        });
        return handleResponse(res);
    },

    register: async (name, email, password, role) => {
        const res = await fetch(`${API_BASE}/auth/register`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name, email, password, role })
        });
        return handleResponse(res);
    },

    // Users
    getUsers: async () => {
        const res = await fetch(`${API_BASE}/users`, { headers: headers() });
        return handleResponse(res);
    },

    // Jobs
    getJobs: async () => {
        const res = await fetch(`${API_BASE}/jobs`, { headers: headers() });
        return handleResponse(res);
    },

    createJob: async (job) => {
        const res = await fetch(`${API_BASE}/jobs`, {
            method: 'POST',
            headers: headers(),
            body: JSON.stringify(job)
        });
        return handleResponse(res);
    },

    // Applications
    getApplications: async () => {
        const res = await fetch(`${API_BASE}/applications`, { headers: headers() });
        return handleResponse(res);
    },

    applyForJob: async (jobId) => {
        const res = await fetch(`${API_BASE}/applications`, {
            method: 'POST',
            headers: headers(),
            body: JSON.stringify({ jobId })
        });
        return handleResponse(res);
    },

    updateApplicationStatus: async (id, status) => {
        const res = await fetch(`${API_BASE}/applications/${id}/status`, {
            method: 'PUT',
            headers: headers(),
            body: JSON.stringify({ status })
        });
        return handleResponse(res);
    },

    // Placements
    getPlacements: async () => {
        const res = await fetch(`${API_BASE}/placements`, { headers: headers() });
        return handleResponse(res);
    },

    createPlacement: async (record) => {
        const res = await fetch(`${API_BASE}/placements`, {
            method: 'POST',
            headers: headers(),
            body: JSON.stringify(record)
        });
        return handleResponse(res);
    }
};
