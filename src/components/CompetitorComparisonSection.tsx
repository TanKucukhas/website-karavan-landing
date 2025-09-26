import { useMemo, useState } from 'react';

interface CriteriaRow {
  label: string;
  values: Record<string, string | boolean | number | null>;
}

interface CompetitorComparisonSectionProps {
  criteria: CriteriaRow[];
  competitors: string[]; // column order after the label
}

export default function CompetitorComparisonSection({ criteria, competitors }: CompetitorComparisonSectionProps) {
  const [differencesOnly, setDifferencesOnly] = useState(false);

  const filtered = useMemo(() => {
    if (!differencesOnly) return criteria;
    return criteria.filter(row => {
      const vals = competitors.map(c => String(row.values[c] ?? ''));
      return new Set(vals).size > 1;
    });
  }, [criteria, competitors, differencesOnly]);

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-2xl font-heading font-bold text-neutralDark">Competitor Comparison</h3>
          <label className="text-sm text-neutralDark inline-flex items-center gap-2">
            <input type="checkbox" checked={differencesOnly} onChange={e => setDifferencesOnly(e.target.checked)} />
            Show differences only
          </label>
        </div>
        <div className="overflow-x-auto rounded-xl border border-neutralLight">
          <table className="min-w-full text-sm">
            <thead className="sticky top-0 bg-white z-10">
              <tr>
                <th className="text-left p-3 border-b border-neutralLight w-1/3">Criteria</th>
                {competitors.map((c, i) => (
                  <th key={i} className="text-left p-3 border-b border-neutralLight">{c}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map((row, idx) => (
                <tr key={idx} className="odd:bg-neutralLight/40">
                  <td className="p-3 border-b border-neutralLight font-medium text-neutralDark">{row.label}</td>
                  {competitors.map((c, j) => (
                    <td key={j} className="p-3 border-b border-neutralLight text-gray-700">
                      {String(row.values[c] ?? '')}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}


