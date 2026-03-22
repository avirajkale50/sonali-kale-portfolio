import api from "./api";
import type {
  Profile,
  Education,
  Publication,
  Project,
  Material,
  Certificate,
  GalleryItem,
  LoginCredentials,
  AuthResponse,
  WorkExperience,
} from "../types";

// Auth API
export const authAPI = {
  login: async (credentials: LoginCredentials): Promise<AuthResponse> => {
    const formData = new URLSearchParams();
    formData.append("username", credentials.email);
    formData.append("password", credentials.password);

    const response = await api.post<AuthResponse>("/api/auth/login", formData, {
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
    });
    return response.data;
  },

  verify: async (): Promise<boolean> => {
    try {
      await api.get("/api/auth/verify");
      return true;
    } catch {
      return false;
    }
  },
};

// Profile API
export const profileAPI = {
  get: async (): Promise<Profile> => {
    const response = await api.get<Profile>("/api/profile");
    return response.data;
  },

  update: async (data: Partial<Profile>): Promise<Profile> => {
    const response = await api.put<Profile>("/api/profile", data);
    return response.data;
  },

  uploadPhoto: async (file: File): Promise<{ photo_url: string }> => {
    const formData = new FormData();
    formData.append("file", file);
    const response = await api.post<{ photo_url: string }>(
      "/api/profile/photo",
      formData,
    );
    return response.data;
  },
};

// Education API
export const educationAPI = {
  getAll: async (): Promise<Education[]> => {
    const response = await api.get<Education[]>("/api/education");
    return response.data;
  },

  create: async (data: Omit<Education, "_id">): Promise<Education> => {
    const response = await api.post<Education>("/api/education", data);
    return response.data;
  },

  update: async (id: string, data: Partial<Education>): Promise<Education> => {
    const response = await api.put<Education>(`/api/education/${id}`, data);
    return response.data;
  },

  delete: async (id: string): Promise<void> => {
    await api.delete(`/api/education/${id}`);
  },
};

// Publications API
export const publicationsAPI = {
  getAll: async (): Promise<Publication[]> => {
    const response = await api.get<Publication[]>("/api/publications");
    return response.data;
  },

  create: async (data: Omit<Publication, "_id">): Promise<Publication> => {
    const response = await api.post<Publication>("/api/publications", data);
    return response.data;
  },

  update: async (
    id: string,
    data: Partial<Publication>,
  ): Promise<Publication> => {
    const response = await api.put<Publication>(
      `/api/publications/${id}`,
      data,
    );
    return response.data;
  },

  delete: async (id: string): Promise<void> => {
    await api.delete(`/api/publications/${id}`);
  },
};

// Projects API
export const projectsAPI = {
  getAll: async (): Promise<Project[]> => {
    const response = await api.get<Project[]>("/api/projects");
    return response.data;
  },

  create: async (data: Omit<Project, "_id">): Promise<Project> => {
    const response = await api.post<Project>("/api/projects", data);
    return response.data;
  },

  update: async (id: string, data: Partial<Project>): Promise<Project> => {
    const response = await api.put<Project>(`/api/projects/${id}`, data);
    return response.data;
  },

  delete: async (id: string): Promise<void> => {
    await api.delete(`/api/projects/${id}`);
  },
};

// Materials API
export const materialsAPI = {
  getAll: async (category?: string): Promise<Material[]> => {
    const params = category ? { category } : {};
    const response = await api.get<Material[]>("/api/materials", { params });
    return response.data;
  },

  getCategories: async (): Promise<string[]> => {
    const response = await api.get<string[]>("/api/materials/categories");
    return response.data;
  },

  create: async (
    data: Omit<Material, "_id" | "upload_date">,
  ): Promise<Material> => {
    const response = await api.post<Material>("/api/materials", data);
    return response.data;
  },

  update: async (id: string, data: Partial<Material>): Promise<Material> => {
    const response = await api.put<Material>(`/api/materials/${id}`, data);
    return response.data;
  },

  delete: async (id: string): Promise<void> => {
    await api.delete(`/api/materials/${id}`);
  },

  uploadFile: async (file: File): Promise<{ file_url: string }> => {
    const formData = new FormData();
    formData.append("file", file);
    const response = await api.post<{ file_url: string }>(
      "/api/materials/upload",
      formData,
    );
    return response.data;
  },
};

// Certificates API
export const certificatesAPI = {
  getAll: async (): Promise<Certificate[]> => {
    const response = await api.get<Certificate[]>("/api/certificates");
    return response.data;
  },
  create: async (data: Omit<Certificate, "_id">): Promise<Certificate> => {
    const response = await api.post<Certificate>("/api/certificates", data);
    return response.data;
  },
  update: async (
    id: string,
    data: Partial<Certificate>,
  ): Promise<Certificate> => {
    const response = await api.put<Certificate>(
      `/api/certificates/${id}`,
      data,
    );
    return response.data;
  },
  delete: async (id: string): Promise<void> => {
    await api.delete(`/api/certificates/${id}`);
  },
  uploadImage: async (file: File): Promise<{ url: string }> => {
    const formData = new FormData();
    formData.append("file", file);
    const response = await api.post<{ url: string }>(
      "/api/certificates/upload",
      formData,
    );
    return response.data;
  },
};

// Gallery API
export const galleryAPI = {
  getAll: async (): Promise<GalleryItem[]> => {
    const response = await api.get<GalleryItem[]>("/api/gallery");
    return response.data;
  },
  create: async (data: Omit<GalleryItem, "_id">): Promise<GalleryItem> => {
    const response = await api.post<GalleryItem>("/api/gallery", data);
    return response.data;
  },
  update: async (
    id: string,
    data: Partial<GalleryItem>,
  ): Promise<GalleryItem> => {
    const response = await api.put<GalleryItem>(`/api/gallery/${id}`, data);
    return response.data;
  },
  delete: async (id: string): Promise<void> => {
    await api.delete(`/api/gallery/${id}`);
  },
  uploadImage: async (file: File): Promise<{ url: string }> => {
    const formData = new FormData();
    formData.append("file", file);
    const response = await api.post<{ url: string }>(
      "/api/gallery/upload",
      formData,
    );
    return response.data;
  },
};

export const experienceAPI = {
  getAll: async (): Promise<WorkExperience[]> => {
    const response = await api.get<WorkExperience[]>("/api/experience");
    return response.data;
  },
  create: async (data: Omit<WorkExperience, "_id">): Promise<WorkExperience> => {
    const response = await api.post<WorkExperience>("/api/experience", data);
    return response.data;
  },
  update: async (
    id: string,
    data: Partial<WorkExperience>,
  ): Promise<WorkExperience> => {
    const response = await api.put<WorkExperience>(`/api/experience/${id}`, data);
    return response.data;
  },
  delete: async (id: string): Promise<void> => {
    await api.delete(`/api/experience/${id}`);
  },
  uploadImage: async (file: File): Promise<{ url: string }> => {
    const formData = new FormData();
    formData.append("file", file);
    const response = await api.post<{ url: string }>(
      "/api/experience/upload",
      formData,
    );
    return response.data;
  },
};
