import React from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { Link } from 'react-router-dom';

const sections = [
    { title: 'Profile', path: '/admin/profile', icon: '👤', description: 'Update your profile information and upload a photo' },
    { title: 'Education', path: '/admin/education', icon: '🎓', description: 'Manage academic background and degrees' },
    { title: 'Publications', path: '/admin/publications', icon: '📚', description: 'Add and edit research publications' },
    { title: 'Projects', path: '/admin/projects', icon: '🔬', description: 'Manage ongoing and completed projects' },
    { title: 'Student Notes', path: '/admin/student-notes', icon: '📁', description: 'Upload and manage notes for your students' },
    { title: 'Certificates', path: '/admin/certificates', icon: '📜', description: 'Manage professional certifications' },
    { title: 'Gallery', path: '/admin/gallery', icon: '📸', description: 'Upload and manage social feed photos' },
    { title: 'Experience', path: '/admin/experience', icon: '🏫', description: 'Manage your teaching history and institutional roles' },
];

const AdminDashboard: React.FC = () => {
    const { logout } = useAuth();

    return (
        <div className="min-h-screen bg-ink-50 py-10 px-4">
            <div className="max-w-6xl mx-auto">
                {/* Header */}
                <div className="bg-white rounded-2xl border border-ink-100 p-8 mb-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                    <div>
                        <h1 className="text-3xl font-extrabold text-ink-900 mb-1">Admin Dashboard</h1>
                        <p className="text-ink-500 font-medium">Manage your academic portfolio content.</p>
                    </div>
                    <div className="flex items-center gap-3">
                        <Link to="/" className="btn-ghost border border-ink-200 !py-2.5 text-sm">
                            View Site
                        </Link>
                        <button onClick={logout} className="px-5 py-2.5 bg-red-500 hover:bg-red-600 text-white font-bold rounded-xl text-sm transition-colors">
                            Logout
                        </button>
                    </div>
                </div>

                {/* Section cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                    {sections.map((s, i) => (
                        <Link
                            key={s.path}
                            to={s.path}
                            className="bg-white rounded-2xl border-2 border-ink-100 hover:border-accent-400 p-7 flex flex-col gap-4 group transition-all duration-200 animate-up"
                            style={{ animationDelay: `${i * 80}ms` }}
                        >
                            <div className="w-14 h-14 rounded-2xl bg-accent-50 group-hover:bg-accent-500 flex items-center justify-center text-2xl transition-colors duration-200">
                                {s.icon}
                            </div>
                            <div>
                                <h2 className="text-xl font-extrabold text-ink-900 group-hover:text-accent-600 transition-colors mb-1">{s.title}</h2>
                                <p className="text-ink-500 text-sm leading-relaxed">{s.description}</p>
                            </div>
                            <div className="flex items-center gap-1 text-accent-600 text-sm font-bold mt-auto">
                                Manage
                                <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" /></svg>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;
