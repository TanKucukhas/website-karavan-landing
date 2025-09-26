import React, { useState } from 'react';

interface Item { title: string; content: React.ReactNode }
interface AccordionProps { items: Item[]; className?: string }

export default function Accordion({ items, className }: AccordionProps) {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <div className={`divide-y divide-neutralLight rounded-xl border border-neutralLight ${className ?? ''}`}>
      {items.map((it, idx) => {
        const isOpen = open === idx;
        return (
          <div key={idx}>
            <button
              className="w-full text-left px-4 py-3 flex items-center justify-between focus:outline-none focus:ring-2 focus:ring-primary"
              aria-expanded={isOpen}
              onClick={() => setOpen(isOpen ? null : idx)}
            >
              <span className="font-medium text-neutralDark">{it.title}</span>
              <span className={`transition-transform ${isOpen ? 'rotate-180' : ''}`}>▾</span>
            </button>
            {isOpen && (
              <div className="px-4 pb-4 text-gray-700 text-sm leading-relaxed">{it.content}</div>
            )}
          </div>
        );
      })}
    </div>
  );
}
