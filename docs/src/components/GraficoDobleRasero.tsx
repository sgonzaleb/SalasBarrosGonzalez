import { useState } from 'react';

interface PromiseItem {
  id: string;
  player: string;
  club: string;
  pct: number;
  widthClass: string;
  fillClass: string;
  redText: boolean;
  badge: string;
  match: string;
  quote: string;
  note: string;
}

const ITEMS: PromiseItem[] = [
  {
    id: 'samba',
    player: 'Floyd Samba (17 años)',
    club: 'Man City',
    pct: 100,
    widthClass: 'w-full',
    fillClass: 'bg-[#D4AF37]',
    redText: false,
    badge: 'PROMESA · INDULGENCIA TOTAL',
    match: 'Instagram oficial: City V Norwich',
    quote: '“Floyd Samba remember the name🔥 / Samba is an absolute gem !!!🩵🤞😭”',
    note: '11 menciones directas de respaldo unánime: la hinchada lo pide en la rotación sin exigirle historial en élite.',
  },
  {
    id: 'u21',
    player: 'Juveniles Sub-21',
    club: 'Man United',
    pct: 93,
    widthClass: 'w-[93%]',
    fillClass: 'bg-[#D4AF37]',
    redText: false,
    badge: 'CANTERA · INDULGENCIA TOTAL',
    match: 'Instagram oficial: United V Brentford',
    quote: '“Atleast the u21s can win games / It’s always U21/20 can’t the big team level up”',
    note: 'Los hinchas usan el triunfo juvenil como escudo de ilusión frente a la irregularidad del primer equipo.',
  },
  {
    id: 'gakpo',
    player: 'Cody Gakpo',
    club: 'Liverpool',
    pct: 30,
    widthClass: 'w-[30%]',
    fillClass: 'bg-[#E07A2B]',
    redText: true,
    badge: 'PRIMER EQUIPO · REDENCIÓN TARDÍA',
    match: 'Instagram oficial: Liverpool V Bournemouth',
    quote: '“Gakpo we owe you an apology mate🔥😂 / Gakpo is pure class...We owe him a big apology 🙌”',
    note: 'Tras meses de cuestionamientos, recién al encadenar goles aparecen mensajes de disculpa en la tribuna.',
  },
  {
    id: 'zirkzee',
    player: 'Joshua Zirkzee',
    club: 'Man United',
    pct: 12,
    widthClass: 'w-[12%]',
    fillClass: 'bg-[#D9383A]',
    redText: true,
    badge: 'PRIMER EQUIPO / FICHAJE · JUICIO IMPLACABLE',
    match: 'Instagram oficial: United V Brentford / Fulham',
    quote: '“Sell Zirkzee we have a future players. / Really our sup sub is Zirkzee 😂🤣.”',
    note: 'Cero tiempo de gracia: cada fallo detona pedidos inmediatos de venta.',
  },
];

export default function GraficoDobleRasero() {
  const [selectedId, setSelectedId] = useState<string>(ITEMS[0].id);
  const activeItem = ITEMS.find((item) => item.id === selectedId) ?? ITEMS[0];

  return (
    <div className="mx-auto w-full max-w-[740px] rounded-[12px] border border-[rgba(244,246,245,0.16)] border-t-[3px] border-t-[#D4AF37] bg-[#132A1F] px-5 py-5 text-[#F4F6F5] shadow-xl font-['Roboto',sans-serif]">
      <div className="mb-1 text-[0.74rem] font-bold uppercase tracking-[0.09em] text-[#D4AF37]">
        Gráfico 02 · Preferencia por el Potencial (974 comentarios IG)
      </div>

      <h3 className="mb-1.5 font-['Bebas_Neue',sans-serif] text-[1.65rem] font-normal leading-[1.12] tracking-[0.03em] text-[#F4F6F5]">
        El doble rasero en ataque: Promesas vs. Consagrados
      </h3>

      <p className="mb-3.5 text-[0.88rem] leading-snug text-[#C3D0C9]">
        Porcentaje de respaldo y paciencia en comentarios de Instagram.{' '}
        <strong className="font-bold text-[#F4F6F5]">Haz clic en cada barra</strong> para leer la evidencia real:
      </p>

      {/* Leyenda */}
      <div className="mb-4 flex flex-wrap gap-4 text-[0.8rem] text-[#C3D0C9]">
        <span className="inline-flex items-center gap-1.5">
          <i className="inline-block h-2.5 w-2.5 rounded-[3px] bg-[#D4AF37]" aria-hidden="true" />
          Promesa / Juvenil (Indulgencia total)
        </span>
        <span className="inline-flex items-center gap-1.5">
          <i className="inline-block h-2.5 w-2.5 rounded-[3px] bg-[#D9383A]" aria-hidden="true" />
          Primer Equipo / Fichaje (Juicio implacable)
        </span>
      </div>

      {/* 4 barras clicables */}
      <div className="flex flex-col gap-3" role="group" aria-label="Seleccionar jugador para ver comentarios de Instagram">
        {ITEMS.map((item) => {
          const isActive = item.id === activeItem.id;
          return (
            <button
              key={item.id}
              type="button"
              onClick={() => setSelectedId(item.id)}
              aria-pressed={isActive}
              className={`w-full cursor-pointer rounded-[8px] border px-3 py-2.5 text-left text-[#F4F6F5] transition-all duration-200 ${
                isActive
                  ? 'translate-x-[3px] border-[#D4AF37] bg-[rgba(212,175,55,0.09)]'
                  : 'border-transparent bg-[rgba(255,255,255,0.03)] hover:translate-x-[3px] hover:border-[#D4AF37] hover:bg-[rgba(212,175,55,0.09)]'
              }`}
            >
              <div className="mb-1.5 flex items-baseline justify-between gap-2">
                <div>
                  <span className="font-['Bebas_Neue',sans-serif] text-[1.18rem] leading-none tracking-[0.03em] text-[#F4F6F5]">
                    {item.player}
                  </span>
                  <span className="ml-1.5 text-[0.78rem] text-[#C3D0C9]">[{item.club}]</span>
                </div>
                <span
                  className={`shrink-0 font-['Bebas_Neue',sans-serif] text-[1.3rem] leading-none ${
                    item.redText ? 'text-[#FF7B7D]' : 'text-[#D4AF37]'
                  }`}
                >
                  {item.pct}%
                </span>
              </div>

              <div className="h-[14px] w-full overflow-hidden rounded-full bg-[rgba(244,246,245,0.1)]">
                <div className={`h-full rounded-full ${item.fillClass} ${item.widthClass}`} />
              </div>
            </button>
          );
        })}
      </div>

      <div className="mt-3 text-center text-[0.75rem] uppercase tracking-[0.06em] text-[#C3D0C9]">
        Tolerancia y Aprobación del Hincha (%)
      </div>

      {/* Panel inferior de evidencia real */}
      <div
        className="mt-4 rounded-[8px] border-l-4 border-l-[#D4AF37] bg-[#1B3B2B] px-4 py-3.5"
        aria-live="polite"
      >
        <div className="mb-1.5 flex flex-wrap justify-between gap-1.5 text-[0.74rem]">
          <span className="font-bold tracking-[0.05em] text-[#D4AF37]">{activeItem.badge}</span>
          <span className="text-[#C3D0C9]">{activeItem.match}</span>
        </div>
        <div className="mb-1.5 text-[0.96rem] italic leading-snug text-[#F4F6F5]">
          {activeItem.quote}
        </div>
        <div className="text-[0.84rem] leading-relaxed text-[#C3D0C9]">{activeItem.note}</div>
      </div>
    </div>
  );
}
