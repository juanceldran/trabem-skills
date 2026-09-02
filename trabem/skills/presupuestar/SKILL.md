---
name: presupuestar
description: Estimación EX ANTE del SETUP (requisitos → propuesta económica): alcance, PF previstos, EIE/MC1 internos, referencia de construcción PF TRABEM (PF × €/PF), benchmark externo, Value Case, capacidad de absorción, precio de construcción recomendado y forma de cobro (Método TRABEM). Baseline inmutable. NO es /valorar (contraste funcional) ni /imputar (registro real).
argument-hint: "[requisitos o proyecto a presupuestar]"
disable-model-invocation: true
---

# SKILL `/presupuestar`

## Estimación ex ante de alcance, PF, referencia de construcción TRABEM (setup) y forma de cobro

> **Cuenta compartida — confirma quién presupuesta, antes de nada.** La cuenta de Claude la usa todo el equipo (Juan · María · Aurelio…) y la sesión **no sabe quién eres**. Si no está claro **quién** pide el presupuesto o a quién se atribuye la valoración, **pregúntalo en una línea** («¿Quién presupuesta? Juan / María / Aurelio / otro»). **Nunca lo asumas.**

### MISIÓN

La skill `/presupuestar` existe para transformar requisitos todavía no
construidos en una propuesta económica defendible del **setup / construcción**.
Debe responder:

1. ¿Qué se va a construir?
2. ¿Qué parte ya existe?
3. ¿Qué parte es configuración, integración o nueva funcionalidad?
4. ¿Cuántos PF se prevén?
5. ¿Qué EIE/HH internos se prevén (instrumentación)?
6. ¿Qué MC1 se espera?
7. ¿Cuál es la referencia de construcción PF TRABEM (PF × €/PF)?
8. ¿Qué dice el benchmark externo y qué valor económico puede generar?
9. ¿Qué precio de construcción recomienda el Método TRABEM y cómo se cobra?

`/presupuestar` trabaja EX ANTE. No debe presentar como dato real nada que
todavía sea estimado. Valora el **setup**.

**Relación con las otras skills:** `/presupuestar` (antes de construir) →
construcción → `/imputar` (registro real) → `/valorar --reevaluar` (contraste
funcional previsión vs realidad). Comparte con `/valorar` el método IFPUG y el
benchmark; se diferencia en que aquí todo es previsión y añade capacidad de
absorción y forma de cobro.

### ENTRADA

El texto que el desarrollador pasa al invocar la skill es:

$ARGUMENTS

Son los requisitos / el proyecto a presupuestar (contexto). La estimación se
deriva del análisis, no del texto; todo dato producido es EX ANTE (estimado).

---

# 1. FUENTES

Recuperar cuando existan: requisitos; conversaciones con cliente; propuesta
funcional; módulos existentes; repositorio actual; ficha del producto base;
histórico del cliente; segmento; facturación aproximada; proyectos
comparables; TRABEM €/PF histórico del segmento; EIE y MC1 de trabajos
similares.

