---
name: imputar
description: Registra en Notion, de forma homogénea y auditable, el trabajo técnico del equipo — EIE, productividad AI-native, horas, MC1 y reutilización. NO hace pricing comercial (eso es /valorar).
argument-hint: "[descripción breve del trabajo realizado o 'cerrar']"
disable-model-invocation: true
---

# SKILL `/imputar`

## Registro de trabajo, EIE, productividad AI-native, MC1 y reutilización

### MISIÓN

La skill `/imputar` existe para registrar de forma homogénea y auditable el
trabajo técnico realizado por el equipo.

Debe responder a cinco preguntas:

1. ¿Qué trabajo se ha realizado?
2. ¿Quién lo ha realizado?
3. ¿Cuántas horas humanas reales ha consumido?
4. ¿Qué esfuerzo técnico convencional equivalente representa?
5. ¿Qué coste directo y qué capacidad reutilizable ha generado?

`/imputar` NO es una skill de pricing comercial. No debe realizar análisis
completo de Puntos Función IFPUG, benchmarking ISBSG ni fijar precio
recomendado al cliente. Esos análisis pertenecen a `/valorar` (skill aparte;
puede no existir todavía — si el usuario pide pricing, remitir a `/valorar`).

### ENTRADA

El texto que el desarrollador pasa al invocar la skill es:

$ARGUMENTS

Es únicamente contexto humano. No lo uses como única evidencia: analiza el
trabajo real (repositorio, commits, diff, tests, despliegue).

El desarrollador SÍ puede aportar sus horas humanas reales — es la fuente
válida para `Horas humanas` y para `Base horas: Registradas`. NO le pidas que
calcule EIE, Factor K, porcentajes ni MC1: eso lo hace el sistema a partir de
la evidencia.

---

# MODO DIARIO (invocación sin describir un trabajo)

Si `/imputar` se invoca **sin describir un trabajo concreto** —vacío, solo un
número de horas, o una nota tipo "flow"— entra en **modo diario**: imputa de
una sola vez todo lo que la persona ha trabajado hoy, repartido entre sus
módulos. El objetivo es que con solo teclear `/imputar` salga el cuadro del día
sin que nadie calcule nada.

1. **Identifica al desarrollador** (git user / responsable) y su **jornada por
   defecto** (tabla de abajo). Es el total de horas humanas del día.
2. **Detecta el trabajo del día:** commits de HOY (fecha local) en los repos
   accesibles → los 2–4 módulos tocados (por repo/carpeta/rama). El trabajo sin
   git (ops, Holded, Notion, etc.) lo nombra el desarrollador en una línea. Si
   no hay evidencia ni nada que nombrar, pregunta qué se ha trabajado; no
   inventes módulos.
3. Por **cada módulo** tocado hoy: valora el **incremento** (EIE nuevo desde el
   último commit registrado) y actualiza su ficha + añade fila de bitácora,
   igual que en el modo de un módulo.
4. **Reparte la jornada** entre los módulos del día **en proporción al EIE del
   incremento** de cada uno → `Horas humanas` del día por módulo. `Base horas`
   = **Registradas** (la jornada es el real fijo del día).
5. Devuelve el **cuadro del día**: módulos tocados · EIE producido hoy ·
   jornada (h) · € (interno = EIE×60×K; externo = PF×€/PF cuando sea funcional)
   · y el **múltiplo del día = EIE producido ÷ jornada**.

### Jornada por defecto (denominador fijo)

| Persona | Jornada/día |
|---|--:|
| María | 7 h |
| Juan | 7 h |
| otros / default | 7 h |

Es un valor fijo por persona (editable aquí). No se pregunta cada día.

### Días especiales (override)

Si un día es atípico —una sesión larga, un "flow", un esfuerzo
extraordinario— se puede **forzar el total de horas**: `/imputar 10` usa 10 h
ese día en lugar de la jornada por defecto. El reparto y el cuadro funcionan
igual; deja constancia en la bitácora de que fue jornada extraordinaria.

### Cuándo NO es modo diario

Si `/imputar` recibe una **descripción de trabajo** (una frase sobre lo hecho)
o `cerrar`, se comporta como siempre: imputación de UN módulo, o cierre. El
modo diario solo se activa con invocación vacía o solo-horas.

