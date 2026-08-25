---
name: imputar
description: Registra y actualiza en Notion la valoración EIE del trabajo de ingeniería AI-native realizado en el proyecto actual.
argument-hint: "[descripción breve del trabajo realizado o 'cerrar']"
disable-model-invocation: true
---

# Imputar trabajo AI-native TRABEM

## Destino

Usa como registro oficial esta base de Notion:

https://app.notion.com/p/700528d4041b40fa84a6877f32da635c

Base:
"📊 Registro EIE · Ingeniería AI-native TRABEM"

El texto proporcionado por el desarrollador al ejecutar la skill es:

$ARGUMENTS

Ese texto es únicamente contexto humano. No lo uses como única evidencia.

## Objetivo

Registrar la entidad real del trabajo producido mediante EIE
(Esfuerzo de Ingeniería Convencional Equivalente).

EIE significa cuánto esfuerzo habría requerido razonablemente producir
el mismo resultado mediante un proceso de ingeniería convencional.

EIE NO son horas realmente trabajadas.

Nunca preguntes al desarrollador:
- cuántas horas ha trabajado;
- cuánto tiempo ha usado Claude;
- cuánto cree que vale el trabajo;
- qué EIE cree que corresponde;
- qué Factor K cree que corresponde.

Claude realiza la valoración a partir de la evidencia.

