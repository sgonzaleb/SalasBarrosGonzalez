import { useMemo, useState } from 'react';

type SentimentClass = 'Positivo' | 'Neutro' | 'Negativo';
type GoalFilter = 'all' | 'goal' | 'nogoal';

interface MatchRecord {
  id_registro: number;
  fecha_partido: string;
  delantero_nombre: string;
  club_nombre: string;
  minutos_jugados: number;
  goles: number;
  xg_partido: number;
  eficiencia_xg: number;
  total_comentarios: number;
  clasificacion_sentimiento: SentimentClass;
  porcentaje_aprobacion: number;
}

const RAW_DATA: MatchRecord[] = [
  { id_registro: 1, fecha_partido: '2026-08-22', delantero_nombre: 'Erling Haaland', club_nombre: 'Man City', minutos_jugados: 90, goles: 2, xg_partido: 1.85, eficiencia_xg: 0.15, total_comentarios: 1500, clasificacion_sentimiento: 'Positivo', porcentaje_aprobacion: 88.5 },
  { id_registro: 2, fecha_partido: '2026-08-22', delantero_nombre: 'Nicolas Jackson', club_nombre: 'Chelsea', minutos_jugados: 75, goles: 0, xg_partido: 0.82, eficiencia_xg: -0.82, total_comentarios: 2100, clasificacion_sentimiento: 'Negativo', porcentaje_aprobacion: 24.0 },
  { id_registro: 3, fecha_partido: '2026-08-23', delantero_nombre: 'Rasmus Højlund', club_nombre: 'Man United', minutos_jugados: 65, goles: 0, xg_partido: 0.3, eficiencia_xg: -0.3, total_comentarios: 1800, clasificacion_sentimiento: 'Negativo', porcentaje_aprobacion: 31.5 },
  { id_registro: 4, fecha_partido: '2026-08-23', delantero_nombre: 'Darwin Núñez', club_nombre: 'Liverpool', minutos_jugados: 80, goles: 1, xg_partido: 1.1, eficiencia_xg: -0.1, total_comentarios: 1950, clasificacion_sentimiento: 'Positivo', porcentaje_aprobacion: 62.0 },
  { id_registro: 5, fecha_partido: '2026-08-24', delantero_nombre: 'Kai Havertz', club_nombre: 'Arsenal', minutos_jugados: 90, goles: 1, xg_partido: 0.65, eficiencia_xg: 0.35, total_comentarios: 1400, clasificacion_sentimiento: 'Positivo', porcentaje_aprobacion: 75.0 },
  { id_registro: 6, fecha_partido: '2026-08-24', delantero_nombre: 'Dominic Solanke', club_nombre: 'Tottenham', minutos_jugados: 85, goles: 0, xg_partido: 0.4, eficiencia_xg: -0.4, total_comentarios: 950, clasificacion_sentimiento: 'Neutro', porcentaje_aprobacion: 48.0 },
  { id_registro: 7, fecha_partido: '2026-08-29', delantero_nombre: 'Erling Haaland', club_nombre: 'Man City', minutos_jugados: 90, goles: 3, xg_partido: 2.1, eficiencia_xg: 0.9, total_comentarios: 3200, clasificacion_sentimiento: 'Positivo', porcentaje_aprobacion: 94.0 },
  { id_registro: 8, fecha_partido: '2026-08-29', delantero_nombre: 'Nicolas Jackson', club_nombre: 'Chelsea', minutos_jugados: 90, goles: 1, xg_partido: 0.95, eficiencia_xg: 0.05, total_comentarios: 1100, clasificacion_sentimiento: 'Positivo', porcentaje_aprobacion: 68.0 },
  { id_registro: 9, fecha_partido: '2026-08-30', delantero_nombre: 'Joshua Zirkzee', club_nombre: 'Man United', minutos_jugados: 70, goles: 1, xg_partido: 0.7, eficiencia_xg: 0.3, total_comentarios: 1600, clasificacion_sentimiento: 'Positivo', porcentaje_aprobacion: 71.0 },
  { id_registro: 10, fecha_partido: '2026-08-30', delantero_nombre: 'Diogo Jota', club_nombre: 'Liverpool', minutos_jugados: 75, goles: 0, xg_partido: 0.25, eficiencia_xg: -0.25, total_comentarios: 850, clasificacion_sentimiento: 'Neutro', porcentaje_aprobacion: 52.0 },
  { id_registro: 11, fecha_partido: '2026-08-31', delantero_nombre: 'Gabriel Jesus', club_nombre: 'Arsenal', minutos_jugados: 60, goles: 0, xg_partido: 0.5, eficiencia_xg: -0.5, total_comentarios: 1300, clasificacion_sentimiento: 'Negativo', porcentaje_aprobacion: 38.0 },
  { id_registro: 12, fecha_partido: '2026-08-31', delantero_nombre: 'Richarlison', club_nombre: 'Tottenham', minutos_jugados: 45, goles: 0, xg_partido: 0.15, eficiencia_xg: -0.15, total_comentarios: 1050, clasificacion_sentimiento: 'Negativo', porcentaje_aprobacion: 29.0 },
  { id_registro: 13, fecha_partido: '2026-09-12', delantero_nombre: 'Omar Marmoush', club_nombre: 'Man City', minutos_jugados: 60, goles: 0, xg_partido: 0.2, eficiencia_xg: -0.2, total_comentarios: 780, clasificacion_sentimiento: 'Neutro', porcentaje_aprobacion: 50.0 },
  { id_registro: 14, fecha_partido: '2026-09-12', delantero_nombre: 'Christopher Nkunku', club_nombre: 'Chelsea', minutos_jugados: 80, goles: 1, xg_partido: 0.6, eficiencia_xg: 0.4, total_comentarios: 1250, clasificacion_sentimiento: 'Positivo', porcentaje_aprobacion: 79.0 },
  { id_registro: 15, fecha_partido: '2026-09-13', delantero_nombre: 'Cody Gakpo', club_nombre: 'Liverpool', minutos_jugados: 90, goles: 1, xg_partido: 0.85, eficiencia_xg: 0.15, total_comentarios: 1100, clasificacion_sentimiento: 'Positivo', porcentaje_aprobacion: 73.0 },
  { id_registro: 16, fecha_partido: '2026-09-13', delantero_nombre: 'Chido Obi-Martin', club_nombre: 'Man United', minutos_jugados: 30, goles: 0, xg_partido: 0.1, eficiencia_xg: -0.1, total_comentarios: 900, clasificacion_sentimiento: 'Neutro', porcentaje_aprobacion: 55.0 },
  { id_registro: 17, fecha_partido: '2026-09-14', delantero_nombre: 'Viktor Gyökeres', club_nombre: 'Arsenal', minutos_jugados: 90, goles: 2, xg_partido: 1.5, eficiencia_xg: 0.5, total_comentarios: 2800, clasificacion_sentimiento: 'Positivo', porcentaje_aprobacion: 91.0 },
  { id_registro: 18, fecha_partido: '2026-09-14', delantero_nombre: 'Dominic Solanke', club_nombre: 'Tottenham', minutos_jugados: 90, goles: 1, xg_partido: 0.75, eficiencia_xg: 0.25, total_comentarios: 1200, clasificacion_sentimiento: 'Positivo', porcentaje_aprobacion: 69.0 },
];

