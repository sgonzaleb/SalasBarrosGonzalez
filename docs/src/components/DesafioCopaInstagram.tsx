export type TriviaId = 1 | 2 | 3;

export interface TriviaAnswer {
  selectedIdx: number;
  isCorrect: boolean;
}

export type AnswersState = Record<TriviaId, TriviaAnswer | null>;

interface TriviaOption {
  label: string;
  isCorrect: boolean;
  msgLead: string;
  msgBody: string;
}

interface TriviaData {
  id: TriviaId;
  kicker: string;
  question: string;
  options: TriviaOption[];
}

const TRIVIAS: Record<TriviaId, TriviaData> = {
  1: {
    id: 1,
    kicker: 'Desafío 1/3 · La Dictadura del Gol',
    question:
      '¿Qué explica que la hinchada perdone un mal partido si entra un gol y crucifique a quien generó peligro sin marcar?',
    options: [
      {
        label: 'Efecto Halo',
        isCorrect: false,
        msgLead: 'Incorrecto (era Sesgo de Resultado):',
        msgBody:
          ' Aquí la opinión no viene de la fama previa, sino que cambia en segundos según el marcador.',
      },
      {
        label: 'Sesgo de Resultado',
        isCorrect: true,
        msgLead: '¡Acierto! Primera estrella:',
        msgBody:
          ' La tribuna borra todo el proceso (xG y desmarques) y juzga únicamente si la pelota entró.',
      },
      {
        label: 'Sesgo de Confirmación',
        isCorrect: false,
        msgLead: 'Incorrecto (era Sesgo de Resultado):',
        msgBody:
          " En el 'efecto gol', un solo tanto basta para dar vuelta la opinión de la masa de un minuto a otro.",
      },
    ],
  },
  2: {
    id: 2,
    kicker: 'Desafío 2/3 · Expectativas en Cancha',
    question:
      'Haaland saca 7.5 en cancha y 3.0 en menciones; Rayan Aït-Nouri 8.8 y 9.0. ¿Qué fenómeno explica este contraste?',
    options: [
      {
        label: 'Fatiga de Decisión',
        isCorrect: false,
        msgLead: 'Incorrecto (era Violación de Expectativas):',
        msgBody:
          ' Aquí el hincha sí tiene energía para comentar, pero solo cuando alguien rompe el libreto esperado.',
      },
      {
        label: 'Sesgo de Negatividad',
        isCorrect: false,
        msgLead: 'Incorrecto (era Violación de Expectativas):',
        msgBody:
          ' El silencio ante Haaland ocurre incluso cuando juega bien y cumple en cancha.',
      },
      {
        label: 'Violación de Expectativas',
        isCorrect: true,
        msgLead: '¡Acierto! Segunda estrella:',
        msgBody:
          ' Cuando la excelencia es costumbre, cumplir no sorprende; la irrupción inesperada dispara las redes.',
      },
    ],
  },
  3: {
    id: 3,
    kicker: 'Desafío 3/3 · La Ceguera de la Promesa',
    question:
      '100% de paciencia para un juvenil de 17 años y apenas 12% para un fichaje instalado. ¿Qué sesgo opera aquí?',
    options: [
      {
        label: 'Sesgo de Antigüedad',
        isCorrect: false,
        msgLead: 'Incorrecto (era Preferencia por el Potencial):',
        msgBody:
          ' Ese sesgo favorece a quien tiene más trayectoria, y en Instagram al consagrado se le exige el doble.',
      },
      {
        label: 'Preferencia por el Potencial',
        isCorrect: true,
        msgLead: '¡Acierto! Tercera estrella:',
        msgBody:
          ' El hincha valora más la fantasía de lo que un novato puede llegar a ser que el rendimiento ya comprobado.',
      },
      {
        label: 'Mera Exposición',
        isCorrect: false,
        msgLead: 'Incorrecto (era Preferencia por el Potencial):',
        msgBody:
          ' A promesas como Floyd Samba las aplauden con apenas un puñado de minutos en cancha.',
      },
    ],
  },
};

const TRIVIA_IDS: TriviaId[] = [1, 2, 3];

