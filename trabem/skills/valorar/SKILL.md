---
name: valorar
description: Valoración funcional IFPUG + contraste EIE + benchmark externo ISBSG (P65) + precio recomendado, sobre lo que /imputar registró. Auditable y trazable. NO es /imputar (registro de producción).
argument-hint: "[módulo/proyecto] [--reevaluar | --prevalorar]"
disable-model-invocation: true
---

# SKILL `/valorar`

## Valoración funcional IFPUG, contraste EIE, benchmark ISBSG y precio recomendado

### MISIÓN

La skill `/valorar` existe para determinar de forma auditable:

1. qué tamaño funcional tiene un módulo o proyecto;
2. cuánto esfuerzo técnico convencional representa;
3. cuánto valor económico de ingeniería tiene;
4. si la valoración EIE existente es coherente;
5. qué referencia externa proporciona el mercado;
6. qué precio debería recomendarse al cliente.

`/valorar` NO sustituye a `/imputar`. `/imputar` registra producción, horas,
costes, EIE y reutilización. `/valorar` toma esos datos, inspecciona el
producto construido o el alcance previsto y realiza una valoración
independiente mediante **Puntos Función IFPUG + EIE + benchmark externo +
coste + valor cliente**.

La finalidad es impedir dos errores:

- regalar al cliente la productividad obtenida mediante IA;
- sobrevalorar trabajos mediante estimaciones de esfuerzo no contrastadas.

### ENTRADA

El texto que el desarrollador pasa al invocar la skill es:

$ARGUMENTS

Es contexto humano (el módulo/proyecto a valorar y, en su caso, `--reevaluar`
o `--prevalorar`). La valoración se deriva de la evidencia, no del texto.

---

# 1. FUENTES DE DATOS

Antes de valorar, recuperar cuando existan: ficha `/imputar`, repositorio,
requisitos, commits, código, modelos, endpoints, vistas, integraciones, tests,
documentación, presupuesto anterior, precio aceptado, contexto del cliente.

