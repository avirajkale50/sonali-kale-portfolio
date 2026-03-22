import React from 'react';
import { useProfile } from '../hooks/useData';
import Loading from '../components/common/Loading';
import ErrorMessage from '../components/common/ErrorMessage';
import { resolveMediaUrl } from '../lib/utils';

const SocialIcon: React.FC<{ href: string; children: React.ReactNode }> = ({ href, children }) => (
    <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="w-10 h-10 rounded-full border-2 border-ink-200 flex items-center justify-center text-ink-500 hover:border-accent-400 hover:text-accent-600 hover:bg-accent-50 transition-all duration-200"
    >
        {children}
    </a>
);

const HomePage: React.FC = () => {
    const { data: profile, isLoading, error, refetch } = useProfile();

    if (isLoading) return <Loading />;
    if (error) return <ErrorMessage onRetry={() => refetch()} />;
    if (!profile || !profile.name) return <ErrorMessage message="Profile not found. Please set up your profile in the Admin panel." />;

    const photoUrl = resolveMediaUrl(profile.photo);

    return (
        <div className="min-h-screen bg-white overflow-x-hidden">
            {/* ── HERO ─────────────────────────────────────────────────── */}
            <section className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 pt-32 pb-20 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

                {/* Left – text */}
                <div className="order-2 lg:order-1">
                    {/* Greeting pill */}
                    <div className="pill-badge mb-8 animate-up">
                        <span>👋</span>
                        <span>Hi there, I'm</span>
                    </div>

                    {/* Headline */}
                    <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-ink-900 leading-[1.1] mb-6 animate-up delay-100">
                        {profile.title || 'Physics Educator & Researcher'}
                    </h1>

                    {/* Bio */}
                    <p className="text-lg text-ink-500 leading-relaxed max-w-xl mb-10 animate-up delay-200">
                        {profile.bio || 'Passionate about bridge-building between complex physics theory and accessible, engaging education.'}
                    </p>

                    {/* CTAs */}
                    <div className="flex flex-wrap gap-4 mb-10 animate-up delay-300">
                        <a href={`mailto:${profile.email}`} className="btn-cta">
                            Get In Touch
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                            </svg>
                        </a>
                        <a href="/publications" className="btn-ghost">
                            View Publications
                            <svg className="w-4 h-4 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a2 2 0 002 2h12a2 2 0 002-2v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                            </svg>
                        </a>
                    </div>

                    {/* Social + contact */}
                    <div className="flex items-center gap-4 animate-up delay-400">
                        <span className="text-xs font-bold text-ink-400 uppercase tracking-widest">Find me on:</span>
                        <SocialIcon href={`mailto:${profile.email}`}>
                            {/* Email */}
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                            </svg>
                        </SocialIcon>
                    </div>
                </div>

                {/* Right – photo */}
                <div className="order-1 lg:order-2 flex justify-center lg:justify-end animate-up">
                    <div className="relative w-72 h-72 sm:w-96 sm:h-96">
                        {/* Emerald blob behind the photo */}
                        <div className="absolute -bottom-6 -right-6 w-72 h-72 sm:w-96 sm:h-96 bg-accent-400 rounded-[40%_60%_70%_30%/40%_50%_60%_50%] animate-blob -z-10" />
                        {/* Photo frame */}
                        <div className="relative w-full h-full rounded-3xl overflow-hidden border-1 border-gray-400">
                            {photoUrl ? (
                                <img
                                    src={photoUrl}
                                    alt={profile.name}
                                    className="w-full h-full object-cover"
                                />
                            ) : (
                                <div className="w-full h-full bg-gradient-to-br from-accent-400 to-accent-600 flex items-center justify-center text-white font-black text-8xl">
                                    {profile.name.charAt(0)}
                                </div>
                            )}
                        </div>
                        {/* Floating badge */}
                        <div className="absolute -top-3 -left-3 bg-white border border-ink-200 rounded-2xl px-4 py-2 hidden sm:flex items-center gap-2">
                            <span className="text-xl">🎓</span>
                            <div>
                                <p className="text-[10px] text-ink-400 font-bold uppercase tracking-widest">Profession</p>
                                <p className="text-xs font-bold text-ink-800">Physics Teacher</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ── RESEARCH INTERESTS ──────────────────────────────────────── */}
            {profile.research_interests && profile.research_interests.length > 0 && (
                <section className="bg-ink-50 py-20 px-5 sm:px-8">
                    <div className="max-w-5xl mx-auto">
                        <p className="section-badge text-center w-full block">Areas of Expertise</p>
                        <h2 className="text-3xl font-extrabold text-center text-ink-900 mb-12">Research Interests</h2>
                        <div className="flex flex-wrap gap-4 justify-center">
                            {profile.research_interests.map((interest, i) => (
                                <div
                                    key={i}
                                    className="bg-white border-2 border-ink-100 hover:border-accent-400 rounded-2xl px-6 py-4 flex items-center gap-3 group transition-all duration-200 cursor-default animate-up"
                                    style={{ animationDelay: `${i * 80}ms` }}
                                >
                                    <div className="w-8 h-8 rounded-xl bg-accent-100 group-hover:bg-accent-500 flex items-center justify-center text-accent-600 group-hover:text-white transition-colors">
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                                        </svg>
                                    </div>
                                    <span className="font-bold text-ink-800 group-hover:text-accent-700 transition-colors">{interest}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {/* ── QUICK CONTACT STRIP ─────────────────────────────────────── */}
            {(profile.email || profile.phone || profile.office) && (
                <section className="py-16 px-5 sm:px-8">
                    <div className="max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-6">
                        {profile.email && (
                            <a href={`mailto:${profile.email}`} className="card p-6 flex items-center gap-4 group">
                                <div className="w-12 h-12 rounded-2xl bg-accent-50 flex items-center justify-center text-accent-500 group-hover:bg-accent-500 group-hover:text-white transition-colors">
                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                    </svg>
                                </div>
                                <div>
                                    <p className="text-xs text-ink-400 font-bold uppercase tracking-widest mb-0.5">Email</p>
                                    <p className="font-semibold text-ink-800 text-sm truncate">{profile.email}</p>
                                </div>
                            </a>
                        )}
                        {profile.phone && (
                            <div className="card p-6 flex items-center gap-4 group">
                                <div className="w-12 h-12 rounded-2xl bg-accent-50 flex items-center justify-center text-accent-500 group-hover:bg-accent-500 group-hover:text-white transition-colors">
                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                    </svg>
                                </div>
                                <div>
                                    <p className="text-xs text-ink-400 font-bold uppercase tracking-widest mb-0.5">Phone</p>
                                    <p className="font-semibold text-ink-800 text-sm">{profile.phone}</p>
                                </div>
                            </div>
                        )}
                        {profile.office && (
                            <div className="card p-6 flex items-center gap-4 group">
                                <div className="w-12 h-12 rounded-2xl bg-accent-50 flex items-center justify-center text-accent-500 group-hover:bg-accent-500 group-hover:text-white transition-colors">
                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                    </svg>
                                </div>
                                <div>
                                    <p className="text-xs text-ink-400 font-bold uppercase tracking-widest mb-0.5">Office</p>
                                    <p className="font-semibold text-ink-800 text-sm">{profile.office}</p>
                                </div>
                            </div>
                        )}
                    </div>
                </section>
            )}
        </div>
    );
};

export default HomePage;
