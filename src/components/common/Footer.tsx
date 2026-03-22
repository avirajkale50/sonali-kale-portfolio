import React from 'react';

const Footer: React.FC = () => (
    <footer className="bg-ink-900 text-white">
        <div className="p-6 text-center text-ink-500 text-sm">
            © {new Date().getFullYear()} All Rights Reserved. Built by <a href="https://aviraj-kale.vercel.app/">avirajkale50</a>.
        </div>
    </footer>
);

export default Footer;
