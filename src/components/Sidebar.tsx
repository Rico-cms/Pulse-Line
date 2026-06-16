import React from 'react';
import {
  BarChart3,
  FileText,
  Users,
  Settings,
} from 'lucide-react';

interface SidebarProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

interface NavItem {
  id: string;
  icon: React.ReactNode;
  label: string;
}

const NAV_ITEMS: NavItem[] = [
  { id: 'dashboard', icon: <BarChart3 size={20} />, label: 'Dashboard' },
  { id: 'reports', icon: <FileText size={20} />, label: 'Rapports' },
  { id: 'team', icon: <Users size={20} />, label: 'Équipe' },
  { id: 'settings', icon: <Settings size={20} />, label: 'Paramètres' },
];

export const Sidebar: React.FC<SidebarProps> = ({ activeTab, onTabChange }) => {
  return (
    <aside className="sidebar">
      <nav className="nav-menu">
        {NAV_ITEMS.map((item) => (
          <button
            key={item.id}
            className={`nav-item ${activeTab === item.id ? 'active' : ''}`}
            onClick={() => onTabChange(item.id)}
            title={item.label}
          >
            {item.icon}
            <span>{item.label}</span>
          </button>
        ))}
      </nav>
    </aside>
  );
};
