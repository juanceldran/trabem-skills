---
name: valorar
description: Valoración EX POST de trabajo ya construido — PF reales/válidos (IFPUG + puerta de calidad), referencia de construcción PF TRABEM, EIE/MC1 internos, benchmark externo, contraste contra el presupuesto baseline, desviaciones, accuracy y aprendizaje del modelo TRABEM. NO hace prevaloración (eso es /presupuestar) ni registra producción (eso es /imputar).
argument-hint: "[módulo/proyecto ya construido]"
disable-model-invocation: true
---

# SKILL `/valorar`

## Valoración ex post, PF válidos, referencia de construcción TRABEM, contraste del presupuesto y aprendizaje

### MISIÓN

La skill `/valorar` existe para analizar un trabajo ya materializado y
determinar:

1. qué se construyó realmente;
2. qué tamaño funcional real y **válido** tiene (IFPUG + puerta de calidad);
3. qué referencia de construcción PF TRABEM le corresponde;
4. qué EIE real/materializado y valor técnico interno representa;
5. cuánto costó realmente;
6. qué reutilización real produjo;
7. qué desviaciones existen respecto al presupuesto;
8. qué debe aprender el sistema para mejorar futuras valoraciones y el €/PF TRABEM.

`/valorar` trabaja EX POST. No presupone trabajos futuros. **No incluye modo
`--prevalorar`**: la valoración ex ante pertenece exclusivamente a
`/presupuestar`. Es el **cierre ex post**.

### ENTRADA

El texto que el desarrollador pasa al invocar la skill es:

$ARGUMENTS

Es el módulo/proyecto ya construido a valorar. La valoración se deriva de la
evidencia real (código, commits, ficha /imputar, presupuesto), no del texto.

---

# 1. FUENTES

Recuperar: ficha `/imputar`; presupuesto relacionado; repositorio; código;
commits; diff; requisitos finales; tests; despliegue; integraciones; horas
registradas; MC1; precio finalmente aceptado; alcance realmente entregado.

