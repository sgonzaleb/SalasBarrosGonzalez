import { useEffect, useRef, useState } from 'react';

type ShotResult = 'goal' | 'miss' | null;

export function BonusDefinicionFinal() {
  const [result, setResult] = useState<ShotResult>(null);
  const posRef = useRef(6);
  const dirRef = useRef(1);
  const movingRef = useRef(true);
  const ballGroupRef = useRef<SVGGElement | null>(null);

  useEffect(() => {
    let rafId = 0;
    const speed = 1.35;

    const animate = () => {
      if (movingRef.current) {
        let next = posRef.current + dirRef.current * speed;
        if (next >= 94) {
          next = 94;
          dirRef.current = -1;
        } else if (next <= 6) {
          next = 6;
          dirRef.current = 1;
        }
        posRef.current = next;
        if (ballGroupRef.current) {
          ballGroupRef.current.setAttribute('transform', `translate(${next * 4}, 18)`);
        }
      }
      rafId = window.requestAnimationFrame(animate);
    };

    rafId = window.requestAnimationFrame(animate);
    return () => window.cancelAnimationFrame(rafId);
  }, []);

  const handleShoot = () => {
    if (!movingRef.current) return;
    movingRef.current = false;
    const isGoal = posRef.current >= 40 && posRef.current <= 60;
    setResult(isGoal ? 'goal' : 'miss');
  };

  const handleReset = () => {
    movingRef.current = true;
    setResult(null);
  };

  return (
    <section
      aria-labelledby="bonus-heading"
      className="mx-auto w-full max-w-[740px] rounded-[12px] border border-[#D4AF37] bg-[#132A1F] px-5 py-4 font-['Roboto',sans-serif] text-[#F4F6F5] shadow-[0_10px_24px_rgba(0,0,0,0.28)]"
    >
      <div className="mb-1.5 flex flex-wrap items-center justify-between gap-2">
        <span className="text-[0.72rem] font-bold uppercase tracking-[0.08em] text-[#D4AF37]">
          🏆 Bonus Desbloqueado · Copa de Oro
        </span>
        <span className="text-[0.72rem] font-bold uppercase tracking-[0.08em] text-[#D4AF37]">
          Minuto 90+4 · 0.85 xG
        </span>
      </div>

      <h3
        id="bonus-heading"
        className="mb-1 font-['Bebas_Neue',sans-serif] text-[1.55rem] font-normal leading-[1.1] tracking-[0.03em] text-[#F4F6F5]"
      >
        El último balón del partido: calza el remate en el arco
      </h3>

      <p className="mb-3.5 text-[0.86rem] text-[#C3D0C9]">
        Frena la pelota dentro de la zona dorada con un clic y mira cómo te juzga la tribuna:
      </p>

      {/* Barra compacta de definición */}
      <div className="mx-auto flex max-w-[560px] items-center gap-2.5">
        <div
          role="button"
          tabIndex={0}
          aria-label="Barra de definición: haz clic para patear"
          onClick={handleShoot}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              handleShoot();
            }
          }}
          className="h-9 flex-1 cursor-pointer overflow-hidden rounded-full border border-[rgba(244,246,245,0.16)] bg-[rgba(244,246,245,0.08)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#D4AF37]"
        >
          <svg
            viewBox="0 0 400 36"
            className="block h-full w-full select-none"
            aria-hidden="true"
          >
            {/* Zona dorada del arco (40% - 60%) */}
            <rect x="160" y="0" width="80" height="36" fill="rgba(212, 175, 55, 0.26)" />
            <line x1="160" y1="0" x2="160" y2="36" stroke="#D4AF37" strokeWidth="2" />
            <line x1="240" y1="0" x2="240" y2="36" stroke="#D4AF37" strokeWidth="2" />
            <text
              x="200"
              y="22"
              textAnchor="middle"
              fill="#D4AF37"
              fontFamily="'Bebas Neue', sans-serif"
              fontSize="13"
              letterSpacing="1.2"
            >
              ARCO
            </text>

            {/* Balón animado */}
            <g ref={ballGroupRef} transform="translate(24, 18)">
              <text
                x="0"
                y="6"
                textAnchor="middle"
                fontSize="19"
                className="pointer-events-none select-none"
              >
                ⚽
              </text>
            </g>
          </svg>
        </div>

        {result === null ? (
          <button
            type="button"
            onClick={handleShoot}
            className="shrink-0 cursor-pointer rounded-[8px] border-0 bg-[#D4AF37] px-4 py-2 font-['Bebas_Neue',sans-serif] text-[1.12rem] leading-none tracking-[0.04em] text-[#132A1F] transition-opacity duration-150 hover:opacity-90"
          >
            ¡DEFINIR!
          </button>
        ) : (
          <button
            type="button"
            onClick={handleReset}
            className="shrink-0 cursor-pointer rounded-[8px] border border-[rgba(244,246,245,0.16)] bg-[rgba(244,246,245,0.08)] px-3.5 py-2 font-['Bebas_Neue',sans-serif] text-[1.05rem] leading-none tracking-[0.04em] text-[#F4F6F5] transition-colors duration-150 hover:border-[#D4AF37] hover:text-[#D4AF37]"
          >
            Otra vez
          </button>
        )}
      </div>

      {/* Veredicto de tribuna + Mensaje final del delantero (9) */}
      {result !== null && (
        <div
          className="mt-4 border-t border-[rgba(244,246,245,0.16)] pt-3.5"
          aria-live="polite"
        >
          <div
            className={`mb-3.5 rounded-[7px] border-l-[3px] px-3 py-2 text-[0.86rem] leading-snug text-[#F4F6F5] ${
              result === 'goal'
                ? 'border-l-[#D4AF37] bg-[rgba(212,175,55,0.12)]'
                : 'border-l-[#D9383A] bg-[rgba(217,56,58,0.14)]'
            }`}
          >
            {result === 'goal' ? (
              <>
                <strong className="font-bold">⚽ ¡GOL! (1-0) · Tribuna @:</strong> “¡Crack total!
                Nunca dudé de ti, renovación vitalicia ya 🔥👑”
              </>
            ) : (
              <>
                <strong className="font-bold">❌ ¡AFUERA! (0-0) · Tribuna @:</strong> “0.85 de xG
                y la bota. Véndanlo hoy mismo, que suban a los juveniles 🗑️🤡”
              </>
            )}
          </div>

          <div className="flex items-center gap-3.5 rounded-[10px] bg-[#1B3B2B] px-3.5 py-3">
            <div className="flex shrink-0 flex-col items-center" aria-hidden="true">
              <div className="mb-[3px] flex h-[26px] w-[26px] items-center justify-center rounded-[6px_6px_9px_9px] bg-[#E7B98A] text-[0.75rem] font-bold text-[#15221B]">
                • •
              </div>
              <div className="flex h-[46px] w-[40px] items-center justify-center rounded-full bg-[#4A90E2] font-['Bebas_Neue',sans-serif] text-[1.35rem] leading-none text-[#132A1F]">
                9
              </div>
            </div>

            <div className="rounded-[12px] border-2 border-[#D4AF37] bg-[#F4F6F5] px-3.5 py-2.5 text-[0.88rem] leading-[1.45] text-[#15221B]">
              <p>
                <strong className="font-bold text-[#132A1F]">El 9:</strong>{' '}
                {result === 'goal'
                  ? '“La metiste y hoy eres ídolo. Así se vive dentro del área: noventa minutos de desmarques, presión y sacrificio se resumen en un segundo. Para Instagram no importa cómo jugaste; para ellos, el 9 solo existe cuando la pelota cruza la línea.”'
                  : '“Hiciste todo bien hasta el último toque y ya piden tu salida. Así se vive dentro del área: noventa minutos de desmarques, presión y sacrificio se resumen en un segundo. Para Instagram no importa cómo jugaste; para ellos, el 9 solo existe cuando la pelota cruza la línea.”'}
              </p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

export function PieCierre() {
  return (
    <footer className="mx-auto mt-4 flex w-full max-w-[740px] flex-wrap items-center justify-between gap-3 border-t border-[rgba(244,246,245,0.16)] px-4 py-4 font-['Roboto',sans-serif] text-[0.86rem] text-[#C3D0C9]">
      <div>
        Realizado por{' '}
        <strong className="font-bold text-[#D4AF37]">
          Adalú Salas, Sebastián González y Santiago Barros
        </strong>
      </div>
      <button
        type="button"
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        className="cursor-pointer rounded-[6px] border border-[rgba(244,246,245,0.16)] bg-transparent px-3 py-1.5 text-[0.8rem] text-[#F4F6F5] transition-colors duration-150 hover:border-[#D4AF37] hover:text-[#D4AF37]"
      >
        ↑ Volver arriba
      </button>
    </footer>
  );
}