export function MiniTrivia({
  quizId,
  answers,
  onAnswer,
}: {
  quizId: TriviaId;
  answers: AnswersState;
  onAnswer: (id: TriviaId, selectedIdx: number, isCorrect: boolean) => void;
}) {
  const quiz = TRIVIAS[quizId];
  const answer = answers[quizId];
  const isLocked = answer !== null;
  const selectedOption = answer !== null ? quiz.options[answer.selectedIdx] : null;

  const handleSelect = (idx: number) => {
    if (isLocked) return;
    onAnswer(quizId, idx, quiz.options[idx].isCorrect);
  };

  return (
    <div
      id={`desafio-${quizId}`}
      className="mx-auto w-full max-w-[740px] scroll-mt-10 rounded-[10px] border border-[rgba(244,246,245,0.16)] border-l-4 border-l-[#D4AF37] bg-[#132A1F] px-[1.05rem] py-[0.9rem] font-['Roboto',sans-serif] text-[#F4F6F5] shadow-lg"
    >
      <div className="mb-1.5 flex flex-wrap items-center justify-between gap-2">
        <span className="text-[0.72rem] font-bold uppercase tracking-[0.08em] text-[#D4AF37]">
          {quiz.kicker} · 1 intento
        </span>
        <span
          className="inline-flex items-center gap-1 rounded-full border border-[rgba(244,246,245,0.16)] bg-[rgba(255,255,255,0.04)] px-2.5 py-0.5 text-[0.85rem] tracking-[2px] text-[rgba(244,246,245,0.28)]"
          aria-label="Progreso Copa Instagram"
        >
          {TRIVIA_IDS.map((n) => {
            const ans = answers[n];
            if (!ans) return <span key={n}>★</span>;
            return (
              <span
                key={n}
                className={ans.isCorrect ? 'text-[#D4AF37]' : 'text-[#D9383A]'}
                title={ans.isCorrect ? `Desafío ${n}: acierto` : `Desafío ${n}: fallado`}
              >
                {ans.isCorrect ? '★' : '✕'}
              </span>
            );
          })}
        </span>
      </div>

      <p className="mb-3 text-[0.94rem] font-medium leading-[1.4] text-[#F4F6F5]">
        {quiz.question}
      </p>

      <div className="grid grid-cols-1 gap-2 min-[601px]:grid-cols-3">
        {quiz.options.map((opt, idx) => {
          const isPicked = answer?.selectedIdx === idx;

          let stateClasses =
            'border-[rgba(244,246,245,0.16)] bg-[rgba(244,246,245,0.06)] text-[#F4F6F5] hover:border-[#D4AF37] hover:bg-[rgba(212,175,55,0.12)]';

          if (isLocked) {
            if (isPicked && opt.isCorrect) {
              stateClasses =
                'border-[#D4AF37] bg-[rgba(212,175,55,0.22)] text-[#D4AF37] font-bold';
            } else if (isPicked && !opt.isCorrect) {
              stateClasses =
                'border-[#D9383A] bg-[rgba(217,56,58,0.22)] text-[#FFB3B4] font-bold';
            } else if (!answer.isCorrect && opt.isCorrect) {
              stateClasses =
                'border-[#D4AF37]/60 bg-[rgba(212,175,55,0.08)] text-[#D4AF37]/90';
            } else {
              stateClasses =
                'border-[rgba(244,246,245,0.1)] bg-[rgba(244,246,245,0.03)] text-[#F4F6F5]/45';
            }
          }

          return (
            <button
              key={opt.label}
              type="button"
              disabled={isLocked}
              onClick={() => handleSelect(idx)}
              className={`rounded-[7px] border px-3 py-2 text-center font-['Roboto',sans-serif] text-[0.84rem] font-medium transition-all duration-150 ${
                isLocked ? 'cursor-default' : 'cursor-pointer'
              } ${stateClasses}`}
            >
              {opt.label}
            </button>
          );
        })}
      </div>

      {selectedOption && (
        <div
          aria-live="polite"
          className={`mt-2.5 rounded-[6px] border-l-[3px] bg-[rgba(255,255,255,0.04)] px-3 py-2 text-[0.84rem] leading-[1.4] text-[#C3D0C9] ${
            selectedOption.isCorrect ? 'border-l-[#D4AF37]' : 'border-l-[#D9383A]'
          }`}
        >
          <strong className="font-bold text-[#F4F6F5]">{selectedOption.msgLead}</strong>
          {selectedOption.msgBody}
        </div>
      )}
    </div>
  );
}

