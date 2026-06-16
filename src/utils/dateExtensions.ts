// Extension des méthodes Date

declare global {
  interface Date {
    getWeek(): number;
  }
}

// Fonction pour obtenir le numéro de semaine
Date.prototype.getWeek = function (): number {
  const date = new Date(this.getTime());
  date.setHours(0, 0, 0, 0);
  date.setDate(date.getDate() + 4 - (date.getDay() || 7));
  const yearStart = new Date(date.getFullYear(), 0, 1);
  const diff = (date.getTime() - yearStart.getTime()) / 86400000;
  return Math.floor(diff / 7) + 1;
};

export {};
