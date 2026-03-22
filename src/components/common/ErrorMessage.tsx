import React from 'react';

interface ErrorMessageProps {
    message?: string;
    onRetry?: () => void;
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({
    message = 'Something went wrong. Please try again.',
    onRetry
}) => (
    <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center max-w-md">
            <div className="w-16 h-16 mx-auto mb-5 rounded-2xl bg-red-50 flex items-center justify-center text-red-500">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
            </div>
            <h3 className="text-xl font-black text-ink-900 mb-2">Oops!</h3>
            <p className="text-ink-500 mb-6">{message}</p>
            {onRetry && (
                <button onClick={onRetry} className="btn-cta">
                    Try Again
                </button>
            )}
        </div>
    </div>
);

export default ErrorMessage;
