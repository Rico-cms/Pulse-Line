import React from 'react';

interface StatCardProps {
  icon: React.ReactNode;
  label: string;
  value: number;
  color?: 'purple' | 'green' | 'red' | 'orange';
}

export const StatCard: React.FC<StatCardProps> = ({
  icon,
  label,
  value,
  color = 'purple',
}) => {
  const colorClasses = {
    purple: 'text-purple-600',
    green: 'text-green-600',
    red: 'text-red-600',
    orange: 'text-orange-600',
  };

  return (
    <div className="stat-card">
      <div className={`stat-header ${colorClasses[color]}`}>
        {icon}
        <span>{label}</span>
      </div>
      <div className={`stat-value ${colorClasses[color]}`}>{value}</div>
    </div>
  );
};
