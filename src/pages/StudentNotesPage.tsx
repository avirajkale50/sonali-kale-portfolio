import React, { useState } from 'react';
import { useMaterials, useMaterialCategories } from '../hooks/useData';
import Loading from '../components/common/Loading';
import ErrorMessage from '../components/common/ErrorMessage';

const StudentNotesPage: React.FC = () => {
    const [cat, setCat] = useState('');
    const { data: cats } = useMaterialCategories();
    const { data: mats, isLoading, error, refetch } = useMaterials(cat || undefined);

    if (isLoading) return <Loading />;
    if (error) return <ErrorMessage onRetry={() => refetch()} />;

    const sorted = [...(mats || [])].sort((a, b) => b.order - a.order);

    const fileTypeIcon = (type: string) => {
        const t = (type || '').toLowerCase();
        if (t.includes('drive')) return '☁️';
        if (t === 'pdf') return '📄';
        if (t.includes('ppt')) return '📊';
        if (t.includes('doc')) return '📝';
        return '🔗';
    };

    return (
        <div className="min-h-screen bg-white pt-28 pb-20 px-5 sm:px-8">
            <div className="max-w-6xl mx-auto">
                {/* Header */}
                <div className="mb-10">
                    <p className="section-badge">Learning Resources</p>
                    <h1 className="text-4xl font-extrabold text-ink-900 mb-8">Student Notes</h1>

                    {/* Category pills */}
                    {cats && cats.length > 0 && (
                        <div className="flex flex-wrap gap-2">
                            <button
                                onClick={() => setCat('')}
                                className={`px-5 py-2.5 rounded-xl text-sm font-bold transition-all ${cat === '' ? 'bg-ink-900 text-white' : 'bg-ink-100 text-ink-600 hover:bg-ink-200'}`}
                            >
                                All
                            </button>
                            {cats.map(c => (
                                <button
                                    key={c}
                                    onClick={() => setCat(c)}
                                    className={`px-5 py-2.5 rounded-xl text-sm font-bold transition-all ${cat === c ? 'bg-accent-500 text-white' : 'bg-ink-100 text-ink-600 hover:bg-ink-200'}`}
                                >
                                    {c}
                                </button>
                            ))}
                        </div>
                    )}
                </div>

                {sorted.length === 0 ? (
                    <div className="text-center py-24 card">
                        <div className="text-5xl mb-4">📚</div>
                        <p className="font-bold text-ink-500">{cat ? `No notes in "${cat}"` : 'No student notes available yet.'}</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {sorted.map((m, i) => (
                            <div key={m._id} className="card p-6 group flex flex-col animate-up" style={{ animationDelay: `${i * 60}ms` }}>
                                {/* Icon + type */}
                                <div className="flex items-start justify-between mb-5">
                                    <div className="w-14 h-14 rounded-2xl bg-accent-50 group-hover:bg-accent-500 flex items-center justify-center text-2xl transition-colors">
                                        {fileTypeIcon(m.file_type)}
                                    </div>
                                    <span className="text-[10px] font-black bg-ink-100 text-ink-500 px-2.5 py-1 rounded-lg uppercase tracking-widest">
                                        {m.file_type}
                                    </span>
                                </div>

                                <h3 className="text-lg font-bold text-ink-900 mb-1 group-hover:text-accent-600 transition-colors">
                                    {m.title}
                                </h3>
                                <p className="text-accent-600 text-xs font-bold uppercase tracking-widest mb-3">{m.category}</p>
                                <p className="text-ink-500 text-sm leading-relaxed flex-grow mb-6">{m.description}</p>

                                <div className="pt-4 border-t border-ink-100 space-y-3">
                                    <p className="text-xs text-ink-400 font-semibold">
                                        Added {new Date(m.upload_date).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}
                                    </p>
                                    <a
                                        href={m.file_url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="btn-cta w-full justify-center !py-3"
                                    >
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg>
                                        Open Note
                                    </a>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default StudentNotesPage;
