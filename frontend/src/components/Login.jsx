import React, { useState } from 'react';
import api from '../api';

const Login = ({ onLogin }) => {
    const [isLogin, setIsLogin] = useState(true);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        try {
            const endpoint = isLogin ? '/auth/login' : '/auth/register';
            const res = await api.post(endpoint, { username, password });

            if (isLogin) {
                localStorage.setItem('token', res.data.token);
                onLogin();
            } else {
                // If registration is successful, switch to login or auto-login
                // For now, let's switch to login and show a success message or auto-login if token is returned
                if (res.data.token) {
                    localStorage.setItem('token', res.data.token);
                    onLogin();
                } else {
                    setIsLogin(true);
                    setError('Registration successful! Please login.');
                    // Ideally use a success state/toast, but reusing error for message for now or clearing it
                }
            }
        } catch (err) {
            setError(err.response?.data?.message || 'An error occurred');
        }
    };

    return (
        <div className="min-h-screen bg-black text-white selection:bg-primary selection:text-white flex items-center justify-center relative overflow-hidden">
            {/* Background Image similar to Dashboard */}
            <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1556910103-1c02745a30bf?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center"></div>
            <div className="absolute inset-0 bg-black/60"></div>

            <div className="relative z-10 card w-full max-w-md p-8 bg-black/80 backdrop-blur-sm border-white/10">
                <h2 className="text-4xl font-black text-center mb-2 tracking-tight">
                    <span className="text-white">DISH</span> <span className="text-primary">DASHBOARD</span>
                </h2>
                <p className="text-center text-slate-400 mb-8 font-light">
                    {isLogin ? 'Welcome back, Chef' : 'Join the Kitchen'}
                </p>

                {error && (
                    <div className={`p-3 rounded-lg mb-6 text-sm text-center ${error.includes('successful') ? 'bg-green-500/10 border border-green-500/50 text-green-400' : 'bg-red-500/10 border border-red-500/50 text-red-400'}`}>
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label className="block text-sm font-medium text-slate-400 mb-2">Username</label>
                        <input
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            className="w-full bg-slate-900/50 border border-slate-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors placeholder-slate-600"
                            placeholder="Enter username"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-slate-400 mb-2">Password</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full bg-slate-900/50 border border-slate-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors placeholder-slate-600"
                            placeholder="Enter password"
                        />
                    </div>

                    <button type="submit" className="w-full btn btn-primary py-3 shadow-orange-900/20">
                        {isLogin ? 'Sign In' : 'Register'}
                    </button>
                </form>

                <div className="mt-8 text-center">
                    <p className="text-slate-400 text-sm">
                        {isLogin ? "Don't have an account? " : "Already have an account? "}
                        <button
                            onClick={() => {
                                setIsLogin(!isLogin);
                                setError('');
                            }}
                            className="text-primary hover:text-secondary font-medium transition-colors"
                        >
                            {isLogin ? 'Register here' : 'Login here'}
                        </button>
                    </p>
                </div>

                {isLogin && (
                    <p className="mt-6 text-center text-slate-600 text-xs">
                        Use <span className="text-slate-500">admin</span> / <span className="text-slate-500">password</span>
                    </p>
                )}
            </div>
        </div>
    );
};

export default Login;
