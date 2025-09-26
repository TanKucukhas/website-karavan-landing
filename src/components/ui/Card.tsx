import React from 'react';

interface CardProps {
  icon?: React.ReactNode;
  title: string;
  text: string;
  className?: string;
}

export default function Card({ icon, title, text, className }: CardProps) {
  return (
    <div className={`bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow duration-300 ${className ?? ''}`}>
      {icon && <div className="mb-4">{icon}</div>}
      <h3 className="text-lg font-semibold text-neutralDark mb-2">{title}</h3>
      <p className="text-gray-700 text-sm leading-relaxed">{text}</p>
    </div>
  );
}


