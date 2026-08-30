// Tests de los CUATRO planos económicos TRABEM y las métricas (calibración 2026-08-30).
// Ejecutar: node --test
import { test } from 'node:test';
import assert from 'node:assert/strict';
import {
  C,
  costeHumanoReal,
  valorTecnicoInterno,
  valorComercialTRABEM,
  referenciaConstruccionTRABEM,
  incentivoDesarrollo,
  pfNetos,
  eieTotal,
  pfPorHH,
  costeRealPorPF,
  valorTecnicoPorPF,
} from '../constants/trabem.constants.mjs';

// Plano 3 — valor comercial: ejemplos de la calibración.
test('valor comercial = PF × 90: 40→3600, 60→5400, 70→6300, 75→6750, 100→9000', () => {
  assert.equal(valorComercialTRABEM(40), 3600);
  assert.equal(valorComercialTRABEM(60), 5400);
  assert.equal(valorComercialTRABEM(70), 6300);
  assert.equal(valorComercialTRABEM(75), 6750);
  assert.equal(valorComercialTRABEM(100), 9000);
  // alias del mismo cálculo.
  assert.equal(valorComercialTRABEM(70), referenciaConstruccionTRABEM(70));
});

// Plano 1 — coste humano real: HH × coste/hora real (por persona, desde Notion).
test('coste humano real = HH × coste/hora real', () => {
  assert.equal(costeHumanoReal(2.5, 13.51), 33.775);
  assert.equal(costeHumanoReal(4, 13.51), 54.04);
  // NO es la tarifa 70: coste real ≠ tarifa de instrumentación.
  assert.notEqual(13.51, C.instrumentacion_interna.TARIFA_HUMANO_EUR);
});

// Los CUATRO planos dan cifras distintas para el mismo trabajo — no se confunden.
test('los cuatro planos no colisionan para un mismo módulo', () => {
  const pf = 70, hhReales = 2.5, costeHora = 13.51, eieHum = 21, eieAI = 5;
  const coste = costeHumanoReal(hhReales, costeHora); // plano 1
  const tecnica = valorTecnicoInterno(eieHum, eieAI); // plano 2
  const comercial = valorComercialTRABEM(pf); // plano 3
  const incentivo = incentivoDesarrollo(pfNetos(pf, 0)); // plano 4
  assert.equal(coste, 33.775);
  assert.equal(tecnica, 1620);
  assert.equal(comercial, 6300);
  assert.equal(incentivo, 87.5);
  // Todos distintos entre sí.
  const vals = [coste, tecnica, comercial, incentivo];
  assert.equal(new Set(vals).size, 4);
});

// Las constantes ancla de cada plano son distintas.
test('90 (comercial) · 1,25 (incentivo) · 70/30 (técnica) son constantes separadas', () => {
  assert.equal(C.comercial.PF_TRABEM_EUR, 90);
  assert.equal(C.incentivo.VALOR_PF_EUR, 1.25);
  assert.equal(C.instrumentacion_interna.TARIFA_HUMANO_EUR, 70);
  assert.equal(C.instrumentacion_interna.TARIFA_AGENTE_EUR, 30);
  const anclas = new Set([90, 1.25, 70, 30]);
  assert.equal(anclas.size, 4);
});

// Métricas derivadas (§6).
test('métricas: EIE total, PF/HH, coste real/PF, valor técnico/PF', () => {
  assert.equal(eieTotal(21, 5), 26);
  assert.equal(pfPorHH(70, 2.5), 28);
  assert.equal(costeRealPorPF(33.775, 70), 0.4825);
  assert.equal(valorTecnicoPorPF(1620, 70), 1620 / 70);
  // guardas de división por cero.
  assert.equal(pfPorHH(70, 0), null);
  assert.equal(costeRealPorPF(10, 0), null);
});

// Incentivo mensual sobre PF netos acumulados.
test('incentivo = PF netos × 1,25', () => {
  assert.equal(incentivoDesarrollo(85), 106.25);
  assert.equal(pfNetos(70, 0), 70);
  assert.equal(pfNetos(70, 6), 64);
});
