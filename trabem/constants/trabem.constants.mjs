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
