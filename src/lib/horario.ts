/**
 * Horario de La Salchichería y cálculo de "¿Estamos abiertos ahora?"
 * siempre con la hora de Europe/Madrid, esté donde esté quien mira la web.
 */

type Tramo = [abre: number, cierra: number]; // minutos desde medianoche

const LJ: Tramo[] = [
  [12 * 60, 16 * 60],
  [19 * 60, 23 * 60 + 30],
];
const VD: Tramo[] = [[12 * 60, 23 * 60 + 30]];

/** Índice 0 = domingo … 6 = sábado (como Date.getDay) */
export const HORARIO: Tramo[][] = [VD, LJ, LJ, LJ, LJ, VD, VD];

export const HORARIO_LEGIBLE = [
  { dias: 'Lunes a jueves', horas: '12:00–16:00 · 19:00–23:30' },
  { dias: 'Viernes a domingo', horas: '12:00–23:30' },
];

const DIAS = ['domingo', 'lunes', 'martes', 'miércoles', 'jueves', 'viernes', 'sábado'];
const DIA_EN: Record<string, number> = { Sun: 0, Mon: 1, Tue: 2, Wed: 3, Thu: 4, Fri: 5, Sat: 6 };

export const hhmm = (min: number) =>
  `${String(Math.floor(min / 60)).padStart(2, '0')}:${String(min % 60).padStart(2, '0')}`;

export function horaMadrid(fecha = new Date()) {
  const partes = new Intl.DateTimeFormat('en-GB', {
    timeZone: 'Europe/Madrid',
    weekday: 'short',
    hour: '2-digit',
    minute: '2-digit',
    hourCycle: 'h23',
  }).formatToParts(fecha);
  const get = (t: string) => partes.find((p) => p.type === t)?.value ?? '';
  return { dia: DIA_EN[get('weekday')], min: Number(get('hour')) * 60 + Number(get('minute')) };
}

export type Estado = { abierto: boolean; texto: string; detalle: string };

export function estadoAhora(fecha = new Date()): Estado {
  const { dia, min } = horaMadrid(fecha);
  const tramos = HORARIO[dia];

  const actual = tramos.find(([a, c]) => min >= a && min < c);
  if (actual) {
    const quedan = actual[1] - min;
    return {
      abierto: true,
      texto: 'Abierto ahora',
      detalle: quedan <= 30 ? `Corre, cerramos a las ${hhmm(actual[1])}` : `Hasta las ${hhmm(actual[1])}`,
    };
  }

  const luegoHoy = tramos.find(([a]) => min < a);
  if (luegoHoy) {
    return { abierto: false, texto: 'Ahora cerrado', detalle: `Abrimos a las ${hhmm(luegoHoy[0])}` };
  }

  const manana = (dia + 1) % 7;
  return {
    abierto: false,
    texto: 'Ahora cerrado',
    detalle: `Abrimos mañana (${DIAS[manana]}) a las ${hhmm(HORARIO[manana][0][0])}`,
  };
}