### Regla del múltiplo (coherencia)

El múltiplo del día solo es real si lo imputado es **trabajo de HOY**. No metas
en el día valoraciones retrospectivas de módulos construidos en días
anteriores: eso dispara el múltiplo de forma falsa. Retrospectivo = imputación
de módulo aparte, no cuenta en el cuadro diario.

---

# 1. FUENTE DE VERDAD

Registrar cada trabajo en la base:

`📊 Registro EIE · Ingeniería AI-native TRABEM`
https://app.notion.com/p/700528d4041b40fa84a6877f32da635c

Antes de crear una nueva ficha, buscar si ya existe una ficha del mismo
módulo/proyecto. Si existe, actualizarla y añadir nueva entrada en la
bitácora. No crear fichas duplicadas para sucesivas sesiones del mismo módulo
salvo que realmente sean módulos funcionalmente independientes.

---

# 2. IDENTIFICACIÓN DEL TRABAJO

Registrar siempre: `Módulo`, `Proyecto`, `Responsable`, `Repositorio`,
`Tipo proyecto`.

Valores de Tipo proyecto: Propio · Cliente.

Registrar una descripción funcional breve pero suficiente para que otra
persona pueda comprender qué se ha construido sin inspeccionar inmediatamente
el código.

---

# 3. ORIGEN DEL TRABAJO

Registrar `Origen del trabajo`. Valores:

Cliente · Producto · Bug · Incidente producción · Mejora interna ·
Deuda técnica · Arquitectura · Seguridad · Infraestructura ·
Comercial / preventa · Regulatorio · Otro.

Cuando sea identificable: `Cliente origen`, `Proyecto origen`.

El objetivo es permitir analizar después qué tipo de trabajo consume la
capacidad del equipo.

---

# 4. TIPO DE TRABAJO — CLASIFICACIÓN LIGERA

`/imputar` clasifica el trabajo a alto nivel, SIN análisis IFPUG. Registrar
`Tipo de trabajo`. Valores:

Nueva funcionalidad · Evolutivo funcional · Correctivo ·
Refactor / deuda técnica · Rendimiento / optimización · Seguridad / hardening ·
Infraestructura / DevOps · Arquitectura / plataforma · Mixto.

La clasificación se deriva de la evidencia: tarea, comportamiento esperado,
diff, commits, tests y contexto.

## Correctivo

Si una función ya debía funcionar y se modifica para que haga lo que ya estaba
previsto, clasificar como `Correctivo`. Ejemplos: botón que debía guardar y no
guardaba; endpoint que debía aceptar una llamada y devolvía 400; cálculo
incorrecto; campo que debía persistirse y no se persistía.

No considerar automáticamente estos trabajos como funcionalidad nueva. La
valoración funcional detallada se hará con `/valorar`.

---

# 5. EVIDENCIA TÉCNICA

Inspeccionar cuando esté disponible: repositorio, rama, commits, diff
relevante, modelos, vistas/endpoints, componentes, tests, integraciones,
despliegue.

Registrar `Commit de referencia` y una descripción breve de la evidencia
utilizada. No estimar alcance únicamente por líneas de código.

---

# 6. EIE — ESFUERZO DE INGENIERÍA CONVENCIONAL EQUIVALENTE

EIE representa el esfuerzo razonable que habría requerido producir el mismo
resultado mediante un proceso convencional de ingeniería con calidad
equivalente. NO son horas reales trabajadas ni horas ficticias facturadas.

Estimar: `EIE bajo`, `EIE central`, `EIE alto`, `EIE materializado`,
`EIE pendiente`. El central debe ser prudente y defendible.

---

# 7. DESCUENTO OBLIGATORIO POR REUTILIZACIÓN EXISTENTE

Antes de fijar el EIE, analizar qué parte del trabajo se apoya en activos ya
existentes. No valorar de nuevo como bespoke: plataforma ya construida,
componentes comunes, frameworks, portal existente, infraestructura,
autenticación, librerías, SDK oficiales, módulos internos reutilizados.

El EIE valora únicamente el trabajo nuevo realmente necesario para el alcance.
La reutilización existente debe REDUCIR el EIE del nuevo trabajo.

---

# 8. FACTOR K

