import React from 'react';

type BadgeVariant = 'soumis' | 'validé' | 'rejeté' | 'brouillon' | 'élevé' | 'moyen' | 'bas';

interface BadgeProps {
  children: React.ReactNode;
  variant: BadgeVariant;
}

export const Badge: React.FC<BadgeProps> = ({ children, variant }) => {
  const variantStyles: Record<BadgeVariant, string> = {
    soumis: 'bg-yellow-100 text-yellow-800',
    validé: 'bg-green-100 text-green-800',
    rejeté: 'bg-red-100 text-red-800',
    brouillon: 'bg-gray-100 text-gray-800',
    élevé: 'bg-red-100 text-red-800',
    moyen: 'bg-orange-100 text-orange-800',
    bas: 'bg-green-100 text-green-800',
  };

  return (
    <span className={`badge ${variantStyles[variant]}`}>
      {children}
    </span>
  );
};
