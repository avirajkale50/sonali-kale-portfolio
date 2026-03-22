import React, { useState } from 'react';
import { usePublications } from '../hooks/useData';
import Loading from '../components/common/Loading';
import ErrorMessage from '../components/common/ErrorMessage';

const PublicationsPage: React.FC = () => {
    const { data: publications, isLoading, error, refetch } = usePublications();
    const [search, setSearch] = useState('');
    const [openId, setOpenId] = useState<string | null>(null);

    if (isLoading) return <Loading />;
    if (error) return <ErrorMessage onRetry={() => refetch()} />;

    const sorted = [...(publications || [])].sort((a, b) => b.year - a.year);
    const filtered = sorted.filter(p =>
        p.title.toLowerCase().includes(search.toLowerCase()) ||
        p.authors.some(a => a.toLowerCase().includes(search.toLowerCase())) ||
        p.journal.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div className="min-h-screen bg-white pt-28 pb-20 px-5 sm:px-8">
            <div className="max-w-4xl mx-auto">
                {/* Header */}
                <div className="mb-10">
                    <p className="section-badge">Scholarly Work</p>
                    <h1 className="text-4xl font-extrabold text-ink-900 mb-5">Publications</h1>
                    {/* Search */}
                    <div className="relative">
                        <svg className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-ink-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                        <input
                            type="text"
                            placeholder="Search by title, author, or journal…"
                            value={search}
                            onChange={e => setSearch(e.target.value)}
                            className="w-full pl-12 pr-4 py-3.5 border-2 border-ink-100 rounded-2xl bg-ink-50 focus:bg-white focus:border-accent-400 focus:ring-0 font-medium outline-none transition-all"
                        />
                    </div>
                </div>

                {filtered.length === 0 ? (
                    <div className="text-center py-20 card">
                        <p className="font-bold text-ink-500">{search ? `No results for "${search}"` : 'No publications yet.'}</p>
                    </div>
                ) : (
                    <div className="space-y-5">
                        {filtered.map((pub, i) => (
                            <div key={pub._id} className="card p-7 group animate-up" style={{ animationDelay: `${i * 60}ms` }}>
                                {/* Year + journal */}
                                <div className="flex flex-wrap gap-2 items-center mb-3">
                                    <span className="px-3 py-1 bg-ink-900 text-white text-xs font-black rounded-lg">{pub.year}</span>
                                    <span className="text-ink-400 font-semibold text-sm italic">{pub.journal}</span>
                                </div>

                                {/* Title */}
                                <h2 className="text-xl font-bold text-ink-900 mb-2 group-hover:text-accent-600 transition-colors leading-snug">
                                    {pub.title}
                                </h2>

                                {/* Authors */}
                                <p className="text-ink-500 text-sm mb-5">{pub.authors.join(', ')}</p>

                                {/* Actions */}
                                <div className="flex flex-wrap gap-3 items-center">
                                    {pub.pdf_url && (
                                        <a href={pub.pdf_url} target="_blank" rel="noopener noreferrer" className="btn-cta !px-4 !py-2 text-sm">
                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" /></svg>
                                            PDF
                                        </a>
                                    )}
                                    {pub.doi && (
                                        <a href={`https://doi.org/${pub.doi}`} target="_blank" rel="noopener noreferrer" className="btn-ghost !px-4 !py-2 text-sm border border-ink-200">
                                            DOI Link
                                        </a>
                                    )}
                                    {pub.abstract && (
                                        <button
                                            onClick={() => setOpenId(openId === (pub._id as string) ? null : (pub._id as string))}
                                            className="text-accent-600 text-sm font-bold hover:text-accent-700 flex items-center gap-1"
                                        >
                                            Abstract
                                            <svg className={`w-4 h-4 transition-transform ${openId === pub._id ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
                                        </button>
                                    )}
                                </div>

                                {/* Abstract expandable */}
                                {openId === pub._id && pub.abstract && (
                                    <div className="mt-5 pt-5 border-t border-ink-100 text-ink-600 leading-relaxed text-sm animate-up">
                                        {pub.abstract}
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default PublicationsPage;