Registrar `Factor K`. Reconoce conocimiento especializado que condiciona
materialmente cómo debe resolverse el problema.

- 1,00 → ejecución estándar
- 1,05–1,10 → conocimiento específico
- 1,10–1,20 → conocimiento especializado
- > 1,20 → excepcional, requiere justificación explícita

No contabilizar dos veces la misma dificultad: si ya elevó el EIE, no volver a
aplicarla íntegramente vía K. Ante duda, el K inferior.

---

# 9. REFERENCIA TÉCNICA

`Referencia técnica = EIE central × 60 € × Factor K`.

La constante de 60 €/EIE permanece vigente hasta revisión formal. Es una
referencia técnica interna; NO es automáticamente el precio final del cliente.
No presentar las EIE como horas realmente trabajadas.

---

# 10. HORAS HUMANAS

Registrar separadamente:

- `Horas humanas Claude`: tiempo humano trabajando activamente mediante Claude
  Code u otras herramientas AI-native.
- `Horas humanas fuera`: tiempo humano fuera del entorno AI (reuniones,
  validación física, operación, coordinación, pruebas manuales, etc.).
- `Horas humanas totales`: suma de ambas.

---

# 11. CALIDAD DEL DATO DE HORAS

Registrar `Base horas`. Valores: Registradas · Estimadas.

No presentar horas reconstruidas retrospectivamente como registradas. Si no
hay evidencia suficiente, usar `Estimadas` y explicarlo. Para productividad
individual e incentivos, las horas registradas tienen prioridad clara.

---

# 12. PRODUCTIVIDAD AI-NATIVE

Separar el EIE según composición del trabajo: `EIE AI-acelerado`,
`EIE humano-dominante`, `AI-native rate %`, `Humano-dominante %`.

- AI-acelerado: trabajo cuya ejecución puede comprimirse materialmente
  mediante IA (código, tests, migraciones, documentación técnica, búsquedas,
  refactor, generación de estructuras, automatización).
- Humano-dominante: trabajo donde el criterio humano sigue siendo la parte
  principal (decisiones de producto, aceptación con cliente, validación
  clínica, pruebas físicas, decisiones regulatorias, coordinación crítica,
  definición de reglas ambiguas).

No usar esta división para exagerar productividad.

---

# 13. RATIO DE COMPRESIÓN

`Ratio compresión = EIE / Horas humanas totales`, ÚNICAMENTE cuando:

- las horas son Registradas;
- cubren el mismo alcance que el EIE;
- no se comparan horas de una subtarea con EIE de un módulo completo.

Si el alcance no es homogéneo, `Ratio compresión = vacío`. No publicar ratios
artificiales.

---

# 14. MC1 — COSTE DIRECTO DEL TRABAJO

Registrar `Coste hora humano` (referencia provisional: 30 €/h).

`Coste humano MC1 = Horas humanas totales × coste hora`.

Registrar además `Coste IA`, `Otros MC1`, `MC1 total`.

---

# 15. MC1 VS MC2

MC1 incluye solo costes directos que desaparecerían si ese trabajo concreto no
existiera (horas humanas; API específica consumida; servicio externo usado
exclusivamente para ese trabajo; infraestructura dedicada atribuible).

MC2 son costes estructurales que existirían igualmente (suscripción plana
Claude Code; infraestructura general del equipo; herramientas corporativas;
licencias generales). No prorratear MC2 arbitrariamente sobre cada módulo. La
suscripción de Claude Code se trata expresamente como MC2 y no se imputa.

---

# 16. REUTILIZACIÓN

Clasificar `Reutilización`. Valores: No · Parcial · Sí. Registrar
`% reutilizable estimado` cuando sea razonablemente cuantificable.

- NO: trabajo específico que no puede reaprovecharse sustancialmente en otro
  contexto.
- PARCIAL: una parte relevante puede reaprovecharse, pero existe una parte
  específica significativa.
- SÍ: crea un activo utilizable después sin reconstruir sustancialmente su
  lógica (módulo común, librería, skill, automatización, framework,
  componente, integración parametrizable, capacidad de plataforma).

Ante duda, la categoría inferior.

