---
name: presupuestar
description: Estimación EX ANTE (requisitos → propuesta económica): alcance, PF previstos, EIE, MC1, benchmark, TRABEM €/PF, Value Case, capacidad de absorción, precio recomendado y forma de cobro (Método TRABEM). Baseline inmutable. NO es /valorar (contraste funcional) ni /imputar (registro real).
argument-hint: "[requisitos o proyecto a presupuestar]"
disable-model-invocation: true
---

# SKILL `/presupuestar`

## Estimación ex ante de alcance, PF, EIE, MC1, precio y forma de cobro

### MISIÓN

La skill `/presupuestar` existe para transformar requisitos todavía no
construidos en una propuesta económica defendible. Debe responder:

1. ¿Qué se va a construir?
2. ¿Qué parte ya existe?
3. ¿Qué parte es configuración, integración o nueva funcionalidad?
4. ¿Cuántos PF se prevén?
5. ¿Qué EIE se prevé?
6. ¿Qué MC1 se espera?
7. ¿Qué segmento de cliente es?
8. ¿Qué valor económico puede generar?
9. ¿Qué precio recomienda el Método TRABEM?
10. ¿Cómo conviene cobrarlo?

`/presupuestar` trabaja EX ANTE. No debe presentar como dato real nada que
todavía sea estimado.

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

---

# 7. EIE PREVISTO

Estimar `EIE bajo/central/alto previsto`. Aplicar descuento por reutilización.
Estimar también el reparto en dos capas: `EIE AI-acelerado previsto` +
`EIE humano-dominante previsto` (suman el EIE central previsto). Registrar
`Factor K previsto`. Calcular la referencia **por capas** (constantes 2026,
unificadas en `presupuestar`/`valorar`/`imputar`: humano 70 €, agente 30 €):
`Referencia EIE prevista = (EIE humano-dominante previsto × 70 €) + (EIE AI-acelerado previsto × 30 €)`.
Sustituye a la antigua `EIE × 60 € × K`; el `Factor K` se conserva como
justificación de la banda de EIE, ya no multiplica. Es contraste técnico
interno, no el precio final.

---

# 8. HH Y MC1 PREVISTOS

Estimar `HH previstas`, `Coste humano previsto`, `Coste IA directo previsto`,
`Otros MC1 previstos`, `MC1 total previsto`. Marcar TODOS como Estimados.

---

# 9. BENCHMARK EXTERNO PF

Calcular cuando proceda `Benchmark externo €/PF`, `Percentil benchmark`,
`Referencia externa PF`. El benchmark ISBSG/IFPUG es referencia externa de
ingeniería, no precio de cliente automático.

---

# 10. TRABEM €/PF

Con histórico suficiente, recuperar `TRABEM €/PF del segmento` (P25/P50/P65/
P75). Registrar `Nº comparables` y `Confianza TRABEM €/PF` (baja si la muestra
es insuficiente). Calcular
`Referencia TRABEM PF = PF previstos × TRABEM €/PF segmento`.

---

# 11. CAPACIDAD DE ABSORCIÓN

Registrar `Precio proyecto / facturación anual cliente %`. Hipótesis empírica
inicial de contraste: **≈1 % de la facturación anual** para proyectos
tecnológicos con impacto consistente en productividad. No convertirla en
tarifa automática.

Calcular `Capacidad anual orientativa` y `Capacidad mensual orientativa`.
Ejemplo: 4 M€ facturación → 40.000 €/año → ~3.300 €/mes durante 12 meses. La
experiencia comercial puede justificar otras duraciones. Registrar
`Confianza capacidad absorción`.

---

# 12. VALUE CASE

Analizar cuando exista información: ahorro; capacidad operativa; personal
evitado; ingresos adicionales; reducción de no-shows; reducción de errores;
menor carga administrativa; menor riesgo; mayor throughput; impacto clínico;
impacto operativo. Separar observado · proporcionado por cliente · estimado ·
inferido. Registrar `Value Case anual previsto` y `Confianza Value Case`.

---

# 13. CORREDOR DE PRICING

Construir: `Suelo económico` · `Referencia EIE prevista` ·
`Referencia TRABEM PF` · `Benchmark externo PF` · `Value Case` ·
`Capacidad absorción` · `Mercado / alternativas`. No promediar automáticamente;
investigar divergencias.

---

# 14. PRECIO RECOMENDADO

