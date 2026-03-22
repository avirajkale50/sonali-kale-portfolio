import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useProjects, useCreateProject, useUpdateProject, useDeleteProject } from '../../hooks/useData';
import Loading from '../../components/common/Loading';
import ErrorMessage from '../../components/common/ErrorMessage';
import type { Project } from '../../types';

const AdminProjects: React.FC = () => {
    const { data: projects, isLoading, error } = useProjects();
    const createProject = useCreateProject();
    const updateProject = useUpdateProject();
    const deleteProject = useDeleteProject();

    const [isEditing, setIsEditing] = useState(false);
    const [currentProject, setCurrentProject] = useState<Partial<Project>>({
        title: '',
        description: '',
        start_date: '',
        end_date: '',
        collaborators: [],
        image_url: '',
        status: 'ongoing',
        order: 0,
    });
    const [collaboratorsString, setCollaboratorsString] = useState('');

    const handleEdit = (project: Project) => {
        setCurrentProject(project);
        setCollaboratorsString(project.collaborators.join(', '));
        setIsEditing(true);
    };

    const handleDelete = async (id: string) => {
        if (window.confirm('Are you sure you want to delete this project?')) {
            await deleteProject.mutateAsync(id);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const collaborators = collaboratorsString.split(',').map(s => s.trim()).filter(s => s !== '');
        try {
            if (currentProject._id) {
                await updateProject.mutateAsync({ id: currentProject._id, data: { ...currentProject, collaborators } });
            } else {
                await createProject.mutateAsync({ ...currentProject, collaborators } as Omit<Project, '_id'>);
            }
            setIsEditing(false);
            setCurrentProject({
                title: '',
                description: '',
                start_date: '',
                end_date: '',
                collaborators: [],
                image_url: '',
                status: 'ongoing',
                order: 0,
            });
            setCollaboratorsString('');
        } catch (err) {
            alert('Failed to save project');
        }
    };

    if (isLoading) return <Loading />;
    if (error) return <ErrorMessage message="Failed to load projects" />;

    return (
        <div className="max-w-5xl mx-auto px-4 py-10">
            <Link to="/admin/dashboard" className="inline-flex items-center gap-2 text-ink-500 hover:text-accent-600 mb-8 font-bold text-sm transition-colors group">
                <svg className="w-4 h-4 group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" /></svg>
                Back to Dashboard
            </Link>

            {/* Header Card */}
            <div className="bg-white rounded-2xl border border-ink-100 p-8 mb-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 animate-up">
                <div>
                    <div className="section-badge mb-3">Portfolio</div>
                    <h1 className="text-3xl font-extrabold text-ink-900 mb-2">Manage Projects</h1>
                    <p className="text-ink-500 font-medium text-sm">Showcase your research and development work.</p>
                </div>
                <button
                    onClick={() => {
                        setCurrentProject({
                            title: '',
                            description: '',
                            start_date: '',
                            end_date: '',
                            collaborators: [],
                            image_url: '',
                            status: 'ongoing',
                            order: 0,
                        });
                        setCollaboratorsString('');
                        setIsEditing(true);
                    }}
                    className="btn-cta whitespace-nowrap"
                >
                    Add New Project
                </button>
            </div>

            {isEditing && (
                <div className="fixed inset-0 backdrop-blur-md bg-slate-900/20 flex items-center justify-center p-4 z-50 overflow-y-auto">
                    <div className="bg-white rounded-2xl border-2 border-ink-200 w-full max-w-2xl p-8 my-8 max-h-[90vh] overflow-y-auto animate-up">
                        <h2 className="text-xl font-bold mb-4">
                            {currentProject._id ? 'Edit Project' : 'Add Project'}
                        </h2>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Title</label>
                                <input
                                    type="text"
                                    value={currentProject.title}
                                    onChange={(e) => setCurrentProject({ ...currentProject, title: e.target.value })}
                                    required
                                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500 outline-none"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Description</label>
                                <textarea
                                    value={currentProject.description}
                                    onChange={(e) => setCurrentProject({ ...currentProject, description: e.target.value })}
                                    rows={4}
                                    required
                                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500 outline-none"
                                />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Start Date (e.g., Oct 2023)</label>
                                    <input
                                        type="text"
                                        value={currentProject.start_date}
                                        onChange={(e) => setCurrentProject({ ...currentProject, start_date: e.target.value })}
                                        required
                                        className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500 outline-none"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">End Date (or 'Present')</label>
                                    <input
                                        type="text"
                                        value={currentProject.end_date}
                                        onChange={(e) => setCurrentProject({ ...currentProject, end_date: e.target.value })}
                                        className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500 outline-none"
                                    />
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Collaborators (comma-separated)</label>
                                <input
                                    type="text"
                                    value={collaboratorsString}
                                    onChange={(e) => setCollaboratorsString(e.target.value)}
                                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500 outline-none"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Status</label>
                                <select
                                    value={currentProject.status}
                                    onChange={(e) => setCurrentProject({ ...currentProject, status: e.target.value as 'ongoing' | 'completed' })}
                                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500 outline-none"
                                >
                                    <option value="ongoing">Ongoing</option>
                                    <option value="completed">Completed</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Image URL (Optional)</label>
                                <input
                                    type="text"
                                    value={currentProject.image_url}
                                    onChange={(e) => setCurrentProject({ ...currentProject, image_url: e.target.value })}
                                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500 outline-none"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Display Order</label>
                                <input
                                    type="number"
                                    value={currentProject.order}
                                    onChange={(e) => setCurrentProject({ ...currentProject, order: parseInt(e.target.value) })}
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
                                    className="btn-cta px-8"
                                >
                                    {currentProject._id ? 'UPDATE PROJECT' : 'CREATE PROJECT'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {projects?.map((project, i) => (
                    <div 
                        key={project._id} 
                        className="card group flex flex-col justify-between animate-up"
                        style={{ animationDelay: `${i * 50}ms` }}
                    >
                        <div>
                            <div className="flex justify-between items-start mb-4">
                                <div className="w-12 h-12 rounded-xl bg-accent-50 flex items-center justify-center text-xl group-hover:bg-accent-500 group-hover:text-white transition-colors duration-300">
                                    🔬
                                </div>
                                <div className="flex gap-1">
                                    <button
                                        onClick={() => handleEdit(project)}
                                        className="p-2 text-blue-600 hover:bg-blue-50 rounded-xl transition-colors"
                                        title="Edit"
                                    >
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                        </svg>
                                    </button>
                                    <button
                                        onClick={() => project._id && handleDelete(project._id)}
                                        className="p-2 text-red-600 hover:bg-red-50 rounded-xl transition-colors"
                                        title="Delete"
                                    >
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                        </svg>
                                    </button>
                                </div>
                            </div>
                            <h3 className="text-xl font-bold text-ink-900 mb-1">{project.title}</h3>
                            <p className="text-xs text-ink-400 font-bold mb-3 uppercase tracking-wider">{project.start_date} — {project.end_date || 'Present'}</p>
                            <p className="text-ink-500 text-sm line-clamp-3 leading-relaxed">{project.description}</p>
                        </div>
                        <div className="mt-6 pt-4 border-t border-ink-50 flex items-center">
                            <span className={`pill-badge ${project.status === 'ongoing' ? 'bg-emerald-50 text-emerald-700' : 'bg-blue-50 text-blue-700'}`}>
                                {project.status.toUpperCase()}
                            </span>
                        </div>
                    </div>
                ))}
            </div>
            {projects?.length === 0 && (
                <div className="text-center bg-white rounded-2xl border-2 border-dashed border-ink-100 py-20 animate-up">
                    <p className="text-ink-400 font-medium italic">No projects added yet.</p>
                </div>
            )}
        </div>
    );
};

export default AdminProjects;