const COLOR_MAP: Record<SentimentClass, string> = {
  Positivo: '#D4AF37',
  Neutro: '#E07A2B',
  Negativo: '#D9383A',
};

const PAD = { left: 54, right: 26, top: 24, bottom: 48 };
const W = 680;
const H = 370;
const PLOT_W = W - PAD.left - PAD.right;
const PLOT_H = H - PAD.top - PAD.bottom;

const X_MIN = -1.0;
const X_MAX = 1.05;
const Y_MIN = 15;
const Y_MAX = 100;

const xScale = (v: number) => PAD.left + ((v - X_MIN) / (X_MAX - X_MIN)) * PLOT_W;
const yScale = (v: number) => PAD.top + PLOT_H - ((v - Y_MIN) / (Y_MAX - Y_MIN)) * PLOT_H;
const rScale = (c: number) => 6 + ((c - 780) / (3200 - 780)) * 13;

const Y_TICKS = [20, 40, 60, 80, 100];
const X_TICKS = [-0.8, -0.4, 0, 0.4, 0.8];

const FILTER_OPTIONS: { id: GoalFilter; label: string }[] = [
  { id: 'all', label: 'Todos los partidos (18)' },
  { id: 'goal', label: 'Con Gol (≥ 1 gol)' },
  { id: 'nogoal', label: 'Sin Gol (0 goles)' },
];

const FEATURED_LABELS = new Set([
  'Erling Haaland|0.9',
  'Nicolas Jackson|-0.82',
  'Darwin Núñez|-0.1',
  'Viktor Gyökeres|0.5',
]);

function getDefaultRecord(records: MatchRecord[]): MatchRecord | null {
  if (records.length === 0) return null;
  return (
    records.find((d) => d.delantero_nombre === 'Nicolas Jackson' && d.goles === 0) ?? records[0]
  );
}

