/** The backend API origin. Used to resolve relative /uploads/ paths to absolute URLs. */
export const API_BASE = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000';

/**
 * Convert a potentially-relative photo URL (e.g. "/uploads/photo_abc.jpg")
 * returned by the Flask backend into a full absolute URL the browser can display.
 */
export function resolveMediaUrl(url: string | undefined | null): string | undefined {
    if (!url) return undefined;
    if (url.startsWith('http://') || url.startsWith('https://')) return url;
    return `${API_BASE}${url.startsWith('/') ? '' : '/'}${url}`;
}