Devolver `Precio mínimo defendible`, `Precio recomendado`, `Rango negociable`,
`Margen esperado %`, `Confianza presupuesto`. El precio final se cierra por
alcance. No presentar horas al cliente.

---

# 15. FORMA DE COBRO

Clasificar `Forma de cobro`: Setup único · Setup + mensual · Renting
tecnológico · Suscripción · Evolutivo · Hitos por fases · Otro. Registrar
`Duración cobro meses`. Cuando el precio total sea correcto pero el pago único
genere fricción, evaluar `Renting tecnológico`. No reducir el precio total solo
para reducir cuota.

---

# 16. PRODUCTO ESTÁNDAR VS NUEVO DESARROLLO

Ejemplo Portal del Paciente: producto estándar → suscripción; configuración →
setup/adaptación; nueva funcionalidad → PF previstos + valoración TRABEM. No
presupuestar de nuevo el producto base completo.

---

# 17. BASELINE INMUTABLE

Guardar siempre el presupuesto original. No sobrescribir después: PF previstos,
EIE previsto, MC1 previsto, precio recomendado, precio aceptado, margen
previsto, reutilización prevista. Finalidad: comparar después previsión vs
realidad.

---

# 18. CAMPOS DE NOTION PARA `/presupuestar`

Añadir o utilizar (recomendado: base propia **Presupuestos**, no mezclar con
las fichas de producción del Registro EIE; ver OPERATIVO):

**Identificación:** Presupuesto · Cliente · Proyecto · Módulo · Fecha
presupuesto · Responsable valoración · Segmento cliente · Facturación anual
cliente · Origen facturación.

**Alcance:** Scope previsto · Boundary previsto · Tipo trabajo previsto ·
Reutilización prevista · % reutilización prevista.

**PF previstos:** EI previstos · EO previstos · EQ previstos · ILF previstos ·
EIF previstos · PF previstos · Confianza PF prevista.

**EIE previsto:** EIE bajo/central/alto previsto · Factor K previsto ·
Referencia EIE prevista.

**Costes:** HH previstas · Coste humano previsto · Coste IA previsto · Otros
MC1 previstos · MC1 total previsto.

**Benchmark / pricing:** Benchmark externo €/PF · Percentil benchmark ·
Referencia externa PF · TRABEM €/PF segmento · Nº comparables · Referencia
TRABEM PF · Confianza TRABEM €/PF.

**Cliente / valor:** Value Case anual previsto · Confianza Value Case ·
Capacidad anual orientativa · Capacidad mensual orientativa · % proyecto /
facturación anual.

**Comercial:** Precio mínimo defendible · Precio recomendado previsto · Rango
negociable · Precio aceptado · Forma de cobro · Duración cobro meses · Margen
esperado %.

**Control:** Confianza presupuesto · Estado presupuesto.

---

# 19. SALIDA OBLIGATORIA

**Cliente:**
**Segmento:**
**Facturación:**
**Alcance:**
**PF previstos:**
**Confianza PF:**
**EIE previsto:**
**MC1 previsto:**
**Referencia EIE:**
**Referencia TRABEM PF:**
**Value Case:**
**Capacidad absorción:**
**Precio recomendado:**
**Forma de cobro:**
**Margen esperado:**
**Confianza:**

---

# 20. PRINCIPIO FINAL

`/presupuestar` no intenta determinar cuánto tardará una persona y
multiplicarlo por una tarifa. Determina tamaño funcional previsto,
reutilización, entidad técnica, coste esperado, valor para el cliente,
comportamiento histórico del segmento, capacidad de absorción y margen; y
propone un precio coherente con el Método TRABEM.

---

# OPERATIVO · DÓNDE SE REGISTRA

Cada presupuesto es **una fila** en la base **📊 Presupuestos TRABEM ·
Predicción vs realidad**
(https://app.notion.com/p/8ba2ead5e35545ae82ba052902fbae75) — capa separada del
Registro EIE (que es la fuente de verdad de PRODUCCIÓN). Rellena ahí los campos
EX ANTE (§18): identificación, alcance previsto, PF/EIE/MC1 previstos,
benchmark, TRABEM €/PF, Value Case, capacidad de absorción, precio y forma de
cobro. Marca todo lo previsto como estimado.

- **Baseline inmutable (§17):** cuando el presupuesto pase a `Aceptado`, NO
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
una propuesta cerrada por alcance, defendible y trazable, y deja el baseline
para que `/valorar` mida después la realidad.
