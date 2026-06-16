import React from 'react';
import { Mail, Building2, Briefcase } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { getTeamMembers } from '../utils/mockData';

export const Team: React.FC = () => {
  const { currentUser, users } = useApp();

  const teamMembers = currentUser ? getTeamMembers(currentUser.id) : [];
  const allTeam = currentUser?.role === 'DG' ? users.slice(1) : teamMembers;

  return (
    <section className="content-section">
      <h2>Mon Équipe</h2>

      {allTeam.length > 0 ? (
        <div className="team-grid">
          {allTeam.map((member) => (
            <div key={member.id} className="team-card">
              <div className="team-card-header">
                <h3>{member.name}</h3>
                <span className="role-badge">{member.role}</span>
              </div>
              <p className="team-title">
                <Briefcase size={14} />
                {member.title}
              </p>
              <p className="team-department">
                <Building2 size={14} />
                {member.department}
              </p>
              <p className="team-email">
                <Mail size={14} />
                <a href={`mailto:${member.email}`}>{member.email}</a>
              </p>
            </div>
          ))}
        </div>
      ) : (
        <div className="empty-state">
          <p>Aucun membre d'équipe à afficher</p>
        </div>
      )}

      {/* Organization Chart */}
      <section className="org-structure mt-4">
        <h3>Structure Organisationnelle</h3>
        <div className="org-chart">
          <div className="org-level">
            <span>Direction Générale</span>
          </div>
          <div className="org-level">
            <span>Opérations</span>
            <span>Autres Départements</span>
          </div>
          <div className="org-level">
            <span>Import/Export</span>
          </div>
          <div className="org-level">
            <span>Collaborateurs</span>
          </div>
        </div>
      </section>
    </section>
  );
};
