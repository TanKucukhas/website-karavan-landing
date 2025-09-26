import React from 'react';

interface StatsCardProps {
  value: string | number;
  label: string;
  className?: string;
}

export default function StatsCard({ value, label, className }: StatsCardProps) {
  return (
    <div className={`bg-neutralLight rounded-xl p-6 text-center shadow-md ${className ?? ''}`}>
      <div className="text-3xl font-extrabold text-neutralDark mb-2">{value}</div>
      <div className="text-gray-700 text-sm">{label}</div>
    </div>
  );
}


