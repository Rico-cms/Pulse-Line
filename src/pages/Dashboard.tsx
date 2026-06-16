import React from 'react';
import {
  BarChart3,
  CheckCircle2,
  AlertCircle,
  Clock,
  FileText,
  ArrowUpRight,
} from 'lucide-react';
import { StatCard } from '../components/StatCard';
import { Badge } from '../components/Badge';
import { useApp } from '../context/AppContext';
import { useStats } from '../hooks/useStats';
import { getUserById } from '../utils/mockData';

type BadgeVariant = 'soumis' | 'validé' | 'rejeté' | 'brouillon';

interface DashboardProps {
  onReportClick: (reportId: number) => void;
  onTabChange: (tab: string) => void;
}

export const Dashboard: React.FC<DashboardProps> = ({ onReportClick, onTabChange }) => {
  const { reports } = useApp();
  const stats = useStats();

  const recentReports = reports.slice(0, 5);

  return (
    <section className="content-section">
      <h2>Dashboard</h2>

      {/* Stats Grid */}
      <div className="stats-grid">
        <StatCard
          icon={<FileText size={24} />}
          label="Rapports Soumis"
          value={stats.submitted}
          color="purple"
        />
        <StatCard
          icon={<CheckCircle2 size={24} />}
          label="Rapports Validés"
          value={stats.validated}
          color="green"
        />
        <StatCard
          icon={<AlertCircle size={24} />}
          label="Rapports Rejetés"
          value={stats.rejected}
          color="red"
        />
        <StatCard
          icon={<ArrowUpRight size={24} />}
          label="Priorité Élevée"
          value={stats.highPriority}
          color="orange"
        />
      </div>

      {/* Recent Activity */}
      <section className="recent-activity">
        <h3>Activité Récente</h3>
        <div className="activity-list">
          {recentReports.length > 0 ? (
            recentReports.map((report) => (
              <div
                key={report.id}
                className="activity-item"
                onClick={() => {
                  onReportClick(report.id);
                  onTabChange('reports');
                }}
              >
                <div className="activity-icon">
                  <Clock size={20} />
                </div>
                <div className="activity-content">
                  <div className="activity-title">
                    Rapport {report.period}
                    {getUserById(report.authorId) && (
                      <span className="text-gray-500 text-sm ml-2">
                        par {getUserById(report.authorId)?.name}
                      </span>
                    )}
                  </div>
                  <div className="activity-meta">{report.date}</div>
                </div>
                <Badge variant={report.status.toLowerCase() as BadgeVariant}>
                  {report.status}
                </Badge>
              </div>
            ))
          ) : (
            <p className="text-gray-500">Aucun rapport pour le moment</p>
          )}
        </div>
      </section>

      {/* Quick Actions */}
      <section className="quick-actions">
        <h3>Actions Rapides</h3>
        <div className="actions-grid">
          <button
            className="action-card"
            onClick={() => onTabChange('reports')}
          >
            <FileText size={24} />
            <span>Créer un Rapport</span>
          </button>
          <button
            className="action-card"
            onClick={() => onTabChange('team')}
          >
            <BarChart3 size={24} />
            <span>Voir l'Équipe</span>
          </button>
        </div>
      </section>
    </section>
  );
};
