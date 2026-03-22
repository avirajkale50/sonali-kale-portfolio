import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useMaterials, useCreateMaterial, useUpdateMaterial, useDeleteMaterial } from '../../hooks/useData';
import Loading from '../../components/common/Loading';
import ErrorMessage from '../../components/common/ErrorMessage';
import type { Material } from '../../types';

const AdminStudentNotes: React.FC = () => {
    const { data: materials, isLoading, error } = useMaterials();
    const createMaterial = useCreateMaterial();
    const updateMaterial = useUpdateMaterial();
    const deleteMaterial = useDeleteMaterial();

    const [isEditing, setIsEditing] = useState(false);
    const [currentMaterial, setCurrentMaterial] = useState<Partial<Material>>({
        title: '',
        description: '',
        category: '',
        file_url: '',
        file_type: '',
        order: 0,
    });

    const categories = ['Lecture Notes', 'Problem Sets', 'Unit Summaries', 'Assignments', 'External Resource'];

    const handleEdit = (material: Material) => {
        setCurrentMaterial(material);
        setIsEditing(true);
    };

    const handleDelete = async (id: string) => {
        if (window.confirm('Are you sure you want to delete this note?')) {
            await deleteMaterial.mutateAsync(id);
        }
    };

    // File upload logic removed in favor of external links

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            if (currentMaterial._id) {
                await updateMaterial.mutateAsync({ id: currentMaterial._id, data: currentMaterial });
            } else {
                await createMaterial.mutateAsync(currentMaterial as Omit<Material, '_id' | 'upload_date'>);
            }
            setIsEditing(false);
            setCurrentMaterial({ title: '', description: '', category: '', file_url: '', file_type: '', order: 0 });
        } catch (err) {
            alert('Failed to save note');
        }
    };

    if (isLoading) return <Loading />;
    if (error) return <ErrorMessage message="Failed to load student notes" />;

    return (
        <div className="max-w-5xl mx-auto px-4 py-10">
            <Link to="/admin/dashboard" className="inline-flex items-center gap-2 text-ink-500 hover:text-accent-600 mb-8 font-bold text-sm transition-colors group">
                <svg className="w-4 h-4 group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" /></svg>
                Back to Dashboard
            </Link>

            {/* Header Card */}
            <div className="bg-white rounded-2xl border border-ink-100 p-8 mb-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 animate-up">
                <div>
                    <div className="section-badge mb-3">Resources</div>
                    <h1 className="text-3xl font-extrabold text-ink-900 mb-2">Manage Student Notes</h1>
                    <p className="text-ink-500 font-medium text-sm">Upload and organize your course materials and notes for students.</p>
                </div>
                <button
                    onClick={() => {
                        setCurrentMaterial({ title: '', description: '', category: '', file_url: '', file_type: '', order: 0 });
                        setIsEditing(true);
                    }}
                    className="btn-cta whitespace-nowrap"
                >
                    Add New Note
                </button>
            </div>

            {isEditing && (
                <div className="fixed inset-0 backdrop-blur-md bg-slate-900/20 flex items-center justify-center p-4 z-50 overflow-y-auto">
                    <div className="bg-white rounded-2xl border-2 border-ink-200 w-full max-w-2xl p-8 my-8 max-h-[90vh] overflow-y-auto animate-up">
                        <h2 className="text-xl font-bold mb-4">
                            {currentMaterial._id ? 'Edit Note' : 'Add Note'}
                        </h2>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Resource Link (Google Drive, Dropbox, etc.)</label>
                                <input
                                    type="url"
                                    value={currentMaterial.file_url}
                                    onChange={(e) => setCurrentMaterial({ ...currentMaterial, file_url: e.target.value })}
                                    required
                                    placeholder="https://drive.google.com/..."
                                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500 outline-none mt-1"
                                />
                                <p className="text-[10px] text-ink-400 mt-1 italic">Make sure the link is shared as "Anyone with the link can view".</p>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Link Type (e.g., Drive, PDF, Web)</label>
                                <input
                                    type="text"
                                    value={currentMaterial.file_type}
                                    onChange={(e) => setCurrentMaterial({ ...currentMaterial, file_type: e.target.value })}
                                    required
                                    placeholder="Drive"
                                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500 outline-none mt-1"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Title</label>
                                <input
                                    type="text"
                                    value={currentMaterial.title}
                                    onChange={(e) => setCurrentMaterial({ ...currentMaterial, title: e.target.value })}
                                    required
                                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500 outline-none"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Category</label>
                                <select
                                    value={currentMaterial.category}
                                    onChange={(e) => setCurrentMaterial({ ...currentMaterial, category: e.target.value })}
                                    required
                                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500 outline-none"
                                >
                                    <option value="">Select Category</option>
                                    {categories.map(c => <option key={c} value={c}>{c}</option>)}
                                    {!categories.includes(currentMaterial.category || '') && currentMaterial.category && (
                                        <option value={currentMaterial.category}>{currentMaterial.category}</option>
                                    )}
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Description</label>
                                <textarea
                                    value={currentMaterial.description}
                                    onChange={(e) => setCurrentMaterial({ ...currentMaterial, description: e.target.value })}
                                    rows={3}
                                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500 outline-none"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Display Order</label>
                                <input
                                    type="number"
                                    value={currentMaterial.order}
                                    onChange={(e) => setCurrentMaterial({ ...currentMaterial, order: parseInt(e.target.value) })}
                                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500 outline-none"
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
                                    disabled={!currentMaterial.file_url}
                                    className="px-8 py-3 bg-slate-900 text-white font-bold rounded-lg hover:bg-slate-800 transition-all disabled:bg-gray-400"
                                >
                                    {currentMaterial._id ? 'UPDATE NOTE' : 'CREATE NOTE'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            <div className="grid grid-cols-1 gap-5">
                {materials?.map((mat, i) => (
                    <div 
                        key={mat._id} 
                        className="card group flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 animate-up"
                        style={{ animationDelay: `${i * 50}ms` }}
                    >
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 rounded-xl bg-accent-50 flex items-center justify-center text-xl group-hover:bg-accent-500 group-hover:text-white transition-colors duration-300">
                                📁
                            </div>
                            <div>
                                <h3 className="text-lg font-bold text-ink-900 mb-0.5">{mat.title}</h3>
                                <div className="flex items-center gap-3">
                                    <span className="pill-badge bg-accent-50 text-accent-700 !text-[10px]">{mat.category}</span>
                                    <span className="text-xs text-ink-400 font-medium">
                                        {new Date(mat.upload_date).toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' })}
                                    </span>
                                </div>
                            </div>
                        </div>
                        <div className="flex items-center gap-2 w-full sm:w-auto mt-2 sm:mt-0 pt-4 sm:pt-0 border-t sm:border-0 border-ink-50">
                            <button
                                onClick={() => handleEdit(mat)}
                                className="flex-1 sm:flex-none p-2.5 text-blue-600 hover:bg-blue-50 rounded-xl transition-colors"
                                title="Edit"
                            >
                                <svg className="w-5 h-5 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                </svg>
                            </button>
                            <button
                                onClick={() => mat._id && handleDelete(mat._id)}
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
            </div>
            {materials?.length === 0 && (
                <div className="text-center bg-white rounded-2xl border-2 border-dashed border-ink-100 py-16 animate-up">
                    <p className="text-ink-400 font-medium italic">No student notes uploaded yet.</p>
                </div>
            )}
        </div>
    );
};

export default AdminStudentNotes;