Fuente de verdad interna: `📊 Registro EIE`
(https://app.notion.com/p/700528d4041b40fa84a6877f32da635c) y doctrina
comercial `💶 Cómo cobrar trabajos y módulos`
(https://app.notion.com/p/3c5b83b803fa810ebbc6f63f4a0639b9).

**Constantes** (única fuente, no reescribir literales): `constants/trabem.constants.json`
del plugin `trabem` — `PF_TRABEM_EUR` (precio comercial de construcción), tarifas
internas 70/30, bandas ISBSG (benchmark externo) e incentivo. Cárgalo para tomar
un valor; no repitas los números aquí. **Cuatro planos económicos** (no confundir;
ver `planos_economicos`): (1) coste humano real = HH × coste/hora real por persona ·
(2) valoración técnica interna = EIE 70/30 · (3) valor comercial = PF válidos × 90 ·
(4) incentivo = PF netos × 1,25.

---

# 2. IDENTIFICACIÓN

Registrar: `Presupuesto`, `Cliente`, `Proyecto`, `Módulo`, `Fecha presupuesto`,
`Responsable valoración`, `Segmento cliente`.

Segmento cliente: Clínica pequeña · Clínica / policlínica · Hospital · Grupo
hospitalario · Otro.

Registrar `Facturación anual cliente` cuando exista evidencia razonable, y
`Origen facturación`: Cliente · Público · Interno · Estimado.

---

# 3. ALCANCE

Definir `Scope previsto`. Separar: producto estándar existente · configuración
· integración · personalización · nueva funcionalidad · correctivos ·
infraestructura · operación · trabajo fuera de alcance.

No volver a presupuestar como desarrollo un activo estándar ya incluido en la
suscripción.

---

# 4. CLASIFICACIÓN DEL TRABAJO

Clasificar cada bloque: Nueva funcionalidad · Evolutivo funcional · Correctivo
· Configuración · Integración · Refactor · Infraestructura · Arquitectura ·
Mixto. Si hay varios tipos, separar el alcance por bloques.

---

# 5. REUTILIZACIÓN PREVISTA

Registrar `Reutilización prevista` (No · Parcial · Sí) y
`% reutilización prevista`. Identificar qué parte del alcance ya existe en
TRABEM. La reutilización reduce EIE, HH y MC1 previstos; NO reduce
automáticamente el valor comercial de la funcionalidad entregada.

---

# 6. PUNTOS FUNCIÓN PREVISTOS

Aplicar IFPUG sobre requisitos y arquitectura prevista. Definir
`Boundary previsto` y `Scope funcional previsto`. Estimar EI, EO, EQ, ILF, EIF
previstos; aplicar DET/FTR/RET cuando la información lo permita. Calcular
`PF previstos` y registrar `Confianza PF prevista` (Baja · Media · Alta). No
fingir precisión cuando los requisitos sean ambiguos.

(Método, pesos, tablas de complejidad y guardarraíles anti-inflado: los mismos
que `/valorar`. No inflar PF por framework, seguridad, idiomas, IA o plazo.)

El **PF es la unidad comercial** (§9); EIE/HH/MC1 (§7–§8) son instrumentación
interna. No los mezcles.

---

# 7. EIE PREVISTO E INSTRUMENTACIÓN INTERNA 70/30

Estimar `EIE bajo/central/alto previsto`. Aplicar descuento por reutilización.
Estimar también el reparto en dos capas: `EIE AI-acelerado previsto` +
`EIE humano-dominante previsto` (suman el EIE central previsto). Registrar
`Factor K previsto` (justifica la banda de EIE; **no** multiplica precio).

Calcular el **valor técnico interno 70/30** previsto:
`Valor técnico interno = (EIE humano-dominante × tarifa humano) + (EIE AI-acelerado × tarifa agente)`
(tarifas en `constants/trabem.constants.json` → `instrumentacion_interna`). Es
**instrumentación interna** (productividad, coste técnico, calibración del PF
TRABEM, comprobar si cobramos bien): **NO es el precio a cliente**. El precio
comercial es la referencia de construcción PF TRABEM (§9). Retiradas la
antigua fórmula por-EIE con Factor K y la etiqueta «Precio a cliente por capas»
(ver `legacy`).

---

# 8. HH Y MC1 PREVISTOS

Estimar `HH previstas`, `Coste humano previsto`, `Coste IA directo previsto`,
`Otros MC1 previstos`, `MC1 total previsto`. Marcar TODOS como Estimados.
(El coste hora **real** es por persona y vive en Notion (`Coste hora humano`), no
en el repo; **no** es la tarifa 70/30. La suscripción plana de Claude Code es MC2
y no se imputa.)

---

# 9. REFERENCIA DE CONSTRUCCIÓN PF TRABEM (unidad comercial)

Unidad comercial principal = **PF TRABEM**. En cuanto haya `PF previstos`:

`Referencia construcción PF TRABEM = PF previstos × PF_TRABEM_EUR`

`PF_TRABEM_EUR` vigente en `constants/trabem.constants.json` → `comercial`
(provisional, en calibración sep–dic 2026). Es la referencia de precio de
**construcción / setup**. **No** apliques todavía escalones automáticos
100/110/120 (futura decisión de negocio, no regla vigente). El PF es
**aspiracional**: el precio realizable por cliente puede ser menor — presenta
ambos y mantén la **tensión**, no colapses el PF en lo que se puede cobrar.

---

# 10. BENCHMARK EXTERNO PF (ISBSG · contraste)

Calcular cuando proceda `Benchmark externo €/PF`, `Percentil benchmark`,
`Referencia externa PF` (bandas ISBSG en `constants/trabem.constants.json` →
`benchmark_externo_isbsg`). Es **referencia externa de mercado convencional**:
sirve de contraste (precio convencional, diferencia con nuestra tarifa propia).
**Nunca** determina automáticamente el precio TRABEM ni se usa como tarifa
comercial.

---

# 11. TRABEM €/PF HISTÓRICO

Con histórico suficiente, recuperar `TRABEM €/PF del segmento` (P25/P50/P65/
P75). Registrar `Nº comparables` y `Confianza TRABEM €/PF` (baja si la muestra
es insuficiente). Sirve para **aprender** nuestro propio €/PF y calibrar
`PF_TRABEM_EUR`; no sustituye a la referencia de construcción vigente (§9).
Calibración acotada al nicho **sanitario** (`constants…calibracion`).

---

# 12. CAPACIDAD DE ABSORCIÓN

Registrar `Precio proyecto / facturación anual cliente %`. Hipótesis empírica
inicial de contraste: **≈1 % de la facturación anual** para proyectos
tecnológicos con impacto consistente en productividad. No convertirla en
tarifa automática.

Calcular `Capacidad anual orientativa` y `Capacidad mensual orientativa`.
Ejemplo: 4 M€ facturación → 40.000 €/año → ~3.300 €/mes durante 12 meses. La
experiencia comercial puede justificar otras duraciones. Registrar
`Confianza capacidad absorción`.

---

# 13. VALUE CASE

Analizar cuando exista información: ahorro; capacidad operativa; personal
evitado; ingresos adicionales; reducción de no-shows; reducción de errores;
menor carga administrativa; menor riesgo; mayor throughput; impacto clínico;
impacto operativo. Separar observado · proporcionado por cliente · estimado ·
inferido. Registrar `Value Case anual previsto` y `Confianza Value Case`.

---

# 14. CORREDOR DE PRICING

Construir: `Suelo económico (MC1)` · `Referencia construcción PF TRABEM` ·
`Valor técnico interno 70/30` · `Benchmark externo PF` · `TRABEM €/PF histórico`
· `Value Case` · `Capacidad absorción` · `Mercado / alternativas`. La referencia
de construcción PF TRABEM (§9) es el ancla comercial; el resto son contraste. No
promediar automáticamente; investigar divergencias.

---

# 15. PRECIO DE CONSTRUCCIÓN (SETUP) RECOMENDADO

Devolver `Precio mínimo defendible`, `Precio de construcción recomendado`,
`Rango negociable`, `Margen esperado %`, `Confianza presupuesto`. Parte de la
referencia de construcción PF TRABEM (§9) y ajústala con Value Case y capacidad
de absorción. El precio final se cierra por alcance. No presentar horas al
cliente.

---

# 16. FORMA DE COBRO

Clasificar `Forma de cobro` del setup: Setup único · Setup + mensual · Renting
tecnológico · Hitos por fases · Otro. Registrar `Duración cobro meses`. Cuando
el precio total sea correcto pero el pago único genere fricción, evaluar
`Renting tecnológico`. No reducir el precio total solo para reducir cuota.

---

# 17. PRODUCTO ESTÁNDAR VS NUEVO DESARROLLO

Ejemplo Portal del Paciente: producto estándar → suscripción; configuración →
setup/adaptación; nueva funcionalidad → PF previstos + referencia de
construcción TRABEM. No presupuestar de nuevo el producto base completo.

---

# 18. BASELINE INMUTABLE

Guardar siempre el presupuesto original. No sobrescribir después: PF previstos,
EIE previsto, MC1 previsto, referencia de construcción, precio recomendado,
precio aceptado, margen previsto, reutilización prevista. Finalidad: comparar
después previsión vs realidad.

---

# 19. CAMPOS DE NOTION PARA `/presupuestar`

Añadir o utilizar (recomendado: base propia **Presupuestos**, no mezclar con
las fichas de producción del Registro EIE; ver OPERATIVO):

**Identificación:** Presupuesto · Cliente · Proyecto · Módulo · Fecha
presupuesto · Responsable valoración · Segmento cliente · Facturación anual
cliente · Origen facturación.

**Alcance:** Scope previsto · Boundary previsto · Tipo trabajo previsto ·
Reutilización prevista · % reutilización prevista.

**PF previstos:** EI previstos · EO previstos · EQ previstos · ILF previstos ·
EIF previstos · PF previstos · Confianza PF prevista.

**Ingeniería interna:** EIE bajo/central/alto previsto · Factor K previsto ·
Valor técnico interno 70/30 previsto (€) · €/PF observado interno.

**Costes:** HH previstas · Coste humano previsto · Coste IA previsto · Otros
MC1 previstos · MC1 total previsto.

**Comercial (construcción):** PF TRABEM €/PF · Referencia construcción PF TRABEM
(€) · Precio mínimo defendible · Precio de construcción recomendado · Rango
negociable · Precio aceptado · Margen esperado %.

**Benchmark / calibración:** Benchmark externo ISBSG €/PF · Percentil benchmark ·
Referencia externa ISBSG (€) · TRABEM €/PF segmento · Nº comparables · Confianza
TRABEM €/PF.

**Cliente / valor:** Value Case anual previsto · Confianza Value Case ·
Capacidad anual orientativa · Capacidad mensual orientativa · % proyecto /
facturación anual.

**Cobro / control:** Forma de cobro · Duración cobro meses · Confianza
presupuesto · Estado presupuesto.

---

# 20. SALIDA OBLIGATORIA

Distinguir siempre las tres capas de la propuesta de **setup**:

**Cliente / Segmento / Facturación:**

**A) CONSTRUCCIÓN / SETUP**
- PF previstos · Confianza PF:
- €/PF TRABEM vigente:
- Referencia construcción PF TRABEM (€):
- Precio de construcción recomendado · Rango:

**B) INGENIERÍA INTERNA (instrumentación, no precio a cliente)**
- EIE previsto (central; AI-acelerado / humano-dominante):
- HH previstas:
- Valor técnico interno 70/30 (€):
- MC1 previsto:

