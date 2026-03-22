import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { profileAPI, educationAPI, publicationsAPI, projectsAPI, materialsAPI, certificatesAPI, galleryAPI, experienceAPI } from '../services';
import type { Profile, Education, Publication, Project, Material, Certificate, GalleryItem, WorkExperience } from '../types';

// Profile Hooks
export const useProfile = () => {
    return useQuery({
        queryKey: ['profile'],
        queryFn: profileAPI.get,
    });
};

export const useUpdateProfile = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (data: Partial<Profile>) => profileAPI.update(data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['profile'] });
        },
    });
};

export const useUploadPhoto = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (file: File) => profileAPI.uploadPhoto(file),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['profile'] });
        },
    });
};

// Education Hooks
export const useEducation = () => {
    return useQuery({
        queryKey: ['education'],
        queryFn: educationAPI.getAll,
    });
};

export const useCreateEducation = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (data: Omit<Education, '_id'>) => educationAPI.create(data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['education'] });
        },
    });
};

export const useUpdateEducation = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: ({ id, data }: { id: string; data: Partial<Education> }) =>
            educationAPI.update(id, data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['education'] });
        },
    });
};

export const useDeleteEducation = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (id: string) => educationAPI.delete(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['education'] });
        },
    });
};

// Publications Hooks
export const usePublications = () => {
    return useQuery({
        queryKey: ['publications'],
        queryFn: publicationsAPI.getAll,
    });
};

export const useCreatePublication = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (data: Omit<Publication, '_id'>) => publicationsAPI.create(data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['publications'] });
        },
    });
};

export const useUpdatePublication = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: ({ id, data }: { id: string; data: Partial<Publication> }) =>
            publicationsAPI.update(id, data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['publications'] });
        },
    });
};

export const useDeletePublication = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (id: string) => publicationsAPI.delete(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['publications'] });
        },
    });
};

// Projects Hooks
export const useProjects = () => {
    return useQuery({
        queryKey: ['projects'],
        queryFn: projectsAPI.getAll,
    });
};

export const useCreateProject = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (data: Omit<Project, '_id'>) => projectsAPI.create(data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['projects'] });
        },
    });
};

export const useUpdateProject = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: ({ id, data }: { id: string; data: Partial<Project> }) =>
            projectsAPI.update(id, data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['projects'] });
        },
    });
};

export const useDeleteProject = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (id: string) => projectsAPI.delete(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['projects'] });
        },
    });
};

// Materials Hooks
export const useMaterials = (category?: string) => {
    return useQuery({
        queryKey: ['materials', category],
        queryFn: () => materialsAPI.getAll(category),
    });
};

export const useMaterialCategories = () => {
    return useQuery({
        queryKey: ['material-categories'],
        queryFn: materialsAPI.getCategories,
    });
};

export const useCreateMaterial = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (data: Omit<Material, '_id' | 'upload_date'>) => materialsAPI.create(data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['materials'] });
            queryClient.invalidateQueries({ queryKey: ['material-categories'] });
        },
    });
};

export const useUpdateMaterial = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: ({ id, data }: { id: string; data: Partial<Material> }) =>
            materialsAPI.update(id, data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['materials'] });
        },
    });
};

export const useDeleteMaterial = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (id: string) => materialsAPI.delete(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['materials'] });
            queryClient.invalidateQueries({ queryKey: ['material-categories'] });
        },
    });
};

export const useUploadMaterialFile = () => {
    return useMutation({
        mutationFn: (file: File) => materialsAPI.uploadFile(file),
    });
};

// Certificates Hooks
export const useCertificates = () => {
    return useQuery({
        queryKey: ['certificates'],
        queryFn: certificatesAPI.getAll,
    });
};

export const useCreateCertificate = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (data: Omit<Certificate, '_id'>) => certificatesAPI.create(data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['certificates'] });
        },
    });
};

export const useUpdateCertificate = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: ({ id, data }: { id: string; data: Partial<Certificate> }) =>
            certificatesAPI.update(id, data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['certificates'] });
        },
    });
};

export const useDeleteCertificate = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (id: string) => certificatesAPI.delete(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['certificates'] });
        },
    });
};

export const useUploadCertificateImage = () => {
    return useMutation({
        mutationFn: (file: File) => certificatesAPI.uploadImage(file),
    });
};

// Gallery Hooks
export const useGallery = () => {
    return useQuery({
        queryKey: ['gallery'],
        queryFn: galleryAPI.getAll,
    });
};

export const useCreateGalleryItem = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (data: Omit<GalleryItem, '_id'>) => galleryAPI.create(data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['gallery'] });
        },
    });
};

export const useUpdateGalleryItem = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: ({ id, data }: { id: string; data: Partial<GalleryItem> }) =>
            galleryAPI.update(id, data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['gallery'] });
        },
    });
};

export const useDeleteGalleryItem = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (id: string) => galleryAPI.delete(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['gallery'] });
        },
    });
};

export const useUploadGalleryImage = () => {
    return useMutation({
        mutationFn: (file: File) => galleryAPI.uploadImage(file),
    });
};

// Experience Hooks
export const useWorkExperience = () => {
    return useQuery({
        queryKey: ['experience'],
        queryFn: () => experienceAPI.getAll(),
    });
};

export const useCreateWorkExperience = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (data: Omit<WorkExperience, '_id'>) => experienceAPI.create(data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['experience'] });
        },
    });
};

export const useUpdateWorkExperience = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: ({ id, data }: { id: string; data: Partial<WorkExperience> }) =>
            experienceAPI.update(id, data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['experience'] });
        },
    });
};

export const useDeleteWorkExperience = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (id: string) => experienceAPI.delete(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['experience'] });
        },
    });
};

export const useUploadWorkExperienceImage = () => {
    return useMutation({
        mutationFn: (file: File) => experienceAPI.uploadImage(file),
    });
};
