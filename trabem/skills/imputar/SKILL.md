---
name: imputar
description: Registra en Notion, de forma homogénea y auditable, el trabajo técnico del equipo — EIE, productividad AI-native, horas, MC1 y reutilización. NO hace pricing comercial (eso es /valorar).
argument-hint: "[descripción breve del trabajo realizado, horas, o 'cerrar']"
disable-model-invocation: true
---

# SKILL `/imputar`

Registra el trabajo técnico del equipo: EIE, horas, MC1 y reutilización.
No hace pricing comercial (eso es `/valorar`).

Entrada del desarrollador: $ARGUMENTS

---

# 0. PRESUPUESTO DE CONTEXTO — REGLA DURA, ANTES DE NADA

`/imputar` se ejecuta casi siempre **al final del día, con la sesión ya larga**.
Si la skill se pone a leer código, la sesión revienta (`Context limit reached`)
y **la imputación no llega a escribirse**. Eso ya ha pasado. Por tanto:

1. **NUNCA leas ficheros de código completos.** Nada de `Read`/`cat` sobre
   `.py`, `.html`, `.css`, `.js`, `.ts`, plantillas ni CSS. La evidencia sale
   **solo de comandos de resumen**:
   - `git log --oneline --since=... [--author=...]`
   - `git log --stat --oneline -<n>` · `git show --stat <sha>`
   - `git diff --stat` · `git log --name-only --oneline -<n>`
2. **Nunca un `git diff` completo.** Si de verdad necesitas ver contenido,
   como máximo `git show <sha> -- <fichero> | head -40`.
3. **Máximo ~6 comandos de evidencia en total.** Si con eso no puedes valorar,
   **pregunta en una línea** en vez de seguir investigando.
4. **Notion: no vuelques la base.** Busca la ficha por nombre de módulo y abre
   **solo esa página**. Consulta el esquema de propiedades **una sola vez y
   únicamente si vas a crear ficha nueva** o falta un campo concreto.
5. **Escribe en Notion ANTES de redactar el resumen.** Primero persistir,
   luego contar. El resumen final es corto (§8) y no repite la doctrina.
6. **No cargues `reference/` salvo que la necesites** (§7). En una imputación
   normal sobre ficha existente, este SKILL.md basta.
7. Si ves que la sesión está al límite: **escribe la ficha con lo que tengas**,
   marca `Confianza: Baja` y dilo. Una imputación prudente escrita vale más que
   una perfecta que no llega a guardarse.
8. No lances subagentes ni exploraciones amplias del repo para esto.

---

# 1. QUÉ MODO ES

| Invocación | Modo |
|---|---|
| `/imputar` a secas, o solo un número de horas (`/imputar 10`) | **Diario** (§3) |
| `/imputar <descripción de trabajo>` (con o sin horas) | **Módulo** (§2) |
| `/imputar cerrar` | **Cierre** de módulo (§4) |

`3 horas en estudios en portal` = modo **módulo** con horas dadas: módulo
«estudios», horas humanas 3, `Base horas: Registradas`. **Vía rápida**: el
usuario ya te ha dado lo que solo él sabe (horas y qué tocó); tu trabajo es
valorar el incremento y escribir, no reconstruir el día desde cero.

El desarrollador **sí** aporta sus horas reales. **No** le pidas que calcule
EIE, Factor K, porcentajes ni MC1: eso lo derivas tú de la evidencia.

---

# 2. MODO MÓDULO — PROCEDIMIENTO

1. **Localiza la ficha** en la base fuente de verdad:
   `📊 Registro EIE · Ingeniería AI-native TRABEM`
   https://app.notion.com/p/700528d4041b40fa84a6877f32da635c
   Busca por nombre de módulo. Si existe → **actualizar**, nunca duplicar.
   Solo se crea ficha nueva si el módulo es funcionalmente independiente.
2. **Evidencia acotada** (dentro del presupuesto de §0): commits del periodo
   desde el último `Commit de referencia` registrado, con `--stat`. Anota el
   sha nuevo de referencia.
3. **Valora SOLO el incremento**, no el módulo entero (§5, §6).
4. **Actualiza la ficha**: EIE materializado/pendiente/central, horas, MC1,
   estado, confianza, fecha, commit de referencia. Reutilización solo si hay
   evidencia nueva.
5. **Añade una fila a la bitácora** (append-only, no toques filas anteriores):
   `| Fecha | Subtareas | Commit (rama) | EIE mat. → central | Estado |`
6. **Devuelve el resumen corto** (§8).

---

# 3. MODO DIARIO — PROCEDIMIENTO

Imputa de una vez todo lo trabajado hoy, repartido entre módulos.