**C) BENCHMARK EXTERNO (contraste ISBSG, no tarifa)**
- €/PF ISBSG · Percentil:
- Referencia externa ISBSG (€):
- Diferencia con la tarifa propia:

**Cierre:** Value Case · Capacidad absorción · Forma de cobro · Margen esperado ·
Confianza.

---

# 21. PRINCIPIO FINAL

`/presupuestar` no intenta determinar cuánto tardará una persona y
multiplicarlo por una tarifa. Determina tamaño funcional previsto (PF, la unidad
comercial), reutilización, entidad técnica interna, coste esperado, valor para
el cliente, comportamiento histórico del segmento, capacidad de absorción y
margen; y propone un precio de construcción (setup) coherente con el Método
TRABEM.

---

# OPERATIVO · DÓNDE SE REGISTRA

Cada presupuesto es **una fila** en la base **📊 Presupuestos TRABEM ·
Predicción vs realidad**
(https://app.notion.com/p/8ba2ead5e35545ae82ba052902fbae75) — capa separada del
Registro EIE (que es la fuente de verdad de PRODUCCIÓN). Rellena ahí los campos
EX ANTE (§19): identificación, alcance previsto, PF/EIE/MC1 previstos, referencia
de construcción PF TRABEM, benchmark, Value Case, capacidad de absorción, precio
y forma de cobro. Marca todo lo previsto como estimado.

- **Baseline inmutable (§18):** cuando el presupuesto pase a `Aceptado`, NO
  reescribas sus campos previstos. Un cambio material de alcance crea una
  **nueva fila** (sube `Versión presupuesto`) enlazada por `Presupuesto
  anterior`; nunca borres la historia.
- **Estado presupuesto:** Borrador → Valoración interna → Enviado → Negociación
  → Aceptado / Rechazado → En ejecución → Pendiente valoración final → Cerrado.
  Conserva también los **rechazados** (calibran €/PF y capacidad de absorción).
- **Enlace a producción:** cuando el trabajo se registre con `/imputar`,
  relaciona la(s) ficha(s) del Registro EIE en `Producción relacionada` (1
  presupuesto → varios registros EIE). Los datos reales (PF, EIE, HH, MC1) se
  agregan solos por **rollup** desde esas fichas; no los dupliques a mano.
- **No escribas** desviaciones, accuracy ni €/PF: son fórmulas de la base.

`/presupuestar` no fija tarifas oficiales ni presenta horas al cliente: produce
una propuesta de setup cerrada por alcance, defendible y trazable, y deja el
baseline para que `/valorar` mida después la realidad.
