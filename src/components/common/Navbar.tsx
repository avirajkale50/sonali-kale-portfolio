import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

const links = [
    { path: '/', label: 'Home' },
    { path: '/publications', label: 'Publications' },
    { path: '/certificates', label: 'Certificates' },
    { path: '/experience', label: 'Experience' },
    { path: '/projects', label: 'Projects' },
    { path: '/education', label: 'Education' },
    { path: '/student-notes', label: 'Student Notes' },
    { path: '/gallery', label: 'Gallery' },
];

const Navbar: React.FC = () => {
    const { pathname } = useLocation();
    const [scrolled, setScrolled] = useState(false);
    const [open, setOpen] = useState(false);

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener('scroll', onScroll);
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    return (
        <header
            className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
                scrolled ? 'bg-white/95 backdrop-blur-md border-b border-ink-100' : 'bg-transparent'
            }`}
        >
            <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 h-16 flex items-center justify-between">
                {/* Logo */}
                <Link to="/" className="flex items-center gap-2.5 group">
                    <div className="w-9 h-9 rounded-xl bg-accent-500 flex items-center justify-center font-black text-white text-lg group-hover:scale-110 transition-transform">
                        S
                    </div>
                    <span className="font-black text-ink-900 text-lg tracking-tight">
                        SONALI KALE
                    </span>
                </Link>

                {/* Desktop nav */}
                <nav className="hidden md:flex items-center gap-1">
                    {links.map(l => (
                        <Link
                            key={l.path}
                            to={l.path}
                            className={`nav-link ${pathname === l.path ? 'nav-link-active !text-accent-600 !bg-accent-50' : ''}`}
                        >
                            {pathname === l.path && (
                                <span className="inline-block w-1.5 h-1.5 rounded-full bg-accent-500 mr-1" />
                            )}
                            {l.label}
                        </Link>
                    ))}
                </nav>

                {/* Mobile hamburger */}
                <button
                    className="md:hidden p-2 text-ink-700 hover:text-ink-900"
                    onClick={() => setOpen(o => !o)}
                    aria-label="Menu"
                >
                    <span className={`block w-5 h-0.5 bg-current mb-1 transition-all ${open ? 'rotate-45 translate-y-1.5' : ''}`} />
                    <span className={`block w-5 h-0.5 bg-current mb-1 transition-all ${open ? 'opacity-0' : ''}`} />
                    <span className={`block w-5 h-0.5 bg-current transition-all ${open ? '-rotate-45 -translate-y-1.5' : ''}`} />
                </button>
            </div>

            {/* Mobile drawer */}
            {open && (
                <div className="md:hidden bg-white border-t border-ink-100 px-5 py-4 flex flex-col gap-1">
                    {links.map(l => (
                        <Link
                            key={l.path}
                            to={l.path}
                            onClick={() => setOpen(false)}
                            className={`py-2.5 px-3 rounded-lg font-semibold text-sm ${pathname === l.path ? 'bg-accent-50 text-accent-600' : 'text-ink-600'}`}
                        >
                            {l.label}
                        </Link>
                    ))}
                </div>
            )}
        </header>
    );
};

export default Navbar;