La fuente de verdad interna es la base `📊 Registro EIE · Ingeniería AI-native
TRABEM` (https://app.notion.com/p/700528d4041b40fa84a6877f32da635c) y la
doctrina comercial `💶 Cómo cobrar trabajos y módulos · Fuente de verdad`
(https://app.notion.com/p/3c5b83b803fa810ebbc6f63f4a0639b9).

Si existe valoración anterior, NO borrarla. Registrar siempre la nueva
valoración como una revisión trazable.

---

# 2. MODOS DE OPERACIÓN

- **Valoración nueva** — `/valorar [módulo/proyecto]`: analiza un trabajo que
  aún no tiene valoración funcional completa.
- **Reevaluación** — `/valorar [módulo] --reevaluar`: recupera valoración
  existente y la contrasta mediante Puntos Función.
- **Prevaloración** — `/valorar [alcance futuro] --prevalorar`: antes de
  construir, para determinar rango de tamaño funcional, EIE y referencia
  económica. Marcar claramente qué datos son estimados.

---

# 3. CLASIFICACIÓN DEL TRABAJO

Recuperar la clasificación de `/imputar` y verificarla. Valores: Nueva
funcionalidad · Evolutivo funcional · Correctivo · Refactor / deuda técnica ·
Rendimiento / optimización · Seguridad / hardening · Infraestructura / DevOps ·
Arquitectura / plataforma · Mixto. Si es incorrecta según la evidencia,
corregirla dejando trazabilidad.

---

# 4. CORRECTIVOS

Regla central: si la función ya debía existir y solo se restaura el
comportamiento esperado, no existe tamaño funcional nuevo.

Ejemplos: botón que no guardaba; error HTTP 400 en un flujo que debía
funcionar; cálculo incorrecto; fallo de persistencia; integración existente
rota.

Resultado: `PF nuevos = 0`. El trabajo puede tener EIE, HH, MC1 y coste
significativo, pero no se presenta como creación de nueva funcionalidad. Si una
tarea mezcla corrección y evolución, separar ambos componentes.

---

# 5. MÉTODO DE PUNTOS FUNCIÓN

Aplicar Function Point Analysis conforme al enfoque IFPUG. Los PF miden tamaño
funcional desde el punto de vista del usuario. No miden: horas, dificultad
técnica, líneas de código, número de archivos, commits, número de tests, uso de
IA.

El mismo alcance funcional debe tener aproximadamente el mismo tamaño funcional
lo produzca un equipo convencional, María, Juan, Claude Code u otra tecnología.

---

# 6. DEFINIR BOUNDARY

Antes de contar PF, definir explícitamente `Boundary`: qué pertenece al sistema
valorado y qué pertenece a sistemas externos. No cambiar artificialmente el
boundary para aumentar o reducir PF. Ej.: al valorar NPS, decidir si TRABEM,
Google Reviews y ProvenExpert están dentro o fuera. Normalmente los sistemas
externos quedan fuera y se tratan mediante interfaces. Registrar una
explicación breve del boundary.

---

# 7. DEFINIR SCOPE

Registrar `Scope`: ¿qué funcionalidad concreta valoramos? Distinguir
funcionalidad existente, construida ahora, modificada, reutilizada y pendiente.
No contabilizar toda una aplicación cuando solo se ha desarrollado un módulo.

---

# 8. FUNCIONES DE DATOS

- **ILF — Internal Logical File:** grupo lógico de datos reconocible por el
  usuario, mantenido dentro del boundary. No equiparar tabla SQL = ILF: varias
  tablas técnicas pueden ser un único ILF; una tabla puede no constituir ningún
  ILF independiente.
- **EIF — External Interface File:** grupo lógico de datos usado por la
  aplicación, reconocido funcionalmente, mantenido por otro sistema fuera del
  boundary.

Registrar cada ILF/EIF con justificación.

---

# 9. FUNCIONES TRANSACCIONALES

Identificar procesos elementales.

- **EI — External Input:** entrada que mantiene datos internos o altera
  comportamiento (crear cita, responder encuesta, modificar configuración,
  registrar paciente, enviar formulario).
- **EO — External Output:** salida con cálculo, procesamiento, derivación o
  lógica relevante (dashboard, informe, documento generado, exportación
  procesada, comunicación calculada).
- **EQ — External Inquiry:** consulta con entrada/salida sin mantenimiento de
  datos y sin procesamiento propio de EO (buscar paciente, consultar agenda,
  consultar detalle, visualizar estado).

No contar una pantalla automáticamente como una función. Contar procesos
elementales funcionalmente diferenciados.

---

# 10. DET, FTR Y RET

- **DET — Data Element Type:** campo único reconocible por el usuario.
- **FTR — File Type Referenced:** ILF o EIF leído o mantenido por una
  transacción (aplica a EI, EO, EQ).
- **RET — Record Element Type:** subgrupo lógico reconocible dentro de un ILF o
  EIF (aplica a ILF, EIF).

El análisis debe dejar evidencia para auditar por qué una función se clasificó
como baja, media o alta.

---

# 11. PESOS IFPUG

- **EI:** Baja 3 · Media 4 · Alta 6
- **EO:** Baja 4 · Media 5 · Alta 7
- **EQ:** Baja 3 · Media 4 · Alta 6
- **ILF:** Baja 7 · Media 10 · Alta 15
- **EIF:** Baja 5 · Media 7 · Alta 10

La complejidad se determina por las matrices DET/FTR o DET/RET, no por
intuición.

---

# 12. TABLA DE COMPLEJIDAD EI (FTR × DET)

- **0–1 FTR:** 1–4 DET Baja · 5–15 DET Baja · ≥16 DET Media
- **2 FTR:** 1–4 DET Baja · 5–15 DET Media · ≥16 DET Alta
- **≥3 FTR:** 1–4 DET Media · 5–15 DET Alta · ≥16 DET Alta

---

# 13. TABLA DE COMPLEJIDAD EO / EQ (FTR × DET)

- **0–1 FTR:** 1–5 DET Baja · 6–19 DET Baja · ≥20 DET Media
- **2–3 FTR:** 1–5 DET Baja · 6–19 DET Media · ≥20 DET Alta
- **≥4 FTR:** 1–5 DET Media · 6–19 DET Alta · ≥20 DET Alta

---

# 14. TABLA DE COMPLEJIDAD ILF / EIF (RET × DET)

- **1 RET:** 1–19 DET Baja · 20–50 DET Baja · ≥51 DET Media
- **2–5 RET:** 1–19 DET Baja · 20–50 DET Media · ≥51 DET Alta
- **≥6 RET:** 1–19 DET Media · 20–50 DET Alta · ≥51 DET Alta

---

# 15. NUEVO DESARROLLO

Para funcionalidad nueva calcular `PF añadidos`, desglosado en EI, EO, EQ, ILF,
EIF. Registrar `PF total nuevo`.

---

# 16. EVOLUTIVOS

No tratar todo evolutivo como desarrollo nuevo. Separar `PF añadidos`,
`PF modificados`, `PF eliminados`. Para funciones modificadas aplicar
Enhancement Function Point Analysis. Registrar cuando pueda determinarse: PF
originales, elementos afectados, DET añadidos/modificados/eliminados, FTR/RET
afectados, grado de modificación, PF equivalentes de modificación.

La función añadida se reconoce íntegramente; la modificada se pondera según
impacto; la eliminada se registra pero no cuenta como nueva productividad
funcional.

---

# 17. TRABAJO NO FUNCIONAL

Puntos Función no mide toda la ingeniería. Normalmente: refactor → PF 0;
optimización → PF 0; hardening → PF 0; CI/CD → N/A; backups → N/A;
infraestructura → N/A; arquitectura técnica → 0/N.A.; pentest → 0; migración
técnica sin cambio funcional → 0.

Estos trabajos pueden tener EIE elevado. No reducir EIE solo porque PF sea 0.

---

# 18. POSIBLE SNAP FUTURO

No mezclar por ahora tamaño funcional y no funcional. Con información
suficiente podrá incorporarse IFPUG SNAP como dimensión independiente para
requisitos no funcionales. Hasta entonces: PF = tamaño funcional; EIE =
esfuerzo técnico completo.

---

# 19. REUTILIZACIÓN

Recuperar de `/imputar`: Reutilización, % reutilizable, Reutilización
demostrada, EIE creación reutilizable, EIE trabajo específico. Verificar
técnicamente la clasificación. Los PF deben distinguir también `PF creados`,
`PF reutilizados`, `PF nuevos específicos`. No volver a valorar como
construcción nueva PF que pertenecen a un activo ya existente.

---

# 20. REUTILIZACIÓN POSTERIOR

Cuando un módulo ya existente se instala en otro cliente, no calcular
`PF completos del módulo × €/PF` como si se hubiera reconstruido. Separar:

- **Activo reutilizado:** PF funcionales que recibe el cliente gracias al
  producto ya existente.
- **Trabajo incremental:** PF nuevos o modificados específicamente.
- **Valor comercial:** que el activo ya exista NO implica entregarlo gratis.

Distinguir coste de producción incremental, tamaño funcional entregado,
derecho/licencia de uso y valor económico. La reutilización reduce coste y EIE
de entrega; no destruye automáticamente el valor comercial del activo.

---

# 21. EIE EXISTENTE

Recuperar EIE bajo/central/alto, materializado, pendiente, K y referencia
técnica. No asumir que el EIE es correcto solo porque ya existe. PF actúa como
métrica independiente de contraste.

---

# 22. RELACIÓN EIE/PF

Calcular `EIE / PF` cuando PF > 0. Permite construir el histórico TRABEM de
esfuerzo convencional equivalente por unidad funcional. No usar inicialmente un
valor fijo universal. Registrar el resultado para calibración futura.

---

# 23. CONTRASTE EIE VS PF

Analizar: ¿es razonable el EIE observado para el tamaño funcional obtenido? Si
hay divergencia importante, investigar: reutilización no descontada, boundary
incorrecto, scope incorrecto, EIE sobre/infra-valorado, alta complejidad no
funcional, seguridad, arquitectura, integración, migración, operación,
criticidad, QA, dependencia externa.

NO promediar automáticamente las dos valoraciones. La divergencia es
información.

---

# 24. REEVALUACIÓN

Con `/valorar módulo --reevaluar`, conservar `Valoración anterior` (EIE, K,
referencia técnica, reutilización, fecha, confianza). Después realizar análisis
IFPUG completo. Registrar: valoración anterior, valoración nueva, diferencia
absoluta, diferencia porcentual, causa, confianza anterior, confianza nueva,
fecha, método `Contraste IFPUG`. Nunca sobrescribir el histórico sin
trazabilidad.

---

# 25. BENCHMARK EXTERNO ISBSG

Usar como benchmark externo provisional la distribución pública ISBSG de
proyectos en euros posteriores a 2015, calidad A/B, medidos con IFPUG/NESMA. El
benchmark NO es una tarifa oficial: es una referencia estadística de proyectos
observados.

TRABEM usa provisionalmente el **percentil 65 (P65)** como posición objetivo:
superior a la mediana; evita pricing generalista; refleja especialización; no
presupone aún posicionamiento P75/P90 de gran consultora.

---

# 26. TABLA ISBSG PROVISIONAL

- **30–100 PF:** P25 ≈ 530 · P50 ≈ 800 · **P65 ≈ 925** · P70 ≈ 970 · P75 ≈ 990
  €/PF. Referencia TRABEM: **925 €/PF**.
- **100–300 PF:** P25 ≈ 590 · P50 ≈ 720 · P70 ≈ 795 · P75 ≈ 810 €/PF.
  Interpolación P65 ≈ **775 €/PF**.
- **300–1.000 PF:** P25 ≈ 395 · P50 ≈ 505 · P70 ≈ 620 · P75 ≈ 655 €/PF.
  Interpolación P65 ≈ **590 €/PF**.
- **1.000–3.000 PF:** P25 ≈ 340 · P50 ≈ 420 · P70 ≈ 490 · P75 ≈ 525 €/PF.
  Interpolación P65 ≈ **475 €/PF**.

---

# 27. PROYECTOS <30 PF

Los proyectos pequeños están infrarrepresentados en bases de PF por el coste
tradicional de medición. No inventar una curva premium sin evidencia. Hasta
tener histórico propio: `<30 PF → 925 €/PF` (igual que 30–100 PF). Marcar
`Confianza benchmark = Media/Baja` para tamaños muy pequeños.

La automatización del conteo mediante IA permite aplicar PF donde antes no era
viable medirlos. Esta ventaja NO justifica inflar el €/PF.

---

# 28. REFERENCIA FUNCIONAL DE MERCADO

`Referencia funcional = PF × benchmark P65 correspondiente`. Ej.: 40 PF ×
925 €/PF = 37.000 €. Es `Referencia funcional externa`, NO precio obligatorio.

---

# 29. BENCHMARK DE PRODUCTIVIDAD

Cuando sea útil, contrastar el PDR externo. Referencia pública ISBSG peer group
.NET europeo: P25 ≈ 6,3 · P50 ≈ 7,9 · P75 ≈ 11,2 h/PF. Usar con prudencia: no
asumir que un proyecto TRABEM deba consumir esas horas; sirve para comprobar el
orden de magnitud del esfuerzo convencional.

---

# 30. REFERENCIA TÉCNICA EIE

`Referencia técnica EIE = EIE central × 60 € × K`. La tarifa de 60 €/EIE sigue
vigente hasta revisión formal. No modificarla automáticamente por incorporar
Puntos Función.

---

# 31. MC1

Recuperar coste humano, coste IA, otros MC1, MC1 total. Calcular `MC1/PF`
cuando corresponda: mide el coste real AI-native por unidad funcional. NO usar
MC1/PF como precio.

---

# 32. PRODUCTIVIDAD FUNCIONAL

Con horas registradas y alcance homogéneo: `PF / HH = productividad funcional`.
Registrar aparte `EIE / HH = compresión técnica`. No mezclar ambas: una persona
puede producir pocos PF y mucho EIE técnico, o muchos PF de baja complejidad
técnica.

---

# 33. HISTÓRICO PROPIO TRABEM

Cada valoración alimenta progresivamente: PF, EIE, HH, MC1, EIE/PF, HH/PF,
MC1/PF, precio presupuestado, precio aceptado, €/PF aceptado, margen esperado,
margen real, defectos, reutilización. Objetivo: sustituir gradualmente el
benchmark ISBSG genérico por curvas propias.

---

# 34. SEGMENTACIÓN DEL HISTÓRICO

Con muestra suficiente, separar al menos: nuevo desarrollo, evolutivos,
integración, software sanitario, software generalista, módulo reusable,
bespoke, implantación, plataforma, tamaño funcional. No calcular una única
media €/PF para todo TRABEM.

---

# 35. POSICIÓN TRABEM

Usar inicialmente `P65 ISBSG` como posición de mercado provisional. No añadir
automáticamente un premium healthcare sin evidencia estadística. La
especialización sanitaria se reconoce vía Factor K, Value Case, criticidad,
riesgo, responsabilidad y alternativas de mercado. No duplicar estas primas.

---

# 36. VALUE CASE DEL CLIENTE

Además de PF y EIE, analizar cuando sea posible: horas ahorradas, personal
evitado, ingresos adicionales, no-shows reducidos, errores eliminados,
capacidad operativa, riesgo evitado, tiempo de proceso, cumplimiento, coste de
alternativa, coste de no hacer nada. Hipótesis conservadoras. Separar dato
observado, dato del cliente, estimación e inferencia.

---

# 37. CORREDOR DE PRICING

- **Suelo económico:** MC1 + margen mínimo razonable.
- **Referencia técnica:** EIE × 60 × K.
- **Referencia funcional:** PF × P65 ISBSG.
- **Value Case:** valor económico atribuible para el cliente.
- **Mercado / alternativas:** precio y coste de opciones realistas.

El precio recomendado se sitúa razonadamente dentro de este corredor.

---

# 38. NO PROMEDIAR MECÁNICAMENTE

Ej.: Referencia EIE = 27.500 €, Referencia PF = 40.000 €. NO calcular
automáticamente 33.750 €. Investigar primero la divergencia; puede existir
razón legítima.

---

# 39. REGLA DE CONVERGENCIA

Si referencia EIE, referencia PF, comparables y Value Case convergen
aproximadamente, elevar `Confianza precio`. Si divergen significativamente,
`Confianza precio = Media/Baja` y explicar qué variable domina.

---

# 40. PRECIO RECOMENDADO

Devolver: `Precio mínimo defendible`, `Precio técnico`, `Referencia funcional`,
`Precio recomendado`, `Rango negociable`, `Confianza`. El rango negociable no
debe convertirse en excusa para descuentos arbitrarios.

---

# 41. TRABAJOS REUTILIZABLES Y PRICING

Un activo reusable produce dos efectos: **producción** (reduce coste y esfuerzo
de nuevas implantaciones) y **comercial** (puede seguir entregando mucho valor
funcional). Por tanto: reutilización ≠ obligación de cobrar solo el coste
incremental. El cliente compra capacidad funcional y valor, no las horas reales
de volver a desplegarla. Especialmente relevante en producto/SaaS.

---

# 42. PRODUCTO VS BESPOKE

- **Bespoke:** PF construidos específicamente para ese cliente tienen relación
  directa con la valoración de desarrollo.
- **Producto:** PF ya existentes ayudan a medir cuánto producto recibe el
  cliente, pero no se convierten automáticamente en un setup `PF × €/PF`. El
  producto se monetiza vía licencia/suscripción, setup, operación, consumos,
  módulos y valor entregado.

La referencia PF ayuda a entender valor y capacidad funcional, no a cobrar de
nuevo todo el coste de construcción.

---

# 43. CORRECTIVOS Y CLIENTE

Correctivo de defecto propio: normalmente `PF nuevos = 0`, no se convierte
automáticamente en trabajo facturable. Si el mantenimiento correctivo está
contratado, se absorbe en mantenimiento/suscripción. Si el problema procede de
cambio externo, API de tercero, infraestructura ajena, modificación del cliente
o alcance no contratado, puede haber trabajo facturable, pero no porque genere
PF nuevos.

---

# 44. SALIDA OBLIGATORIA

Compacta pero auditable. Ejemplo:

**Módulo:** DWFW
**Tipo:** Nueva funcionalidad + arquitectura
**Boundary:** plataforma DWFW; servicios externos fuera
**Scope:** núcleo + portal + web + API funcional
**PF:** 42
**Confianza PF:** Alta
**EIE:** 410 h
**EIE/PF:** 9,76
**K:** 1,12
**Referencia EIE:** 27.552 €
**Benchmark:** ISBSG P65 · banda 30–100
**€/PF:** 925 €
**Referencia funcional:** 38.850 €
**MC1:** X €
**Reutilización:** Parcial 35 %
**Value Case:** X
**Precio recomendado:** X–Y
**Confianza:** Media/Alta

Después: `Explicación de divergencias`, en máximo varios párrafos concretos.

---

# 45. DETALLE AUDITABLE

Además del resumen, almacenar en la ficha la tabla con todas las funciones y su
justificación:

| Función | Tipo | DET | FTR/RET | Complejidad | PF |
| ------- | ---- | --: | ------: | ----------- | -: |

No limitarse a devolver `42 PF` sin poder explicar de dónde salen.

---

# 46. CONFIANZA PF

Registrar Baja / Media / Alta.

- **Alta:** boundary, requisitos y código permiten identificar claramente
  procesos y grupos de datos.
- **Media:** existen ambigüedades menores.
- **Baja:** requisitos incompletos, producto no inspeccionable o gran parte
  inferida.

No usar un PF con confianza baja como ancla fuerte de pricing.

---

# 47. GUARDARRAÍLES ANTI-INFLADO

No incrementar PF por: complejidad del framework, OAuth, Docker, Kubernetes,
número de tests, número de idiomas si no generan procesos funcionales
diferenciados, número de líneas, commits, dificultad del desarrollador, IA,
plazo corto. Estas variables pueden afectar EIE, K o Value Case, pero no
necesariamente PF.

---

# 48. GUARDARRAÍL DE MICROFUNCIONES

No fragmentar artificialmente un único proceso elemental para multiplicar PF.
Varias rutas, botones o métodos técnicos pueden constituir una sola función
desde la perspectiva del usuario.

---

# 49. GUARDARRAÍL DE ILF

No convertir cada modelo o tabla en un ILF. Agrupar según la visión lógica del
usuario. Es uno de los principales riesgos de sobreconteo automatizado.

---

# 50. GUARDARRAÍL DE INTEGRACIONES

Una integración externa no genera automáticamente muchos EIF. Contar solo
grupos lógicos de datos externos reconocibles y realmente referenciados. La
dificultad de una API externa puede elevar EIE sin aumentar proporcionalmente
PF.

---

# 51. GUARDARRAÍL DE IDIOMAS

Traducir una misma función a cuatro idiomas normalmente NO multiplica sus PF
por cuatro. La funcionalidad es la misma; la carga de localización se refleja
principalmente en EIE.

---

# 52. GUARDARRAÍL DE SEGURIDAD

OAuth, PKCE, rate limiting, hardening o pentest no generan automáticamente PF
adicionales equivalentes a su esfuerzo. Solo contar funcionalidad de usuario
nueva cuando cumpla las reglas funcionales IFPUG. El resto permanece en EIE/no
funcional.

---

# 53. GUARDARRAÍL DE IA

Que Claude produzca un módulo en horas no reduce sus PF. La velocidad afecta
HH/PF, MC1/PF, margen y productividad, no el tamaño funcional.

---

# 54. OPORTUNIDAD ESTRATÉGICA

El coste tradicional de contar PF ha limitado su uso a grandes contratos,
administraciones, grandes consultoras, outsourcing y proyectos de suficiente
tamaño. Automatizar el análisis mediante IA permite usarlo económicamente en
módulos mucho más pequeños. Es una ventaja de medición y gobierno, no un
argumento para alterar las reglas IFPUG.

---

# 55. DATOS PARA INCENTIVOS

`/valorar` puede producir métricas que luego alimenten incentivos: PF
producidos, PF/HH, EIE/HH, EIE reutilizable creado, EIE evitado futuro,
defectos/PF, margen. NO calcula directamente el bonus del empleado: ese sistema
usa estas métricas después con reglas corporativas separadas.

---

# 56. PRINCIPIO FINAL

`/valorar` actúa como un segundo juez independiente de `/imputar`.

- `/imputar` pregunta: ¿qué hemos producido y cuánto nos ha costado?
- `/valorar` pregunta: ¿qué tamaño funcional tiene, qué entidad de ingeniería
  representa, qué dice el mercado y cuánto deberíamos cobrar?

El sistema será fiable cuando varias medidas independientes converjan:
**PF + EIE + MC1 + Value Case + mercado.** Ninguna métrica debe ser juez único.
La prioridad es una valoración defendible, trazable, conservadora en los
supuestos, consistente entre proyectos y capaz de capturar la productividad
AI-native sin regalarla al cliente.

---

# OPERATIVO · DÓNDE SE REGISTRA

La valoración se anota en la ficha del módulo dentro de la base `📊 Registro
EIE` (la misma que usa `/imputar`; buscar la ficha por Módulo). Añade un bloque
`## Valoración /valorar (IFPUG)` con: fecha, modo (nueva/reevaluar/prevalorar),
boundary, scope, la tabla auditable de funciones (§45), PF por tipo, PF total,
EIE/PF, banda y €/PF ISBSG, referencia funcional, corredor de pricing y precio
recomendado, y la confianza. NUNCA sobrescribas una valoración anterior: cada
revisión se añade con su fecha y el contraste frente a la previa (§24).

Antes de escribir, inspecciona el esquema; si tienes permisos, puedes añadir
campos estructurados para el histórico (§33) cuando se decida: `PF total`,
`PF nuevos`, `PF reutilizados`, `€/PF (P65)`, `Referencia funcional (€)`,
`Precio recomendado (€)`, `Confianza PF`, `EIE/PF`. No elimines campos
existentes.

Recuerda: `/valorar` NO registra producción ni horas (eso es `/imputar`); no
fija tarifas oficiales; produce una referencia auditable y un precio
recomendado dentro del corredor.
