import React from 'react';
import { useWorkExperience } from '../hooks/useData';
import Loading from '../components/common/Loading';
import ErrorMessage from '../components/common/ErrorMessage';
import { resolveMediaUrl } from '../lib/utils';

const ExperiencePage: React.FC = () => {
    const { data: experiences, isLoading, error, refetch } = useWorkExperience();

    if (isLoading) return <Loading />;
    if (error) return <ErrorMessage onRetry={() => refetch()} />;

    return (
        <div className="min-h-screen bg-slate-50 pt-28 pb-20 px-5 sm:px-8">
            <div className="max-w-4xl mx-auto text-center mb-16">
                <p className="section-badge mx-auto">Career Path</p>
                <h1 className="text-4xl font-extrabold text-ink-900 mb-4">Work Experience</h1>
                <p className="text-ink-500 max-w-2xl mx-auto">
                    My professional journey across various educational institutions.
                </p>
            </div>

            <div className="max-w-4xl mx-auto">
                {!experiences || experiences.length === 0 ? (
                    <div className="text-center py-24 bg-white rounded-3xl border-2 border-dashed border-ink-100">
                        <div className="text-5xl mb-4">🏫</div>
                        <p className="font-bold text-ink-500 text-lg">Work history coming soon.</p>
                    </div>
                ) : (
                    <div className="relative space-y-12 before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-slate-300 before:to-transparent">
                        {experiences.sort((a,b) => (a.order || 0) - (b.order || 0)).map((exp, i) => (
                            <div key={exp._id} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group animate-up" style={{ animationDelay: `${i * 100}ms` }}>
                                {/* Icon/Dot */}
                                <div className="flex items-center justify-center w-10 h-10 rounded-full border border-white bg-slate-400 group-hover:bg-accent-500 text-white shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 transition-colors duration-500">
                                    <svg className="fill-current w-5 h-5" viewBox="0 0 16 16">
                                        <path d="M8 0a8 8 0 1 0 8 8A8.009 8.009 0 0 0 8 0zm0 12a4 4 0 1 1 0-8 4 4 0 0 1 0 8z" />
                                    </svg>
                                </div>
                                {/* Content Card */}
                                <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] bg-white p-6 rounded-2xl shadow-sm border border-slate-100 hover:shadow-xl hover:border-accent-200 transition-all duration-500 group">
                                    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mb-4">
                                        <div className="w-12 h-12 bg-slate-50 rounded-xl overflow-hidden flex-shrink-0 flex items-center justify-center border border-slate-100">
                                            {exp.image_url ? (
                                                <img src={resolveMediaUrl(exp.image_url)} alt="" className="w-full h-full object-contain" />
                                            ) : (
                                                <span className="text-xl">🏫</span>
                                            )}
                                        </div>
                                        <div>
                                            <time className="font-black text-accent-600 text-xs uppercase tracking-widest">{exp.period}</time>
                                            <h3 className="font-bold text-ink-900 group-hover:text-accent-600 transition-colors">{exp.position}</h3>
                                            <p className="text-ink-500 text-sm font-bold">{exp.institute}</p>
                                        </div>
                                    </div>
                                    <div className="text-slate-600 text-sm leading-relaxed whitespace-pre-line">
                                        {exp.description}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default ExperiencePage;
