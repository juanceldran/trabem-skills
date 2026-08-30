# `/imputar` · Doctrina completa

Material de consulta. **No se carga por rutina**: el `SKILL.md` contiene el
núcleo operativo. Ven aquí solo ante una duda de criterio o si hay que
defender/revisar una valoración.

---

## Misión

`/imputar` registra de forma homogénea y auditable el trabajo técnico del
equipo, y debe responder a cinco preguntas:

1. ¿Qué trabajo se ha realizado?
2. ¿Quién lo ha realizado?
3. ¿Cuántas horas humanas reales ha consumido?
4. ¿Qué esfuerzo técnico convencional equivalente representa?
5. ¿Qué coste directo y qué capacidad reutilizable ha generado?

No es una skill de pricing comercial: ni Puntos Función IFPUG completos, ni
benchmark ISBSG, ni precio recomendado al cliente. Eso es `/valorar`.

El texto que pasa el desarrollador al invocar la skill es **contexto humano**,
no evidencia única. El desarrollador **sí** es fuente válida para
`Horas humanas` y `Base horas: Registradas`; **no** se le pide que calcule EIE,
Factor K, porcentajes ni MC1.

---

## Fuente de verdad

Base `📊 Registro EIE · Ingeniería AI-native TRABEM`
https://app.notion.com/p/700528d4041b40fa84a6877f32da635c

Antes de crear ficha, buscar si ya existe una del mismo módulo/proyecto. Si
existe: actualizar y añadir entrada de bitácora. No crear fichas duplicadas
para sucesivas sesiones del mismo módulo, salvo módulos funcionalmente
independientes.

---

## Identificación del trabajo

Registrar siempre `Módulo`, `Proyecto`, `Responsable`, `Repositorio`,
`Tipo proyecto` (Propio · Cliente), y una descripción funcional breve pero
suficiente para que otra persona entienda qué se ha construido sin inspeccionar
el código.

## Origen del trabajo

`Origen del trabajo`: Cliente · Producto · Bug · Incidente producción · Mejora
interna · Deuda técnica · Arquitectura · Seguridad · Infraestructura ·
Comercial / preventa · Regulatorio · Otro. Cuando sea identificable,
`Cliente origen` y `Proyecto origen`.

El objetivo es poder analizar después qué tipo de trabajo consume la capacidad
del equipo.

## Tipo de trabajo — clasificación ligera

Sin análisis IFPUG. Valores: Nueva funcionalidad · Evolutivo funcional ·
Correctivo · Refactor / deuda técnica · Rendimiento / optimización ·
Seguridad / hardening · Infraestructura / DevOps · Arquitectura / plataforma ·
Mixto. Se deriva de la evidencia: tarea, comportamiento esperado, diff,
commits, tests y contexto.

**Correctivo:** si una función ya debía funcionar y se modifica para que haga
lo que ya estaba previsto → `Correctivo`. Ejemplos: botón que debía guardar y
no guardaba; endpoint que devolvía 400 debiendo aceptar; cálculo incorrecto;
campo que debía persistirse y no se persistía. No clasificar esto
automáticamente como funcionalidad nueva.

## Evidencia técnica

Repositorio, rama, commits, diff relevante, modelos, vistas/endpoints,
componentes, tests, integraciones, despliegue — **siempre a nivel de resumen**
(`--stat`, `--name-only`), nunca leyendo ficheros completos: ver el presupuesto
de contexto del `SKILL.md`. Registrar `Commit de referencia` y una descripción
breve de la evidencia usada. No estimar alcance solo por líneas de código.

---

## EIE — esfuerzo de ingeniería convencional equivalente

EIE representa el esfuerzo razonable que habría requerido producir el mismo
resultado mediante un proceso convencional de ingeniería con calidad
equivalente. **No** son horas reales trabajadas ni horas ficticias facturadas.

Estimar `EIE bajo`, `EIE central`, `EIE alto`, `EIE materializado`,
`EIE pendiente`. El central debe ser prudente y defendible.

### Descuento obligatorio por reutilización existente