Producto multi-cliente: en un producto que se despliega a varias
clínicas/hospitales/clientes, una capacidad de PRODUCTO transferible a otro
despliegue es reutilizable (Sí/Parcial) aunque sea pequeña; no es trabajo a
medida. El freno contra la inflación es `Reutilización demostrada` y la no
doble contabilización, no negar la clasificación.

---

# 17. REUTILIZACIÓN DEMOSTRADA

Registrar `Reutilización demostrada`. Valores: Sí · No. Solo marcar Sí cuando
exista una utilización posterior REAL. No basta con que técnicamente parezca
reutilizable ("poder ponerlo" es potencial, no demostrada).

---

# 18. SEPARACIÓN DEL EIE REUTILIZABLE

Cuando proceda, registrar `EIE creación reutilizable` y
`EIE trabajo específico`. Permite distinguir cuánto esfuerzo crea un activo
estructural y cuánto pertenece solo al cliente/proyecto actual. La creación de
un activo reutilizable se reconoce una sola vez.

---

# 19. EIE EVITADO

Cuando exista una reutilización posterior demostrada, puede registrarse
`EIE evitado` (campo `EIE evitado por reutilización`): aproximación al esfuerzo
convencional que ya no ha sido necesario repetir gracias al activo existente.

No sumar ese EIE evitado a la productividad individual ordinaria: queda
separado como productividad estructural de la empresa.

---

# 20. NO DOBLE CONTABILIZACIÓN

Regla crítica: un mismo trabajo no puede generar varias veces el mismo EIE. Si
un módulo reusable ya existe y se implanta en otro cliente, el nuevo trabajo
solo incluye adaptación, integración, configuración, QA específico, migración,
despliegue, personalización y trabajo incremental real. No volver a imputar el
módulo completo.

---

# 21. ESTADO DEL MÓDULO

Valores: En desarrollo · Cierre provisional · Pendiente producción ·
En producción · Cerrado.

`Materializado` refleja únicamente lo realmente construido; `Pendiente`
refleja el trabajo futuro aún necesario. Nunca presentar trabajo pendiente
como ya producido.

---

# 22. CONFIANZA

Registrar `Confianza` (estimación EIE) y `Confianza MC1` de forma
independiente. Valores: Baja · Media · Alta. Una ficha puede tener evidencia
técnica alta pero horas retrospectivas con confianza media.

---

# 23. BITÁCORA APPEND-ONLY

Cada sesión relevante añade una nueva entrada a la bitácora. Nunca reescribir
retroactivamente la historia para que parezca que la valoración actual siempre
fue la misma. Registrar por entrada: Fecha · Trabajo/subtareas · Commit ·
EIE materializado → EIE central · Estado. Si una valoración cambia, dejar
trazabilidad del valor anterior y del nuevo.

---

# 24. ACTUALIZACIÓN DE FICHAS EXISTENTES

Cuando `/imputar` se ejecute sobre un módulo ya registrado:

1. recuperar la ficha existente;
2. inspeccionar el trabajo nuevo desde el último commit registrado;
3. valorar únicamente el incremento;
4. actualizar materializado/pendiente/central si procede;
5. actualizar costes y horas;
6. revisar reutilización solo si hay nueva evidencia;
7. añadir nueva entrada de bitácora.

No recalcular todo desde cero sin necesidad.

---

# 25. GUARDARRAÍLES

Revisar manualmente la valoración si ocurre cualquiera de estas situaciones:
EIE muy alto para un módulo basado ampliamente en componentes existentes;
ratio de compresión extraordinario; horas parciales frente a alcance total;
reutilización evidente no descontada; K elevado sin justificación;
materializado superior al alcance realmente construido; diferencias
importantes respecto a fichas similares.

Ante discrepancia, preferir prudencia a inflación.

---

# 26. SALIDA DE `/imputar`

Al terminar, devolver un resumen breve:

**Módulo:**
**Responsable:**
**Tipo/Origen:**
**Estado:**
**EIE materializado / central:**
**Horas humanas:**
**Base horas:**
**MC1:**
**Ratio compresión:** solo si válido
**Reutilización:**
**Referencia técnica:**
**Confianza:**
**Ficha actualizada:** sí/no

No convertir esta salida en una propuesta comercial.

---

# 27. LO QUE `/imputar` NO DEBE HACER

