// Tests de regresión de la doctrina TRABEM (2026-08-30).
// Ejecutar:  node --test   (desde trabem/)  ·  o  node --test test/constants.test.mjs
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';
import {
  C,
  referenciaConstruccionTRABEM,
  valorTecnicoInterno,
  eurPfObservadoInterno,
  referenciaExternaISBSG,
  bandaBenchmark,
  pfNetos,
  valorIncentivoIndividual,
  bandaIncentivoMensual,
} from '../constants/trabem.constants.mjs';

const __dir = dirname(fileURLToPath(import.meta.url));
const skillsDir = join(__dir, '..', 'skills');
const read = (rel) => readFileSync(join(skillsDir, rel), 'utf8');

// 1) Precio de construcción TRABEM con la tarifa vigente (90 €/PF).
test('PF × 90 €/PF: 61→5490, 40→3600, 75→6750', () => {
  assert.equal(C.comercial.PF_TRABEM_EUR, 90);
  assert.equal(referenciaConstruccionTRABEM(61), 5490);
  assert.equal(referenciaConstruccionTRABEM(40), 3600);
  assert.equal(referenciaConstruccionTRABEM(75), 6750);
});

// 2) El benchmark externo NO altera el precio de construcción.
test('el benchmark ISBSG es un cálculo aparte y no cambia PF × 90', () => {
  // El precio de construcción sigue siendo PF × 90 pase lo que pase el benchmark.
  assert.equal(referenciaConstruccionTRABEM(61), 5490);
  // El benchmark de 61 PF usa la banda <100 (925 €/PF): 61×925 = 56.425 ≠ 5.490.
  assert.equal(bandaBenchmark(61).eur_pf, 925);
  assert.equal(referenciaExternaISBSG(61), 56425);
  assert.notEqual(referenciaExternaISBSG(61), referenciaConstruccionTRABEM(61));
  // Bandas por tamaño.
  assert.equal(bandaBenchmark(250).eur_pf, 775);
  assert.equal(bandaBenchmark(600).eur_pf, 590);
  assert.equal(bandaBenchmark(1500).eur_pf, 475);
});

// 3) Cambiar PF_TRABEM_EUR en una sola configuración cambia todas las derivadas.
test('un único parámetro PF_TRABEM_EUR propaga a todo el cálculo comercial', () => {
  const nuevo = 100;
  assert.equal(referenciaConstruccionTRABEM(61, nuevo), 6100);
  assert.equal(referenciaConstruccionTRABEM(40, nuevo), 4000);
  assert.equal(referenciaConstruccionTRABEM(75, nuevo), 7500);
  // La fuente real es un solo valor en el JSON.
  assert.equal(typeof C.comercial.PF_TRABEM_EUR, 'number');
});

// 4) 70/30 sigue calculándose pero SOLO como valor técnico interno.
test('valor técnico interno 70/30 se calcula y vive en instrumentacion_interna', () => {
  assert.equal(C.instrumentacion_interna.TARIFA_HUMANO_EUR, 70);
  assert.equal(C.instrumentacion_interna.TARIFA_AGENTE_EUR, 30);
  // 20 EIE humano + 30 EIE AI = 20×70 + 30×30 = 1400 + 900 = 2300.
  assert.equal(valorTecnicoInterno(20, 30), 2300);
  // €/PF observado interno = 2300 / 46 PF = 50.
  assert.equal(eurPfObservadoInterno(20, 30, 46), 50);
  // El 70/30 NO está en la capa comercial.
  assert.equal(C.comercial.PF_TRABEM_EUR, 90);
  assert.ok(!('TARIFA_HUMANO_EUR' in C.comercial));
});