export function CopaInstagramFinal({
  answers,
  onReset,
}: {
  answers: AnswersState;
  onReset: () => void;
}) {
  const answeredCount = TRIVIA_IDS.filter((id) => answers[id] !== null).length;
  const correctCount = TRIVIA_IDS.filter((id) => answers[id]?.isCorrect).length;
  const isFinished = answeredCount === 3;

  let cardBorder = 'border-[#D4AF37]/60';
  let titleColor = 'text-[#D4AF37]';
  let title = `Copa Instagram · En juego (${answeredCount}/3 respondidas)`;
  let description =
    'Responde los 3 desafíos de cada capítulo (1 solo intento por pregunta) para ganar la Copa de Oro, Plata o Bronce.';
  let badgeIcon = '🏆';
  let badgeText = `${correctCount} / 3`;
  let badgeStyle = 'border-[rgba(244,246,245,0.16)] text-[#C3D0C9]';

  if (isFinished) {
    if (correctCount === 3) {
      cardBorder = 'border-[#D4AF37] shadow-[0_0_24px_rgba(212,175,55,0.18)]';
      titleColor = 'text-[#D4AF37]';
      title = '¡Copa de Oro desbloqueada! (3/3 aciertos)';
      description =
        'Dominas los tres filtros de la tribuna: resultado, expectativas y potencial. Ya no te engañan los comentarios.';
      badgeIcon = '🏆';
      badgeText = 'ORO · 3/3';
      badgeStyle =
        'border-[#D4AF37] text-[#D4AF37] shadow-[0_0_18px_rgba(212,175,55,0.28)]';
    } else if (correctCount === 2) {
      cardBorder = 'border-[#CBD5E1]/80';
      titleColor = 'text-[#E2E8F0]';
      title = '¡Ganaste la Copa de Plata! (2/3 aciertos)';
      description =
        'Muy cerca del puntaje perfecto: lees bien a la tribuna digital, aunque un sesgo todavía te sorprendió.';
      badgeIcon = '🥈';
      badgeText = 'PLATA · 2/3';
      badgeStyle =
        'border-[#CBD5E1] text-[#E2E8F0] shadow-[0_0_14px_rgba(203,213,225,0.18)]';
    } else {
      cardBorder = 'border-[#CD7F32]/85';
      titleColor = 'text-[#E3A05B]';
      title = `Copa de Bronce (${correctCount}/3 ${correctCount === 1 ? 'acierto' : 'aciertos'})`;
      description =
        'La tribuna de Instagram todavía te hace dudar. Repasa los gráficos de los capítulos y vuelve a intentarlo por el Oro.';
      badgeIcon = '🥉';
      badgeText = `BRONCE · ${correctCount}/3`;
      badgeStyle =
        'border-[#CD7F32] text-[#E3A05B] shadow-[0_0_14px_rgba(205,127,50,0.2)]';
    }
  }

  const handleRetry = () => {
    onReset();
    const firstQuiz = document.getElementById('desafio-1');
    if (firstQuiz) {
      firstQuiz.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  return (
    <div
      className={`mx-auto flex w-full max-w-[740px] flex-wrap items-center justify-between gap-4 rounded-[12px] border bg-[#132A1F] px-5 py-4 font-['Roboto',sans-serif] shadow-xl transition-all duration-300 ${cardBorder}`}
      aria-live="polite"
    >
      <div className="min-w-[240px] flex-1">
        <h4
          className={`mb-0.5 font-['Bebas_Neue',sans-serif] text-[1.45rem] font-normal leading-tight tracking-[0.03em] ${titleColor}`}
        >
          {title}
        </h4>
        <p className="text-[0.86rem] leading-[1.4] text-[#C3D0C9]">{description}</p>
      </div>

      <div className="flex flex-wrap items-center gap-2.5">
        <div
          className={`flex items-center gap-2 rounded-[10px] border bg-[#1B3B2B] px-4 py-2.5 font-['Bebas_Neue',sans-serif] text-[1.2rem] tracking-[0.04em] transition-all duration-300 ${badgeStyle}`}
        >
          <span aria-hidden="true">{badgeIcon}</span>
          <span>{badgeText}</span>
        </div>

        {isFinished && correctCount < 3 && (
          <button
            type="button"
            onClick={handleRetry}
            className="cursor-pointer rounded-[10px] border border-[#D4AF37] bg-[#D4AF37] px-4 py-2.5 font-['Bebas_Neue',sans-serif] text-[1.1rem] leading-none tracking-[0.04em] text-[#132A1F] transition-all duration-200 hover:bg-[#e5c24d]"
          >
            Volver a intentar
          </button>
        )}
      </div>
    </div>
  );
}
