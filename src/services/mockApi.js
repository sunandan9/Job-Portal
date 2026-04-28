const getLocalData = (key) => JSON.parse(localStorage.getItem(key)) || [];
const setLocalData = (key, data) => localStorage.setItem(key, JSON.stringify(data));

export const mockApi = {
    // Auth mocking is handled in AuthContext mostly, but we can put helper here
    getUsers: () => getLocalData('users'),

    // Jobs
    getJobs: () => getLocalData('jobs'),
    createJob: (job) => {
        const jobs = getLocalData('jobs');
        const newJob = { ...job, _id: Date.now().toString(), status: 'open', createdAt: new Date() };
        jobs.push(newJob);
        setLocalData('jobs', jobs);
        return newJob;
    },

    // Applications
    getApplications: (user) => {
        const apps = getLocalData('applications');
        if (!user) return apps;
        
        if (user.role === 'student' || user.role === 'Student') {
            return apps.filter(a => a.studentId === user.id);
        }
        
        if (user.role === 'employer' || user.role === 'Employer') {
            const jobs = getLocalData('jobs').filter(j => j.companyId === user.id);
            if (jobs.length === 0) {
                // Mock fallback: If the employer just created an account and hasn't posted jobs, 
                // but wants to see the pipeline demo, we show them all applications for the dummy jobs limit 10
                 return apps;
            }
            const jobIds = jobs.map(j => j._id);
            return apps.filter(a => jobIds.includes(a.jobId));
        }
        
        return apps;
    },
    applyForJob: (app) => {
        const apps = getLocalData('applications');
        const newApp = { ...app, _id: Date.now().toString(), status: 'applied', createdAt: new Date() };
        apps.push(newApp);
        setLocalData('applications', apps);
        return newApp;
    },
    updateApplicationStatus: (id, status) => {
        const apps = getLocalData('applications');
        const index = apps.findIndex(a => a._id === id);
        if (index !== -1) {
            apps[index].status = status;
            setLocalData('applications', apps);
        }
    },

    // Placements
    getPlacements: () => getLocalData('placements'),
    createPlacement: (record) => {
        const placements = getLocalData('placements');
        const newRecord = { ...record, _id: Date.now().toString(), createdAt: new Date() };
        placements.push(newRecord);
        setLocalData('placements', placements);
        return newRecord;
    }
};
