interface Bullet { text: string; highlightWords?: string[] }
interface PaymentMethod { icon?: React.ReactNode; title: string }

interface InnovationSectionProps {
  bullets: Bullet[];
  paymentMethods: PaymentMethod[]; // expect length 4
}

export default function InnovationSection({ bullets, paymentMethods }: InnovationSectionProps) {
  const highlight = (text: string, words: string[] = []) => {
    if (!words.length) return text;
    const pattern = new RegExp(`(${words.map(w => w.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')).join('|')})`, 'gi');
    const parts = text.split(pattern);
    return parts.map((p, i) => words.some(w => w.toLowerCase() === p.toLowerCase()) ? (
      <strong key={i} className="text-brand-ink">{p}</strong>
    ) : (
      <span key={i}>{p}</span>
    ));
  };

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-start">
          <ul className="space-y-4">
            {bullets.map((b, idx) => (
              <li key={idx} className="flex items-start gap-3">
                <span className="mt-1 inline-block w-2 h-2 rounded-full bg-accent" />
                <p className="text-neutralDark leading-relaxed">{highlight(b.text, b.highlightWords)}</p>
              </li>
            ))}
          </ul>
          <div className="grid grid-cols-2 gap-4">
            {paymentMethods.slice(0, 4).map((pm, i) => (
              <div key={i} className="bg-neutralLight rounded-xl p-4 border border-neutralLight flex items-center gap-3">
                {pm.icon && <span className="text-accent">{pm.icon}</span>}
                <span className="font-medium text-neutralDark">{pm.title}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}


