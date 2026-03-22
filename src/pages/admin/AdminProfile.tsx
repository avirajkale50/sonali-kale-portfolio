import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useProfile, useUpdateProfile, useUploadPhoto } from '../../hooks/useData';
import Loading from '../../components/common/Loading';
import ErrorMessage from '../../components/common/ErrorMessage';
import { resolveMediaUrl } from '../../lib/utils';

const AdminProfile: React.FC = () => {
    const { data: profile, isLoading, error } = useProfile();
    const updateProfile = useUpdateProfile();
    const uploadPhoto = useUploadPhoto();
    const [saved, setSaved] = useState(false);

    const [form, setForm] = useState({
        name: '', title: '', bio: '', email: '', phone: '', office: '', research_interests: '',
    });

    useEffect(() => {
        if (profile) {
            setForm({
                name: profile.name || '',
                title: profile.title || '',
                bio: profile.bio || '',
                email: profile.email || '',
                phone: profile.phone || '',
                office: profile.office || '',
                research_interests: profile.research_interests?.join(', ') || '',
            });
        }
    }, [profile]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setForm(f => ({ ...f, [e.target.name]: e.target.value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        await updateProfile.mutateAsync({
            ...form,
            research_interests: form.research_interests.split(',').map(s => s.trim()).filter(Boolean),
        });
        setSaved(true);
        setTimeout(() => setSaved(false), 3000);
    };

    const handlePhoto = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;
        try {
            await uploadPhoto.mutateAsync(file);
        } catch {
            alert('Photo upload failed. Please try again.');
        }
    };

    if (isLoading) return <Loading />;
    if (error) return <ErrorMessage message="Failed to load profile" />;

    const photoUrl = resolveMediaUrl(profile?.photo);

    const inputCls = "w-full px-4 py-3 border-2 border-ink-100 rounded-xl bg-ink-50 focus:bg-white focus:border-accent-400 outline-none transition-all font-medium text-ink-800";
    const labelCls = "block text-xs font-black uppercase tracking-widest text-ink-500 mb-2";

    return (
        <div className="min-h-screen bg-ink-50 py-10 px-4">
            <div className="max-w-3xl mx-auto">
                <Link to="/admin/dashboard" className="inline-flex items-center gap-2 text-ink-500 hover:text-ink-900 font-bold text-sm mb-8 transition-colors">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
                    Back to Dashboard
                </Link>

                {/* Header Card */}
                <div className="bg-white rounded-2xl border border-ink-100 p-8 mb-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 animate-up">
                    <div>
                        <div className="section-badge mb-3">Settings</div>
                        <h1 className="text-3xl font-extrabold text-ink-900 mb-2">Edit Profile</h1>
                        <p className="text-ink-500 font-medium text-sm">Update your personal information and profile picture.</p>
                    </div>
                </div>

                {/* Photo section */}
                <div className="bg-white rounded-2xl border border-ink-100 p-8 mb-6">
                    <h2 className="font-extrabold text-ink-800 mb-6 text-lg">Profile Photo</h2>
                    <div className="flex items-center gap-8">
                        {/* Preview */}
                        <div className="w-28 h-28 rounded-2xl overflow-hidden border-2 border-ink-200 shrink-0">
                            {photoUrl ? (
                                <img src={photoUrl} alt="Profile" className="w-full h-full object-cover" />
                            ) : (
                                <div className="w-full h-full bg-accent-100 flex items-center justify-center text-accent-500 text-4xl font-black">
                                    {profile?.name?.charAt(0) ?? '?'}
                                </div>
                            )}
                        </div>
                        {/* Upload */}
                        <div>
                            <input id="photo-input" type="file" accept="image/*" onChange={handlePhoto} className="hidden" />
                            <label
                                htmlFor="photo-input"
                                className={`btn-cta cursor-pointer ${uploadPhoto.isPending ? 'opacity-60 cursor-wait' : ''}`}
                            >
                                {uploadPhoto.isPending
                                    ? <><svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/></svg> Uploading…</>
                                    : <><svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a2 2 0 002 2h12a2 2 0 002-2v-1m-4-8l-4-4m0 0L8 8m4-4v12" /></svg> Upload Photo</>
                                }
                            </label>
                            <p className="text-xs text-ink-400 mt-2 font-medium">JPG, PNG, WEBP — max 2 MB</p>
                            {uploadPhoto.isSuccess && (
                                <p className="text-xs text-accent-600 font-bold mt-1">✓ Photo updated!</p>
                            )}
                        </div>
                    </div>
                </div>

                {/* Profile form */}
                <form onSubmit={handleSubmit} className="bg-white rounded-2xl border border-ink-100 p-8">
                    <h2 className="font-extrabold text-ink-800 mb-6 text-lg">Profile Information</h2>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
                        <div>
                            <label className={labelCls}>Full Name</label>
                            <input type="text" name="name" value={form.name} onChange={handleChange} required className={inputCls} placeholder="Dr. Jane Smith" />
                        </div>
                        <div>
                            <label className={labelCls}>Professional Title</label>
                            <input type="text" name="title" value={form.title} onChange={handleChange} required className={inputCls} placeholder="Associate Professor of Physics" />
                        </div>
                        <div>
                            <label className={labelCls}>Email</label>
                            <input type="email" name="email" value={form.email} onChange={handleChange} required className={inputCls} />
                        </div>
                        <div>
                            <label className={labelCls}>Phone (optional)</label>
                            <input type="tel" name="phone" value={form.phone} onChange={handleChange} className={inputCls} />
                        </div>
                        <div className="sm:col-span-2">
                            <label className={labelCls}>Office Location (optional)</label>
                            <input type="text" name="office" value={form.office} onChange={handleChange} className={inputCls} placeholder="Room 204, Science Block" />
                        </div>
                        <div className="sm:col-span-2">
                            <label className={labelCls}>Bio</label>
                            <textarea name="bio" value={form.bio} onChange={handleChange} rows={5} required className={inputCls} />
                        </div>
                        <div className="sm:col-span-2">
                            <label className={labelCls}>Research Interests <span className="text-ink-400 normal-case tracking-normal">(comma-separated)</span></label>
                            <input type="text" name="research_interests" value={form.research_interests} onChange={handleChange} className={inputCls} placeholder="Quantum Mechanics, Astrophysics, Thermodynamics" />
                        </div>
                    </div>

                    <div className="flex items-center justify-end gap-4">
                        {saved && <p className="text-sm text-accent-600 font-bold animate-in">✓ Saved successfully!</p>}
                        <button type="submit" disabled={updateProfile.isPending} className="btn-cta disabled:opacity-60">
                            {updateProfile.isPending
                                ? <><svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/></svg> Saving…</>
                                : 'Save Changes'
                            }
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AdminProfile;
