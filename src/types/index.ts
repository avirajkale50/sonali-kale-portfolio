export interface Profile {
    _id?: string;
    name: string;
    title: string;
    bio: string;
    email: string;
    phone?: string;
    office?: string;
    research_interests: string[];
    photo?: string;
}

export interface WorkExperience {
    _id?: string;
    institute: string;
    position: string;
    period: string;
    description: string;
    image_url?: string;
    order?: number;
}

export interface Education {
    _id?: string;
    degree: string;
    institution: string;
    year: string;
    description: string;
    order: number;
}

export interface Publication {
    _id?: string;
    title: string;
    authors: string[];
    journal: string;
    year: number;
    doi?: string;
    abstract: string;
    pdf_url?: string;
    order: number;
}

export interface Project {
    _id?: string;
    title: string;
    description: string;
    start_date: string;
    end_date?: string;
    collaborators: string[];
    image_url?: string;
    status: 'ongoing' | 'completed';
    order: number;
}

export interface Material {
    _id?: string;
    category: string;
    title: string;
    description: string;
    file_url: string;
    file_type: string;
    upload_date: string;
    order: number;
}

export interface Certificate {
    _id?: string;
    title: string;
    issuer: string;
    date: string;
    image_url: string;
    verification_url?: string;
}

export interface GalleryItem {
    _id?: string;
    caption: string;
    image_url: string;
    date: string;
    location?: string;
}

export interface User {
    email: string;
    role: string;
}

export interface LoginCredentials {
    email: string;
    password: string;
}

export interface AuthResponse {
    access_token: string;
    token_type: string;
}
