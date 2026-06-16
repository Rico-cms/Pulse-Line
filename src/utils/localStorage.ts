// Utilitaires pour la gestion du localStorage

import { Report } from '../types';

const STORAGE_KEYS = {
  REPORTS: 'pulseline_reports',
  CURRENT_USER: 'pulseline_current_user',
};

export const storageUtils = {
  // Reports
  saveReports: (reports: Report[]): void => {
    try {
      localStorage.setItem(STORAGE_KEYS.REPORTS, JSON.stringify(reports));
    } catch (error) {
      console.error('Error saving reports:', error);
    }
  },

  getReports: (initialReports: Report[]): Report[] => {
    try {
      const stored = localStorage.getItem(STORAGE_KEYS.REPORTS);
      return stored ? JSON.parse(stored) : initialReports;
    } catch (error) {
      console.error('Error getting reports:', error);
      return initialReports;
    }
  },

  // Current User
  saveCurrentUser: (userId: number): void => {
    try {
      localStorage.setItem(STORAGE_KEYS.CURRENT_USER, userId.toString());
    } catch (error) {
      console.error('Error saving current user:', error);
    }
  },

  getCurrentUser: (defaultId: number): number => {
    try {
      const stored = localStorage.getItem(STORAGE_KEYS.CURRENT_USER);
      return stored ? parseInt(stored, 10) : defaultId;
    } catch (error) {
      console.error('Error getting current user:', error);
      return defaultId;
    }
  },

  clearAll: (): void => {
    try {
      localStorage.removeItem(STORAGE_KEYS.REPORTS);
      localStorage.removeItem(STORAGE_KEYS.CURRENT_USER);
    } catch (error) {
      console.error('Error clearing localStorage:', error);
    }
  },
};
