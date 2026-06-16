// Données simulées pour l'application

import { User, Report } from '../types';

export const MOCK_USERS: User[] = [
  {
    id: 1,
    name: 'Alice Dubois',
    role: 'DG',
    title: 'Directrice Générale',
    department: 'Direction Générale',
    managerId: null,
    email: 'alice.dubois@pulseline.fr',
  },
  {
    id: 2,
    name: 'Marc Leroy',
    role: 'Directeur',
    title: 'Directeur des Opérations',
    department: 'Opérations',
    managerId: 1,
    email: 'marc.leroy@pulseline.fr',
  },
  {
    id: 3,
    name: 'Sophie Martin',
    role: 'Manager',
    title: 'Responsable Import',
    department: 'Import',
    managerId: 2,
    email: 'sophie.martin@pulseline.fr',
  },
  {
    id: 4,
    name: 'Thomas Bernard',
    role: 'Collaborateur',
    title: 'Agent Import',
    department: 'Import',
    managerId: 3,
    email: 'thomas.bernard@pulseline.fr',
  },
  {
    id: 5,
    name: 'Julie Petit',
    role: 'Collaborateur',
    title: 'Agent Import',
    department: 'Import',
    managerId: 3,
    email: 'julie.petit@pulseline.fr',
  },
];

export const INITIAL_REPORTS: Report[] = [
  {
    id: 101,
    authorId: 4,
    period: 'Semaine 42 - 2023',
    date: '2023-10-20',
    status: 'Soumis',
    activities: 'Traitement de 45 dossiers d\'importation. Relance transitaires.',
    problems: 'Blocage douane sur le dossier client X.',
    criticality: 'Élevé',
    needs: 'Appui du responsable pour débloquer le dossier X avec la douane.',
    decisions: 'Validation des frais de surestaries.',
    priorities: 'Clôturer les dossiers en attente avant fin de mois.',
    comments: [],
  },
  {
    id: 102,
    authorId: 5,
    period: 'Semaine 42 - 2023',
    date: '2023-10-19',
    status: 'Validé',
    activities: 'Mise à jour des tableaux de bord. 20 RFCV soumis.',
    problems: 'Lenteur du système interne mardi matin.',
    criticality: 'Bas',
    needs: '',
    decisions: 'Continuité du traitement standard',
    priorities: 'Préparation audit interne.',
    comments: [
      {
        id: 1,
        authorId: 3,
        author: 'Sophie Martin',
        text: 'Excellent travail sur les RFCV.',
        date: '2023-10-20',
      },
    ],
  },
  {
    id: 103,
    authorId: 3,
    period: 'Semaine 41 - 2023',
    date: '2023-10-21',
    status: 'Brouillon',
    activities: 'Supervision équipe Import. Réunion prestataires.',
    problems: 'Retard global sur la ligne maritime Asie.',
    criticality: 'Moyen',
    needs: 'Révision des délais annoncés aux clients.',
    decisions: 'Validation de la nouvelle grille tarifaire transit.',
    priorities: 'Négociation contrats 2024.',
    comments: [],
  },
];

export const getUserById = (id: number): User | undefined => {
  return MOCK_USERS.find((u) => u.id === id);
};

export const getTeamMembers = (managerId: number): User[] => {
  return MOCK_USERS.filter((u) => u.managerId === managerId);
};
