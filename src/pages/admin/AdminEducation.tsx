import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useEducation, useCreateEducation, useUpdateEducation, useDeleteEducation } from '../../hooks/useData';
import Loading from '../../components/common/Loading';
import ErrorMessage from '../../components/common/ErrorMessage';
import type { Education } from '../../types';

const AdminEducation: React.FC = () => {
    const { data: education, isLoading, error } = useEducation();
    const createEdu = useCreateEducation();
    const updateEdu = useUpdateEducation();
    const deleteEdu = useDeleteEducation();

    const [isEditing, setIsEditing] = useState(false);
    const [currentEdu, setCurrentEdu] = useState<Partial<Education>>({
        degree: '',
        institution: '',
        year: '',
        description: '',
        order: 0,
    });

    const handleEdit = (edu: Education) => {
        setCurrentEdu(edu);
        setIsEditing(true);
    };

    const handleDelete = async (id: string) => {
        if (window.confirm('Are you sure you want to delete this record?')) {
            await deleteEdu.mutateAsync(id);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            if (currentEdu._id) {
                await updateEdu.mutateAsync({ id: currentEdu._id, data: currentEdu });
            } else {
                await createEdu.mutateAsync(currentEdu as Omit<Education, '_id'>);
            }
            setIsEditing(false);
            setCurrentEdu({ degree: '', institution: '', year: '', description: '', order: 0 });
        } catch (err) {
            alert('Failed to save education record');
        }
    };

    if (isLoading) return <Loading />;
    if (error) return <ErrorMessage message="Failed to load education data" />;

    return (
        <div className="max-w-5xl mx-auto px-4 py-10">
            <Link to="/admin/dashboard" className="inline-flex items-center gap-2 text-ink-500 hover:text-accent-600 mb-8 font-bold text-sm transition-colors group">
                <svg className="w-4 h-4 group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" /></svg>
                Back to Dashboard
            </Link>

            {/* Header Card */}
            <div className="bg-white rounded-2xl border border-ink-100 p-8 mb-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 animate-up">
                <div>
                    <div className="section-badge mb-3">Academic</div>
                    <h1 className="text-3xl font-extrabold text-ink-900 mb-2">Manage Education</h1>
                    <p className="text-ink-500 font-medium text-sm">Update your academic background and degrees.</p>
                </div>
                <button
                    onClick={() => {
                        setCurrentEdu({ degree: '', institution: '', year: '', description: '', order: 0 });
                        setIsEditing(true);
                    }}
                    className="btn-cta whitespace-nowrap"
                >
                    Add New Education
                </button>
            </div>

            {isEditing && (
                <div className="fixed inset-0 backdrop-blur-md bg-slate-900/20 flex items-center justify-center p-4 z-50 overflow-y-auto">
                    <div className="bg-white rounded-2xl border-2 border-ink-200 w-full max-w-2xl p-8 my-8 max-h-[90vh] overflow-y-auto animate-up">
                        <h2 className="text-xl font-bold mb-4">
                            {currentEdu._id ? 'Edit Education' : 'Add Education'}
                        </h2>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Degree</label>
                                <input
                                    type="text"
                                    value={currentEdu.degree}
                                    onChange={(e) => setCurrentEdu({ ...currentEdu, degree: e.target.value })}
                                    required
                                    className="w-full px-4 py-2 border rounded-lg"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Institution</label>
                                <input
                                    type="text"
                                    value={currentEdu.institution}
                                    onChange={(e) => setCurrentEdu({ ...currentEdu, institution: e.target.value })}
                                    required
                                    className="w-full px-4 py-2 border rounded-lg"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Year (e.g., 2018 - 2022)</label>
                                <input
                                    type="text"
                                    value={currentEdu.year}
                                    onChange={(e) => setCurrentEdu({ ...currentEdu, year: e.target.value })}
                                    required
                                    className="w-full px-4 py-2 border rounded-lg"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Description</label>
                                <textarea
                                    value={currentEdu.description}
                                    onChange={(e) => setCurrentEdu({ ...currentEdu, description: e.target.value })}
                                    rows={3}
                                    className="w-full px-4 py-2 border rounded-lg"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Display Order (higher comes first)</label>
                                <input
                                    type="number"
                                    value={currentEdu.order}
                                    onChange={(e) => setCurrentEdu({ ...currentEdu, order: parseInt(e.target.value) })}
                                    className="w-full px-4 py-2 border rounded-lg"
                                />
                            </div>
                            <div className="flex justify-end gap-3 mt-6">
                                <button
                                    type="button"
                                    onClick={() => setIsEditing(false)}
                                    className="px-4 py-2 text-gray-600 hover:text-gray-800"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="btn-cta px-8"
                                >
                                    {currentEdu._id ? 'UPDATE RECORD' : 'CREATE RECORD'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            <div className="grid grid-cols-1 gap-5">
                {education?.map((edu, i) => (
                    <div 
                        key={edu._id} 
                        className="card group flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 animate-up"
                        style={{ animationDelay: `${i * 50}ms` }}
                    >
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 rounded-xl bg-accent-50 flex items-center justify-center text-xl group-hover:bg-accent-500 group-hover:text-white transition-colors duration-300">
                                🎓
                            </div>
                            <div>
                                <h3 className="text-xl font-bold text-ink-900 mb-0.5">{edu.degree}</h3>
                                <div className="flex items-center gap-3">
                                    <span className="text-accent-600 font-bold text-sm tracking-tight">{edu.institution}</span>
                                    <span className="text-xs text-ink-400 font-medium">({edu.year})</span>
                                </div>
                            </div>
                        </div>
                        <div className="flex gap-2 w-full sm:w-auto mt-2 sm:mt-0 pt-4 sm:pt-0 border-t sm:border-0 border-ink-50">
                            <button
                                onClick={() => handleEdit(edu)}
                                className="flex-1 sm:flex-none p-2.5 text-blue-600 hover:bg-blue-50 rounded-xl transition-colors"
                                title="Edit"
                            >
                                <svg className="w-5 h-5 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                </svg>
                            </button>
                            <button
                                onClick={() => edu._id && handleDelete(edu._id)}
                                className="flex-1 sm:flex-none p-2.5 text-red-600 hover:bg-red-50 rounded-xl transition-colors"
                                title="Delete"
                            >
                                <svg className="w-5 h-5 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                </svg>
                            </button>
                        </div>
                    </div>
                ))}
                {education?.length === 0 && (
                    <div className="text-center bg-white rounded-2xl border-2 border-dashed border-ink-100 py-16 animate-up">
                        <p className="text-ink-400 font-medium italic">No education records records yet.</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default AdminEducation;
