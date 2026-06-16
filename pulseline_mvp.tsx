import React, { useState, useMemo } from 'react';
import { 
  BarChart3, 
  FileText, 
  Users, 
  Settings, 
  LogOut, 
  CheckCircle2, 
  AlertCircle, 
  Clock, 
  Send,
  Plus,
  ChevronRight,
  MessageSquare,
  Activity,
  ShieldAlert,
  ArrowUpRight
} from 'lucide-react';

// --- BASE DE DONNÉES SIMULÉE ---
const MOCK_USERS = [
  { id: 1, name: "Alice Dubois", role: "DG", title: "Directrice Générale", department: "Direction Générale", managerId: null },
  { id: 2, name: "Marc Leroy", role: "Directeur", title: "Directeur des Opérations", department: "Opérations", managerId: 1 },
  { id: 3, name: "Sophie Martin", role: "Manager", title: "Responsable Import", department: "Import", managerId: 2 },
  { id: 4, name: "Thomas Bernard", role: "Collaborateur", title: "Agent Import", department: "Import", managerId: 3 },
  { id: 5, name: "Julie Petit", role: "Collaborateur", title: "Agent Import", department: "Import", managerId: 3 },
];

const INITIAL_REPORTS = [
  {
    id: 101,
    authorId: 4,
    period: "Semaine 42 - 2023",
    date: "2023-10-20",
    status: "Soumis",
    activities: "Traitement de 45 dossiers d'importation. Relance transitaires.",
    problems: "Blocage douane sur le dossier client X.",
    criticality: "Élevé",
    needs: "Appui du responsable pour débloquer le dossier X avec la douane.",
    decisions: "Validation des frais de surestaries.",
    priorities: "Clôturer les dossiers en attente avant fin de mois.",
    comments: []
  },
  {
    id: 102,
    authorId: 5,
    period: "Semaine 42 - 2023",
    date: "2023-10-19",
    status: "Validé",
    activities: "Mise à jour des tableaux de bord. 20 RFCV soumis.",
    problems: "Lenteur du système interne mardi matin.",
    criticality: "Faible",
    needs: "Aucun",
    decisions: "Aucune",
    priorities: "Préparation audit interne.",
    comments: [{ author: "Sophie Martin", text: "Excellent travail sur les RFCV.", date: "2023-10-20" }]
  },
  {
    id: 103,
    authorId: 3,
    period: "Semaine 42 - 2023",
    date: "2023-10-21",
    status: "Brouillon",
    activities: "Supervision équipe Import. Réunion prestataires.",
    problems: "Retard global sur la ligne maritime Asie.",
    criticality: "Moyen",
    needs: "Révision des délais annoncés aux clients.",
    decisions: "Validation de la nouvelle grille tarifaire transit.",
    priorities: "Négociation contrats 2024.",
    comments: []
  }
];

const getUserById = (id) => MOCK_USERS.find(u => u.id === id);

