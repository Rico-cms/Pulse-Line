import React, { useState } from 'react';
import './App.css';
import { AppProvider } from './context/AppContext';
import { Header } from './components/Header';
import { Sidebar } from './components/Sidebar';
import { Dashboard } from './pages/Dashboard';
import { Reports } from './pages/Reports';
import { Team } from './pages/Team';
import { Settings } from './pages/Settings';
import { Modal } from './components/Modal';
import './utils/dateExtensions';

const AppContent: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>('dashboard');
  const [selectedReportId, setSelectedReportId] = useState<number | null>(101);
  const [settingsOpen, setSettingsOpen] = useState<boolean>(false);

  return (
    <div className="app">
      <Header onSettingsClick={() => setSettingsOpen(true)} />

      <div className="app-container">
        <Sidebar activeTab={activeTab} onTabChange={setActiveTab} />

        <main className="main-content">
          {activeTab === 'dashboard' && (
            <Dashboard onReportClick={setSelectedReportId} onTabChange={setActiveTab} />
          )}

          {activeTab === 'reports' && (
            <Reports
              selectedReportId={selectedReportId}
              onSelectReport={setSelectedReportId}
            />
          )}

          {activeTab === 'team' && <Team />}

          {activeTab === 'settings' && <Settings />}
        </main>
      </div>

      <Modal
        isOpen={settingsOpen}
        onClose={() => setSettingsOpen(false)}
        title="Paramètres"
      >
        <Settings />
      </Modal>
    </div>
  );
};

const App: React.FC = () => {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
};

export default App;
