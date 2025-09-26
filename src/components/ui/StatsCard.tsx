import React from 'react';

interface StatsCardProps {
  value: string | number;
  label: string;
  icon?: React.ReactNode;
  className?: string;
}

export default function StatsCard({ value, label, icon, className }: StatsCardProps) {
  return (
    <div className={`bg-neutralLight rounded-xl p-6 text-center shadow-md ${className ?? ''}`}>
      {icon && <div className="mb-2 flex items-center justify-center text-primary">{icon}</div>}
      <div className="text-4xl font-extrabold text-neutralDark mb-2">{value}</div>
      <div className="text-gray-700 text-sm">{label}</div>
    </div>
  );
}