1. **Quién imputa — PREGUNTA OBLIGATORIA.** Juan, Aurelio y María trabajan
   **desde la misma cuenta**: la sesión NO identifica a la persona, y no puedes
   deducirla del entorno, del repo, del autor de los commits ni del historial
   de la conversación. Si `$ARGUMENTS` no la nombra, **pregunta «¿quién imputa?»
   y espera respuesta antes de escribir nada**. Nunca la supongas, ni la heredes
   de la ficha anterior o de la última imputación del día.
   Una ficha con `Responsable` equivocado corrompe a la vez el coste real de dos
   personas y descuadra el reparto de horas: es el fallo más caro de esta skill.
   **`Responsable` se escribe exactamente así** (campo de texto libre, sin
   validación: cualquier variante parte las agrupaciones por persona):
   `Juan Celdrán Alenda` · `Aurelio Fernández Moreno` · `María Sánchez Moreno` ·
   `Paqui Celdrán Alenda`.
   **Jornada por persona** (denominador fijo, no se pregunta cada día):

   | Persona | Jornada |
   |---|---|
   | Juan | 8 h |
   | María | 7 h |
   | Aurelio | 7 h |
   | Paqui | 6 h |

   Persona que no esté en la tabla → **pregunta su jornada**, no apliques 7 h
   por defecto. `/imputar 10` fuerza 10 h ese día (jornada extraordinaria:
   déjalo dicho en la bitácora).
2. **Módulos del día**: `git log --oneline --since=midnight` en los repos
   accesibles → 2–4 módulos por repo/carpeta/rama. El trabajo sin git (ops,
   Holded, Notion…) lo nombra el desarrollador en una línea. Sin evidencia ni
   nada que nombrar → pregunta; no inventes módulos.
3. Por cada módulo: valora el **incremento** y actualiza ficha + bitácora
   como en §2.
4. **Reparte la jornada** entre módulos **en proporción al EIE del incremento**
   → `Horas humanas` por módulo. `Base horas: Registradas`.
5. **Cuadro del día**: módulos · EIE producido hoy · jornada (h) · valor técnico
   interno 70/30 (instrumentación, **no** precio a cliente; tarifas en
   `constants/trabem.constants.json`) · **múltiplo del día = EIE producido ÷ jornada**.

**Regla del múltiplo:** solo cuenta trabajo de HOY. Una valoración retrospectiva
de un módulo de días anteriores va como imputación de módulo aparte y **no**
entra en el cuadro diario (inflaría el múltiplo).

---

# 4. MODO CIERRE

`/imputar cerrar`: consolida el módulo, pasa `Estado` a `Cierre provisional` /
`Cerrado` según corresponda, cuadra materializado vs pendiente y cierra la
bitácora con una última fila. Sin re-valorar todo desde cero.

---

# 5. REGLAS DE VALORACIÓN (núcleo — lo que aplica siempre)

- **EIE** = esfuerzo de ingeniería convencional equivalente para producir el
  mismo resultado con calidad equivalente. **No** son horas reales ni horas
  facturadas. Registra `EIE bajo/central/alto`, `materializado`, `pendiente`.
  El central, prudente y defendible.
- **Descuento obligatorio por reutilización existente**: plataforma ya
  construida, componentes comunes, frameworks, portal, auth, infra, SDKs y
  módulos internos **reducen** el EIE. Solo se valora el trabajo nuevo real.
- **No doble contabilización**: un mismo trabajo no genera dos veces el mismo
  EIE. Implantar en otro cliente un módulo que ya existe = solo adaptación,
  integración, QA específico, migración y despliegue.
- **Factor K**: 1,00 estándar · 1,05–1,10 conocimiento específico ·
  1,10–1,20 especializado · >1,20 excepcional y justificado. Ante duda, el
  inferior. No cuentes dos veces la misma dificultad (si ya subió el EIE, no
  la repitas vía K).
- **Valor técnico interno 70/30 = (EIE humano-dominante × tarifa humano) + (EIE AI-acelerado × tarifa agente)** → campo `Valor técnico interno 70/30 (€)`. Es **instrumentación interna** (productividad, coste técnico, calibración del PF TRABEM), **NO el precio a cliente**. Las tarifas viven solo en `constants/trabem.constants.json` (`instrumentacion_interna`); no las reescribas aquí. Sustituye a la antigua fórmula por-EIE con Factor K y a la etiqueta «Precio a cliente (por capas)» (retiradas; ver `legacy` en el JSON). El `Factor K` justifica la banda de EIE, **no multiplica**. El **precio comercial** es otra capa (`Referencia construcción = PF válidos × PF_TRABEM_EUR`) y se decide en `/valorar`, no aquí. Si aún no hay conteo PF válido, **no lo inventes**: déjalo pendiente para `/valorar`.
- **Horas**: `Horas humanas Claude` + `Horas humanas fuera` = `totales`.
  `Base horas` = `Registradas` (las aporta la persona) o `Estimadas`
  (reconstruidas). No presentes estimadas como registradas.