Antes de fijar el EIE, analizar qué parte del trabajo se apoya en activos ya
existentes: plataforma ya construida, componentes comunes, frameworks, portal
existente, infraestructura, autenticación, librerías, SDK oficiales, módulos
internos reutilizados. No valorarlo de nuevo como bespoke. El EIE valora
únicamente el trabajo nuevo realmente necesario para el alcance.

### Factor K

Reconoce conocimiento especializado que condiciona materialmente cómo debe
resolverse el problema.

- 1,00 → ejecución estándar
- 1,05–1,10 → conocimiento específico
- 1,10–1,20 → conocimiento especializado
- > 1,20 → excepcional, requiere justificación explícita

No contabilizar dos veces la misma dificultad: si ya elevó el EIE, no volver a
aplicarla íntegramente vía K. Ante duda, el K inferior.

### Valor técnico interno 70/30

`Valor técnico interno = (EIE humano-dominante × tarifa humano) + (EIE AI-acelerado × tarifa agente)`.

Tarifas vigentes **solo** en `constants/trabem.constants.json`
(`instrumentacion_interna`). Es **instrumentación interna** (productividad, coste
técnico, calibración del PF TRABEM); **no** es el precio a cliente. Retiradas: la
antigua constante única `60 €/EIE × Factor K` y la etiqueta «Precio a cliente
(por capas)» (ver `legacy` en el JSON; los históricos se conservan). El **precio
comercial** es otra capa —`PF válidos × PF_TRABEM_EUR`— y se decide en `/valorar`.
El `Factor K` justifica la banda de EIE, no multiplica. No presentar las EIE como
horas realmente trabajadas.

---

## Horas humanas

- `Horas humanas Claude`: tiempo humano trabajando activamente mediante Claude
  Code u otras herramientas AI-native.
- `Horas humanas fuera`: tiempo humano fuera del entorno AI (reuniones,
  validación física, operación, coordinación, pruebas manuales…).
- `Horas humanas totales`: suma de ambas.

### Calidad del dato de horas

`Base horas`: Registradas · Estimadas. No presentar horas reconstruidas
retrospectivamente como registradas. Sin evidencia suficiente → `Estimadas`, y
explicarlo. Para productividad individual e incentivos, las registradas tienen
prioridad clara.

---

## Productividad AI-native

Separar el EIE según composición: `EIE AI-acelerado`, `EIE humano-dominante`,
`AI-native rate %`, `Humano-dominante %`.

- **AI-acelerado**: ejecución comprimible materialmente mediante IA (código,
  tests, migraciones, documentación técnica, búsquedas, refactor, generación de
  estructuras, automatización).
- **Humano-dominante**: el criterio humano sigue siendo la parte principal
  (decisiones de producto, aceptación con cliente, validación clínica, pruebas
  físicas, decisiones regulatorias, coordinación crítica, definición de reglas
  ambiguas).

No usar esta división para exagerar productividad.

### Ratio de compresión

`Ratio compresión = EIE / Horas humanas totales`, únicamente cuando: las horas
son Registradas; cubren el mismo alcance que el EIE; y no se comparan horas de
una subtarea con EIE de un módulo completo. Si el alcance no es homogéneo,
`Ratio compresión = vacío`. No publicar ratios artificiales.

---

## MC1 — coste directo del trabajo

`Coste hora humano` por rol (valores en `constants/trabem.constants.json` → `mc1`).
`Coste humano MC1 = Σ(horas × coste hora del rol)`.
Registrar además `Coste IA`, `Otros MC1`, `MC1 total`.

### MC1 vs MC2

**MC1** incluye solo costes directos que desaparecerían si ese trabajo concreto
no existiera: horas humanas; API específica consumida; servicio externo usado
exclusivamente para ese trabajo; infraestructura dedicada atribuible.

**MC2** son costes estructurales que existirían igualmente: suscripción plana
de Claude Code, infraestructura general del equipo, herramientas corporativas,
licencias generales. No prorratear MC2 arbitrariamente sobre cada módulo. **La
suscripción de Claude Code es expresamente MC2 y no se imputa.**

---

## Reutilización

`Reutilización`: No · Parcial · Sí. Registrar `% reutilizable estimado` cuando
sea razonablemente cuantificable.