// 5) 90 €/PF (comercial) y 1,25 €/PF (incentivo) son constantes separadas.
test('el precio comercial y el incentivo no se pueden confundir', () => {
  assert.equal(C.comercial.PF_TRABEM_EUR, 90);
  assert.equal(C.incentivo.VALOR_PF_EUR, 1.25);
  assert.notEqual(C.comercial.PF_TRABEM_EUR, C.incentivo.VALOR_PF_EUR);
  // Namespaces distintos.
  assert.ok(!('VALOR_PF_EUR' in C.comercial));
  assert.ok(!('PF_TRABEM_EUR' in C.incentivo));
  // Cálculos muy distintos para el mismo PF.
  assert.equal(valorIncentivoIndividual(240), 300); // 240 × 1,25
  assert.equal(referenciaConstruccionTRABEM(240), 21600); // 240 × 90
  // PF netos y bandas mensuales.
  assert.equal(pfNetos(200, 20), 180);
  assert.equal(bandaIncentivoMensual(159), 'bajo');
  assert.equal(bandaIncentivoMensual(160), 'suelo');
  assert.equal(bandaIncentivoMensual(240), 'normal');
  assert.equal(bandaIncentivoMensual(320), 'alto');
});

// 6) GUARDA ANTI-DUPLICACIÓN: las skills no re-hardcodean los literales centralizados.
test('las skills no repiten los literales centralizados (90/70/30/60/tablas ISBSG)', () => {
  const archivos = [
    'imputar/SKILL.md',
    'valorar/SKILL.md',
    'presupuestar/SKILL.md',
    'imputar/reference/doctrina.md',
    'imputar/reference/notion.md',
  ];
  // Patrones que ya NO deben aparecer como literal operativo en los prompts:
  // tarifas por-EIE en euros, PF_TRABEM en euros, y las bandas ISBSG.
  const prohibidos = [
    /×\s*70\s*€/,
    /×\s*30\s*€/,
    /×\s*60\s*€/,
    /90\s*€\/PF/,
    /\b925\b/,
    /\b775\b/,
    /\b590\b/,
    /\b475\b/,
    /1[.,]25\s*€/,
  ];
  const fallos = [];
  for (const rel of archivos) {
    const txt = read(rel);
    for (const re of prohibidos) {
      if (re.test(txt)) fallos.push(`${rel}: ${re}`);
    }
  }
  assert.deepEqual(
    fallos,
    [],
    `Literales centralizados hardcodeados en skills (usar el nombre + constants/):\n${fallos.join('\n')}`,
  );
});

// 7) Los históricos siguen siendo legibles: la semántica antigua está documentada.
test('legacy documenta la semántica antigua para leer históricos', () => {
  assert.ok(C.legacy);
  assert.match(C.legacy.referencia_tecnica_60_x_K, /60 €/);
  assert.match(C.legacy.precio_a_cliente_por_capas, /VALOR TÉCNICO INTERNO/);
  assert.ok(C.legacy.campos_notion_conservados.includes('Referencia técnica (€)'));
});

// 8) Retribución en tres capas: estructura y tramos de EBITDA del variable colectivo.
test('retribución en tres capas: estructura y tramos EBITDA del colectivo', () => {
  const r = C.retribucion_tres_capas;
  assert.ok(r, 'falta el bloque retribucion_tres_capas');
  assert.ok(
    r.capa_1_salario_fijo && r.capa_2_variable_individual && r.capa_3_variable_colectivo,
    'deben existir las tres capas',
  );
  // Capa 1: el mínimo se ancla en la banda suelo de la unidad (Desarrollo = 160).
  assert.equal(C.incentivo.unidades_de_desempeno.Desarrollo.bandas_pf.suelo, 160);
  // Capa 3: tramos marginales de EBITDA, contiguos, con participación creciente, arrancando en 20%.
  const tramos = r.capa_3_variable_colectivo.tramos_ebitda;
  assert.equal(tramos[0].desde_pct, 20);
  assert.equal(tramos.at(-1).hasta_pct, null, 'el último tramo es abierto (>35%)');
  for (let i = 1; i < tramos.length; i++) {
    assert.equal(tramos[i].desde_pct, tramos[i - 1].hasta_pct, 'los tramos deben ser contiguos');
    assert.ok(
      tramos[i].pct_excedente_tramo > tramos[i - 1].pct_excedente_tramo,
      'la participación por tramo debe crecer',
    );
  }
  // Las capas se calculan por separado (no doble contabilización).
  assert.match(r.descripcion, /SEPARADO/);
});