No realizar: conteo IFPUG completo; DET/FTR/RET; benchmark ISBSG; cálculo
€/PF; análisis P65; precio recomendado de cliente; Value-Based Pricing
completo; comparación comercial exhaustiva.

Si el usuario solicita estos análisis, remitir el trabajo a `/valorar`.

---

# 28. PRINCIPIO FINAL

`/imputar` mide la máquina productiva. Debe permitir conocer con evidencia:
qué produjo cada persona; cuánto recurso humano consumió; cuánto esfuerzo
convencional equivalente representa; cuánto costó; cuánto fue AI-acelerable;
cuánto queda como activo reusable; y cuánta capacidad productiva está
acumulando la empresa.

La skill debe priorizar trazabilidad y consistencia sobre producir cifras
espectaculares.

---

# OPERATIVO · CAMPOS EN NOTION Y PLANTILLA DE FICHA

Antes de escribir: inspecciona el esquema actual de la base; si tienes
permisos, añade los campos que falten (no elimines campos existentes).

**Identificación:** `Módulo` (title), `Proyecto` (text), `Responsable` (text),
`Repositorio` (url), `Tipo proyecto` (select Propio/Cliente), `Resumen` (text).

**Origen y clasificación (campos nuevos):**
- `Origen del trabajo` (select): Cliente · Producto · Bug · Incidente
  producción · Mejora interna · Deuda técnica · Arquitectura · Seguridad ·
  Infraestructura · Comercial / preventa · Regulatorio · Otro.
- `Cliente origen` (text), `Proyecto origen` (text).
- `Tipo de trabajo` (select): Nueva funcionalidad · Evolutivo funcional ·
  Correctivo · Refactor / deuda técnica · Rendimiento / optimización ·
  Seguridad / hardening · Infraestructura / DevOps · Arquitectura / plataforma ·
  Mixto.
- `Commit de referencia` (text; también en la bitácora).

**EIE:** `EIE bajo`, `EIE central`, `EIE alto`, `EIE materializado`,
`EIE pendiente`, `Factor K`, `Referencia técnica (€)` (euro).

**Productividad:** `EIE AI-acelerado`, `EIE humano-dominante`,
`AI-native rate %`, `Humano-dominante %`.

**Horas:** `Coste hora humano` (euro), `Horas humanas Claude`,
`Horas humanas fuera`, `Horas humanas totales`, `Base horas`
(select Registradas/Estimadas).

**MC1:** `Coste humano MC1`, `Coste IA`, `Otros MC1`, `MC1 total` (euro).

**Ratio:** `Ratio compresión`.

**Reutilización:** `Reutilizable` (checkbox, heredado), `Reutilización`
(select No/Parcial/Sí), `Reutilización demostrada` (checkbox),
`% reutilizable estimado`, `EIE creación reutilizable`, `EIE trabajo específico`,
`EIE evitado por reutilización`.

**Estado / confianza / fecha:** `Estado` (select), `Confianza` (select
Baja/Media/Alta), `Confianza MC1` (select Baja/Media/Alta),
`Fecha valoración` (date).

Dentro del contenido de cada ficha deja este bloque:

```
## Identificación
Origen del trabajo:
Cliente origen / Proyecto origen:
Tipo de trabajo:
Commit de referencia:

## Productividad AI-native
EIE total:
EIE AI-acelerado:
EIE humano-dominante:
AI-native rate:
Humano-dominante:

## MC1
Coste hora:
Horas humanas Claude:
Horas humanas fuera:
Horas humanas totales:
Base horas:
Coste humano:
Coste IA:
Otros MC1:
MC1 total:
Ratio de compresión:
Confianza MC1:

## Reutilización
Reutilización: No / Parcial / Sí
Reutilización demostrada: Sí / No
% reutilizable estimado:
EIE creación reutilizable:
EIE trabajo específico:
EIE evitado por reutilización:
Justificación:

## Bitácora (día a día · append-only, no reescribir)

| Fecha | Subtareas / trabajo | Commit (rama) | EIE mat. → central | Estado |
|-------|---------------------|---------------|--------------------|--------|
| YYYY-MM-DD | … | abc1234 (rama) | 40 → 90 | En desarrollo |
```

En cada `/imputar` añade una fila nueva a la bitácora; no toques las filas
anteriores.