- **No**: trabajo específico no reaprovechable sustancialmente en otro contexto.
- **Parcial**: una parte relevante se reaprovecha, pero hay una parte específica
  significativa.
- **Sí**: crea un activo utilizable después sin reconstruir sustancialmente su
  lógica (módulo común, librería, skill, automatización, framework, componente,
  integración parametrizable, capacidad de plataforma).

Ante duda, la categoría inferior.

**Producto multi-cliente:** en un producto que se despliega a varias
clínicas/hospitales/clientes, una capacidad de PRODUCTO transferible a otro
despliegue es reutilizable (Sí/Parcial) aunque sea pequeña; no es trabajo a
medida. El freno contra la inflación es `Reutilización demostrada` y la no
doble contabilización, no negar la clasificación.

### Reutilización demostrada

`Reutilización demostrada`: Sí · No. Solo Sí cuando exista una utilización
posterior **real**. Que técnicamente parezca reutilizable es potencial, no
demostrada.

### Separación del EIE reutilizable

Cuando proceda, registrar `EIE creación reutilizable` y `EIE trabajo
específico`. Distingue cuánto esfuerzo crea un activo estructural y cuánto
pertenece solo al cliente/proyecto actual. La creación de un activo reutilizable
se reconoce **una sola vez**.

### EIE evitado

Con reutilización posterior demostrada puede registrarse `EIE evitado por
reutilización`: aproximación al esfuerzo convencional que ya no ha sido
necesario repetir gracias al activo existente. **No** sumarlo a la
productividad individual ordinaria: queda separado como productividad
estructural de la empresa.

### No doble contabilización

Regla crítica: un mismo trabajo no puede generar varias veces el mismo EIE. Si
un módulo reusable ya existe y se implanta en otro cliente, el nuevo trabajo
solo incluye adaptación, integración, configuración, QA específico, migración,
despliegue, personalización y trabajo incremental real. No volver a imputar el
módulo completo.

---

## Estado del módulo

En desarrollo · Cierre provisional · Pendiente producción · En producción ·
Cerrado.

`Materializado` refleja únicamente lo realmente construido; `Pendiente` refleja
el trabajo futuro aún necesario. Nunca presentar trabajo pendiente como ya
producido.

## Confianza

`Confianza` (estimación EIE) y `Confianza MC1` de forma independiente:
Baja · Media · Alta. Una ficha puede tener evidencia técnica alta pero horas
retrospectivas con confianza media.

---

## Bitácora append-only

Cada sesión relevante añade una entrada nueva. Nunca reescribir retroactivamente
la historia para que parezca que la valoración actual siempre fue la misma.
Por entrada: Fecha · Trabajo/subtareas · Commit · EIE materializado → EIE
central · Estado. Si una valoración cambia, dejar trazabilidad del valor
anterior y del nuevo.

## Actualización de fichas existentes

1. Recuperar la ficha existente.
2. Inspeccionar el trabajo nuevo desde el último commit registrado.
3. Valorar únicamente el incremento.
4. Actualizar materializado/pendiente/central si procede.
5. Actualizar costes y horas.
6. Revisar reutilización solo si hay nueva evidencia.
7. Añadir nueva entrada de bitácora.

No recalcular todo desde cero sin necesidad.

## Guardarraíles

Revisar manualmente la valoración si: EIE muy alto para un módulo basado
ampliamente en componentes existentes; ratio de compresión extraordinario;
horas parciales frente a alcance total; reutilización evidente no descontada;
K elevado sin justificación; materializado superior al alcance realmente
construido; diferencias importantes respecto a fichas similares. Ante
discrepancia, preferir prudencia a inflación.

---

## Principio final

`/imputar` mide la máquina productiva. Debe permitir conocer con evidencia: qué
produjo cada persona; cuánto recurso humano consumió; cuánto esfuerzo
convencional equivalente representa; cuánto costó; cuánto fue AI-acelerable;
cuánto queda como activo reusable; y cuánta capacidad productiva acumula la
empresa. Prioriza trazabilidad y consistencia sobre cifras espectaculares.
