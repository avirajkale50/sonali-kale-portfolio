import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useGallery, useCreateGalleryItem, useUpdateGalleryItem, useDeleteGalleryItem, useUploadGalleryImage } from '../../hooks/useData';
import Loading from '../../components/common/Loading';
import ErrorMessage from '../../components/common/ErrorMessage';
import type { GalleryItem } from '../../types';
import { resolveMediaUrl } from '../../lib/utils';

const AdminGallery: React.FC = () => {
    const { data: items, isLoading, error } = useGallery();
    const createItem = useCreateGalleryItem();
    const updateItem = useUpdateGalleryItem();
    const deleteItem = useDeleteGalleryItem();
    const uploadImage = useUploadGalleryImage();

    const [isEditing, setIsEditing] = useState(false);
    const [currentItem, setCurrentItem] = useState<Partial<GalleryItem>>({
        caption: '',
        image_url: '',
        date: new Date().toISOString().split('T')[0],
        location: '',
    });

    const handleEdit = (item: GalleryItem) => {
        setCurrentItem(item);
        setIsEditing(true);
    };

    const handleDelete = async (id: string) => {
        if (window.confirm('Are you sure you want to delete this photo?')) {
            await deleteItem.mutateAsync(id);
        }
    };

    const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            try {
                const result = await uploadImage.mutateAsync(file);
                setCurrentItem({ ...currentItem, image_url: result.url });
            } catch (err) {
                alert('Failed to upload image');
            }
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            if (currentItem._id) {
                await updateItem.mutateAsync({ id: currentItem._id, data: currentItem });
            } else {
                await createItem.mutateAsync(currentItem as Omit<GalleryItem, '_id'>);
            }
            setIsEditing(false);
            setCurrentItem({ caption: '', image_url: '', date: new Date().toISOString().split('T')[0], location: '' });
        } catch (err) {
            alert('Failed to save gallery item');
        }
    };

    if (isLoading) return <Loading />;
    if (error) return <ErrorMessage message="Failed to load gallery items" />;

    return (
        <div className="max-w-5xl mx-auto px-4 py-10">
            <Link to="/admin/dashboard" className="inline-flex items-center gap-2 text-ink-500 hover:text-accent-600 mb-8 font-bold text-sm transition-colors group">
                <svg className="w-4 h-4 group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" /></svg>
                Back to Dashboard
            </Link>

            <div className="bg-white rounded-2xl border border-ink-100 p-8 mb-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 animate-up">
                <div>
                    <div className="section-badge mb-3">Gallery</div>
                    <h1 className="text-3xl font-extrabold text-ink-900 mb-2">Manage Social Feed</h1>
                    <p className="text-ink-500 font-medium text-sm">Upload photos from events, seminars, and workshops.</p>
                </div>
                <button
                    onClick={() => {
                        setCurrentItem({ caption: '', image_url: '', date: new Date().toISOString().split('T')[0], location: '' });
                        setIsEditing(true);
                    }}
                    className="btn-cta whitespace-nowrap"
                >
                    Upload New Photo
                </button>
            </div>

            {isEditing && (
                <div className="fixed inset-0 backdrop-blur-md bg-slate-900/20 flex items-center justify-center p-4 z-50 overflow-y-auto">
                    <div className="bg-white rounded-2xl border-2 border-ink-200 w-full max-w-2xl p-8 my-8 max-h-[90vh] overflow-y-auto animate-up">
                        <h2 className="text-xl font-bold mb-6">
                            {currentItem._id ? 'Edit Photo Info' : 'Upload Photo'}
                        </h2>
                        <form onSubmit={handleSubmit} className="space-y-5">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                <div className="md:col-span-2">
                                    <label className="block text-sm font-bold text-ink-700 mb-1.5">Photo</label>
                                    <div className="flex items-center gap-6">
                                        <div className="w-32 h-32 bg-ink-50 rounded-xl overflow-hidden border border-ink-100 flex-shrink-0">
                                            {currentItem.image_url ? (
                                                <img src={resolveMediaUrl(currentItem.image_url)} alt="Preview" className="w-full h-full object-cover" />
                                            ) : (
                                                <div className="w-full h-full flex items-center justify-center text-ink-300">📸</div>
                                            )}
                                        </div>
                                        <div className="flex-grow">
                                            <input type="file" onChange={handleImageUpload} className="hidden" id="gallery-image" />
                                            <label htmlFor="gallery-image" className="btn-ghost !py-2.5 cursor-pointer inline-flex">
                                                {uploadImage.isPending ? 'Uploading...' : 'Choose Image'}
                                            </label>
                                        </div>
                                    </div>
                                </div>
                                <div className="md:col-span-2">
                                    <label className="block text-sm font-bold text-ink-700 mb-1.5">Caption</label>
                                    <textarea
                                        value={currentItem.caption}
                                        onChange={(e) => setCurrentItem({ ...currentItem, caption: e.target.value })}
                                        required
                                        rows={2}
                                        className="w-full px-4 py-3 border border-ink-200 rounded-xl focus:ring-2 focus:ring-accent-500 outline-none transition-all"
                                        placeholder="What's happening in this photo?"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-bold text-ink-700 mb-1.5">Location (Optional)</label>
                                    <input
                                        type="text"
                                        value={currentItem.location}
                                        onChange={(e) => setCurrentItem({ ...currentItem, location: e.target.value })}
                                        className="w-full px-4 py-3 border border-ink-200 rounded-xl focus:ring-2 focus:ring-accent-500 outline-none transition-all"
                                        placeholder="e.g. University Hall"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-bold text-ink-700 mb-1.5">Date</label>
                                    <input
                                        type="date"
                                        value={currentItem.date}
                                        onChange={(e) => setCurrentItem({ ...currentItem, date: e.target.value })}
                                        required
                                        className="w-full px-4 py-3 border border-ink-200 rounded-xl focus:ring-2 focus:ring-accent-500 outline-none transition-all"
                                    />
                                </div>
                            </div>
                            <div className="flex justify-end gap-3 pt-6 border-t border-ink-100">
                                <button type="button" onClick={() => setIsEditing(false)} className="px-6 py-3 text-ink-500 font-bold hover:text-ink-800 transition-colors">
                                    Cancel
                                </button>
                                <button type="submit" disabled={!currentItem.image_url} className="px-10 py-3 bg-slate-900 text-white font-bold rounded-xl hover:bg-slate-800 transition-all disabled:bg-ink-200">
                                    {currentItem._id ? 'UPDATE PHOTO' : 'PUBLISH PHOTO'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            <div className="columns-2 md:columns-3 lg:columns-4 gap-4 space-y-4">
                {items?.map((item, i) => (
                    <div key={item._id} className="break-inside-avoid bg-white rounded-xl border border-ink-100 overflow-hidden group relative animate-up" style={{ animationDelay: `${i * 30}ms` }}>
                        <img src={resolveMediaUrl(item.image_url)} alt="" className="w-full h-auto transition-transform duration-700 group-hover:scale-105" />
                        <div className="absolute inset-0 bg-ink-900/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                            <button onClick={() => handleEdit(item)} className="p-2 bg-white text-ink-900 rounded-lg hover:bg-accent-500 hover:text-white transition-colors">
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg>
                            </button>
                            <button onClick={() => item._id && handleDelete(item._id)} className="p-2 bg-white text-red-600 rounded-lg hover:bg-red-600 hover:text-white transition-colors">
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                            </button>
                        </div>
                    </div>
                ))}
            </div>
            {items?.length === 0 && (
                <div className="text-center bg-white rounded-2xl border-2 border-dashed border-ink-100 py-16 animate-up">
                    <p className="text-ink-400 font-medium italic">Your gallery is empty.</p>
                </div>
            )}
        </div>
    );
};

export default AdminGallery;
