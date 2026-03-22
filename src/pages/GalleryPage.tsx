import React from 'react';
import { useGallery } from '../hooks/useData';
import Loading from '../components/common/Loading';
import ErrorMessage from '../components/common/ErrorMessage';
import { resolveMediaUrl } from '../lib/utils';

const GalleryPage: React.FC = () => {
    const { data: items, isLoading, error, refetch } = useGallery();

    if (isLoading) return <Loading />;
    if (error) return <ErrorMessage onRetry={() => refetch()} />;

    return (
        <div className="min-h-screen bg-white pt-28 pb-20 px-5 sm:px-8">
            <div className="max-w-6xl mx-auto text-center mb-16">
                <p className="section-badge mx-auto">Social Feed</p>
                <h1 className="text-4xl font-extrabold text-ink-900 mb-4">Gallery</h1>
                <p className="text-ink-500 max-w-2xl mx-auto">
                    Capturing moments from seminars, workshops, and academic life.
                </p>
            </div>

            <div className="max-w-7xl mx-auto">
                {items?.length === 0 ? (
                    <div className="text-center py-24 card">
                        <div className="text-5xl mb-4">📸</div>
                        <p className="font-bold text-ink-500">No photos shared yet.</p>
                    </div>
                ) : (
                    <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6">
                        {items?.map((item, i) => (
                            <div key={item._id} className="break-inside-avoid relative group animate-up" style={{ animationDelay: `${i * 80}ms` }}>
                                <div className="rounded-2xl overflow-hidden border border-ink-100 bg-ink-50 relative">
                                    <img 
                                        src={resolveMediaUrl(item.image_url)} 
                                        alt={item.caption}
                                        className="w-full h-auto transition-transform duration-700 group-hover:scale-105"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-ink-900/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 p-6 flex flex-col justify-end text-white">
                                        <p className="font-bold text-lg mb-1 leading-tight">{item.caption}</p>
                                        <div className="flex items-center justify-between text-[11px] font-bold uppercase tracking-widest text-white/80">
                                            <span>{item.location || 'Academic Life'}</span>
                                            <span>{new Date(item.date).toLocaleDateString(undefined, { month: 'short', year: 'numeric' })}</span>
                                        </div>
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

export default GalleryPage;
