import React from 'react';

const Loading: React.FC<{ message?: string }> = ({ message = 'Loading...' }) => (
    <div className="min-h-[60vh] flex flex-col items-center justify-center gap-5 animate-in">
        <div className="relative w-14 h-14">
            {/* Spinning outer ring */}
            <div className="absolute inset-0 border-4 border-ink-100 rounded-full" />
            <div className="absolute inset-0 border-4 border-transparent border-t-accent-500 rounded-full animate-spin" />
            {/* Center dot */}
            <div className="absolute inset-3 bg-accent-500 rounded-full opacity-20" />
        </div>
        <p className="text-ink-500 font-semibold text-sm tracking-wide">{message}</p>
    </div>
);

export default Loading;