// --- COMPOSANTS UTILITAIRES ---
const Badge = ({ children, variant = 'default' }) => {
  const variants = {
    default: "bg-gray-100 text-gray-800 border border-gray-200",
    success: "bg-green-50 text-green-700 border border-green-200",
    warning: "bg-orange-50 text-orange-700 border border-orange-200",
    danger: "bg-red-50 text-red-700 border border-red-200",
    primary: "bg-blue-50 text-blue-700 border border-blue-200",
  };
  return (
    <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${variants[variant] || variants.default}`}>
      {children}
    </span>
  );
};

const Card = ({ children, className = "", onClick }) => (
  <div 
    onClick={onClick}
    className={`bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden ${onClick ? 'cursor-pointer hover:shadow-md transition-shadow' : ''} ${className}`}
  >
    {children}
  </div>
);

// --- VUE: TABLEAU DE BORD ---
const Dashboard = ({ currentUser, setCurrentView, myReports, teamReports, accessibleReports, pendingValidations, setSelectedReportId }) => (
  <div className="space-y-6">
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
      <div>
        <h2 className="text-2xl font-bold text-gray-900">Tableau de bord</h2>
        <p className="text-gray-500">Bienvenue, {currentUser.name}.</p>
      </div>
      {currentUser.role !== 'DG' && (
        <button 
          onClick={() => setCurrentView('new_report')}
          className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-lg font-semibold transition-colors shadow-sm"
        >
          <Plus className="w-5 h-5" />
          Nouveau Reporting
        </button>
      )}
    </div>

    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <Card className="p-6 border-l-4 border-l-blue-500" onClick={() => setCurrentView('my_reports')}>
        <div className="flex items-start justify-between">
          <div>
            <p className="text-sm font-bold text-gray-500 uppercase tracking-wide mb-1">Mes Reportings</p>
            <h3 className="text-3xl font-bold text-gray-900">{myReports.length}</h3>
          </div>
          <div className="p-3 bg-blue-50 rounded-xl"><FileText className="w-6 h-6 text-blue-600" /></div>
        </div>
      </Card>

      {currentUser.role !== 'Collaborateur' && (
        <>
          <Card className="p-6 border-l-4 border-l-orange-500" onClick={() => setCurrentView('team_reports')}>
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm font-bold text-gray-500 uppercase tracking-wide mb-1">À Valider</p>
                <h3 className="text-3xl font-bold text-gray-900">{pendingValidations.length}</h3>
              </div>
              <div className="p-3 bg-orange-50 rounded-xl"><Clock className="w-6 h-6 text-orange-600" /></div>
            </div>
          </Card>

          <Card className="p-6 border-l-4 border-l-red-500" onClick={() => setCurrentView('team_reports')}>
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm font-bold text-gray-500 uppercase tracking-wide mb-1">Alertes Critiques</p>
                <h3 className="text-3xl font-bold text-gray-900">
                  {teamReports.filter(r => r.criticality === 'Critique' || r.criticality === 'Élevé').length}
                </h3>
              </div>
              <div className="p-3 bg-red-50 rounded-xl"><ShieldAlert className="w-6 h-6 text-red-600" /></div>
            </div>
          </Card>
        </>
      )}
    </div>

    <Card className="mt-8">
      <div className="p-5 border-b border-gray-100 flex justify-between items-center">
        <h3 className="text-lg font-bold text-gray-800">Activité récente</h3>
      </div>
      <div className="p-0">
        {accessibleReports.length === 0 ? (
          <div className="p-8 text-center text-gray-500">Aucun reporting disponible.</div>
        ) : (
          <div className="divide-y divide-gray-100">
            {accessibleReports.slice(0, 5).map(report => {
              const author = getUserById(report.authorId);
              return (
                <div key={report.id} className="p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-slate-50 transition-colors">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-700 font-bold flex-shrink-0">
                      {author?.name.charAt(0)}
                    </div>
                    <div>
                      <p className="font-bold text-gray-900">{author?.name} <span className="text-gray-500 font-normal text-sm ml-2">{report.period}</span></p>
                      <p className="text-sm text-gray-500 truncate max-w-md mt-0.5">{report.activities}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 self-end sm:self-auto">
                    <Badge variant={
                      report.status === 'Validé' ? 'success' : 
                      report.status === 'Soumis' ? 'primary' : 
                      report.status === 'Rejeté' ? 'danger' : 
                      report.status === 'À corriger' ? 'warning' : 'default'
                    }>
                      {report.status}
                    </Badge>
                    <button 
                      onClick={() => { setSelectedReportId(report.id); setCurrentView('view_report'); }}
                      className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                    >
                      <ChevronRight className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </div>
    </Card>
  </div>
);

// --- VUE: NOUVEAU REPORTING ---
const NewReportForm = ({ currentUser, setCurrentView, handleCreateReport }) => {
  const [formData, setFormData] = useState({
    period: `Semaine ${Math.ceil(new Date().getDate() / 7)} - ${new Date().getFullYear()}`,
    activities: '',
    problems: '',
    criticality: 'Faible',
    needs: '',
    decisions: '',
    priorities: '',
    status: 'Brouillon'
  });

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Nouveau Reporting</h2>
          <p className="text-gray-500">Renseignez vos activités pour la période actuelle.</p>
        </div>
        <button onClick={() => setCurrentView('dashboard')} className="text-gray-500 hover:text-gray-800 font-medium text-sm">
          Annuler
        </button>
      </div>

      <Card className="p-6 sm:p-8">
        <div className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">Période</label>
              <input 
                type="text" 
                className="w-full rounded-lg border-gray-300 border p-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                value={formData.period}
                onChange={e => setFormData({...formData, period: e.target.value})}
              />
            </div>
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">Manager (Validateur)</label>
              <input 
                type="text" 
                disabled
                className="w-full rounded-lg border-gray-200 bg-gray-50 text-gray-500 border p-3 font-medium"
                value={getUserById(currentUser.managerId)?.name || 'Aucun'}
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">Activités réalisées <span className="text-red-500">*</span></label>
            <textarea 
              rows="4" 
              className="w-full rounded-lg border-gray-300 border p-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
              placeholder="Décrivez vos tâches effectuées, dossiers traités, résultats..."
              value={formData.activities}
              onChange={e => setFormData({...formData, activities: e.target.value})}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-5 bg-orange-50 rounded-xl border border-orange-100">
            <div className="md:col-span-2">
              <label className="block text-sm font-bold text-gray-900 mb-2">Problèmes rencontrés</label>
              <textarea 
                rows="2" 
                className="w-full rounded-lg border-gray-300 border p-3 focus:ring-2 focus:ring-orange-500 outline-none"
                placeholder="Blocages, retards, incidents..."
                value={formData.problems}
                onChange={e => setFormData({...formData, problems: e.target.value})}
              />
            </div>
            <div>
              <label className="block text-sm font-bold text-gray-900 mb-2">Criticité</label>
              <select 
                className="w-full rounded-lg border-gray-300 border p-3 focus:ring-2 focus:ring-orange-500 outline-none bg-white font-medium"
                value={formData.criticality}
                onChange={e => setFormData({...formData, criticality: e.target.value})}
              >
                <option>Faible</option>
                <option>Moyen</option>
                <option>Élevé</option>
                <option>Critique</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">Besoins et demandes</label>
              <textarea 
                rows="3" 
                className="w-full rounded-lg border-gray-300 border p-3 focus:ring-2 focus:ring-blue-500 outline-none"
                placeholder="Appui d'un service, budget, accès..."
                value={formData.needs}
                onChange={e => setFormData({...formData, needs: e.target.value})}
              />
            </div>
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">Décisions attendues</label>
              <textarea 
                rows="3" 
                className="w-full rounded-lg border-gray-300 border p-3 focus:ring-2 focus:ring-blue-500 outline-none"
                placeholder="Sujet à trancher, arbitrage..."
                value={formData.decisions}
                onChange={e => setFormData({...formData, decisions: e.target.value})}
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">Priorités de la prochaine période</label>
            <textarea 
              rows="2" 
              className="w-full rounded-lg border-gray-300 border p-3 focus:ring-2 focus:ring-blue-500 outline-none"
              placeholder="Objectifs, relances prévues..."
              value={formData.priorities}
              onChange={e => setFormData({...formData, priorities: e.target.value})}
            />
          </div>

          <div className="pt-6 flex flex-col sm:flex-row justify-end gap-3 border-t border-gray-100">
            <button 
              onClick={() => handleCreateReport({...formData, status: 'Brouillon'})}
              className="px-6 py-3 rounded-lg border border-gray-300 text-gray-700 font-bold hover:bg-gray-50 transition-colors"
            >
              Enregistrer en brouillon
            </button>
            <button 
              onClick={() => handleCreateReport({...formData, status: 'Soumis'})}
              disabled={!formData.activities}
              className="px-6 py-3 rounded-lg bg-blue-600 text-white font-bold hover:bg-blue-700 transition-colors flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Send className="w-5 h-5" />
              Soumettre au manager
            </button>
          </div>
        </div>
      </Card>
    </div>
  );
};

// --- VUE: DÉTAIL D'UN REPORTING ---
const ViewReport = ({ report, currentUser, setCurrentView, handleUpdateReportStatus }) => {
  const [newComment, setNewComment] = useState("");
  
  if (!report) return null;
  const author = getUserById(report.authorId);
  const isManagerView = currentUser.id !== report.authorId && currentUser.role !== 'Collaborateur';

  return (
    <div className="max-w-5xl mx-auto">
      <button onClick={() => setCurrentView(isManagerView ? 'team_reports' : 'my_reports')} className="text-gray-500 hover:text-gray-900 font-bold text-sm flex items-center gap-2 mb-6">
        <ChevronRight className="w-4 h-4 rotate-180" /> Retour à la liste
      </button>

      <div className="flex flex-col lg:flex-row gap-6">
        <div className="flex-1 space-y-6">
          <Card className="p-6 sm:p-8">
            <div className="flex flex-col sm:flex-row sm:items-start justify-between border-b border-gray-100 pb-6 mb-6 gap-4">
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-2">Reporting {report.period}</h2>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-700 font-bold text-sm">
                    {author?.name.charAt(0)}
                  </div>
                  <p className="text-gray-600">Par <span className="font-bold text-gray-900">{author?.name}</span> ({author?.title})</p>
                </div>
              </div>
              <div className="flex flex-col items-end gap-2">
                <Badge variant={
                  report.status === 'Validé' ? 'success' : 
                  report.status === 'Soumis' ? 'primary' : 
                  report.status === 'Rejeté' ? 'danger' : 
                  report.status === 'À corriger' ? 'warning' : 'default'
                }>
                  {report.status}
                </Badge>
                <span className="text-sm text-gray-400 font-medium">Soumis le {report.date}</span>
              </div>
            </div>

            <div className="space-y-8">
              <div>
                <h4 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-3">Activités réalisées</h4>
                <p className="text-gray-800 whitespace-pre-wrap leading-relaxed">{report.activities}</p>
              </div>

              {report.problems && (
                <div className="bg-orange-50 p-5 rounded-xl border border-orange-100">
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="text-xs font-bold text-orange-800 uppercase tracking-widest flex items-center gap-2">
                      <AlertCircle className="w-4 h-4" /> Problèmes rencontrés
                    </h4>
                    <Badge variant={report.criticality === 'Critique' || report.criticality === 'Élevé' ? 'danger' : 'warning'}>
                      {report.criticality}
                    </Badge>
                  </div>
                  <p className="text-orange-900 leading-relaxed">{report.problems}</p>
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-slate-50 p-5 rounded-xl border border-gray-100">
                  <h4 className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-3">Besoins</h4>
                  <p className="text-gray-800 leading-relaxed">{report.needs || 'Aucun'}</p>
                </div>
                <div className="bg-blue-50 p-5 rounded-xl border border-blue-100">
                  <h4 className="text-xs font-bold text-blue-800 uppercase tracking-widest mb-3">Décisions attendues</h4>
                  <p className="text-blue-900 leading-relaxed">{report.decisions || 'Aucune'}</p>
                </div>
              </div>

              <div>
                <h4 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-3">Priorités période suivante</h4>
                <p className="text-gray-800 leading-relaxed">{report.priorities}</p>
              </div>
            </div>
          </Card>

          <Card className="p-6 sm:p-8">
            <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
              <MessageSquare className="w-6 h-6 text-gray-400" /> Historique et commentaires
            </h3>
            
            <div className="space-y-4">
              {report.comments.map((c, i) => (
                <div key={i} className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm">
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-bold text-sm text-gray-900">{c.author}</span>
                    <span className="text-xs font-medium text-gray-400">{c.date}</span>
                  </div>
                  <p className="text-gray-700 text-sm">{c.text}</p>
                </div>
              ))}
              {report.comments.length === 0 && <p className="text-sm text-gray-500 italic p-4 bg-gray-50 rounded-lg text-center">Aucun commentaire pour le moment.</p>}
            </div>
          </Card>
        </div>

        {/* Panneau Manager */}
        {isManagerView && report.status === 'Soumis' && (
          <div className="w-full lg:w-80 flex-shrink-0">
            <Card className="p-6 sticky top-6 border-blue-200 shadow-blue-100 shadow-xl">
              <h3 className="font-bold text-gray-900 mb-4 text-lg">Actions managériales</h3>
              <textarea 
                className="w-full rounded-lg border-gray-300 border p-3 mb-4 focus:ring-2 focus:ring-blue-500 outline-none text-sm"
                rows="4"
                placeholder="Ajouter un commentaire ou motif de refus..."
                value={newComment}
                onChange={e => setNewComment(e.target.value)}
              />
              <div className="space-y-3">
                <button 
                  onClick={() => handleUpdateReportStatus(report.id, 'Validé', newComment)}
                  className="w-full flex justify-center items-center gap-2 bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg font-bold transition-colors shadow-sm"
                >
                  <CheckCircle2 className="w-5 h-5" /> Valider le reporting
                </button>
                <button 
                  onClick={() => handleUpdateReportStatus(report.id, 'À corriger', newComment)}
                  className="w-full flex justify-center items-center gap-2 bg-orange-100 hover:bg-orange-200 text-orange-800 py-3 rounded-lg font-bold transition-colors"
                >
                  <AlertCircle className="w-5 h-5" /> Demander correction
                </button>
                {currentUser.role !== 'DG' && (
                  <button 
                    onClick={() => handleUpdateReportStatus(report.id, 'Escaladé', newComment)}
                    className="w-full flex justify-center items-center gap-2 bg-red-100 hover:bg-red-200 text-red-800 py-3 rounded-lg font-bold transition-colors mt-4"
                  >
                    <ArrowUpRight className="w-5 h-5" /> Escalader au N+2
                  </button>
                )}
              </div>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
};

// --- VUE: LISTE DES RAPPORTS ---
const ReportList = ({ list, title, setSelectedReportId, setCurrentView }) => (
  <div>
    <div className="mb-6">
      <h2 className="text-2xl font-bold text-gray-900">{title}</h2>
    </div>
    <Card>
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-50 text-gray-500 text-xs font-bold uppercase tracking-wider border-b border-gray-100">
              <th className="p-4">Auteur</th>
              <th className="p-4">Période</th>
              <th className="p-4">Statut</th>
              <th className="p-4">Criticité</th>
              <th className="p-4">Date</th>
              <th className="p-4">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {list.length === 0 ? (
              <tr><td colSpan="6" className="p-8 text-center text-gray-500 font-medium">Aucun rapport trouvé dans cette vue.</td></tr>
            ) : (
              list.map(report => {
                const author = getUserById(report.authorId);
                return (
                  <tr key={report.id} className="hover:bg-slate-50 transition-colors">
                    <td className="p-4">
                      <div className="font-bold text-gray-900">{author?.name}</div>
                      <div className="text-xs text-gray-500">{author?.title}</div>
                    </td>
                    <td className="p-4 text-sm font-medium text-gray-700">{report.period}</td>
                    <td className="p-4">
                      <Badge variant={
                        report.status === 'Validé' ? 'success' : 
                        report.status === 'Soumis' ? 'primary' : 
                        report.status === 'Rejeté' ? 'danger' : 
                        report.status === 'À corriger' ? 'warning' : 'default'
                      }>
                        {report.status}
                      </Badge>
                    </td>
                    <td className="p-4">
                       {report.criticality !== 'Faible' ? (
                          <Badge variant={report.criticality === 'Critique' || report.criticality === 'Élevé' ? 'danger' : 'warning'}>
                            {report.criticality}
                          </Badge>
                       ) : <span className="text-sm text-gray-400 font-medium">-</span>}
                    </td>
                    <td className="p-4 text-sm text-gray-500 font-medium">{report.date}</td>
                    <td className="p-4">
                      <button 
                        onClick={() => { setSelectedReportId(report.id); setCurrentView('view_report'); }}
                        className="text-blue-600 hover:text-blue-800 text-sm font-bold transition-colors bg-blue-50 px-3 py-1.5 rounded-lg"
                      >
                        Ouvrir
                      </button>
                    </td>
                  </tr>
                )
              })
            )}
          </tbody>
        </table>
      </div>
    </Card>
  </div>
);

// --- COMPOSANT PRINCIPAL ---
export default function App() {
  const [currentUser, setCurrentUser] = useState(null);
  const [currentView, setCurrentView] = useState('dashboard');
  const [reports, setReports] = useState(INITIAL_REPORTS);
  const [selectedReportId, setSelectedReportId] = useState(null);

  // Obtenir la hiérarchie pour le filtrage
  const getSubordinates = (managerId) => {
    let subs = MOCK_USERS.filter(u => u.managerId === managerId);
    let allSubs = [...subs];
    subs.forEach(sub => {
      allSubs = [...allSubs, ...getSubordinates(sub.id)];
    });
    return allSubs;
  };

  const accessibleReports = useMemo(() => {
    if (!currentUser) return [];
    if (currentUser.role === 'DG') return reports;
    
    const subordinatesIds = getSubordinates(currentUser.id).map(u => u.id);
    return reports.filter(r => r.authorId === currentUser.id || subordinatesIds.includes(r.authorId));
  }, [currentUser, reports]);

  const teamReports = accessibleReports.filter(r => r.authorId !== currentUser?.id && r.status !== 'Brouillon');
  const myReports = accessibleReports.filter(r => r.authorId === currentUser?.id);
  const pendingValidations = teamReports.filter(r => r.status === 'Soumis');

  // Actions
  const handleCreateReport = (data) => {
    const newReport = {
      ...data,
      id: Date.now(),
      authorId: currentUser.id,
      date: new Date().toISOString().split('T')[0],
      comments: []
    };
    setReports([newReport, ...reports]);
    setCurrentView('my_reports');
  };

  const handleUpdateReportStatus = (id, newStatus, commentText) => {
    setReports(reports.map(r => {
      if (r.id === id) {
        const updated = { ...r, status: newStatus };
        if (commentText) {
          updated.comments = [...r.comments, { author: currentUser.name, text: commentText, date: new Date().toISOString().split('T')[0] }];
        }
        return updated;
      }
      return r;
    }));
    setCurrentView(currentUser.role === 'Collaborateur' ? 'my_reports' : 'team_reports');
  };

  // --- ÉCRAN DE CONNEXION ---
  if (!currentUser) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4 font-sans">
        <div className="max-w-md w-full">
          <div className="text-center mb-10">
            <div className="flex justify-center items-center gap-2 mb-3">
              <BarChart3 className="w-12 h-12 text-orange-500" />
              <h1 className="text-5xl font-bold text-blue-900 tracking-tight">Pulse<span className="text-orange-500">Line</span></h1>
            </div>
            <p className="text-gray-500 font-medium text-lg">Connecter. Remonter. Décider.</p>
          </div>
          
          <Card className="p-8 shadow-lg border-none">
            <h2 className="text-lg font-bold mb-6 text-gray-800 text-center">Sélectionnez un profil pour tester le MVP</h2>
            <div className="space-y-3">
              {MOCK_USERS.map(user => (
                <button
                  key={user.id}
                  onClick={() => setCurrentUser(user)}
                  className="w-full flex items-center justify-between p-4 rounded-xl border-2 border-gray-100 hover:border-blue-500 hover:bg-blue-50 transition-all text-left"
                >
                  <div>
                    <div className="font-bold text-gray-900">{user.name}</div>
                    <div className="text-sm text-gray-500">{user.title}</div>
                  </div>
                  <Badge variant={user.role === 'DG' ? 'danger' : user.role === 'Directeur' ? 'warning' : user.role === 'Manager' ? 'primary' : 'default'}>
                    {user.role}
                  </Badge>
                </button>
              ))}
            </div>
          </Card>
        </div>
      </div>
    );
  }

  // --- LAYOUT PRINCIPAL ---
  return (
    <div className="min-h-screen bg-slate-50 flex font-sans">
      {/* Sidebar Desktop */}
      <aside className="w-72 bg-white border-r border-gray-200 hidden md:flex flex-col shadow-sm z-10">
        <div className="h-20 flex items-center px-6 border-b border-gray-100">
          <div className="flex items-center gap-3">
            <BarChart3 className="w-8 h-8 text-orange-500" />
            <span className="text-2xl font-bold text-blue-900">Pulse<span className="text-orange-500">Line</span></span>
          </div>
        </div>
        
        <div className="flex-1 py-6 px-4 space-y-1 overflow-y-auto">
          <button 
            onClick={() => setCurrentView('dashboard')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold transition-colors ${currentView === 'dashboard' ? 'bg-blue-600 text-white shadow-md' : 'text-gray-600 hover:bg-gray-100'}`}
          >
            <Activity className="w-5 h-5" /> Vue d'ensemble
          </button>
          
          <div className="pt-6 pb-2">
            <p className="px-4 text-xs font-bold text-gray-400 uppercase tracking-widest">Reportings</p>
          </div>
          
          <button 
            onClick={() => setCurrentView('my_reports')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold transition-colors ${currentView === 'my_reports' ? 'bg-blue-600 text-white shadow-md' : 'text-gray-600 hover:bg-gray-100'}`}
          >
            <FileText className="w-5 h-5" /> Mes remontées
          </button>

          {currentUser.role !== 'Collaborateur' && (
            <button 
              onClick={() => setCurrentView('team_reports')}
              className={`w-full flex items-center justify-between px-4 py-3 rounded-xl text-sm font-bold transition-colors ${currentView === 'team_reports' ? 'bg-blue-600 text-white shadow-md' : 'text-gray-600 hover:bg-gray-100'}`}
            >
              <div className="flex items-center gap-3">
                <Users className="w-5 h-5" /> Mon Équipe
              </div>
              {pendingValidations.length > 0 && (
                <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${currentView === 'team_reports' ? 'bg-white text-blue-600' : 'bg-orange-500 text-white'}`}>
                  {pendingValidations.length}
                </span>
              )}
            </button>
          )}

          <div className="pt-6 pb-2">
            <p className="px-4 text-xs font-bold text-gray-400 uppercase tracking-widest">Système</p>
          </div>
          
          <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold text-gray-400 cursor-not-allowed" title="Non disponible dans le MVP">
            <Settings className="w-5 h-5" /> Administration
          </button>
        </div>

        <div className="p-4 border-t border-gray-100 bg-gray-50/50">
          <div className="flex items-center gap-3 mb-4 p-2">
            <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-700 font-bold flex-shrink-0">
              {currentUser.name.charAt(0)}
            </div>
            <div className="overflow-hidden">
              <p className="text-sm font-bold text-gray-900 truncate">{currentUser.name}</p>
              <p className="text-xs font-medium text-gray-500 truncate">{currentUser.title}</p>
            </div>
          </div>
          <button 
            onClick={() => { setCurrentUser(null); setCurrentView('dashboard'); }}
            className="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-white border border-gray-200 rounded-lg text-sm font-bold text-gray-700 hover:bg-gray-50 hover:text-red-600 transition-colors shadow-sm"
          >
            <LogOut className="w-4 h-4" /> Changer d'utilisateur
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col h-screen overflow-hidden">
        {/* Mobile Header */}
        <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-4 md:hidden shadow-sm z-10">
          <div className="flex items-center gap-2">
            <BarChart3 className="w-6 h-6 text-orange-500" />
            <span className="text-xl font-bold text-blue-900">PulseLine</span>
          </div>
          <button onClick={() => setCurrentUser(null)} className="text-gray-500 p-2"><LogOut className="w-6 h-6"/></button>
        </header>

        {/* Scrollable Content Area */}
        <div className="flex-1 overflow-auto p-4 md:p-8">
          <div className="max-w-6xl mx-auto pb-12">
            {currentView === 'dashboard' && (
              <Dashboard 
                currentUser={currentUser} 
                setCurrentView={setCurrentView} 
                myReports={myReports} 
                teamReports={teamReports} 
                accessibleReports={accessibleReports} 
                pendingValidations={pendingValidations} 
                setSelectedReportId={setSelectedReportId} 
              />
            )}
            {currentView === 'my_reports' && (
              <ReportList 
                list={myReports} 
                title="Mes remontées d'activité" 
                setSelectedReportId={setSelectedReportId} 
                setCurrentView={setCurrentView} 
              />
            )}
            {currentView === 'team_reports' && (
              <ReportList 
                list={teamReports} 
                title="Remontées de mon périmètre" 
                setSelectedReportId={setSelectedReportId} 
                setCurrentView={setCurrentView} 
              />
            )}
            {currentView === 'new_report' && (
              <NewReportForm 
                currentUser={currentUser} 
                setCurrentView={setCurrentView} 
                handleCreateReport={handleCreateReport} 
              />
            )}
            {currentView === 'view_report' && (
              <ViewReport 
                report={reports.find(r => r.id === selectedReportId)} 
                currentUser={currentUser} 
                setCurrentView={setCurrentView} 
                handleUpdateReportStatus={handleUpdateReportStatus} 
              />
            )}
          </div>
        </div>
      </main>
    </div>
  );
}