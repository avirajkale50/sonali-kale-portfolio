import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
    useWorkExperience, 
    useCreateWorkExperience, 
    useUpdateWorkExperience, 
    useDeleteWorkExperience, 
    useUploadWorkExperienceImage 
} from '../../hooks/useData';
import Loading from '../../components/common/Loading';
import ErrorMessage from '../../components/common/ErrorMessage';
import type { WorkExperience } from '../../types';
import { resolveMediaUrl } from '../../lib/utils';

const AdminExperience: React.FC = () => {
    const { data: experiences, isLoading, error } = useWorkExperience();
    const createExp = useCreateWorkExperience();
    const updateExp = useUpdateWorkExperience();
    const deleteExp = useDeleteWorkExperience();
    const uploadImage = useUploadWorkExperienceImage();

    const [isEditing, setIsEditing] = useState(false);
    const [currentExp, setCurrentExp] = useState<Partial<WorkExperience>>({
        institute: '',
        position: '',
        period: '',
        description: '',
        image_url: '',
        order: 0,
    });

    const handleEdit = (exp: WorkExperience) => {
        setCurrentExp(exp);
        setIsEditing(true);
    };

    const handleDelete = async (id: string) => {
        if (window.confirm('Are you sure you want to delete this experience record?')) {
            await deleteExp.mutateAsync(id);
        }
    };

    const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            try {
                const result = await uploadImage.mutateAsync(file);
                setCurrentExp({ ...currentExp, image_url: result.url });
            } catch (err) {
                alert('Failed to upload image');
            }
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            if (currentExp._id) {
                await updateExp.mutateAsync({ id: currentExp._id, data: currentExp });
            } else {
                await createExp.mutateAsync(currentExp as Omit<WorkExperience, '_id'>);
            }
            setIsEditing(false);
            setCurrentExp({ institute: '', position: '', period: '', description: '', image_url: '', order: 0 });
        } catch (err) {
            alert('Failed to save experience');
        }
    };

    if (isLoading) return <Loading />;
    if (error) return <ErrorMessage message="Failed to load work experience" />;

    return (
        <div className="max-w-5xl mx-auto px-4 py-10">
            <Link to="/admin/dashboard" className="inline-flex items-center gap-2 text-ink-500 hover:text-accent-600 mb-8 font-bold text-sm transition-colors group">
                <svg className="w-4 h-4 group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" /></svg>
                Back to Dashboard
            </Link>

            <div className="bg-white rounded-2xl border border-ink-100 p-8 mb-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 animate-up">
                <div>
                    <div className="section-badge mb-3">Teaching History</div>
                    <h1 className="text-3xl font-extrabold text-ink-900 mb-2">Work Experience</h1>
                    <p className="text-ink-500 font-medium text-sm">Manage your institutional roles and achievements.</p>
                </div>
                <button
                    onClick={() => {
                        setCurrentExp({ institute: '', position: '', period: '', description: '', image_url: '', order: experiences?.length || 0 });
                        setIsEditing(true);
                    }}
                    className="btn-cta whitespace-nowrap"
                >
                    Add Experience
                </button>
            </div>

            {isEditing && (
                <div className="fixed inset-0 backdrop-blur-md bg-slate-900/20 flex items-center justify-center p-4 z-50 overflow-y-auto">
                    <div className="bg-white rounded-2xl border-2 border-ink-200 w-full max-w-2xl p-8 my-8 max-h-[90vh] overflow-y-auto animate-up">
                        <h2 className="text-xl font-bold mb-6">
                            {currentExp._id ? 'Edit Experience' : 'Add New Experience'}
                        </h2>
                        <form onSubmit={handleSubmit} className="space-y-5">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                <div className="md:col-span-2">
                                    <label className="block text-sm font-bold text-ink-700 mb-1.5">Institute Image</label>
                                    <div className="flex items-center gap-6">
                                        <div className="w-24 h-24 bg-ink-50 rounded-xl overflow-hidden border border-ink-100 flex-shrink-0 flex items-center justify-center">
                                            {currentExp.image_url ? (
                                                <img src={resolveMediaUrl(currentExp.image_url)} alt="Preview" className="w-full h-full object-contain" />
                                            ) : (
                                                <div className="text-2xl">🏫</div>
                                            )}
                                        </div>
                                        <div className="flex-grow">
                                            <input type="file" onChange={handleImageUpload} className="hidden" id="exp-image" />
                                            <label htmlFor="exp-image" className="btn-ghost !py-2.5 cursor-pointer inline-flex">
                                                {uploadImage.isPending ? 'Uploading...' : 'Choose Institute Logo'}
                                            </label>
                                        </div>
                                    </div>
                                </div>
                                <div className="md:col-span-2">
                                    <label className="block text-sm font-bold text-ink-700 mb-1.5">Institute Name</label>
                                    <input
                                        type="text"
                                        value={currentExp.institute}
                                        onChange={(e) => setCurrentExp({ ...currentExp, institute: e.target.value })}
                                        required
                                        className="w-full px-4 py-3 border border-ink-200 rounded-xl focus:ring-2 focus:ring-accent-500 outline-none transition-all"
                                        placeholder="e.g. Stanford University"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-bold text-ink-700 mb-1.5">Position</label>
                                    <input
                                        type="text"
                                        value={currentExp.position}
                                        onChange={(e) => setCurrentExp({ ...currentExp, position: e.target.value })}
                                        required
                                        className="w-full px-4 py-3 border border-ink-200 rounded-xl focus:ring-2 focus:ring-accent-500 outline-none transition-all"
                                        placeholder="e.g. Senior Lecturer"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-bold text-ink-700 mb-1.5">Period</label>
                                    <input
                                        type="text"
                                        value={currentExp.period}
                                        onChange={(e) => setCurrentExp({ ...currentExp, period: e.target.value })}
                                        required
                                        className="w-full px-4 py-3 border border-ink-200 rounded-xl focus:ring-2 focus:ring-accent-500 outline-none transition-all"
                                        placeholder="e.g. 2018 - Present"
                                    />
                                </div>
                                <div className="md:col-span-2">
                                    <label className="block text-sm font-bold text-ink-700 mb-1.5">Description</label>
                                    <textarea
                                        value={currentExp.description}
                                        onChange={(e) => setCurrentExp({ ...currentExp, description: e.target.value })}
                                        required
                                        rows={4}
                                        className="w-full px-4 py-3 border border-ink-200 rounded-xl focus:ring-2 focus:ring-accent-500 outline-none transition-all"
                                        placeholder="Briefly describe your responsibilities and achievements..."
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-bold text-ink-700 mb-1.5">Display Order</label>
                                    <input
                                        type="number"
                                        value={currentExp.order}
                                        onChange={(e) => setCurrentExp({ ...currentExp, order: parseInt(e.target.value) })}
                                        className="w-full px-4 py-3 border border-ink-200 rounded-xl focus:ring-2 focus:ring-accent-500 outline-none transition-all"
                                    />
                                </div>
                            </div>
                            <div className="flex justify-end gap-3 pt-6 border-t border-ink-100">
                                <button type="button" onClick={() => setIsEditing(false)} className="px-6 py-3 text-ink-500 font-bold hover:text-ink-800 transition-colors">
                                    Cancel
                                </button>
                                <button type="submit" className="px-10 py-3 bg-slate-900 text-white font-bold rounded-xl hover:bg-slate-800 transition-all">
                                    {currentExp._id ? 'UPDATE' : 'SAVE EXPERIENCE'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            <div className="grid grid-cols-1 gap-5">
                {(experiences || []).sort((a,b) => (a.order || 0) - (b.order || 0)).map((exp, i) => (
                    <div key={exp._id} className="card group flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 animate-up" style={{ animationDelay: `${i * 50}ms` }}>
                        <div className="flex items-center gap-6">
                            <div className="w-16 h-16 bg-ink-50 rounded-xl overflow-hidden border border-ink-100 flex-shrink-0 flex items-center justify-center">
                                {exp.image_url ? (
                                    <img src={resolveMediaUrl(exp.image_url)} alt="" className="w-full h-full object-contain" />
                                ) : (
                                    <div className="text-xl">🏫</div>
                                )}
                            </div>
                            <div>
                                <h3 className="text-lg font-bold text-ink-900">{exp.institute}</h3>
                                <p className="text-sm text-accent-600 font-bold uppercase tracking-wider">{exp.position}</p>
                                <p className="text-xs text-ink-400 font-medium">{exp.period}</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-2 w-full sm:w-auto mt-2 sm:mt-0 pt-4 sm:pt-0 border-t sm:border-0 border-ink-50">
                            <button onClick={() => handleEdit(exp)} className="flex-1 sm:flex-none p-3 text-blue-600 hover:bg-blue-50 rounded-xl transition-colors">
                                <svg className="w-5 h-5 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg>
                            </button>
                            <button onClick={() => exp._id && handleDelete(exp._id)} className="flex-1 sm:flex-none p-3 text-red-600 hover:bg-red-50 rounded-xl transition-colors">
                                <svg className="w-5 h-5 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                            </button>
                        </div>
                    </div>
                ))}
                {experiences?.length === 0 && (
                    <div className="text-center bg-white rounded-2xl border-2 border-dashed border-ink-100 py-16 animate-up">
                        <p className="text-ink-400 font-medium italic">No experience records added yet.</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default AdminExperience;
