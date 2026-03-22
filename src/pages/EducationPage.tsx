import React from 'react';
import { useEducation } from '../hooks/useData';
import Loading from '../components/common/Loading';
import ErrorMessage from '../components/common/ErrorMessage';

const EducationPage: React.FC = () => {
    const { data: education, isLoading, error, refetch } = useEducation();

    if (isLoading) return <Loading />;
    if (error) return <ErrorMessage onRetry={() => refetch()} />;

    const sortedEducation = [...(education || [])].sort((a, b) => (b.order || 0) - (a.order || 0));

    return (
        <div className="min-h-screen bg-white pt-28 pb-20 px-5 sm:px-8">
            <div className="max-w-4xl mx-auto">
                <div className="mb-16">
                    <p className="section-badge mb-3">Academic Background</p>
                    <h1 className="text-4xl font-extrabold text-ink-900 mb-4">Education</h1>
                    <p className="text-ink-500 text-lg">My educational journey and academic focus.</p>
                </div>

                <div className="space-y-12">
                    {sortedEducation.map((edu, i) => (
                        <div key={edu._id} className="relative pl-8 sm:pl-12 group animate-up" style={{ animationDelay: `${i * 100}ms` }}>
                            {/* Timeline line */}
                            {i < sortedEducation.length - 1 && (
                                <div className="absolute left-3 sm:left-4 top-8 bottom-[-40px] w-0.5 bg-ink-100 group-hover:bg-accent-200 transition-colors" />
                            )}
                            
                            {/* Marker */}
                            <div className="absolute left-0 top-1 w-6 sm:w-8 h-6 sm:h-8 rounded-full bg-white border-2 border-accent-500 flex items-center justify-center z-10 group-hover:scale-110 transition-transform">
                                <span className="w-2 h-2 rounded-full bg-accent-500" />
                            </div>

                            <div className="card p-7 group-hover:border-accent-400 group-hover:shadow-md transition-all">
                                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2 mb-4">
                                    <div>
                                        <h2 className="text-2xl font-extrabold text-ink-900">{edu.degree}</h2>
                                        <p className="text-accent-600 font-bold text-lg leading-tight mt-1">{edu.institution}</p>
                                    </div>
                                    <div className="inline-flex px-3 py-1 bg-ink-900 text-white text-xs font-black rounded-lg sm:mt-1">
                                        {edu.year}
                                    </div>
                                </div>
                                
                                {edu.description && (
                                    <div className="text-ink-500 leading-relaxed font-medium whitespace-pre-line">
                                        {edu.description}
                                    </div>
                                )}
                            </div>
                        </div>
                    ))}
                    
                    {education?.length === 0 && (
                        <div className="text-center py-24 card border-dashed">
                            <p className="font-bold text-ink-400 italic">Education details are currently being updated.</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default EducationPage;
