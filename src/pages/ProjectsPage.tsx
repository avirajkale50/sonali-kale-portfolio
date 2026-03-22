import React from 'react';
import { useProjects } from '../hooks/useData';
import Loading from '../components/common/Loading';
import ErrorMessage from '../components/common/ErrorMessage';
import { resolveMediaUrl } from '../lib/utils';

const ProjectsPage: React.FC = () => {
    const { data: projects, isLoading, error, refetch } = useProjects();

    if (isLoading) return <Loading />;
    if (error) return <ErrorMessage onRetry={() => refetch()} />;

    const sorted = projects?.sort((a, b) => b.order - a.order) || [];

    return (
        <div className="min-h-screen bg-white pt-28 pb-20 px-5 sm:px-8">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="mb-16">
                    <p className="section-badge">Research & Innovation</p>
                    <h1 className="text-4xl font-extrabold text-ink-900 mb-5">
                        My Projects
                    </h1>
                    <p className="text-lg text-ink-500 max-w-2xl">
                        Explorations in quantum physics, theoretical models and experimental verification.
                    </p>
                </div>

                {sorted.length === 0 ? (
                    <div className="text-center py-24 card">
                        <div className="text-5xl mb-4">🔬</div>
                        <p className="font-bold text-ink-500">No projects added yet.</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {sorted.map((project, i) => (
                            <div key={project._id} className="card overflow-hidden group animate-up" style={{ animationDelay: `${i * 80}ms` }}>
                                {/* Image / placeholder */}
                                <div className="relative h-52 overflow-hidden">
                                    {project.image_url ? (
                                        <img
                                            src={resolveMediaUrl(project.image_url)}
                                            alt={project.title}
                                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                        />
                                    ) : (
                                        <div className="w-full h-full bg-gradient-to-br from-accent-100 to-accent-300 flex items-center justify-center">
                                            <svg className="w-14 h-14 text-accent-600/40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                            </svg>
                                        </div>
                                    )}
                                    {/* Status badge */}
                                    <span className={`absolute top-3 right-3 px-3 py-1 rounded-full text-[11px] font-black uppercase tracking-widest ${project.status === 'ongoing' ? 'bg-accent-500 text-white' : 'bg-ink-900 text-white'}`}>
                                        {project.status === 'ongoing' ? 'Ongoing' : 'Completed'}
                                    </span>
                                </div>

                                <div className="p-6">
                                    <p className="text-xs text-ink-400 font-bold uppercase tracking-widest mb-2">
                                        {new Date(project.start_date).getFullYear()}{project.end_date ? ` — ${new Date(project.end_date).getFullYear()}` : ''}
                                    </p>
                                    <h2 className="text-xl font-bold text-ink-900 mb-3 group-hover:text-accent-600 transition-colors leading-snug">
                                        {project.title}
                                    </h2>
                                    <p className="text-ink-500 text-sm leading-relaxed line-clamp-3 mb-5">
                                        {project.description}
                                    </p>
                                    {project.collaborators.length > 0 && (
                                        <div className="flex items-center gap-2 pt-4 border-t border-ink-100">
                                            <div className="flex -space-x-2">
                                                {project.collaborators.slice(0, 3).map((name, j) => (
                                                    <div key={j} title={name} className="w-7 h-7 rounded-full bg-accent-100 border-2 border-white flex items-center justify-center text-[10px] font-black text-accent-700">
                                                        {name.charAt(0)}
                                                    </div>
                                                ))}
                                            </div>
                                            <span className="text-xs font-semibold text-ink-400">Collaborators</span>
                                        </div>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default ProjectsPage;
