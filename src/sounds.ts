// Sons sintetizados via Web Audio API (sem arquivos externos).
// Os navegadores bloqueiam áudio até o primeiro gesto do usuário,
// então os sons disparados por cliques tocam normalmente.

let ctx: AudioContext | null = null;

function getCtx(): AudioContext | null {
  if (typeof window === "undefined") return null;
  if (!ctx) {
    const AC =
      window.AudioContext ||
      (window as unknown as { webkitAudioContext?: typeof AudioContext })
        .webkitAudioContext;
    if (!AC) return null;
    ctx = new AC();
  }
  if (ctx.state === "suspended") void ctx.resume();
  return ctx;
}

function tone(
  freq: number,
  start: number,
  dur: number,
  type: OscillatorType = "sine",
  gain = 0.14,
) {
  const c = getCtx();
  if (!c) return;
  const osc = c.createOscillator();
  const g = c.createGain();
  osc.type = type;
  osc.frequency.value = freq;
  const t = c.currentTime + start;
  g.gain.setValueAtTime(0.0001, t);
  g.gain.linearRampToValueAtTime(gain, t + 0.012);
  g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
  osc.connect(g).connect(c.destination);
  osc.start(t);
  osc.stop(t + dur + 0.02);
}

/** Acorde ascendente alegre (inicialização). */
export function playStartup() {
  tone(523.25, 0, 0.5, "triangle", 0.12); // C5
  tone(659.25, 0.12, 0.5, "triangle", 0.12); // E5
  tone(783.99, 0.24, 0.55, "triangle", 0.12); // G5
  tone(1046.5, 0.36, 0.7, "triangle", 0.12); // C6
}

/** Clique curto ao abrir uma janela. */
export function playOpen() {
  tone(880, 0, 0.06, "square", 0.05);
  tone(1320, 0.03, 0.05, "square", 0.045);
}

/** Tons descendentes (desligando). */
export function playShutdown() {
  tone(784, 0, 0.4, "triangle", 0.12);
  tone(587.33, 0.14, 0.4, "triangle", 0.12);
  tone(392, 0.28, 0.6, "triangle", 0.12);
}