(Única excepción: la pregunta breve de cierre sobre tiempo humano
fuera de Claude para el MC1, definida en "Horas humanas fuera de
Claude". Nunca aplica al cálculo del EIE.)

## Procedimiento

Cuando se invoque /imputar:

1. Identifica automáticamente:
   - repositorio actual;
   - proyecto;
   - rama actual;
   - commit HEAD actual;
   - estado de Git;
   - cambios relevantes;
   - commits y evolución del código que ayuden a entender el trabajo.

2. Analiza el trabajo real disponible:
   - arquitectura;
   - modelos de datos;
   - migraciones;
   - backend;
   - frontend;
   - endpoints;
   - integraciones;
   - tests;
   - configuración;
   - documentación;
   - infraestructura o despliegue si forman parte del trabajo.

3. Utiliza la descripción del desarrollador solo para comprender:
   - qué considera que ha trabajado;
   - qué sabe que queda pendiente;
   - contexto funcional que el código no pueda mostrar por sí solo.

4. Busca primero en la base de Notion si ya existe una ficha
   correspondiente al mismo módulo/trabajo.

5. Si existe:
   ACTUALIZA ESA MISMA FICHA.

6. Si no existe:
   CREA una nueva ficha.

7. No crees fichas duplicadas para distintas sesiones del mismo módulo.

8. Si no puedes identificar con seguridad qué módulo debe actualizarse,
   haz como máximo una pregunta breve al desarrollador antes de registrar.

## Tipo de proyecto

Cada módulo se clasifica como:

- Propio: producto o herramienta interna de TRABEM/Silvermind.
- Cliente: trabajo realizado para un cliente externo.

Determínalo a partir de la evidencia (repositorio, documentación,
contexto del proyecto). Si no puedes determinarlo con seguridad la
primera vez que creas la ficha del módulo, pregúntalo una sola vez:

"¿Este proyecto es propio o para un cliente?"

Registra el resultado en el campo "Tipo proyecto" de la ficha y no
vuelvas a preguntarlo en imputaciones posteriores del mismo módulo.

## Valoración EIE

Calcula:

### EIE materializado

Esfuerzo convencional equivalente correspondiente al trabajo
realmente construido y verificable en este momento.

### EIE pendiente

Esfuerzo convencional equivalente razonablemente necesario para
completar el alcance actual conocido:

- validación funcional;
- pruebas reales;
- integraciones pendientes;
- edge cases;
- hardening;
- despliegue;
- puesta en producción;
- estabilización;
- decisiones o ajustes necesarios para considerar entregado el módulo.

### EIE central

Es el EIE TOTAL esperado del módulo.

Debe cumplirse aproximadamente:

EIE materializado + EIE pendiente = EIE central

### EIE bajo y EIE alto

Son el rango razonable del MÓDULO COMPLETO esperado.

Debe cumplirse:

EIE bajo <= EIE central <= EIE alto

No uses bajo/central/alto para representar únicamente lo ya construido.

### Descuento por reutilización (obligatorio antes de fijar el EIE central)

Criterio de la fuente de la verdad, fijado 2026-08-25.

El EIE solo cuenta lo que un desarrollo convencional habría tenido que
construir A MEDIDA. Si el módulo se apoya en plataforma, portal,
infraestructura, admin, motor o componentes YA EXISTENTES, descuéntalo:
el EIE central baja al tramo inferior de su banda.

No valores como bespoke lo que reutiliza base ya construida. La
reutilización real reduce el EIE cuando también lo habría reducido en un
desarrollo convencional.

Este descuento es un paso obligatorio, no opcional: aplícalo ANTES de
fijar el EIE central, no después.

### Bandas orientativas y guardarraíl de plausibilidad

Bandas internas de referencia (a 60 €/h EIE):

- Módulo sencillo: 30–50 h
- Módulo estándar: 60–100 h
- Módulo complejo: 100–180 h
- Módulo crítico / integrado: 180–300 h
- Proyecto especial: >300 h

Guardarraíl: si un módulo que reutiliza base existente o es estándar cae
en la banda crítico / integrado (180–300 h), es señal de que NO se
descontó la reutilización. Revisa y corrige el EIE antes de registrar.
No infles: la corrección se hace primero sobre el EIE, nunca subiendo el
Factor K ni la constante.

## Productividad AI-native

Además del EIE total del módulo, distingue qué parte del trabajo es
altamente acelerable mediante IA y qué parte continúa dependiendo
principalmente de intervención humana.

### EIE AI-acelerado

Parte del EIE central correspondiente a actividades cuyo esfuerzo
se ha reducido materialmente gracias al uso de Claude/IA.

Ejemplos:
- generación y modificación de código;
- backend;
- frontend;
- modelos;
- migraciones;
- APIs;
- tests automatizables;
- documentación técnica;
- refactoring;
- análisis técnico;
- tareas repetitivas de integración;
- configuración automatizable.

No significa que la IA haya trabajado sola.
Significa que esa parte del proceso ha sido materialmente comprimida
por el sistema AI-native.

### EIE humano-dominante

Parte del EIE central correspondiente a actividades cuya ejecución
sigue dependiendo principalmente del criterio, interacción o
intervención humana.

Ejemplos:
- validación con usuarios reales;
- onboarding;
- decisiones de producto;
- aceptación funcional;
- reuniones necesarias;
- coordinación con cliente;
- pruebas operativas reales;
- decisiones ante edge cases;
- configuración que requiera conocimiento específico del cliente;
- puesta en marcha que requiera interacción humana;
- estabilización operativa;
- formación.

Debe cumplirse aproximadamente:

EIE AI-acelerado + EIE humano-dominante = EIE central

No fuerces una precisión falsa.
Si existe una zona híbrida, clasifícala según cuál sea el factor
dominante y explica brevemente la decisión.

### AI-native rate

Calcula:

AI-native rate % =
EIE AI-acelerado / EIE central × 100

Y:

Humano-dominante % =
EIE humano-dominante / EIE central × 100

Ambos porcentajes deben sumar aproximadamente 100%.

IMPORTANTE:
Estos porcentajes representan la COMPOSICIÓN DEL TRABAJO,
no el porcentaje exacto de código escrito por IA.

## Clasificación de reutilización del trabajo

En cada imputación, el sistema DEBE evaluar automáticamente si el trabajo
genera un activo reutilizable para la empresa. Esta valoración la hace el
sistema a partir del código, arquitectura, alcance, dependencias y
contexto. NUNCA se pregunta al desarrollador si su trabajo es reutilizable,
ni se clasifica como reutilizable solo porque él lo afirme: la clasificación
se deriva de evidencia técnica observable.

Complementa —no sustituye— al "Descuento por reutilización" del EIE: aquel
descuenta cuando ESTE módulo reutiliza base ya existente; esta sección
clasifica si ESTE trabajo CREA un activo reutilizable.

### Categorías (obligatorio clasificar en una)

1. NO REUTILIZABLE — trabajo específico de un cliente, incidencia o
   integración particular cuya lógica no se traslada a otro proyecto sin
   rehacer una parte sustancial (corrección de datos, adaptación
   excepcional, integración particular, cambio pedido solo por un cliente,
   incidencia concreta).
2. PARCIALMENTE REUTILIZABLE — contiene componentes, patrones o
   conocimiento reutilizables, pero una parte relevante sigue siendo
   específica. Cuando sea razonable, estima `% reutilizable estimado` y
   separa `EIE creación reutilizable` de `EIE trabajo específico`.
3. REUTILIZABLE — crea un módulo, componente, automatización,
   infraestructura, skill, librería, proceso o capacidad usable en otros
   proyectos sin rehacer su lógica principal. Puede requerir configuración,
   parametrización, integración o adaptación menor y seguir siéndolo.

### Criterios (valorar en conjunto)

Desacoplamiento del cliente actual; parametrización/configuración; ausencia
de datos, reglas o nombres hardcodeados específicos; posibilidad real de
uso en otro proyecto; separación entre núcleo común e integración
específica; interfaces o APIs reutilizables; documentación suficiente;
tests; arquitectura modular; probabilidad razonable de uso futuro.

No basta con que técnicamente "se pueda copiar código": debe existir una
capacidad razonablemente transferible y aprovechable por la empresa.

### Producto multi-cliente / plataforma

En productos que se despliegan a varias clínicas, hospitales o clientes, una
capacidad de PRODUCTO —algo que va con la plataforma y es transferible a otro
hospital, clínica o proyecto— es reutilizable (Sí o Parcial), aunque sea
pequeña, porque no es trabajo a medida de un cliente concreto. Un cambio solo
es NO reutilizable cuando es específico e intransferible: dato de un cliente,
incidencia puntual sin valor de producto, adaptación excepcional.

Lo que gatea el VALOR no es la clasificación, sino dos cosas:

- `Reutilización demostrada`: "Sí" solo cuando el activo YA se usa en otro
  hospital, clínica o proyecto real. "Poder ponerlo" es potencial, no
  demostrada.
- La regla de no doble contabilización del EIE de creación.

Así la clasificación puede ser generosa sin inflar la productividad: el freno
está en "demostrada" y en no recontar el EIE ya reconocido, no en negar la
reutilización de una capacidad de producto.

### Regla conservadora

Ante duda entre dos categorías, usa la INFERIOR. No sobrevalores la
reutilización. Reutilización potencial ≠ reutilización demostrada.

### Estado de reutilización (registrar siempre)

- `Reutilización: No / Parcial / Sí`
- `Reutilización demostrada: Sí / No` — solo pasa a "Sí" cuando hay
  evidencia de que el activo se ha utilizado después en otro cliente,
  proyecto, módulo o proceso real.
- `Justificación:` breve y verificable, derivada de evidencia técnica.

### Regla EIE fundamental (no doble contabilización)

El EIE de creación de un activo reutilizable se reconoce UNA SOLA VEZ.
Cuando ese activo se reutiliza después, NO vuelvas a contabilizar como EIE
nuevo el trabajo ya existente. En las reutilizaciones posteriores solo
cuenta el trabajo realmente nuevo: configuración, adaptación, integración,
personalización, migración, QA específico, despliegue, formación o
desarrollo incremental real.

El valor reutilizado pertenece al sistema productivo de la empresa, no a la
productividad individual de quien realiza la nueva implantación.

### Productividad estructural / reutilización

Cuando un empleado crea un activo reutilizable, regístralo aparte, porque
puede constituir una mejora estructural de la capacidad productiva de la
empresa. Cuando después haya una reutilización demostrada, registra, si
puede calcularse, `EIE evitado por reutilización`: el trabajo convencional
equivalente que la empresa ya no necesita volver a producir gracias al
activo existente.

No sumes ese EIE evitado a la productividad individual ordinaria:
manténlo separado como `Productividad estructural / reutilización`, para
poder valorar después incentivos, dividendos de mejora o contribución a la
productividad global de la empresa.

## Factor K

Usa de forma prudente:

- 1.00: estándar, receta conocida y ejecución sustituible.
- 1.05–1.10: conocimiento específico útil.
- 1.10–1.20: arquitectura, dominio o know-how especializado que
  condiciona materialmente la solución.
- >1.20: únicamente excepcional y expresamente justificado.

No contabilices dos veces una misma dificultad mediante EIE y K.

Ante duda utiliza el K inferior.

## Referencia técnica

Calcula:

Referencia técnica = EIE central × 60 € × Factor K

Es una referencia interna.

No representa horas realmente facturadas ni precio final obligatorio
al cliente.

La constante de 60 €/h EIE es FIJA: no se negocia caso a caso ni se baja
para ajustar una valoración. La presión de mercado se absorbe en el
precio comercial final (que se decide fuera de este registro), nunca
rebajando la constante. Lo único que se ajusta para que una valoración
sea razonable es la PONDERACIÓN del EIE: el descuento por reutilización y
un Factor K prudente aplicado una sola vez.

## MC1 real del módulo

Además de valorar la producción mediante EIE, registra separadamente
el coste directo real atribuible al módulo.

Nunca mezcles EIE con coste.

EIE = valor/entidad de ingeniería producida.
MC1 = coste directo realmente consumido para producirla.

MC1 es solo lo que desaparecería si ese trabajo, cliente o módulo no
existiera. Lo estructural —suscripciones planas de IA y de herramientas,
infraestructura compartida, gastos generales— es MC2 y NUNCA se imputa
al módulo, ni siquiera prorrateado.

### Coste hora humano

Referencia provisional actual:

30 €/hora

Debe poder modificarse posteriormente por persona.

No utilices 60 €/h.
Los 60 €/EIE pertenecen a valoración técnica, no a coste.

### Horas humanas dentro del entorno Claude

Registra únicamente tiempo humano REAL que pueda obtenerse o
reconstruirse con evidencia razonable del entorno.

No confundas:
- duración total de una sesión;
- tiempo que Claude estuvo ejecutando;
- tiempo de espera;
con tiempo humano activo.

Si no existe evidencia suficientemente fiable, deja el dato como
"no determinado" o con confianza baja.

NUNCA inventes horas para completar el MC1.

### Horas humanas fuera de Claude

Incluye, cuando exista evidencia o el desarrollador lo indique:
- onboarding;
- reuniones;
- validación con cliente;
- pruebas presenciales;
- formación;
- intervención de producción;
- otras tareas fuera del entorno.

No preguntes por estas horas en cada /imputar.

Durante el desarrollo pueden quedar pendientes.

En el cierre del módulo, si existe trabajo humano externo relevante
que no pueda obtenerse automáticamente, puedes hacer UNA sola pregunta
breve:

"¿Ha habido tiempo humano relevante fuera de Claude que deba incorporar
al MC1? Si sí, indícame aproximadamente cuánto y en qué."

Si la respuesta es no, continúa sin más preguntas.

Esta es la ÚNICA excepción a la regla de no preguntar horas al
desarrollador: aplica solo al MC1 en el cierre, nunca al cálculo
del EIE.

### Coste humano MC1

Calcula únicamente cuando haya base suficiente:

Coste humano MC1 =
(horas humanas dentro de Claude + horas humanas fuera de Claude)
× coste hora humano

### Coste IA

Registra SOLO consumos de IA por uso directamente atribuibles al módulo,
cuando puedan obtenerse de evidencia:

- API de pago por uso imputable a este módulo (p. ej. locuciones,
  transcripciones, embeddings de este producto);
- modelos externos facturados por consumo del módulo;
- otros consumos específicos medibles.

Las suscripciones planas de herramientas de IA (Claude Code, Claude,
ChatGPT y equivalentes) son MC2: coste estructural del sistema
AI-native, no coste directo del módulo. No desaparecerían si ese módulo
no existiera.

Por tanto:
- NO las incluyas en Coste IA;
- NO las prorratees por días, por módulos ni por ningún otro criterio;
- si aportan contexto, menciónalas en el cuerpo de la ficha indicando
  expresamente que son MC2 y que no se imputan.

Si no existe dato fiable de consumo por uso, deja pendiente.

### Otros MC1

Costes directos que desaparecerían si ese trabajo/cliente/módulo
no existiera.

Ejemplos:
- API específica;
- servicio externo específico;
- infraestructura dedicada durante el setup;
- proveedor externo directamente atribuible.

No incluyas gastos generales compartidos.

### MC1 total

Cuando exista evidencia suficiente:

MC1 total =
Coste humano MC1
+ Coste IA
+ Otros MC1

No calcules un MC1 ficticio si faltan datos materiales.

## Ratio de compresión

Cuando existan horas humanas reales suficientemente fiables calcula:

Ratio de compresión =
EIE central / horas humanas reales totales

Ejemplo:
146 EIE / 18 horas humanas = 8,1x

Solo con alcances homogéneos: calcula el ratio únicamente cuando las
horas sean REGISTRADAS (reales y fiables) y cubran el MISMO alcance
completo que el EIE. Con horas parciales o de una subtarea, numerador y
denominador miden alcances distintos: deja el ratio vacío, no lo publiques.

No calcules este ratio si las horas humanas son una estimación sin base
suficiente.

Guardarraíl: un ratio muy por encima de la banda observada del portfolio
(~5–13x) indica casi siempre alcances distintos entre EIE y horas. No lo
publiques; revisa antes de registrar.

Añade también un nivel de confianza para la medición de coste/tiempo:
- Baja
- Media
- Alta

Esto es distinto de la confianza de la estimación EIE si fuese necesario.

## Estados

Usa:

- En desarrollo:
  todavía existe construcción sustancial pendiente.

- Cierre provisional:
  desarrollo sustancialmente construido, pero falta validación,
  puesta en marcha, integración o estabilización relevante.

- Pendiente producción:
  funcionalmente terminado pero todavía no desplegado.

- En producción:
  desplegado y dentro del periodo de validación/estabilización.

- Cerrado:
  producción validada y razonablemente estabilizada.

No marques "Cerrado" únicamente porque el código compile o los tests pasen.

## Reglas de prudencia

- No uses horas reales para calcular EIE.
- No reduzcas EIE porque Claude haya trabajado rápido.
- No aumentes EIE porque Claude haya necesitado muchas iteraciones.
- Líneas de código y número de commits son evidencia auxiliar, no fórmula.
- Más código no significa más valor.
- Código innecesario no genera EIE.
- Retrabajo debido a errores propios no genera automáticamente EIE
  productivo adicional.
- Bugs creados por el propio desarrollo no se contabilizan como nueva
  productividad.
- Reutilización real debe reducir el esfuerzo convencional cuando
  razonablemente también lo habría reducido en desarrollo convencional.
- Ante incertidumbre utiliza una estimación prudente.
- Si falta evidencia, reduce la confianza.
- No inventes información que no puedas comprobar.

## Responsable

En el campo Responsable registra únicamente a la persona responsable
del trabajo.

No pongas "Claude" como responsable.

Claude es herramienta de producción y valoración, no responsable laboral.

## Evidencia que debe quedar en la ficha

Además de los campos estructurados de la base, deja en el contenido
de la ficha:

- descripción funcional;
- tipo de proyecto (propio o cliente);
- trabajo materializado;
- trabajo pendiente;
- repositorio;
- rama inspeccionada;
- commit SHA utilizado como referencia;
- componentes relevantes inspeccionados;
- tests disponibles;
- integraciones;
- situación de despliegue;
- justificación resumida del EIE;
- justificación del Factor K;
- nivel de confianza;
- fecha de valoración.

Cuando vuelvas a valorar el mismo módulo, deja constancia del nuevo
commit SHA y actualiza la misma ficha.

## Trazabilidad: tarea principal y subtareas (bitácora día a día)

Cada ficha es una TAREA PRINCIPAL (el módulo). El trabajo se realiza en
SUBTAREAS repartidas en varios días o sesiones, y esa evolución debe
quedar registrada para poder seguir la traza.

Regla, obligatoria en CADA /imputar: la ficha mantiene una BITÁCORA
append-only. En cada imputación AÑADE una entrada nueva al final de la
bitácora. NUNCA sobrescribas ni borres entradas anteriores.

- Los campos estructurados (EIE central, estado, MC1…) reflejan el TOTAL
  actual del módulo.
- La bitácora refleja el AVANCE día a día: qué subtareas se hicieron y
  cuándo.

Cada entrada de bitácora incluye, como mínimo:

- Fecha (YYYY-MM-DD).
- Subtareas / trabajo concreto de esa sesión (lista breve y específica).
- Commit(s) SHA de referencia y rama.
- EIE materializado y EIE central en ese momento (para ver el avance).
- Estado en ese momento.

Agrupa al menos por día: si en un mismo día hubo varias sesiones, puedes
juntarlas en una sola entrada con varias subtareas o poner varias
entradas fechadas, pero nunca menos de una entrada por día con trabajo
imputado.

Sigue existiendo UNA sola ficha por módulo: no dupliques fichas por
sesión. Las sesiones son entradas de la bitácora, no fichas nuevas.

## Campos de productividad y MC1 en Notion

Antes de usar los nuevos campos:
1. inspecciona el esquema actual de la base;
2. si tienes permisos para modificarla, añade los campos que falten;
3. no elimines campos existentes.

Campos nuevos deseados:

- Tipo proyecto
- EIE AI-acelerado
- EIE humano-dominante
- AI-native rate %
- Humano-dominante %
- Coste hora humano
- Horas humanas Claude
- Horas humanas fuera
- Coste humano MC1
- Coste IA
- Otros MC1
- MC1 total
- Ratio compresión
- Confianza MC1
- Reutilización
- Reutilización demostrada
- % reutilizable estimado
- EIE creación reutilizable
- EIE trabajo específico
- EIE evitado por reutilización

Tipos:
- Tipo proyecto: select Propio / Cliente
- EIE: número
- porcentajes: número
- costes: número/euro
- horas: número
- ratio: número
- Confianza MC1: select Baja / Media / Alta
- Reutilización: select No / Parcial / Sí
- Reutilización demostrada: select Sí / No (o checkbox)
- % reutilizable estimado: número
- EIE creación reutilizable / EIE trabajo específico / EIE evitado por reutilización: número

Nota: la base ya tiene un checkbox "Reutilizable"; el select "Reutilización"
(No/Parcial/Sí) lo complementa con la categoría. No elimines el checkbox.

Además, dentro del contenido de cada ficha deja un pequeño bloque:

```
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

En cada /imputar añade una fila nueva a la bitácora; no toques las
filas anteriores.

## Trabajos empezados antes de este sistema

Si el trabajo ya estaba iniciado cuando comenzó el sistema EIE:

- haz valoración retrospectiva;
- no inventes una estimación inicial que nunca existió;
- utiliza "Cierre provisional" cuando proceda;
- separa materializado y pendiente.

## Cierre

Si el argumento contiene "cerrar" o el desarrollador solicita cierre:

1. Comprueba que el alcance está terminado.
2. Comprueba situación de producción.
3. Comprueba validación y estabilización disponibles.
4. Sustituye estimaciones pendientes por evidencia real cuando sea posible.
5. Recalcula EIE final y K si procede.
6. Si existe trabajo humano externo relevante que no pueda obtenerse
   automáticamente, haz la única pregunta breve del MC1 (ver "Horas
   humanas fuera de Claude").
7. Completa MC1 total y ratio de compresión solo si hay base suficiente.
8. Marca "Cerrado" solo si la evidencia lo permite.

## Flujo del desarrollador

El desarrollador debe seguir haciendo exactamente lo mismo:

/imputar [una frase sobre lo realizado]

NO debe rellenar formularios.

NO debe calcular EIE.

NO debe calcular porcentajes.

NO debe calcular MC1.

NO debe introducir horas salvo trabajo externo que Claude no pueda
observar y únicamente cuando sea necesario al cierre.

Claude debe obtener automáticamente todo lo posible de la evidencia
del proyecto y de las sesiones.

## Respuesta al desarrollador

Mantén la respuesta corta.

Formato:

Imputación actualizada ✓
Módulo: [nombre]
Estado: [estado]
EIE central: [n]
AI-native: [n] %
MC1 registrado: [importe o "pendiente de datos suficientes"]
Notion: [url]

Añade como máximo una línea indicando qué queda pendiente.

No muestres los cálculos completos salvo que se soliciten.

## Regla crítica

No confundir nunca:

1. EIE convencional equivalente.
2. Tiempo humano real.
3. Tiempo de ejecución de Claude/agentes.
4. Coste económico MC1.

Son cuatro magnitudes distintas.
