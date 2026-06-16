import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { MOCK_USERS } from '../utils/mockData';

export const Settings: React.FC = () => {
  const { currentUser, setCurrentUserId } = useApp();
  const [selectedUserId, setSelectedUserId] = useState<number>(currentUser?.id || 1);

  const handleUserChange = (userId: number): void => {
    setSelectedUserId(userId);
    setCurrentUserId(userId);
  };

  return (
    <section className="content-section">
      <h2>Paramètres</h2>

      <div className="settings-panel">
        {/* Current User Info */}
        <div className="settings-section">
          <h3>Informations Utilisateur</h3>
          <div className="setting-group">
            <label>Nom</label>
            <input
              type="text"
              value={currentUser?.name || ''}
              disabled
              className="setting-input"
            />
          </div>
          <div className="setting-group">
            <label>Rôle</label>
            <input
              type="text"
              value={currentUser?.role || ''}
              disabled
              className="setting-input"
            />
          </div>
          <div className="setting-group">
            <label>Titre</label>
            <input
              type="text"
              value={currentUser?.title || ''}
              disabled
              className="setting-input"
            />
          </div>
          <div className="setting-group">
            <label>Département</label>
            <input
              type="text"
              value={currentUser?.department || ''}
              disabled
              className="setting-input"
            />
          </div>
          <div className="setting-group">
            <label>Email</label>
            <input
              type="email"
              value={currentUser?.email || ''}
              disabled
              className="setting-input"
            />
          </div>
        </div>

        {/* Switch User */}
        <div className="settings-section">
          <h3>Changer d'Utilisateur (Simulation)</h3>
          <p className="text-gray-600 mb-2">
            Pour tester l'application avec différents rôles
          </p>
          <div className="setting-group">
            <label>Sélectionner un utilisateur</label>
            <select
              value={selectedUserId}
              onChange={(e) => handleUserChange(parseInt(e.target.value))}
              className="setting-select"
            >
              {MOCK_USERS.map((user) => (
                <option key={user.id} value={user.id}>
                  {user.name} - {user.role}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Preferences */}
        <div className="settings-section">
          <h3>Préférences</h3>
          <div className="setting-group checkbox">
            <label>
              <input type="checkbox" defaultChecked />
              <span>Notifications activées</span>
            </label>
          </div>
          <div className="setting-group checkbox">
            <label>
              <input type="checkbox" defaultChecked />
              <span>Emails de rapport hebdomadaires</span>
            </label>
          </div>
          <div className="setting-group checkbox">
            <label>
              <input type="checkbox" />
              <span>Mode sombre</span>
            </label>
          </div>
        </div>

        {/* Data Management */}
        <div className="settings-section danger">
          <h3>Gestion des Données</h3>
          <button
            className="btn-danger"
            onClick={() => {
              if (window.confirm('Êtes-vous sûr? Cette action ne peut pas être annulée.')) {
                localStorage.clear();
                window.location.reload();
              }
            }}
          >
            Réinitialiser les Données
          </button>
        </div>
      </div>
    </section>
  );
};
