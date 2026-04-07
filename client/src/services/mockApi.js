const API_URL = 'http://localhost:5000/api';

const getHeaders = () => {
    const user = JSON.parse(localStorage.getItem('user'));
    return {
        'Content-Type': 'application/json',
        'Authorization': user && user.token ? `Bearer ${user.token}` : ''
    };
};

export const mockApi = {
    // Users
    getUsers: async () => {
        const res = await fetch(`${API_URL}/auth/users`, { headers: getHeaders() });
        if (!res.ok) throw new Error('Failed to fetch users');
        return res.json();
    },

    // Jobs
    getJobs: async () => {
        const res = await fetch(`${API_URL}/jobs`, { headers: getHeaders() });
        if (!res.ok) throw new Error('Failed to fetch jobs');
        return res.json();
    },
    createJob: async (job) => {
        const res = await fetch(`${API_URL}/jobs`, {
            method: 'POST',
            headers: getHeaders(),
            body: JSON.stringify(job)
        });
        if (!res.ok) throw new Error('Failed to create job');
        return res.json();
    },

    // Applications
    getApplications: async (user) => {
        const res = await fetch(`${API_URL}/applications`, { headers: getHeaders() });
        if (!res.ok) throw new Error('Failed to fetch applications');
        return res.json();
    },
    applyForJob: async (app) => {
        const res = await fetch(`${API_URL}/applications`, {
            method: 'POST',
            headers: getHeaders(),
            body: JSON.stringify(app)
        });
        if (!res.ok) throw new Error('Failed to apply for job');
        return res.json();
    },
    updateApplicationStatus: async (id, status) => {
        const res = await fetch(`${API_URL}/applications/${id}/status`, {
            method: 'PUT',
            headers: getHeaders(),
            body: JSON.stringify({ status })
        });
        if (!res.ok) throw new Error('Failed to update status');
        return res;
    },

    // Profile
    getProfile: async () => {
        const res = await fetch(`${API_URL}/auth/profile`, { headers: getHeaders() });
        if (!res.ok) throw new Error('Failed to fetch profile');
        return res.json();
    },
    updateProfile: async (userData) => {
        const res = await fetch(`${API_URL}/auth/profile`, {
            method: 'PUT',
            headers: getHeaders(),
            body: JSON.stringify(userData)
        });
        if (!res.ok) throw new Error('Failed to update profile');
        return res.json();
    }
};
