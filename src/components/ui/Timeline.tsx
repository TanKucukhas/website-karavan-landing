import React from 'react';

interface TimelineItem { title: string; description?: string; date?: string }
interface TimelineProps { items: TimelineItem[]; className?: string }

export default function Timeline({ items, className }: TimelineProps) {
  return (
    <ol className={`relative border-s border-neutralLight pl-6 space-y-6 ${className ?? ''}`}>
      {items.map((it, idx) => (
        <li key={idx} className="ms-4">
          <div className="absolute w-3 h-3 bg-primary rounded-full -start-1.5 mt-1.5" />
          <h3 className="text-neutralDark font-semibold">{it.title}</h3>
          {it.date && <time className="text-xs text-neutralGray">{it.date}</time>}
          {it.description && <p className="text-sm text-gray-700 mt-1">{it.description}</p>}
        </li>
      ))}
    </ol>
  );
}
