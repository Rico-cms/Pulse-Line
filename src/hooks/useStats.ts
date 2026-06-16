import { useMemo } from 'react';
import { useApp } from '../context/AppContext';
import { Stats } from '../types';

export const useStats = (): Stats => {
  const { reports } = useApp();

  return useMemo(() => {
    return {
      submitted: reports.filter((r) => r.status === 'Soumis').length,
      validated: reports.filter((r) => r.status === 'Validé').length,
      rejected: reports.filter((r) => r.status === 'Rejeté').length,
      highPriority: reports.filter((r) => r.criticality === 'Élevé').length,
      draft: reports.filter((r) => r.status === 'Brouillon').length,
    };
  }, [reports]);
};