export default function GraficoXgSentimiento() {
  const [filter, setFilter] = useState<GoalFilter>('all');
  const [selectedId, setSelectedId] = useState<number>(2);

  const filteredData = useMemo(() => {
    return RAW_DATA.filter((d) => {
      if (filter === 'goal') return d.goles > 0;
      if (filter === 'nogoal') return d.goles === 0;
      return true;
    });
  }, [filter]);

  const activeRecord = useMemo(() => {
    return (
      filteredData.find((d) => d.id_registro === selectedId) ?? getDefaultRecord(filteredData)
    );
  }, [filteredData, selectedId]);

  const handleFilterChange = (nextFilter: GoalFilter) => {
    setFilter(nextFilter);
    const nextRecords = RAW_DATA.filter((d) => {
      if (nextFilter === 'goal') return d.goles > 0;
      if (nextFilter === 'nogoal') return d.goles === 0;
      return true;
    });
    const fallback = getDefaultRecord(nextRecords);
    if (fallback) {
      setSelectedId(fallback.id_registro);
    }
  };

  return (
    <div className="mx-auto w-full max-w-[740px] rounded-[12px] border border-[rgba(244,246,245,0.16)] border-t-[3px] border-t-[#D4AF37] bg-[#132A1F] px-5 py-5 text-[#F4F6F5] shadow-xl font-['Roboto',sans-serif]">
      <div className="mb-1 text-[0.74rem] font-bold uppercase tracking-[0.09em] text-[#D4AF37]">
        Gráfico 03 · Sesgo de Resultado (18 actuaciones Big Six)
      </div>

      <h3 className="mb-1.5 font-['Bebas_Neue',sans-serif] text-[1.65rem] leading-[1.12] tracking-[0.03em] text-[#F4F6F5]">
        La Brecha del 9: Eficiencia xG vs. Sentimiento del Hincha
      </h3>

      <p className="mb-4 text-[0.88rem] leading-snug text-[#C3D0C9]">
        Eje X: Goles menos Goles Esperados (xG). Eje Y: Aprobación en redes (%). Tamaño: volumen de comentarios.{' '}
        <strong className="font-bold text-[#F4F6F5]">Toca cualquier burbuja:</strong>
      </p>

      {/* Filtros por gol */}
      <div className="mb-3.5 flex flex-wrap gap-2" role="group" aria-label="Filtrar actuaciones por gol">
        {FILTER_OPTIONS.map((opt) => {
          const isActive = filter === opt.id;
          return (
            <button
              key={opt.id}
              type="button"
              onClick={() => handleFilterChange(opt.id)}
              aria-pressed={isActive}
              className={`cursor-pointer rounded-[8px] border px-3.5 py-[0.45rem] font-['Bebas_Neue',sans-serif] text-[1rem] leading-none tracking-[0.04em] transition-all duration-200 ${
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

      {/* Leyenda */}
      <div className="mb-3 flex flex-wrap gap-4 text-[0.78rem] text-[#C3D0C9]">
        <span className="inline-flex items-center gap-1.5">
          <i className="inline-block h-2.5 w-2.5 rounded-full bg-[#D4AF37]" aria-hidden="true" />
          Positivo
        </span>
        <span className="inline-flex items-center gap-1.5">
          <i className="inline-block h-2.5 w-2.5 rounded-full bg-[#E07A2B]" aria-hidden="true" />
          Neutro
        </span>
        <span className="inline-flex items-center gap-1.5">
          <i className="inline-block h-2.5 w-2.5 rounded-full bg-[#D9383A]" aria-hidden="true" />
          Negativo
        </span>
      </div>

      {/* Gráfico SVG */}
      <div className="w-full rounded-[10px] bg-[rgba(255,255,255,0.02)] p-1.5">
        <svg
          viewBox={`0 0 ${W} ${H}`}
          role="img"
          aria-label="Gráfico de dispersión eficiencia xG vs aprobación"
          className="block h-auto w-full"
        >
          {/* Rejilla horizontal */}
          {Y_TICKS.map((yv) => {
            const y = yScale(yv);
            return (
              <g key={`y-${yv}`}>
                <line
                  x1={PAD.left}
                  y1={y}
                  x2={W - PAD.right}
                  y2={y}
                  stroke="rgba(244,246,245,0.1)"
                  strokeWidth={1}
                />
                <text x={PAD.left - 8} y={y + 4} fill="#C3D0C9" fontSize="11" textAnchor="end">
                  {yv}%
                </text>
              </g>
            );
          })}

          {/* Rejilla vertical */}
          {X_TICKS.map((xv) => {
            const x = xScale(xv);
            const isZero = xv === 0;
            return (
              <g key={`x-${xv}`}>
                <line
                  x1={x}
                  y1={PAD.top}
                  x2={x}
                  y2={H - PAD.bottom}
                  stroke={isZero ? '#D4AF37' : 'rgba(244,246,245,0.1)'}
                  strokeWidth={isZero ? 1.6 : 1}
                  strokeDasharray={isZero ? '5,4' : undefined}
                />
                <text
                  x={x}
                  y={H - PAD.bottom + 18}
                  fill={isZero ? '#D4AF37' : '#C3D0C9'}
                  fontSize="11"
                  textAnchor="middle"
                >
                  {xv > 0 ? `+${xv.toFixed(1)}` : xv.toFixed(1)}
                </text>
              </g>
            );
          })}

          {/* Etiquetas de ejes */}
          <text x={xScale(0) + 6} y={PAD.top + 12} fill="#D4AF37" fontSize="10" fontWeight="700">
            Línea esperada (0.0)
          </text>
          <text
            x={PAD.left + PLOT_W / 2}
            y={H - 8}
            fill="#F4F6F5"
            fontSize="11"
            fontWeight="700"
            textAnchor="middle"
          >
            Eficiencia xG (Goles Anotados - Goles Esperados)
          </text>
          <text
            x={15}
            y={PAD.top + PLOT_H / 2}
            fill="#F4F6F5"
            fontSize="11"
            fontWeight="700"
            textAnchor="middle"
            transform={`rotate(-90, 15, ${PAD.top + PLOT_H / 2})`}
          >
            Aprobación en Redes (%)
          </text>

          {/* Burbujas */}
          {filteredData.map((d) => {
            const cx = xScale(d.eficiencia_xg);
            const cy = yScale(d.porcentaje_aprobacion);
            const r = rScale(d.total_comentarios);
            const fill = COLOR_MAP[d.clasificacion_sentimiento];
            const isSelected = activeRecord?.id_registro === d.id_registro;
            const showLabel = FEATURED_LABELS.has(`${d.delantero_nombre}|${d.eficiencia_xg}`);
            const dx = d.eficiencia_xg > 0.7 ? -10 : 0;

            return (
              <g key={d.id_registro}>
                <circle
                  cx={cx}
                  cy={cy}
                  r={r}
                  fill={fill}
                  fillOpacity={0.88}
                  stroke={isSelected ? '#FFFFFF' : '#132A1F'}
                  strokeWidth={isSelected ? 2.5 : 1.5}
                  tabIndex={0}
                  role="button"
                  aria-label={`${d.delantero_nombre} (${d.club_nombre}): ${d.porcentaje_aprobacion.toFixed(1)}% aprobación`}
                  onMouseEnter={() => setSelectedId(d.id_registro)}
                  onClick={() => setSelectedId(d.id_registro)}
                  onFocus={() => setSelectedId(d.id_registro)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      setSelectedId(d.id_registro);
                    }
                  }}
                  className="cursor-pointer transition-all duration-150 hover:stroke-white hover:[stroke-width:2.5px] focus:outline-none"
                />
                {showLabel && (
                  <text
                    x={cx + dx}
                    y={cy - r - 5}
                    fill="#F4F6F5"
                    fontSize="10.5"
                    fontWeight="700"
                    textAnchor="middle"
                    className="pointer-events-none select-none"
                  >
                    {d.delantero_nombre.split(' ')[1]}
                  </text>
                )}
              </g>
            );
          })}
        </svg>
      </div>

      {/* Panel de detalle */}
      {activeRecord && (
        <div
          className="mt-3.5 rounded-[8px] border-l-4 border-l-[#D4AF37] bg-[#1B3B2B] px-4 py-3.5 text-[0.88rem] leading-relaxed text-[#C3D0C9]"
          aria-live="polite"
        >
          <div className="mb-0.5 font-['Bebas_Neue',sans-serif] text-[1.25rem] leading-tight tracking-[0.03em] text-[#D4AF37]">
            {activeRecord.delantero_nombre} ({activeRecord.club_nombre}) —{' '}
            {activeRecord.porcentaje_aprobacion.toFixed(1)}% Aprobación
          </div>
          <div>
            <strong className="font-bold text-[#F4F6F5]">
              Partido ({activeRecord.fecha_partido}):
            </strong>{' '}
            {activeRecord.goles} gol(es) · {activeRecord.xg_partido.toFixed(2)} xG · Eficiencia:{' '}
            <strong className="font-bold text-[#F4F6F5]">
              {activeRecord.eficiencia_xg >= 0 ? '+' : ''}
              {activeRecord.eficiencia_xg.toFixed(2)}
            </strong>{' '}
            · {activeRecord.total_comentarios.toLocaleString('es-CL')} comentarios (
            {activeRecord.clasificacion_sentimiento}).
          </div>
        </div>
      )}
    </div>
  );
}
