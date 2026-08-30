// Método TRABEM · fuente única de constantes (loader + helpers derivados).
// Los VALORES viven en trabem.constants.json. Este módulo solo los carga y
// expone helpers con NOMBRES separados por capa, para que el código no pueda
// confundir el precio comercial (90 €/PF) con el incentivo (1,25 €/PF).
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dir = dirname(fileURLToPath(import.meta.url));

/** Constantes crudas (única fuente de literales). */
export const C = JSON.parse(
  readFileSync(join(__dir, 'trabem.constants.json'), 'utf8'),
);

// ─────────────────────────────────────────────────────────────────────────
// CAPA COMERCIAL — precio de construcción TRABEM (PF × €/PF). Unidad de venta.
// ─────────────────────────────────────────────────────────────────────────
/** Referencia de construcción TRABEM = PF válidos × PF_TRABEM_EUR. */
export function referenciaConstruccionTRABEM(
  pfValidos,
  pfEur = C.comercial.PF_TRABEM_EUR,
) {
  return pfValidos * pfEur;
}

// ─────────────────────────────────────────────────────────────────────────
// INSTRUMENTACIÓN INTERNA — 70/30. NO es precio a cliente.
// ─────────────────────────────────────────────────────────────────────────
/** Valor técnico interno 70/30 = (EIE humano × 70) + (EIE AI × 30). */
export function valorTecnicoInterno(
  eieHumanoDominante,
  eieAIAcelerado,
  tarHum = C.instrumentacion_interna.TARIFA_HUMANO_EUR,
  tarAg = C.instrumentacion_interna.TARIFA_AGENTE_EUR,
) {
  return eieHumanoDominante * tarHum + eieAIAcelerado * tarAg;
}

/** €/PF observado interno = valor técnico interno 70/30 ÷ PF válidos. */
export function eurPfObservadoInterno(eieHumanoDominante, eieAIAcelerado, pfValidos) {
  if (!pfValidos) return null;
  return valorTecnicoInterno(eieHumanoDominante, eieAIAcelerado) / pfValidos;
}

// ─────────────────────────────────────────────────────────────────────────
// BENCHMARK EXTERNO — ISBSG. Contraste; NUNCA precio TRABEM.
// ─────────────────────────────────────────────────────────────────────────
/** Banda ISBSG que aplica a un tamaño de PF. */
export function bandaBenchmark(pf, bandas = C.benchmark_externo_isbsg.bandas) {
  return (
    bandas.find((b) => pf >= b.min && pf < b.max) ?? bandas[bandas.length - 1]
  );
}
/** Referencia externa ISBSG = PF × €/PF de la banda. Solo contraste. */
export function referenciaExternaISBSG(pf) {
  return pf * bandaBenchmark(pf).eur_pf;
}

// ─────────────────────────────────────────────────────────────────────────
// INCENTIVO — sistema distinto. NO mezclar con la capa comercial.
// ─────────────────────────────────────────────────────────────────────────
/** PF netos = PF válidos − PF equivalentes de retrabajo imputable. */
export function pfNetos(pfValidos, pfRetrabajoImputable = 0) {
  return pfValidos - pfRetrabajoImputable;
}
/** Valor de incentivo individual (provisional) = PF netos × 1,25 €. */
export function valorIncentivoIndividual(
  pfNetosValor,
  valorPf = C.incentivo.VALOR_PF_EUR,
) {
  return pfNetosValor * valorPf;
}
/** Banda mensual de PF netos: 'bajo' | 'suelo' | 'normal' | 'alto'. */
export function bandaIncentivoMensual(pfNetosMes, b = C.incentivo.bandas_mensuales_pf) {
  if (pfNetosMes >= b.alto) return 'alto';
  if (pfNetosMes >= b.normal) return 'normal';
  if (pfNetosMes >= b.suelo) return 'suelo';
  return 'bajo';
}

// ─────────────────────────────────────────────────────────────────────────
// PLANO 1 — COSTE HUMANO REAL. El coste/hora real es POR PERSONA y vive en
// Notion (dato sensible): se pasa como argumento, NUNCA se hardcodea aquí ni
// se usa la tarifa 70/30 en su lugar.
// ─────────────────────────────────────────────────────────────────────────
/** Coste humano real = HH reales × coste/hora real del trabajador. */
export function costeHumanoReal(hhReales, costeHoraTrabajador) {
  return hhReales * costeHoraTrabajador;
}

// ─────────────────────────────────────────────────────────────────────────
// Alias inequívocos por plano (mismos cálculos, nombre del plano).
// ─────────────────────────────────────────────────────────────────────────
/** PLANO 3 — Valor comercial de construcción = PF válidos × PF_TRABEM_EUR. */
export const valorComercialTRABEM = referenciaConstruccionTRABEM;
/** PLANO 4 — Incentivo de desarrollo = PF netos × 1,25 €. */
export const incentivoDesarrollo = valorIncentivoIndividual;

// ─────────────────────────────────────────────────────────────────────────
// MÉTRICAS derivadas (§6 de la calibración).
// ─────────────────────────────────────────────────────────────────────────
export const eieTotal = (eieHumano, eieAI) => eieHumano + eieAI;
export const pfPorHH = (pf, hh) => (hh ? pf / hh : null);
export const costeRealPorPF = (coste, pf) => (pf ? coste / pf : null);
export const valorTecnicoPorPF = (valorTecnico, pf) => (pf ? valorTecnico / pf : null);

// ─────────────────────────────────────────────────────────────────────────
// TENSIÓN PF aspiracional ↔ precio realizable. El PF_TRABEM_EUR es aspiracional;
// el precio REAL cobrado a cada cliente puede ser menor. Se mide la distancia.
// ─────────────────────────────────────────────────────────────────────────
/** Grado de realización = (precio real cobrado / PF válidos) ÷ PF_TRABEM_EUR.
 *  1 = se cobra el PF aspiracional completo · <1 = por debajo. */
export function gradoRealizacionPF(precioRealCobrado, pfValidos, pfEur = C.comercial.PF_TRABEM_EUR) {
  if (!pfValidos || !pfEur) return null;
  return precioRealCobrado / pfValidos / pfEur;
}
/** Tensión = brecha respecto al PF aspiracional (1 − grado de realización). */
export function tensionPF(precioRealCobrado, pfValidos, pfEur = C.comercial.PF_TRABEM_EUR) {
  const g = gradoRealizacionPF(precioRealCobrado, pfValidos, pfEur);
  return g == null ? null : 1 - g;
}

// ─────────────────────────────────────────────────────────────────────────
// ELEGIBILIDAD DEL INCENTIVO. Todo se mide igual; lo que ENTRA en la base del
// incentivo depende de la caja: interno cuenta siempre; cliente solo por lo cobrado.
// ─────────────────────────────────────────────────────────────────────────
/** PF que entran en la base del incentivo.
 *  interno=true (Tipo proyecto Propio) → PF netos completos.
 *  cliente → PF netos × fracción cobrada (0 si no hay caja; DWFW estratégico = 0). */
export function pfIncentivables(pfNetos, { interno = false, fraccionCobrada = 0 } = {}) {
  if (interno) return pfNetos;
  return pfNetos * Math.max(0, Math.min(1, fraccionCobrada));
}
