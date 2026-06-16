import React, { useState } from 'react';
import { Plus, Send, MessageSquare, CheckCircle2, AlertCircle } from 'lucide-react';
import { Badge } from '../components/Badge';
import { useApp } from '../context/AppContext';
import { getUserById } from '../utils/mockData';
import { Report } from '../types';

type BadgeVariant = 'soumis' | 'validé' | 'rejeté' | 'brouillon' | 'élevé' | 'moyen' | 'bas';

interface ReportsProps {
  selectedReportId: number | null;
  onSelectReport: (id: number) => void;
}

export const Reports: React.FC<ReportsProps> = ({ selectedReportId, onSelectReport }) => {
  const { reports, setReports, currentUser } = useApp();
  const [newComment, setNewComment] = useState<string>('');
  const [filter, setFilter] = useState<string>('all');

  const selectedReport = reports.find((r) => r.id === selectedReportId);

  const filteredReports =
    filter === 'all'
      ? reports
      : reports.filter((r) => r.status.toLowerCase() === filter.toLowerCase());

  const handleAddComment = (): void => {
    if (!newComment.trim() || !selectedReport) return;

    const updatedReports = reports.map((r) => {
      if (r.id === selectedReport.id) {
        return {
          ...r,
          comments: [
            ...r.comments,
            {
              id: r.comments.length + 1,
              authorId: currentUser?.id || 1,
              author: currentUser?.name || 'Anonymous',
              text: newComment,
              date: new Date().toISOString().split('T')[0],
            },
          ],
        };
      }
      return r;
    });

    setReports(updatedReports);
    setNewComment('');
  };

  const handleValidateReport = (): void => {
    if (!selectedReport) return;

    const updatedReports = reports.map((r) =>
      r.id === selectedReport.id ? { ...r, status: 'Validé' as const } : r,
    );
    setReports(updatedReports);
  };

  const handleRejectReport = (): void => {
    if (!selectedReport) return;

    const updatedReports = reports.map((r) =>
      r.id === selectedReport.id ? { ...r, status: 'Rejeté' as const } : r,
    );
    setReports(updatedReports);
  };

  const handleCreateReport = (): void => {
    const newReport: Report = {
      id: Math.max(...reports.map((r) => r.id), 0) + 1,
      authorId: currentUser?.id || 1,
      period: `Semaine ${new Date().getWeek()} - ${new Date().getFullYear()}`,
      date: new Date().toISOString().split('T')[0],
      status: 'Brouillon',
      activities: '',
      problems: '',
      criticality: 'Bas',
      needs: '',
      decisions: '',
      priorities: '',
      comments: [],
    };

    const updatedReports = [newReport, ...reports];
    setReports(updatedReports);
    onSelectReport(newReport.id);
  };

  return (
    <section className="content-section">
      <div className="reports-container">
        {/* Reports List */}
        <div className="reports-list">
          <div className="reports-header">
            <h2>Rapports</h2>
            <button className="btn-primary" onClick={handleCreateReport}>
              <Plus size={20} />
              Nouveau
            </button>
          </div>

          {/* Filter */}
          <div className="filter-group">
            <label>Filtrer par statut:</label>
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="filter-select"
            >
              <option value="all">Tous</option>
              <option value="brouillon">Brouillon</option>
              <option value="soumis">Soumis</option>
              <option value="validé">Validé</option>
              <option value="rejeté">Rejeté</option>
            </select>
          </div>

          {/* Reports Items */}
          <div className="reports-items">
            {filteredReports.length > 0 ? (
              filteredReports.map((report) => (
                <div
                  key={report.id}
                  className={`report-item ${selectedReport?.id === report.id ? 'active' : ''}`}
                  onClick={() => onSelectReport(report.id)}
                >
                  <div className="report-item-header">
                    <span className="report-period">{report.period}</span>
                    <Badge variant={report.status.toLowerCase() as any}>
                      {report.status}
                    </Badge>
                  </div>
                  <div className="report-item-meta">
                    {report.date} • {getUserById(report.authorId)?.name}
                  </div>
                </div>
              ))
            ) : (
              <p className="text-gray-500">Aucun rapport trouvé</p>
            )}
          </div>
        </div>

        {/* Report Details */}
        {selectedReport ? (
          <div className="report-details">
            <div className="report-header">
              <div>
                <h2>{selectedReport.period}</h2>
                <p className="text-gray-500">{selectedReport.date}</p>
              </div>
              <div className="report-actions">
                  <Badge variant={selectedReport.status.toLowerCase() as BadgeVariant}>
                  {selectedReport.status}
                </Badge>
                {selectedReport.status === 'Soumis' && (
                  <>
                    <button
                      className="btn-success"
                      onClick={handleValidateReport}
                    >
                      <CheckCircle2 size={16} />
                      Valider
                    </button>
                    <button
                      className="btn-danger"
                      onClick={handleRejectReport}
                    >
                      <AlertCircle size={16} />
                      Rejeter
                    </button>
                  </>
                )}
              </div>
            </div>

            <div className="report-content">
              <div className="report-section">
                <h3>Activités</h3>
                <p>{selectedReport.activities}</p>
              </div>

              <div className="report-section">
                <h3>Problèmes</h3>
                <p>{selectedReport.problems}</p>
              </div>

              <div className="report-grid">
                <div className="report-section">
                  <h3>Criticité</h3>
                  <Badge variant={selectedReport.criticality.toLowerCase() as BadgeVariant}>
                    {selectedReport.criticality}
                  </Badge>
                </div>

                <div className="report-section">
                  <h3>Appui Nécessaire</h3>
                  <p>{selectedReport.needs || 'Aucun'}</p>
                </div>
              </div>

              <div className="report-section">
                <h3>Décisions</h3>
                <p>{selectedReport.decisions}</p>
              </div>

              <div className="report-section">
                <h3>Priorités</h3>
                <p>{selectedReport.priorities}</p>
              </div>
            </div>

            {/* Comments Section */}
            <div className="report-comments">
              <h3>
                <MessageSquare size={18} />
                Commentaires ({selectedReport.comments.length})
              </h3>

              <div className="comments-list">
                {selectedReport.comments.length > 0 ? (
                  selectedReport.comments.map((comment) => (
                    <div key={comment.id} className="comment">
                      <div className="comment-header">
                        <span className="comment-author">{comment.author}</span>
                        <span className="comment-date">{comment.date}</span>
                      </div>
                      <p className="comment-text">{comment.text}</p>
                    </div>
                  ))
                ) : (
                  <p className="text-gray-500">Aucun commentaire</p>
                )}
              </div>

              <div className="comment-input">
                <textarea
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  placeholder="Ajouter un commentaire..."
                />
                <button
                  className="btn-primary"
                  onClick={handleAddComment}
                  disabled={!newComment.trim()}
                >
                  <Send size={16} />
                  Envoyer
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div className="report-details empty">
            <p>Sélectionnez un rapport pour voir les détails</p>
          </div>
        )}
      </div>
    </section>
  );
};
