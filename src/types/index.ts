// Types pour l'application Pulse-Line

export interface User {
  id: number;
  name: string;
  role: 'DG' | 'Directeur' | 'Manager' | 'Collaborateur';
  title: string;
  department: string;
  managerId: number | null;
  email?: string;
  avatar?: string;
}

export interface Comment {
  id: number;
  authorId: number;
  text: string;
  date: string;
  author?: string;
}

export interface Report {
  id: number;
  authorId: number;
  period: string;
  date: string;
  status: 'Brouillon' | 'Soumis' | 'Validé' | 'Rejeté';
  activities: string;
  problems: string;
  criticality: 'Bas' | 'Moyen' | 'Élevé';
  needs: string;
  decisions: string;
  priorities: string;
  comments: Comment[];
}

export interface Stats {
  submitted: number;
  validated: number;
  rejected: number;
  highPriority: number;
  draft: number;
}

export interface AppContextType {
  currentUser: User | undefined;
  reports: Report[];
  setReports: (reports: Report[]) => void;
  users: User[];
  setCurrentUserId: (id: number) => void;
}
