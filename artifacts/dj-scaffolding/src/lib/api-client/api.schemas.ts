export interface HealthStatus {
  status: string;
}

export interface ContactInput {
  name: string;
  email: string;
  phone?: string | null;
  service?: string | null;
  message: string;
}

export interface ContactSubmission {
  id: number;
  name: string;
  email: string;
  phone?: string | null;
  service?: string | null;
  message: string;
  read?: boolean;
  createdAt: string;
}

export interface ContentSection {
  id: number;
  key: string;
  title: string;
  content: string;
  imageUrl?: string | null;
  updatedAt: string;
}

export interface ContentSectionInput {
  title: string;
  content: string;
  imageUrl?: string | null;
}

export interface Service {
  id: number;
  name: string;
  description: string;
  icon?: string | null;
  imageUrl?: string | null;
  sortOrder: number;
}

export interface ServiceInput {
  name: string;
  description: string;
  icon?: string | null;
  imageUrl?: string | null;
  sortOrder?: number;
}

export interface AdminLoginInput {
  password: string;
}

export interface AdminSession {
  authenticated: boolean;
}