- **MC1**: `Coste hora humano` **real de la persona que imputa** (§3.1) →
  `Coste humano MC1 = Σ(horas × coste hora real)`.
  El importe sale **únicamente** de la base privada de Notion
  `💰 Costes/hora TRABEM (privado)`. Ojo: esa base está indexada por **nombre de
  pila** (Juan · Aurelio · María · Paqui), no por el nombre completo que va en
  `Responsable`. No
  vive en el repo y no debe memorizarse. **Es dato confidencial**: úsalo para el
  cálculo y **no lo reproduzcas** en la ficha, en la bitácora, en el resumen (§8)
  ni en la conversación — solo se muestra el `Coste humano MC1` ya calculado.
  **Las tarifas 70/30 NO son coste.** 70 €/h (criterio humano) y 30 €/h
  (producción por agente) son precio de venta; meterlas en `Coste hora humano`
  infla el coste varias veces y destruye el MC1. Si no encuentras el coste de esa
  persona: **deja el campo vacío y dilo**. No lo sustituyas por una tarifa ni por
  el coste de otra persona.
  Más `Coste IA`, `Otros MC1`, `MC1 total`. La **suscripción plana de Claude
  Code es MC2** y no se imputa.
- **Ratio compresión = EIE / horas totales**, solo si las horas son
  Registradas y cubren el mismo alcance que el EIE. Si no, déjalo vacío.
- **Reutilización**: `No` / `Parcial` / `Sí`. Ante duda, la inferior. En
  producto multi-cliente, una capacidad de producto transferible a otro
  despliegue sí es reutilizable aunque sea pequeña.
  `Reutilización demostrada` = Sí **solo** si ya ha habido un uso posterior
  real (potencial ≠ demostrada).
- **Productividad AI-native**: separa `EIE AI-acelerado` vs
  `EIE humano-dominante` y sus %. No lo uses para exagerar productividad.
- **Confianza** y **Confianza MC1** por separado: Baja · Media · Alta.
- **Bitácora append-only**: nunca reescribas la historia. Si una valoración
  cambia, deja traza del valor anterior y del nuevo.

**Valores de select** (para rellenar Notion):
- `Tipo proyecto`: Propio · Cliente.
- `Origen del trabajo`: Cliente · Producto · Bug · Incidente producción ·
  Mejora interna · Deuda técnica · Arquitectura · Seguridad · Infraestructura ·
  Comercial / preventa · Regulatorio · Otro.
- `Tipo de trabajo`: Nueva funcionalidad · Evolutivo funcional · Correctivo ·
  Refactor / deuda técnica · Rendimiento / optimización · Seguridad / hardening ·
  Infraestructura / DevOps · Arquitectura / plataforma · Mixto.
  (Si algo que ya debía funcionar se arregla para que haga lo previsto →
  **Correctivo**, no funcionalidad nueva.)
- `Estado`: En desarrollo · Cierre provisional · Pendiente producción ·
  En producción · Cerrado.

---

# 6. GUARDARRAÍLES

Revisa a la baja si ves: EIE alto sobre un módulo apoyado en componentes
existentes · ratio de compresión extraordinario · horas parciales frente a
alcance total · reutilización evidente no descontada · K alto sin justificar ·
materializado por encima de lo realmente construido · desviación grande frente
a fichas similares. **Ante discrepancia, prudencia antes que inflación.**

---

# 7. MATERIAL DE REFERENCIA (cargar solo si hace falta)

No leas estos ficheros por rutina — cuestan contexto:

- `reference/notion.md` → catálogo completo de propiedades de la base y
  plantilla del cuerpo de ficha. **Léelo solo al crear una ficha nueva** o si
  necesitas un campo que no reconoces.
- `reference/doctrina.md` → desarrollo largo de la doctrina (EIE, MC1 vs MC2,
  reutilización, EIE evitado, calidad del dato). **Léelo solo ante una duda de
  criterio** que §5 no resuelva, o si alguien cuestiona una valoración.
- `constants/trabem.constants.json` (raíz del plugin `trabem`) → **única fuente**
  de las constantes numéricas (tarifas internas 70/30, PF_TRABEM_EUR, bandas
  ISBSG, incentivo). Es pequeño; cárgalo cuando necesites un valor. **No** reescribas
  esos números en la ficha ni en el resumen.
  **Cuatro planos económicos** (no confundir; ver `planos_economicos`): (1) **coste humano real** = HH × coste/hora real por persona (en Notion, no en el repo) · (2) **valoración técnica interna** = EIE 70/30 · (3) **valor comercial** = PF válidos × 90 · (4) **incentivo** = PF netos × 1,25. `/imputar` registra el plano 1 (coste real) y el plano 2 (EIE + valor técnico interno); los planos 3 y 4 los cierra `/valorar`.

---

# 8. SALIDA — CORTA

**Módulo:** · **Responsable:** · **Tipo/Origen:** · **Estado:**
**EIE materializado / central:** · **Horas humanas:** · **Base horas:**
**MC1:** · **Ratio compresión:** (solo si válido) · **Reutilización:**
**Valor técnico interno 70/30:** · **Confianza:** · **Ficha actualizada:** sí/no

En modo diario, añade el cuadro del día y el múltiplo. Nada más: no es una
propuesta comercial y no repite doctrina.

---

# 9. LO QUE `/imputar` NO HACE

Conteo IFPUG, DET/FTR/RET, benchmark ISBSG, €/PF, P65, precio recomendado,
Value-Based Pricing, comparativa comercial. Si lo piden → `/valorar`.

`/imputar` mide la máquina productiva. Prioriza **trazabilidad y consistencia**
sobre cifras espectaculares — y **escribir la ficha** sobre investigar de más.
