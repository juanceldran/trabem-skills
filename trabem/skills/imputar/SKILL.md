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

## MC1 real del módulo

Además de valorar la producción mediante EIE, registra separadamente
el coste directo real atribuible al módulo.

Nunca mezcles EIE con coste.

EIE = valor/entidad de ingeniería producida.
MC1 = coste directo realmente consumido para producirla.

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

Registra costes directamente atribuibles al módulo cuando puedan
obtenerse de evidencia:

- Claude/API;
- modelos externos;
- servicios de IA directamente atribuibles;
- otros consumos específicos.

No hagas repartos arbitrarios de costes generales.

Si no existe dato fiable, deja pendiente.

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

No calcules este ratio si las horas humanas son una estimación
sin base suficiente.

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

Tipos:
- Tipo proyecto: select Propio / Cliente
- EIE: número
- porcentajes: número
- costes: número/euro
- horas: número
- ratio: número
- Confianza MC1: select Baja / Media / Alta

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
```

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
