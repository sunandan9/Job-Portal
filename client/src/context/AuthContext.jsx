import React, { createContext, useState, useContext, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const savedUser = JSON.parse(localStorage.getItem('user'));
        if (savedUser) {
            setUser(savedUser);
        }
        setLoading(false);
    }, []);

    const login = async (email, password) => {
        const users = JSON.parse(localStorage.getItem('users')) || [];
        const user = users.find(u => u.email === email && u.password === password);

        if (!user) throw new Error('Invalid credentials');

        const userData = { id: user.id, name: user.name, email: user.email, role: user.role };
        localStorage.setItem('user', JSON.stringify(userData));
        setUser(userData);
    };

    const register = async (name, email, password, role) => {
        const users = JSON.parse(localStorage.getItem('users')) || [];
        if (users.find(u => u.email === email)) throw new Error('User already exists');

        const newUser = { id: Date.now().toString(), name, email, password, role };
        users.push(newUser);
        localStorage.setItem('users', JSON.stringify(users));

        const userData = { id: newUser.id, name: newUser.name, email: newUser.email, role: newUser.role };
        localStorage.setItem('user', JSON.stringify(userData));
        setUser(userData);
    };

    const logout = () => {
        localStorage.removeItem('user');
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, login, register, logout, loading }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
