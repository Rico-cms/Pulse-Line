import React, { createContext, useState, ReactNode, useContext } from 'react';
import { Report, AppContextType } from '../types';
import { MOCK_USERS, INITIAL_REPORTS } from '../utils/mockData';
import { storageUtils } from '../utils/localStorage';

const AppContext = createContext<AppContextType | undefined>(undefined);

interface AppProviderProps {
  children: ReactNode;
}

export const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
  const [currentUserId, setCurrentUserIdState] = useState<number>(
    storageUtils.getCurrentUser(1)
  );
  const [reports, setReportsState] = useState<Report[]>(
    storageUtils.getReports(INITIAL_REPORTS)
  );

  const currentUser = MOCK_USERS.find((u) => u.id === currentUserId);

  const setReports = (newReports: Report[]): void => {
    setReportsState(newReports);
    storageUtils.saveReports(newReports);
  };

  const setCurrentUserId = (id: number): void => {
    setCurrentUserIdState(id);
    storageUtils.saveCurrentUser(id);
  };

  const value: AppContextType = {
    currentUser,
    reports,
    setReports,
    users: MOCK_USERS,
    setCurrentUserId,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useApp = (): AppContextType => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within AppProvider');
  }
  return context;
};
