import React, { useState, useEffect } from 'react';
import { useCertificates } from '../hooks/useData';
import Loading from '../components/common/Loading';
import ErrorMessage from '../components/common/ErrorMessage';
import { resolveMediaUrl } from '../lib/utils';

const CertificatesPage: React.FC = () => {
    const { data: certificates, isLoading, error, refetch } = useCertificates();
    const [selectedImage, setSelectedImage] = useState<string | null>(null);

    // Close on Escape key
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape') setSelectedImage(null);
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, []);

    if (isLoading) return <Loading />;
    if (error) return <ErrorMessage onRetry={() => refetch()} />;

    return (
        <div className="min-h-screen bg-white pt-28 pb-20 px-5 sm:px-8">
            <div className="max-w-6xl mx-auto text-center mb-16">
                <p className="section-badge mx-auto">Achievements</p>
                <h1 className="text-4xl font-extrabold text-ink-900 mb-4">Certificates</h1>
                <p className="text-ink-500 max-w-2xl mx-auto">
                    A collection of professional certifications and academic achievements.
                </p>
            </div>

            <div className="max-w-6xl mx-auto">
                {certificates?.length === 0 ? (
                    <div className="text-center py-24 card">
                        <div className="text-5xl mb-4">📜</div>
                        <p className="font-bold text-ink-500">No certificates added yet.</p>
                    </div>
                ) : (
                    <div className="columns-1 md:columns-2 lg:columns-3 gap-8 space-y-8">
                        {certificates?.map((cert, i) => (
                            <div 
                                key={cert._id} 
                                className="card group overflow-hidden break-inside-avoid animate-up !rounded-xl" 
                                style={{ animationDelay: `${i * 100}ms` }}
                            >
                                <div 
                                    className="overflow-hidden bg-ink-50 relative cursor-pointer"
                                    onClick={() => setSelectedImage(resolveMediaUrl(cert.image_url) || null)}
                                >
                                    <img 
                                        src={resolveMediaUrl(cert.image_url)} 
                                        alt={cert.title}
                                        className="w-full h-auto transition-transform duration-500 group-hover:scale-105"
                                    />
                                    <div className="absolute inset-0 bg-ink-900/0 group-hover:bg-ink-900/40 transition-colors duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
                                        {cert.verification_url && (
                                            <a 
                                                href={cert.verification_url} 
                                                target="_blank" 
                                                rel="noopener noreferrer"
                                                className="btn-accent"
                                                onClick={(e) => e.stopPropagation()}
                                            >
                                                Verify Credential
                                            </a>
                                        )}
                                    </div>
                                </div>
                                <div className="p-6">
                                    <p className="text-accent-600 text-[10px] font-black uppercase tracking-widest mb-2">{cert.issuer}</p>
                                    <h3 className="text-xl font-bold text-ink-900 mb-2 group-hover:text-accent-600 transition-colors">
                                        {cert.title}
                                    </h3>
                                    <p className="text-ink-400 text-sm font-semibold">
                                        Issued {new Date(cert.date).toLocaleDateString(undefined, { month: 'long', year: 'numeric' })}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* Image Popup Modal */}
            {selectedImage && (
                <div 
                    className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-10 bg-black/80 animate-in"
                    onClick={() => setSelectedImage(null)}
                >
                    <button 
                        className="absolute top-6 right-6 text-white text-3xl hover:text-accent-400 z-10 cursor-pointer"
                        onClick={() => setSelectedImage(null)}
                        aria-label="Close modal"
                    >
                        ✕
                    </button>
                    <div className="relative max-w-full max-h-full flex items-center justify-center">
                        <img 
                            src={selectedImage} 
                            alt="Certificate Full View" 
                            className="max-w-full max-h-[90vh] object-contain rounded-sm shadow-2xl animate-up"
                            onClick={(e) => e.stopPropagation()}
                        />
                    </div>
                </div>
            )}
        </div>
    );
};

export default CertificatesPage;
