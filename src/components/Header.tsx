import React from 'react';
import { LogOut, Activity, Settings } from 'lucide-react';
import { useApp } from '../context/AppContext';

interface HeaderProps {
  onSettingsClick: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onSettingsClick }) => {
  const { currentUser } = useApp();

  const handleLogout = (): void => {
    if (window.confirm('Êtes-vous sûr de vouloir vous déconnecter?')) {
      window.location.href = '/';
    }
  };

  return (
    <header className="app-header">
      <div className="header-left">
        <Activity size={32} className="logo-icon" />
        <h1>Pulse-Line</h1>
      </div>
      <div className="header-right">
        <div className="user-section">
          <div className="user-info">
            <p className="user-name">{currentUser?.name}</p>
            <p className="user-role">{currentUser?.title}</p>
          </div>
          <button className="btn-icon" onClick={onSettingsClick} title="Paramètres">
            <Settings size={20} />
          </button>
          <button className="btn-icon" onClick={handleLogout} title="Déconnexion">
            <LogOut size={20} />
          </button>
        </div>
      </div>
    </header>
  );
};
