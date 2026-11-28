import { useState } from 'react';

type PlayerView = 'haaland' | 'aitnouri' | 'both';

interface MetricRow {
  label: string;
  val: number;
  widthClass: string;
  tone: 'gold' | 'red';
  sub?: string;
}

interface PlayerCase {
  rows: MetricRow[];
  insightLead: string;
  insightBody: string;
}

const PLAYERS: Record<PlayerView, PlayerCase> = {
  haaland: {
    rows: [
      {
        label: 'Nota real en cancha (1–10)',
        val: 7.5,
        widthClass: 'w-[75%]',
        tone: 'gold',
      },
      {
        label: 'Índice de menciones en Instagram (1–10)',
        val: 3.0,
        widthClass: 'w-[30%]',
        tone: 'red',
      },
    ],
    insightLead: 'Condenado por su propia excelencia:',
    insightBody:
      " Haaland firma un sólido 7.5, pero para el hincha es simplemente 'cumplir con el expediente'. Sin sorpresa, la conversación cae a 3.0.",
  },
  aitnouri: {
    rows: [
      {
        label: 'Nota real en cancha (1–10)',
        val: 8.8,
        widthClass: 'w-[88%]',
        tone: 'gold',
      },
      {
        label: 'Índice de menciones en Instagram (1–10)',
        val: 9.0,
        widthClass: 'w-[90%]',
        tone: 'gold',
      },
    ],
    insightLead: 'Shock emocional ante lo inédito:',
    insightBody:
      ' Cuando un futbolista de perfil más discreto alcanza un 8.8 inesperado, rompe el guion y dispara las menciones digitales hasta 9.0.',
  },
  both: {
    rows: [
      {
        label: 'Haaland — Nota en cancha (7.5) vs. Menciones IG (3.0)',
        val: 3.0,
        widthClass: 'w-[30%]',
        tone: 'red',
        sub: 'Brecha: -4.5 pts de atención digital frente a su rendimiento',
      },
      {
        label: 'Aït-Nouri — Nota en cancha (8.8) vs. Menciones IG (9.0)',
        val: 9.0,
        widthClass: 'w-[90%]',
        tone: 'gold',
        sub: 'Brecha: +0.2 pts (pico máximo de conversación en redes)',
      },
    ],
    insightLead: 'Conclusión:',
    insightBody:
      ' Instagram no mide quién juega mejor, sino qué tan lejos estuvo un jugador de lo que la tribuna esperaba de él.',
  },
};

const CONTROL_OPTIONS: { id: PlayerView; label: string }[] = [
  { id: 'haaland', label: 'Erling Haaland (Man City)' },
  { id: 'aitnouri', label: 'Rayan Aït-Nouri (Irrupción)' },
  { id: 'both', label: 'Ver contraste lado a lado' },
];

export default function GraficoViolacionExpectativas() {
  const [selected, setSelected] = useState<PlayerView>('haaland');
  const current = PLAYERS[selected];

  return (
    <div className="mx-auto w-full max-w-[740px] rounded-[12px] border border-[rgba(244,246,245,0.16)] border-t-[3px] border-t-[#D4AF37] bg-[#132A1F] px-5 py-5 text-[#F4F6F5] shadow-xl font-['Roboto',sans-serif]">
      <div className="mb-1 text-[0.74rem] font-bold uppercase tracking-[0.09em] text-[#D4AF37]">
        Gráfico 01 · Teoría de la Violación de las Expectativas
      </div>

      <h3 className="mb-1.5 font-['Bebas_Neue',sans-serif] text-[1.65rem] font-normal leading-[1.12] tracking-[0.03em] text-[#F4F6F5]">
        Rendimiento en cancha vs. ruido en Instagram
      </h3>

      <p className="mb-4 text-[0.88rem] leading-snug text-[#C3D0C9]">
        Escala normalizada de 1 a 10. Selecciona un caso para comparar el partido real frente a su impacto digital:
      </p>

      {/* Botones para alternar entre jugadores */}
      <div className="mb-5 flex flex-wrap gap-2" role="group" aria-label="Seleccionar jugador para comparar">
        {CONTROL_OPTIONS.map((opt) => {
          const isActive = selected === opt.id;
          return (
            <button
              key={opt.id}
              type="button"
              onClick={() => setSelected(opt.id)}
              aria-pressed={isActive}
              className={`cursor-pointer rounded-[8px] border px-4 py-2 font-['Bebas_Neue',sans-serif] text-[1.05rem] leading-none tracking-[0.04em] transition-all duration-200 ${
                isActive
                  ? 'border-[#D4AF37] bg-[#D4AF37] text-[#132A1F]'
                  : 'border-[rgba(244,246,245,0.16)] bg-[rgba(244,246,245,0.06)] text-[#F4F6F5] hover:border-[#D4AF37] hover:bg-[#D4AF37] hover:text-[#132A1F]'
              }`}
            >
              {opt.label}
            </button>
          );
        })}
      </div>

      {/* Barras de métricas */}
      <div className="mb-4 flex flex-col gap-4" aria-live="polite">
        {current.rows.map((row, idx) => (
          <div key={idx} className="rounded-[8px] bg-[rgba(255,255,255,0.03)] px-3.5 py-3">
            <div className="mb-1.5 flex items-baseline justify-between gap-3">
              <span className="text-[0.88rem] font-medium text-[#F4F6F5]">{row.label}</span>
              <span
                className={`shrink-0 font-['Bebas_Neue',sans-serif] text-[1.45rem] leading-none ${
                  row.tone === 'red' ? 'text-[#FF7B7D]' : 'text-[#D4AF37]'
                }`}
              >
                {row.val.toFixed(1)} / 10
              </span>
            </div>

            <div className="h-4 w-full overflow-hidden rounded-full bg-[rgba(244,246,245,0.1)]">
              <div
                className={`h-full rounded-full transition-[width] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                  row.tone === 'red' ? 'bg-[#D9383A]' : 'bg-[#D4AF37]'
                } ${row.widthClass}`}
              />
            </div>

            {row.sub && (
              <div className="mt-1.5 text-[0.78rem] text-[#C3D0C9]">{row.sub}</div>
            )}
          </div>
        ))}
      </div>

      {/* Insight */}
      <div
        className="rounded-[8px] border-l-4 border-l-[#D4AF37] bg-[#1B3B2B] px-4 py-3.5 text-[0.88rem] leading-relaxed text-[#C3D0C9]"
        aria-live="polite"
      >
        <strong className="font-bold text-[#F4F6F5]">{current.insightLead}</strong>
        {current.insightBody}
      </div>
    </div>
  );
}
