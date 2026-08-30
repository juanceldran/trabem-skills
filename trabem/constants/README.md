# Constantes del Método TRABEM · fuente única

**Doctrina vigente desde 2026-08-30.**

Todas las constantes numéricas del método viven **solo aquí**, en
[`trabem.constants.json`](./trabem.constants.json). Las skills (`/imputar`,
`/valorar`, `/presupuestar`) y la doctrina **no repiten estos literales**: los
referencian por nombre y cargan el JSON cuando necesitan un valor. Así, cambiar
un número en un único sitio cambia el comportamiento de las tres skills.

`trabem.constants.mjs` expone helpers derivados con nombres separados por capa
para que el código no pueda confundir el **precio comercial** con el
**incentivo**.

## Las cuatro magnitudes (no mezclar)

| Concepto | Constante | Valor vigente | Qué es |
|---|---|---|---|
| **Precio comercial de construcción** | `comercial.PF_TRABEM_EUR` | **90 €/PF** (calibración sep–dic 2026) | Unidad de venta. `Referencia construcción = PF válidos × 90`. |
| **Instrumentación interna 70/30** | `instrumentacion_interna.TARIFA_HUMANO_EUR` / `TARIFA_AGENTE_EUR` | **70 / 30 €** por EIE-equivalente | Productividad, coste técnico, calibración. **NO es precio a cliente.** |
| **Benchmark externo** | `benchmark_externo_isbsg.bandas` | 925 / 775 / 590 / 475 €/PF por banda | Contraste ISBSG. **Nunca** fija el precio TRABEM. |
| **Incentivo individual** | `incentivo.VALOR_PF_EUR` | **1,25 €/PF netos** | Sistema distinto del precio. `1,25 ≠ 90`. |

`MC1` (coste directo) = Σ(horas × **coste hora real de la persona**). El coste
hora real (salario cargado) es **dato sensible**: vive solo en Notion
(`Coste hora humano` por ficha), **no** en este repo. No confundir con las
tarifas 70/30 (instrumentación). La suscripción plana de Claude Code es **MC2** y
no se imputa.

## Reglas de doctrina que estas constantes materializan

- **PF = unidad funcional y comercial.** `Referencia construcción = PF válidos × PF_TRABEM_EUR`.
- **HH / EIE = instrumentos internos** de productividad y calibración (70/30). No es precio comercial.
- **ISBSG = benchmark externo**, contraste; no alimenta la tarifa TRABEM ni se usa como precio.
- **Incentivo** usa PF pero es OTRO sistema; su constante (1,25 €/PF) nunca se
  mezcla con la comercial (90 €/PF).
- **Factor K** justifica la banda de EIE; **no multiplica** el precio.
- **Calibración**: el €/PF TRABEM se calibra para el nicho **sanitario**; otros
  sectores solo como contraste metodológico, salvo decisión expresa.
- No crear todavía escalones 100/110/120: futura decisión de negocio.

## Compatibilidad histórica

El bloque `legacy` del JSON documenta la semántica antigua (constante `60 € × K`
retirada; el cálculo 70/30 que antes se etiquetó «Precio a cliente por capas» y
ahora es **valor técnico interno**). Los registros históricos de Notion y sus
campos (`Referencia técnica (€)`, `Precio a cliente (por capas) (€)`) **se
conservan intactos**; los registros nuevos usan la semántica nueva.

## Tests

`node --test` (desde `trabem/`) ejecuta `test/constants.test.mjs`: comprueba la
aritmética (61 PF → 5.490 €…), que el benchmark no altera el precio, que un solo
parámetro propaga, que 70/30 e incentivo no se confunden con la capa comercial,
y una **guarda anti-duplicación** que falla si una skill vuelve a hardcodear
estos literales.
