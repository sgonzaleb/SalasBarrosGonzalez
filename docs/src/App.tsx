/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useEffect, useState } from 'react';
import { BonusDefinicionFinal, PieCierre } from './components/BonusDefinicionFinal';
import {
  CopaInstagramFinal,
  MiniTrivia,
  type AnswersState,
  type TriviaId,
} from './components/DesafioCopaInstagram';
import GraficoDobleRasero from './components/GraficoDobleRasero';
import GraficoViolacionExpectativas from './components/GraficoViolacionExpectativas';
import GraficoXgSentimiento from './components/GraficoXgSentimiento';

interface MonitoProps {
  label: string;
  speechParts: string[];
}

function SpeechBubbleLeft({
  parts,
  index,
  isVisible,
  onBubbleClick,
}: {
  parts: string[];
  index: number;
  isVisible: boolean;
  onBubbleClick: () => void;
}) {
  const isShortReaction = parts.length === 1 && parts[0].length <= 6;
  const isMulti = parts.length > 1;

  return (
    <div
      onClick={onBubbleClick}
      className={`relative ${
        isShortReaction
          ? 'min-w-[64px] px-4 py-2.5 text-center text-lg font-bold'
          : `w-[245px] sm:w-[295px] ${isMulti ? 'min-h-[112px]' : 'min-h-[82px]'} px-4 py-3 text-[13px] font-medium leading-snug`
      } flex flex-col justify-center rounded-[24px] border-2 border-[#6cabdd] bg-white font-['Roboto',sans-serif] text-slate-900 shadow-lg -mr-2 sm:-mr-3 cursor-pointer select-none`}
      aria-live="polite"
    >
      <p className={`transition-opacity duration-200 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
        {parts[index]}
      </p>
      {isMulti && (
        <span className="mt-1.5 self-end text-[11px] font-normal tabular-nums text-slate-400">
          {index + 1}/{parts.length}
        </span>
      )}
      <svg
        width="34"
        height="26"
        viewBox="0 0 34 26"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-[24px] right-5"
      >
        <path d="M 2 0 L 18 0 L 18 3 L 2 3 Z" fill="#ffffff" />
        <path
          d="M 2 1 C 9 11 20 18 31 24 C 22 15 18 7 18 1"
          fill="#ffffff"
          stroke="#6cabdd"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );
}

function Monito({ label, speechParts }: MonitoProps) {
  const [hopKey, setHopKey] = useState(0);
  const [index, setIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    if (speechParts.length <= 1) return;

    let fadeTimer: number | undefined;
    const duration = Math.max(4000, Math.min(7200, speechParts[index].length * 38));

    const switchTimer = window.setTimeout(() => {
      setIsVisible(false);
      fadeTimer = window.setTimeout(() => {
        setIndex((prev) => (prev + 1) % speechParts.length);
        setIsVisible(true);
      }, 200);
    }, duration);

    return () => {
      window.clearTimeout(switchTimer);
      if (fadeTimer !== undefined) window.clearTimeout(fadeTimer);
    };
  }, [index, speechParts]);

  const handleInteraction = () => {
    setHopKey((prev) => prev + 1);
    if (speechParts.length > 1) {
      setIsVisible(true);
      setIndex((prev) => (prev + 1) % speechParts.length);
    }
  };

  return (
    <div className="flex items-start justify-center">
      <SpeechBubbleLeft
        parts={speechParts}
        index={index}
        isVisible={isVisible}
        onBubbleClick={handleInteraction}
      />
      <button
        key={hopKey}
        type="button"
        onClick={handleInteraction}
        title="Haz clic en el monito"
        aria-label={label}
        className={`mono-btn shrink-0 mt-5 font-['Roboto',sans-serif] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#D4AF37] rounded-xl ${
          hopKey > 0 ? 'hop' : ''
        }`}
      >
        <svg width="115" height="150" viewBox="0 0 120 155" xmlns="http://www.w3.org/2000/svg">
          <line x1="34" y1="88" x2="10" y2="76" stroke="#e2e8f0" strokeWidth="3" strokeLinecap="round" />
          <line x1="86" y1="88" x2="110" y2="76" stroke="#e2e8f0" strokeWidth="3" strokeLinecap="round" />
          <ellipse cx="60" cy="112" rx="30" ry="38" fill="#6cabdd" />
          <text x="60" y="118" textAnchor="middle" fontSize="20" fontWeight="800" fill="#0b101b">
            9
          </text>
          <path d="M 44 54 L 76 54 L 72 68 Q 60 73 48 68 Z" fill="#f1c27d" />
          <g className="head-top">
            <path d="M 42 50 L 78 50 L 76 26 Q 60 17 44 26 Z" fill="#f1c27d" />
            <path d="M 42 30 Q 60 12 78 30 Q 72 22 60 22 Q 48 22 42 30 Z" fill="#facc15" />
            <circle cx="53" cy="38" r="2.6" fill="#0f172a" />
            <circle cx="67" cy="38" r="2.6" fill="#0f172a" />
          </g>
        </svg>
      </button>
    </div>
  );
}

function GuruCharacter({ text, label }: { text: string; label: string }) {
  const [hopKey, setHopKey] = useState(0);

  const handleGuruClick = () => {
    setHopKey((prev) => prev + 1);
  };

  return (
    <div className="guru-box">
      <div className="guru-bubble cursor-pointer select-none" onClick={handleGuruClick} aria-live="polite">
        {text}
      </div>
      <button
        key={hopKey}
        type="button"
        onClick={handleGuruClick}
        title="Haz clic en el gurú"
        aria-label={label}
        className={`guru-btn font-['Roboto',sans-serif] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#D4AF37] rounded-xl ${
          hopKey > 0 ? 'hop' : ''
        }`}
      >
        <svg width="130" height="154" viewBox="0 0 140 165" xmlns="http://www.w3.org/2000/svg">
          <line x1="40" y1="98" x2="14" y2="86" stroke="#e2e8f0" strokeWidth="3" strokeLinecap="round" />
          <line x1="100" y1="98" x2="126" y2="86" stroke="#e2e8f0" strokeWidth="3" strokeLinecap="round" />
          <ellipse cx="70" cy="122" rx="32" ry="38" fill="#9333ea" />
          <text x="70" y="128" textAnchor="middle" fontSize="20" fontWeight="800" fill="#ffffff">
            @
          </text>
          <path d="M 52 65 L 88 65 L 84 79 Q 70 84 56 79 Z" fill="#f1c27d" />
          <g className="guru-head-top">
            <path d="M 50 61 L 90 61 L 88 37 Q 70 28 52 37 Z" fill="#f1c27d" />
            <path d="M 48 40 Q 70 16 92 40 Q 84 28 70 28 Q 56 28 48 40 Z" fill="#7e22ce" />
            <circle cx="70" cy="27" r="4" fill="#facc15" />
            <circle cx="62" cy="48" r="5" fill="none" stroke="#0f172a" strokeWidth="2" />
            <circle cx="78" cy="48" r="5" fill="none" stroke="#0f172a" strokeWidth="2" />
            <line x1="67" y1="48" x2="73" y2="48" stroke="#0f172a" strokeWidth="2" />
            <circle cx="62" cy="48" r="2" fill="#0f172a" />
            <circle cx="78" cy="48" r="2" fill="#0f172a" />
          </g>
        </svg>
      </button>
    </div>
  );
}

function ReadingProgressBar() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const updateProgress = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (docHeight <= 0) {
        setProgress(0);
        return;
      }
      const next = Math.min(100, Math.max(0, (scrollTop / docHeight) * 100));
      setProgress(next);
    };

    updateProgress();
    window.addEventListener('scroll', updateProgress, { passive: true });
    window.addEventListener('resize', updateProgress, { passive: true });
    return () => {
      window.removeEventListener('scroll', updateProgress);
      window.removeEventListener('resize', updateProgress);
    };
  }, []);

  return (
    <progress
      value={progress}
      max={100}
      aria-label="Progreso de lectura"
      className="reading-progress"
    />
  );
}

export default function App() {
  const [triviaAnswers, setTriviaAnswers] = useState<AnswersState>({
    1: null,
    2: null,
    3: null,
  });

  const handleAnswerTrivia = (id: TriviaId, selectedIdx: number, isCorrect: boolean) => {
    setTriviaAnswers((prev) => {
      if (prev[id] !== null) return prev;
      return { ...prev, [id]: { selectedIdx, isCorrect } };
    });
  };

  const handleResetTrivias = () => {
    setTriviaAnswers({ 1: null, 2: null, 3: null });
  };

  const hasGoldCup =
    Boolean(triviaAnswers[1]?.isCorrect) &&
    Boolean(triviaAnswers[2]?.isCorrect) &&
    Boolean(triviaAnswers[3]?.isCorrect);

  return (
    <div className="min-h-screen w-full bg-[#1B3B2B] font-['Roboto',sans-serif] text-[#F4F6F5]">
      <ReadingProgressBar />
      <main className="mx-auto max-w-[920px] px-6 py-14 sm:px-10 sm:py-16 space-y-16 sm:space-y-20">
        {/* Título principal y subtítulo */}
        <header className="text-center">
          <h1 className="font-['Bebas_Neue',sans-serif] text-5xl sm:text-6xl font-normal tracking-[0.06em] text-[#F4F6F5] text-balance">
            el 9 en instagram
          </h1>
          <p className="mt-2 font-['Bebas_Neue',sans-serif] text-xl sm:text-2xl tracking-[0.05em] text-[#D4AF37] text-balance">
            ¿Rendimiento o competencia de popularidad?
          </p>
        </header>

        {/* 1. Mono: Copa Instagram */}
        <section className="flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-8">
          <Monito
            label="Monito azul con el 9 presentando la Copa Instagram"
            speechParts={[
              'Esta es la Copa Instagram. Y, aunque no lo digan, es la más deseada por todos los jugadores.',
              'Cancherear se ha vuelto un deporte dentro del deporte, todos quieren más likes, todos quieren más seguidores, más cariño, y más y más.',
              'Pero, ¿ganarla te asegura ser un crack? o ¿solo eres un fantasma carismático?',
            ]}
          />
          <img
            src="/assets/aistudio/Code_Generated_Image_29bed7c1.png"
            alt="Copa Instagram"
            className="w-[125px] sm:w-[145px] h-auto shrink-0 drop-shadow-[0_6px_18px_rgba(250,204,21,0.18)]"
          />
        </section>

        {/* Foto de tres cabezas de los jugadores */}
        <section className="flex justify-center">
          <div className="w-full max-w-[540px] rounded-[12px] border border-[#D4AF37]/55 border-t-[3px] border-t-[#D4AF37] bg-[#132A1F] p-5 sm:p-6 shadow-xl">
            <img
              src="/assets/aistudio/collage_delanteros_transparent.png"
              alt="Tres delanteros de la Premier League: Kai Havertz, Alexander Isak y Erling Haaland"
              className="w-full h-auto block drop-shadow-[0_10px_22px_rgba(0,0,0,0.45)]"
            />
            <div className="mt-5 grid grid-cols-3 gap-2 border-t border-[rgba(244,246,245,0.12)] pt-4 text-center">
              <div className="rounded-lg border border-[rgba(244,246,245,0.12)] bg-[#1B3B2B]/80 px-2 py-2">
                <div className="font-['Bebas_Neue',sans-serif] text-base leading-tight tracking-[0.03em] text-[#F4F6F5]">
                  Kai Havertz
                </div>
                <div className="mt-0.5 text-xs font-medium text-[#D4AF37]">Arsenal</div>
              </div>
              <div className="rounded-lg border border-[rgba(244,246,245,0.12)] bg-[#1B3B2B]/80 px-2 py-2">
                <div className="font-['Bebas_Neue',sans-serif] text-base leading-tight tracking-[0.03em] text-[#F4F6F5]">
                  Alexander Isak
                </div>
                <div className="mt-0.5 text-xs font-medium text-[#D4AF37]">Newcastle</div>
              </div>
              <div className="rounded-lg border border-[rgba(244,246,245,0.12)] bg-[#1B3B2B]/80 px-2 py-2">
                <div className="font-['Bebas_Neue',sans-serif] text-base leading-tight tracking-[0.03em] text-[#F4F6F5]">
                  Erling Haaland
                </div>
                <div className="mt-0.5 text-xs font-medium text-[#D4AF37]">Man City</div>
              </div>
            </div>
          </div>
        </section>

        {/* 2. Mono: Principales delanteros */}
        <section className="flex justify-center">
          <Monito
            label="Monito azul con el 9 hablando de los principales delanteros"
            speechParts={[
              'Estos son los principales delanteros de la mejor liga del mundo. Se caracterizan por su efectividad dentro del área y sus aportes en goles y asistencias.',
              'Pero, si se miran fríamente, ser unas auténticas bestias y piezas importantes en sus equipos no bastan para tocar la Copa Instagram, sino que los jurados, o “gurús de Tik Tok” tienen otros parámetros.',
            ]}
          />
        </section>

        {/* 3. Crónica: La dictadura del xG */}
        <article className="space-y-8 font-['Roboto',sans-serif] text-[15.5px] sm:text-base leading-[1.75] text-[#F4F6F5]">
          <div className="mx-auto max-w-[68ch] space-y-5">
            <h2 className="font-['Bebas_Neue',sans-serif] text-3xl sm:text-4xl font-normal tracking-[0.04em] text-[#F4F6F5] leading-[1.12] text-balance">
              La dictadura del xG: Cuando el gol no basta para calmar a las redes
            </h2>
            <p>
              En el fútbol contemporáneo, el delantero centro (&quot;9&quot;) vive atrapado en una doble contabilidad. Por un lado, modelos analíticos como los Expected Goals (xG) miden la probabilidad matemática de que un disparo termine en gol según posición, ángulo y presión defensiva. Por el otro, el tribunal inmediato de las redes sociales sentencia su reputación segundos después del pitazo final.
            </p>
            <p>
              Al cruzar 18 actuaciones representativas de los atacantes del Big Six de la Premier League, aparece una grieta clara entre el rendimiento técnico y el veredicto emocional de los hinchas en X e Instagram.
            </p>

            <h3 className="pt-4 font-['Bebas_Neue',sans-serif] text-2xl sm:text-[1.65rem] font-normal tracking-[0.04em] text-[#D4AF37] leading-snug text-balance">
              Los intocables y la tiranía de la expectativa
            </h3>
            <p>
              Erling Haaland y Viktor Gyökeres representan al atacante inmune a la volatilidad digital. Cuando Haaland supera su expectativa de gol —con eficiencias de xG de +0.15 y +0.90—, su aprobación alcanza el 88.5% y 94.0%, impulsada por más de 3.000 comentarios por fecha. Cuando la pelota entra, no hay margen de duda.
            </p>
            <p>
              Lo más revelador ocurre lejos de esa efectividad perfecta. Delanteros como Nicolas Jackson (Chelsea) o Rasmus Højlund (Manchester United) encarnan &quot;La Brecha&quot;. El 22 de agosto, Jackson registró un xG de 0.82 —el modelo predecía casi un gol seguro con las ocasiones que generó—, pero terminó en cero. El castigo digital fue inmediato: apenas un 24.0% de aprobación y más de 2.100 comentarios mayoritariamente negativos.
            </p>
          </div>

          <div className="py-1">
            <GraficoXgSentimiento />
          </div>

          <div className="mx-auto max-w-[68ch] space-y-5">
            <h3 className="pt-4 font-['Bebas_Neue',sans-serif] text-2xl sm:text-[1.65rem] font-normal tracking-[0.04em] text-[#D4AF37] leading-snug text-balance">
              El &quot;efecto gol&quot; como amortiguador digital
            </h3>
            <p>
              Mientras la analítica valora el desmarque y la capacidad de generar ocasiones de alto xG, la hinchada opera en modo binario: gol o condena.
            </p>
            <p>
              El caso de Darwin Núñez en Liverpool lo resume. Aunque registró una eficiencia de xG levemente negativa (-0.10), mandar el balón a la red bastó para subir su aprobación al 62.0%. El gol funciona como un escudo mediático que tapa las fallas previas y frena el linchamiento digital.
            </p>
            <p>
              En una Premier League donde los fichajes millonarios disparan la exigencia, las redes no miden la calidad técnica del delantero, sino la frustración o euforia inmediata del hincha.
            </p>
          </div>

          <div className="pt-2">
            <MiniTrivia quizId={1} answers={triviaAnswers} onAnswer={handleAnswerTrivia} />
          </div>
        </article>

        {/* 4. Gurú */}
        <section className="flex justify-center">
          <GuruCharacter
            label="Gurú defendiendo los goles en el marcador"
            text="Y es que es obvio el fútbol se gana con goles, que me importa que mi “9” haga mejores diagonales y apoye a la defensa, yo quiero que suba el marcador."
          />
        </section>

        {/* 5. Diálogo: Mono -> Gurú -> Mono */}
        <section className="mx-auto max-w-[760px] flex flex-col gap-10">
          <div className="flex justify-start">
            <Monito
              label="Monito azul sobre la ventaja inicial de Haaland"
              speechParts={[
                'Aquí, el Noruego comenzó con ventaja. Su asombrosa cantidad de goles lo blinda de las críticas, un escudo anti gurús por su eficacia. Pero…',
              ]}
            />
          </div>

          <div className="flex justify-end">
            <GuruCharacter
              label="Gurú mencionando a Rayan Aït-Nouri"
              text="Se nota que no han visto fútbol en estos tiempos. Haaland no le importa a nadie, es el momento de Rayan ait-Nouri"
            />
          </div>

          <div className="flex justify-start">
            <Monito label="Monito azul sorprendido en silencio" speechParts={['...']} />
          </div>
        </section>

        {/* 6. Crónica: Haaland y Rayan Aït-Nouri */}
        <article className="space-y-8 font-['Roboto',sans-serif] text-[15.5px] sm:text-base leading-[1.75] text-[#F4F6F5]">
          <div className="mx-auto max-w-[68ch] space-y-5">
            <h2 className="font-['Bebas_Neue',sans-serif] text-3xl sm:text-4xl font-normal tracking-[0.04em] text-[#F4F6F5] leading-[1.12] text-balance">
              LA CONDENA DE LA EXCELENCIA: CUANDO CUMPLIR NO ALCANZA EN INSTAGRAM
            </h2>
            <p>
              Casi treinta goles en 38 fechas. Un gol cada 125 minutos. Tres veces goleador en cuatro temporadas. A pesar de semejantes cifras, a Erling Haaland cada vez le cuesta más ser tendencia por sus méritos en la cancha. El delantero noruego vive condenado por su propia excelencia.
            </p>
            <p>
              Desde que irrumpió en la élite —con aquella inolvidable marca de nueve goles en un solo partido en el Mundial Sub-20—, Haaland acostumbró al mundo a lo extraordinario. El problema es que cuando la vara está tan alta, la normalidad se vuelve invisible. Hoy, una actuación sólida del atacante del Manchester City apenas genera reacción en el público: la gente no celebra lo esperado, sólo reacciona ante lo inédito.
            </p>
            <p>
              Los datos del gráfico lo reflejan con claridad. En el análisis comparativo, Haaland obtiene una destacada nota de 7.5 en cancha, pero sus menciones en Instagram se quedan en un tímido 3.0. Para el aficionado común, un partido de 7 u 8 puntos en el noruego es simplemente &quot;cumplir con el expediente&quot;; no hay sorpresa y, por ende, tampoco hay necesidad de volcarse a comentar en redes.
            </p>
            <p>
              En los jugadores de menor perfil ocurre exactamente lo contrario. Cuando un futbolista del que se espera un rendimiento estándar firma una actuación estelar, las redes estallan. El caso de Rayan Aït-Nouri ejemplifica esto: su brillante rendimiento de 8.8 en cancha desencadenó un pico de 9.0 en menciones digitales.
            </p>
          </div>

          <div className="py-1">
            <GraficoViolacionExpectativas />
          </div>

          <div className="mx-auto max-w-[68ch] space-y-5">
            <p>
              Desde la psicología cognitiva, este contraste se fundamenta en la Teoría de la Violación de las Expectativas: cuando la excelencia es la norma, un rendimiento destacado no genera conversación porque solo confirma el guion. En cambio, la irrupción inesperada de un actor secundario genera un shock emocional que activa el impulso directo de comentar.
            </p>
            <p>
              Al evaluar la superposición entre el rendimiento deportivo y el impacto en redes, queda claro que el volumen de comentarios en Instagram no es un parámetro real para medir la calidad de un futbolista. Las plataformas digitales no evalúan el juego sobre el césped; solo registran qué tan lejos estuvo un jugador de lo que el público esperaba de él.
            </p>
          </div>

          <div className="pt-2">
            <MiniTrivia quizId={2} answers={triviaAnswers} onAnswer={handleAnswerTrivia} />
          </div>
        </article>

        {/* Foto de Rayan Aït-Nouri superando a los demás 9 */}
        <section className="flex justify-center">
          <div className="w-full max-w-[480px] rounded-[12px] border border-[#D4AF37]/55 border-t-[3px] border-t-[#D4AF37] bg-[#132A1F] p-5 sm:p-6 shadow-xl">
            <div className="mx-auto max-w-[340px]">
              <img
                src="/assets/aistudio/collage_aitnouri_transparent.png"
                alt="Rayan Aït-Nouri superando a Kai Havertz, Alexander Isak y Erling Haaland"
                className="w-full h-auto block drop-shadow-[0_10px_22px_rgba(0,0,0,0.45)]"
              />
            </div>

            <div className="mt-5 space-y-2.5 border-t border-[rgba(244,246,245,0.12)] pt-4">
              <div className="flex items-center justify-between rounded-lg border border-[#D4AF37]/50 bg-[#1B3B2B] px-3.5 py-2">
                <div className="flex items-baseline gap-2">
                  <span className="font-['Bebas_Neue',sans-serif] text-lg tracking-[0.04em] text-[#F4F6F5]">
                    Rayan Aït-Nouri
                  </span>
                  <span className="text-[11px] uppercase tracking-wider text-[#C3D0C9]">
                    Irrupción
                  </span>
                </div>
                <div className="flex items-baseline gap-2.5">
                  <span className="font-['Bebas_Neue',sans-serif] text-lg tracking-[0.04em] text-[#D4AF37]">
                    Nota 8.8
                  </span>
                  <span className="text-xs font-medium text-[#C3D0C9]">IG 9.0</span>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-2 text-center">
                <div className="rounded-lg border border-[rgba(244,246,245,0.12)] bg-[#1B3B2B]/80 px-2 py-2">
                  <div className="font-['Bebas_Neue',sans-serif] text-base leading-tight tracking-[0.03em] text-[#F4F6F5]">
                    Kai Havertz
                  </div>
                  <div className="mt-0.5 text-xs font-medium text-[#D4AF37]">Nota 7.5</div>
                </div>
                <div className="rounded-lg border border-[rgba(244,246,245,0.12)] bg-[#1B3B2B]/80 px-2 py-2">
                  <div className="font-['Bebas_Neue',sans-serif] text-base leading-tight tracking-[0.03em] text-[#F4F6F5]">
                    Alexander Isak
                  </div>
                  <div className="mt-0.5 text-xs font-medium text-[#D4AF37]">Nota 7.6</div>
                </div>
                <div className="rounded-lg border border-[rgba(244,246,245,0.12)] bg-[#1B3B2B]/80 px-2 py-2">
                  <div className="font-['Bebas_Neue',sans-serif] text-base leading-tight tracking-[0.03em] text-[#F4F6F5]">
                    Erling Haaland
                  </div>
                  <div className="mt-0.5 text-xs font-medium text-[#D4AF37]">
                    Nota 7.5 <span className="text-[#FF7B7D]">· IG 3.0</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 7. Diálogo: Mono -> Gurú -> Mono */}
        <section className="mx-auto max-w-[760px] flex flex-col gap-10">
          <div className="flex justify-start">
            <Monito
              label="Monito azul preguntando por Aït-Nouri"
              speechParts={['¿Entonces Ait-Nouri es el mejor 9 de la Premier?']}
            />
          </div>

          <div className="flex justify-end">
            <GuruCharacter
              label="Gurú hablando de las jóvenes promesas"
              text="Menos fútbol que… ya está washed. Es el momento de las jóvenes promesas."
            />
          </div>

          <div className="flex justify-start">
            <Monito label="Monito azul confundido" speechParts={['?']} />
          </div>
        </section>

        {/* 8. Crónica: La ceguera de la promesa */}
        <article className="space-y-8 font-['Roboto',sans-serif] text-[15.5px] sm:text-base leading-[1.75] text-[#F4F6F5]">
          <div className="mx-auto max-w-[68ch] space-y-5">
            <h2 className="font-['Bebas_Neue',sans-serif] text-3xl sm:text-4xl font-normal tracking-[0.04em] text-[#F4F6F5] leading-[1.12] text-balance">
              La ceguera de la promesa: el doble estándar de la ilusión juvenil en la Premier
            </h2>
            <p>
              El hincha de fútbol en redes no tiene paciencia para el presente, pero le sobra fe para lo que todavía no pasa. Si uno se mete a revisar los comentarios en el Instagram de los clubes grandes de Inglaterra, salta a la vista un contraste bien marcado. Y es que existe una flexibilidad e ilusión muy grande frente a las jóvenes promesas versus a los veteranos, el juicio a los delanteros consolidados del primer equipo es más implacable y sin filtro.
            </p>
            <p>
              En el Manchester City se vio claro durante la copa. Con Erling Haaland descansando fuera de la nómina, la atención se fue directo a Floyd Samba, un delantero de 17 años. Bastaron un par de jugadas para que la hinchada se volviera loca en los comentarios &quot;Samba is an absolute gem&quot;, &quot;remember the name&quot; o &quot;we don&apos;t need to sign another backup striker&quot;. En cosa de minutos, a un jovén sin minutos en la élite ya lo ponían como la solución lista para la rotación. Y se entiende por qué pasa, con la promesa joven el hincha proyecta todas sus expectativas sin arriesgar nada. Se le perdona un mal pase o una mala decisión porque &quot;está en proceso de adaptación&quot;, y esa misma justificación sirve de escudo. Porque en el peor de los casos es solo soñar y ya.
            </p>
          </div>

          <div className="py-1">
            <GraficoDobleRasero />
          </div>

          <div className="mx-auto max-w-[68ch] space-y-5">
            <p>
              La cosa cambia radicalmente cuando se mira a los delanteros consagrados o que costaron millones. En el Manchester United, a Joshua Zirkzee no le perdonan una. Apenas entra o erra un tiro, las redes se llenan de críticas duras (&quot;Sell Zirkzee&quot;, &quot;¿este es nuestro suplente?&quot;). Al jugador ya instalado se le exige rendir desde el primer minuto y se le cobra cada peso. Lo curioso es que, en ese mismo club, los hinchas pedían subir en masa a los delanteros de la sub-21 tras ganar un partido de juveniles, como si la juventud por sí sola garantizara goles en primera división.
            </p>
            <p>
              En Liverpool pasa algo parecido con la redención tardía. El caso de Cody Gakpo lo deja claro, y es que después de meses de críticas y dudas sobre su puesto, tuvo que meter varios goles seguidos para que recién aparecieran mensajes como &quot;we owe Gakpo an apology&quot;. Al consagrado se le exige pagar peaje en cada partido, al juvenil en cambio, se le aplaude la pura intención.
            </p>
          </div>

          <div className="space-y-4 pt-2">
            <MiniTrivia quizId={3} answers={triviaAnswers} onAnswer={handleAnswerTrivia} />
            <CopaInstagramFinal answers={triviaAnswers} onReset={handleResetTrivias} />
            {hasGoldCup && <BonusDefinicionFinal />}
          </div>
        </article>

        {/* 9. Cierre Mono */}
        <section className="flex justify-center">
          <Monito
            label="Monito azul con el 9 cerrando el debate"
            speechParts={[
              'Al final del día, este es un debate marcado por una profunda subjetividad e inmediatez. Factores como la edad, desempeño anterior, entre otros, afectan al cariño en Instagram.',
              'En donde el único ganador son los “Gurús” que tienen el poder de cambiarlo todo.',
            ]}
          />
        </section>

        {/* Foto Gurú levantando la copa */}
        <section className="flex justify-center">
          <div className="w-full max-w-[680px]">
            <img
              src="/assets/aistudio/guru_copa_transparent.png"
              alt="Gurú de redes levantando la Copa Instagram sobre los delanteros"
              className="w-full h-auto block"
            />
          </div>
        </section>

        {/* Pie de cierre siempre visible */}
        <PieCierre />
      </main>
    </div>
  );
}
