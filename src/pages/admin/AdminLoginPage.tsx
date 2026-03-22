import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

const AdminLoginPage: React.FC = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setIsLoading(true);

        try {
            await login(email, password);
            navigate('/admin/dashboard');
        } catch (err) {
            setError('Invalid email or password');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-ink-50 flex items-center justify-center px-4">
            <div className="max-w-md w-full animate-up">
                <div className="bg-white rounded-3xl border-2 border-ink-100 p-10">
                    <div className="text-center mb-10">
                        <div className="section-badge mb-3">Secure Access</div>
                        <h1 className="text-3xl font-extrabold text-ink-900 mb-2">Admin Login</h1>
                        <p className="text-ink-500 font-medium text-sm">Sign in to manage your professional digital portfolio.</p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        {error && (
                            <div className="bg-red-50 border-2 border-red-100 text-red-700 px-4 py-3 rounded-xl font-bold text-sm animate-in">
                                {error}
                            </div>
                        )}

                        <div>
                            <label htmlFor="email" className="block text-xs font-black uppercase tracking-widest text-ink-500 mb-2 pl-1">
                                Email Address
                            </label>
                            <input
                                id="email"
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                className="w-full px-5 py-3.5 border-2 border-ink-100 rounded-2xl bg-ink-50 focus:bg-white focus:border-accent-400 outline-none transition-all font-medium text-ink-800"
                                placeholder="name@domain.com"
                            />
                        </div>

                        <div>
                            <label htmlFor="password" className="block text-xs font-black uppercase tracking-widest text-ink-500 mb-2 pl-1">
                                Password
                            </label>
                            <input
                                id="password"
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                className="w-full px-5 py-3.5 border-2 border-ink-100 rounded-2xl bg-ink-50 focus:bg-white focus:border-accent-400 outline-none transition-all font-medium text-ink-800"
                                placeholder="••••••••"
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={isLoading}
                            className="btn-cta w-full justify-center !py-4"
                        >
                            {isLoading ? (
                                <svg className="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/>
                                </svg>
                            ) : 'Sign In to Dashboard'}
                        </button>
                    </form>

                    <div className="mt-8 text-center">
                        <a href="/" className="text-ink-400 hover:text-accent-600 text-sm font-bold transition-colors">
                            ← Back to Portfolio
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminLoginPage;