Fuente de verdad: `📊 Registro EIE`
(https://app.notion.com/p/700528d4041b40fa84a6877f32da635c) y doctrina
comercial `💶 Cómo cobrar trabajos y módulos`
(https://app.notion.com/p/3c5b83b803fa810ebbc6f63f4a0639b9).

**Constantes** (única fuente, no reescribir literales): `constants/trabem.constants.json`
del plugin `trabem` — `PF_TRABEM_EUR`, tarifas internas 70/30, bandas ISBSG
(benchmark externo) e incentivo. Cárgalo para tomar un valor. **Cuatro planos
económicos** (no confundir; ver `planos_economicos`): (1) coste humano real = HH ×
coste/hora real por persona · (2) valoración técnica interna = EIE 70/30 · (3) valor
comercial = PF válidos × 90 · (4) incentivo = PF netos × 1,25.

---

# 2. PRESUPUESTO BASELINE

Si existe `/presupuestar`, recuperar SIN MODIFICAR: PF previstos; EIE previsto;
HH previstas; MC1 previsto; reutilización prevista; referencia de construcción;
precio recomendado; precio aceptado; margen esperado; Value Case previsto; forma
de cobro.

Estos datos son baseline histórico. Nunca reescribirlos con información
posterior. El baseline de `/presupuestar` es **inmutable** (§27).

---

# 3. SCOPE Y BOUNDARY REALES

Definir `Scope real` y `Boundary real`. Comparar con lo presupuestado.
Registrar: alcance añadido; alcance eliminado; cambio de requisitos; trabajo no
previsto; funcionalidades no entregadas.

---

# 4. CLASIFICACIÓN REAL

Clasificar: Nueva funcionalidad · Evolutivo funcional · Correctivo · Refactor ·
Rendimiento · Seguridad · Infraestructura · Arquitectura · Mixto. Separar
componentes si procede.

---

# 5. PUNTOS FUNCIÓN REALES

Aplicar/revisar el conteo IFPUG sobre el producto realmente construido (método,
pesos y tablas de complejidad en el apéndice OPERATIVO). Contar EI, EO, EQ, ILF,
EIF reales; aplicar DET/FTR/RET. Calcular `PF total`. Separar cuando proceda
`PF nuevos`, `PF modificados`, `PF eliminados`, `PF reutilizados`. Registrar
`Confianza PF real`.

---

# 6. PUERTA DE CALIDAD → PF VÁLIDOS

Aplicar la **puerta de calidad** (testing, estabilidad, seguridad, etc.). El
testing **no genera PF adicionales**: hace que los PF sean **válidos**. Calcular
`PF válidos` = PF entregados que pasan la puerta de calidad. Los PF sin calidad
suficiente no cuentan como válidos hasta que la pasen. `PF válidos` es la base
de la referencia de construcción (§11) y del incentivo (§23).

---

# 7. CORRECTIVOS Y RETRABAJO

Correctivo puro: `PF nuevos = 0`. Puede existir EIE, HH y MC1. No convertir bug
fixing en nueva producción funcional.

Atribución del retrabajo:

- **Correctivo inevitable externo** (fallo de terceros, del entorno): neutral.
- **Correctivo evitable** generado por una decisión/trabajo previo: se atribuye
  al **responsable original**, aunque lo corrija otra persona.
- **Quien realiza la corrección no queda penalizado** por esas horas: son
  capacidad consumida por correctivo de tercero, no baja de su producción.

Registrar `Retrabajo imputable` y a quién se atribuye. (Sin automatismos
complejos todavía: estructura preparada y documentada; el modelo de datos crece
después.)

---

# 8. EIE REAL

Recuperar de `/imputar`: EIE materializado, central, bajo, alto, K,
reutilización. Revisar únicamente si hay evidencia nueva que justifique
corrección. No modificar el EIE automáticamente para hacerlo converger con PF.

---

# 9. HH Y MC1 REALES

Registrar `HH reales`, `Base horas`, `Coste humano real`, `Coste IA real`,
`Otros MC1 reales`, `MC1 real`. Priorizar horas registradas. No sustituir datos
reales por reconstrucciones si existen. (El coste hora **real** es por persona y vive en Notion (`Coste hora humano`), no
en el repo; **no** es la tarifa 70/30. La suscripción de Claude Code es MC2.)

---

# 10. INSTRUMENTACIÓN INTERNA 70/30

Calcular el **valor técnico interno 70/30** real:
`Valor técnico interno = (EIE humano-dominante × tarifa humano) + (EIE AI-acelerado × tarifa agente)`
(tarifas en `constants/trabem.constants.json` → `instrumentacion_interna`).
Con `PF válidos`: `€/PF observado interno = valor técnico interno 70/30 / PF válidos`.

Es **instrumentación interna** (productividad, coste técnico, calibración del PF
TRABEM, comprobar si estamos cobrando bien): **NO es el precio a cliente**. El
precio comercial es la referencia de construcción (§11).

---

# 11. REFERENCIA DE CONSTRUCCIÓN PF TRABEM (unidad comercial)

`Referencia construcción TRABEM = PF válidos × PF_TRABEM_EUR`

`PF_TRABEM_EUR` vigente en `constants/trabem.constants.json` → `comercial`.
Es la referencia de precio de **construcción / setup** (la unidad comercial es
el PF). No apliques todavía escalones 100/110/120. El PF es **aspiracional**:
registra también el **precio real cobrado** al cliente y mantén la **tensión**
(grado de realización = precio real/PF ÷ PF_TRABEM_EUR); no colapses el PF en lo
que se cobra.

---

# 12. BENCHMARK EXTERNO (ISBSG · contraste)

Calcular `Benchmark externo €/PF`, `Percentil`, `Referencia externa funcional`
(bandas ISBSG en `constants/trabem.constants.json` → `benchmark_externo_isbsg`).
Es **referencia externa de mercado convencional**: contraste (precio
convencional, diferencia con nuestra tarifa propia). **Nunca** se convierte en
precio recomendado ni en tarifa TRABEM.

---

# 13. TRABEM €/PF (aprendizaje del propio €/PF)

Calcular `€/PF presupuestado` (Precio recomendado / PF previstos),
`€/PF aceptado` (Precio aceptado / PF previstos) y `€/PF real` (Precio real /
PF válidos). Comparar con `PF_TRABEM_EUR` vigente. Alimentan el histórico
comercial del segmento para **aprender nuestro €/PF TRABEM** y calibrar la
constante. Calibración acotada al nicho **sanitario** (`constants…calibracion`);
otros sectores solo como contraste, salvo decisión expresa.

---

# 14. REUTILIZACIÓN REAL

Registrar `Reutilización real` (No · Parcial · Sí), `% reutilización real`,
`Reutilización demostrada`, `EIE creación reutilizable`, `EIE específico`,
`PF reutilizados`. No contabilizar dos veces activos ya existentes.

---

# 15. PRODUCTIVIDAD

Con HH registradas y homogéneas: `PF / HH` y `EIE / HH`. Calcular `MC1 / PF` y
`EIE / PF`. Separar productividad funcional, compresión técnica y coste
unitario funcional.

**Métricas de cierre (§ calibración)** — deben quedar obtenibles: `PF válidos`,
`HH reales`, `PF/HH`, `Coste humano real`, `Coste humano real/PF`, `EIE humano`,
`EIE agente`, `EIE total`, `Valor técnico interno 70/30`, `Valor técnico interno/PF`,
`Referencia comercial (PF válidos × 90)`, `Retrabajo imputable`, `PF netos`,
`Incentivo desarrollo = PF netos × 1,25`, y la desviación presupuesto vs realidad.

---

# 16. DESVIACIONES

Comparar previsión vs realidad. Calcular `Desviación PF %`, `Desviación EIE %`,
`Desviación HH %`, `Desviación MC1 %`, `Desviación precio %`,
`Desviación margen %`, `Desviación reutilización %`. Fórmula:
`(Real − Previsto) / Previsto × 100`. No calcular si el denominador no es
válido.

---

# 17. ACCURACY DE PRESUPUESTACIÓN

Registrar `Accuracy PF`, `Accuracy EIE`, `Accuracy MC1`, `Accuracy precio`,
`Accuracy margen`. Puede usarse `Accuracy = 100 − abs(desviación %)` con suelo
0. El objetivo no es precisión falsa, sino medir si `/presupuestar` mejora con
el histórico.

---

# 18. CAUSAS DE DESVIACIÓN

Clasificar `Causa desviación principal`: Cambio de alcance cliente · Requisitos
ambiguos · Reutilización sobreestimada · Reutilización infraestimada ·
Complejidad técnica no prevista · Integración externa · Correctivos ·
Infraestructura · Seguridad · Estimación PF incorrecta · Estimación EIE
incorrecta · Productividad superior a prevista · Productividad inferior a
prevista · Otro. Registrar explicación.

---

# 19. VALUE CASE REAL

Con evidencia posterior: `Value Case observado`; comparar con
`Value Case previsto`; registrar `Desviación Value Case`. No inventar
resultados económicos no observados.

---

# 20. MARGEN REAL

Calcular cuando proceda: `Margen real = Precio real − MC1 real` y
`Margen real %`. Comparar con margen esperado. Separar siempre MC1 de MC2.

---

# 21. APRENDIZAJE DEL MODELO

Cada cierre alimenta: TRABEM €/PF por segmento; PF/HH; EIE/HH; MC1/PF; EIE/PF;
margen; accuracy presupuestaria; duración real; reutilización; defectos; Value
Case observado. No modificar manualmente históricos para que el modelo parezca
más preciso.

---

# 22. SEGMENTACIÓN

Registrar siempre `Segmento cliente`: Clínica pequeña · Clínica / policlínica ·
Hospital · Grupo hospitalario · Otro. Permite calcular después P25/P50/P65/P75
€/PF por segmento.

---

# 23. INCENTIVO · SOLO TRAZABILIDAD

El incentivo de desarrollo usa PF, pero es **OTRO sistema** (no se mezcla con la
capa comercial `PF_TRABEM_EUR`). `/valorar` **no calcula incentivos** todavía;
solo deja los datos trazables: `PF válidos` (§6), `Retrabajo imputable` (§7) y
`PF netos = PF válidos − PF equivalentes de retrabajo imputable`. Las constantes
del incentivo (valor €/PF y bandas mensuales) viven en
`constants/trabem.constants.json` → `incentivo`. No crear aquí una skill de
incentivos.

**Elegibilidad (`incentivo.elegibilidad`):** todo se mide igual, pero a la base
del incentivo entran los **`PF incentivables`**: **Interno (`Tipo proyecto =
Propio`)** → PF netos completos; **Cliente** → PF netos **solo en la medida en
que mete caja** (cobro; sanitarios vía proxy ~1 %). Un cliente **estratégico sin
caja** (p.ej. DWFW) se mide pero **no computa** para el incentivo hasta que
cobre, dentro de su tope. Registra `PF incentivables`.

---

# 24. CAMPOS DE NOTION PARA `/valorar`

Añadir o utilizar (agrupados):

**Relación con presupuesto:** Presupuesto relacionado · Precio recomendado
previsto · Precio aceptado · Forma de cobro · Segmento cliente · Facturación
anual cliente.

**Scope real:** Scope real · Boundary real · Cambio de alcance · Tipo trabajo
real.

**PF reales:** EI reales · EO reales · EQ reales · ILF reales · EIF reales · PF
total · PF nuevos · PF modificados · PF eliminados · PF reutilizados · PF válidos
· Confianza PF real.

**Calidad / retrabajo:** Puerta de calidad (pasa/no) · Retrabajo imputable ·
Atribución retrabajo · PF netos.

**EIE real / interno:** EIE real/materializado · EIE/PF · Factor K real · Valor
técnico interno 70/30 (€) · €/PF observado interno.

**Comercial (construcción):** PF TRABEM €/PF · Referencia construcción PF TRABEM
(€) · Precio real · Precio final cliente (€).

**Producción:** HH reales · Base horas · PF/HH · EIE/HH.

**MC1 real:** Coste humano real · Coste IA real · Otros MC1 reales · MC1 real ·
MC1/PF.

**Reutilización:** Reutilización real · % reutilización real · Reutilización
demostrada · EIE creación reutilizable · EIE específico.

**Benchmark externo:** Benchmark externo ISBSG €/PF · Percentil benchmark ·
Referencia externa ISBSG (€).

**Comercial contraste:** €/PF presupuestado · €/PF aceptado · €/PF real ·
Margen real € · Margen real %.

**Value Case:** Value Case previsto · Value Case observado · Desviación Value
Case.

**Desviaciones:** Desviación PF % · Desviación EIE % · Desviación HH % ·
Desviación MC1 % · Desviación precio % · Desviación margen % · Desviación
reutilización %.

**Accuracy:** Accuracy PF · Accuracy EIE · Accuracy MC1 · Accuracy precio ·
Accuracy margen · Accuracy global presupuesto.

**Diagnóstico:** Causa desviación principal · Explicación desviación ·
Aprendizaje modelo · Confianza valoración final.

**Histórico (legacy — no reescribir):** Referencia técnica (€) · Precio a cliente
(por capas) (€).

---

# 25. ACCURACY GLOBAL

No construir una fórmula sofisticada al principio. Mientras se acumula muestra,
calcular una media prudente de Accuracy PF, Accuracy MC1, Accuracy precio y
Accuracy margen. Registrar `Accuracy global presupuesto`. Después se podrán
ponderar variables según evidencia.

---

# 26. SALIDA OBLIGATORIA

**Proyecto:**
**Presupuesto baseline:**
**PF previstos / reales / válidos:**
**Referencia construcción PF TRABEM (€):**
**Valor técnico interno 70/30 (€) · €/PF observado interno:**
**Benchmark externo ISBSG (contraste):**
**EIE previsto / real:**
**HH previstas / reales:**
**MC1 previsto / real:**
**Precio previsto / real:**
**Margen previsto / real:**
**Reutilización prevista / real:**
**Calidad / retrabajo · PF netos:**
**Principales desviaciones:**
**Accuracy:**
**Causa:**
**Aprendizaje para `/presupuestar` y el €/PF TRABEM:**
**Confianza:**

---

# 27. REGLA DE GOBIERNO — BASELINE INMUTABLE

Si la valoración real muestra una desviación grande, no modificar
retrospectivamente `/presupuestar`. Registrar el error. El valor del sistema
está en acumular «qué creíamos que ocurriría» frente a «qué ocurrió
realmente». El baseline de `/presupuestar` es inmutable.

---

# 28. RELACIÓN ENTRE LAS TRES SKILLS

- `/presupuestar`: predice qué construiremos, qué tamaño tendrá y qué debemos
  cobrar (referencia de construcción PF TRABEM).
- `/imputar`: registra el trabajo, coste y productividad durante la ejecución
  (EIE, valor técnico interno 70/30, MC1).
- `/valorar`: mide qué construimos realmente (PF válidos), lo valora
  comercialmente y calibra el modelo.

---

# 29. OBJETIVO ORGANIZATIVO

La finalidad es que, con suficiente histórico, una persona pueda introducir
requisitos y obtener una valoración consistente sin depender del criterio
personal del CEO. Las valoraciones rutinarias con alta confianza, comparables
suficientes, margen correcto, Value Case coherente, capacidad de absorción
válida y desviación histórica controlada deben poder aprobarse sin intervención
extraordinaria. El CEO interviene fundamentalmente en excepciones.

---

# 30. PRINCIPIO FINAL

`/valorar` no existe para justificar retrospectivamente el precio cobrado.
Existe para descubrir si el presupuesto fue correcto, medir la realidad y hacer
que la siguiente valoración sea mejor. El sistema debe aprender de sus errores,
no ocultarlos.

---

# OPERATIVO · MÉTODO IFPUG, BENCHMARK Y DÓNDE SE REGISTRA

Mecánica IFPUG (compartida con `/presupuestar`), necesaria para contar PF:

**Pesos:** EI 3/4/6 · EO 4/5/7 · EQ 3/4/6 · ILF 7/10/15 · EIF 5/7/10 (Baja/
Media/Alta).

**Complejidad EI** (FTR×DET): 0–1 FTR → 1–15 Baja, ≥16 Media · 2 FTR → 1–4
Baja, 5–15 Media, ≥16 Alta · ≥3 FTR → 1–4 Media, 5–15 Alta, ≥16 Alta.
**Complejidad EO/EQ** (FTR×DET): 0–1 FTR → 1–19 Baja, ≥20 Media · 2–3 FTR →
1–5 Baja, 6–19 Media, ≥20 Alta · ≥4 FTR → 1–5 Media, 6–19 Alta, ≥20 Alta.
**Complejidad ILF/EIF** (RET×DET): 1 RET → 1–50 Baja, ≥51 Media · 2–5 RET →
1–19 Baja, 20–50 Media, ≥51 Alta · ≥6 RET → 1–19 Media, 20–50 Alta, ≥51 Alta.

**No funcional → PF 0** (pero puede tener EIE): refactor, optimización,
hardening, CI/CD, backups, infraestructura, pentest, migración técnica sin
cambio funcional.

**Guardarraíles anti-inflado:** no subir PF por framework, OAuth/PKCE, Docker/
K8s, nº de tests, nº de idiomas (misma función localizada NO multiplica PF),
líneas, commits, dificultad, IA o plazo — eso va a EIE/K/Value Case, no a PF.
No fragmentar un proceso elemental (microfunciones). No convertir cada tabla en
ILF. Una integración externa no genera muchos EIF automáticamente.

**Benchmark ISBSG:** bandas €/PF y PDR externo en `constants/trabem.constants.json`
→ `benchmark_externo_isbsg`. `Referencia externa funcional = PF × €/PF de la
banda`. **No es tarifa; es contraste externo** y no determina el precio TRABEM.

**Las magnitudes (no confundir):**
- **Coste** = MC1 (lo que nos cuesta producir). Suelo.
- **Precio comercial de construcción** = `PF válidos × PF_TRABEM_EUR` (unidad de
  venta, la referencia comercial).
- **Valor técnico interno 70/30** = `(EIE humano × 70) + (EIE AI × 30)`
  (instrumentación interna, **no** precio a cliente).
- **Benchmark externo** = ISBSG `PF × €/PF` (contraste de mercado convencional).

El **precio final cliente** (setup) se elige con el Value Case.

**Dónde se registra (dos capas):**

1. **PF reales/válidos y análisis IFPUG → Registro EIE**, en la ficha del módulo:
   campos `PF total`, `PF nuevos`, `PF reutilizados`, `PF válidos`, `PF TRABEM
   €/PF`, `Referencia construcción PF TRABEM (€)`, `Valor técnico interno 70/30
   (€)`, `€/PF observado interno`, `Benchmark externo ISBSG (€)`, `EIE/PF`,
   `Confianza PF`, y el bloque auditable `## Valoración /valorar (IFPUG)` con la
   tabla de funciones.

2. **Resultado ex post y contraste → 📊 Presupuestos TRABEM**
   (https://app.notion.com/p/8ba2ead5e35545ae82ba052902fbae75), en la MISMA fila
   del presupuesto (localízala por `Producción relacionada`, o crea el enlace si
   falta): rellena Scope/Boundary real, PF detalle (EI/EO/EQ/ILF/EIF reales),
   Precio real, Reutilización real, Value Case observado, Fecha cierre, Causa
   desviación principal, Explicación, Aprendizaje y Confianza valoración final.

Los datos productivos (EIE real, HH reales, MC1 real, PF reales) **NO** se
copian a mano en Presupuestos: se agregan por rollup desde los registros EIE
relacionados. Las **desviaciones y la accuracy son fórmulas** de la base — no
las escribas. Si el módulo no tiene presupuesto (trabajo interno, arquitectura,
deuda técnica, correctivo), haz solo el paso 1. Nunca sobrescribas una
valoración ni el baseline del presupuesto (§2, §27): cada revisión se añade con
su fecha.
