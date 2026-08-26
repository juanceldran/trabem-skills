---
name: valorar
description: Valoración EX POST de trabajo ya construido — PF reales (IFPUG), EIE/MC1 reales, contraste contra el presupuesto baseline, desviaciones, accuracy y aprendizaje del modelo TRABEM. NO hace prevaloración (eso es /presupuestar) ni registra producción (eso es /imputar).
argument-hint: "[módulo/proyecto ya construido]"
disable-model-invocation: true
---

# SKILL `/valorar`

## Valoración ex post, PF reales, contraste del presupuesto y aprendizaje del modelo TRABEM

### MISIÓN

La skill `/valorar` existe para analizar un trabajo ya materializado y
determinar:

1. qué se construyó realmente;
2. qué tamaño funcional real tiene;
3. qué EIE real/materializado corresponde;
4. cuánto costó realmente;
5. qué reutilización real produjo;
6. qué valor funcional representa;
7. qué desviaciones existen respecto al presupuesto;
8. qué debe aprender el sistema para mejorar futuras valoraciones.

`/valorar` trabaja EX POST. No presupone trabajos futuros. **No incluye modo
`--prevalorar`**: la valoración ex ante pertenece exclusivamente a
`/presupuestar`.

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

---

# 2. PRESUPUESTO BASELINE

Si existe `/presupuestar`, recuperar SIN MODIFICAR: PF previstos; EIE previsto;
HH previstas; MC1 previsto; reutilización prevista; precio recomendado; precio
aceptado; margen esperado; Value Case previsto; forma de cobro.

Estos datos son baseline histórico. Nunca reescribirlos con información
posterior.

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

Aplicar IFPUG sobre el producto realmente construido (método, pesos y tablas de
complejidad en el apéndice OPERATIVO). Contar EI, EO, EQ, ILF, EIF reales;
aplicar DET/FTR/RET. Calcular `PF reales`. Separar cuando proceda `PF nuevos`,
`PF modificados`, `PF eliminados`, `PF reutilizados`. Registrar
`Confianza PF real`.

---

# 6. CORRECTIVOS

Correctivo puro: `PF nuevos = 0`. Puede existir EIE, HH y MC1. No convertir bug
fixing en nueva producción funcional.

---

# 7. EIE REAL

Recuperar de `/imputar`: EIE materializado, central, bajo, alto, K,
reutilización. Revisar únicamente si hay evidencia nueva que justifique
corrección. No modificar el EIE automáticamente para hacerlo converger con PF.

---

# 8. HH Y MC1 REALES

Registrar `HH reales`, `Base horas`, `Coste humano real`, `Coste IA real`,
`Otros MC1 reales`, `MC1 real`. Priorizar horas registradas. No sustituir datos
reales por reconstrucciones si existen.

---

# 9. REUTILIZACIÓN REAL

Registrar `Reutilización real` (No · Parcial · Sí), `% reutilización real`,
`Reutilización demostrada`, `EIE creación reutilizable`, `EIE específico`,
`PF reutilizados`. No contabilizar dos veces activos ya existentes.

---

# 10. BENCHMARK EXTERNO

Calcular `Benchmark externo €/PF`, `Percentil`, `Referencia externa funcional`
(bandas ISBSG en el apéndice OPERATIVO). Es contraste; no es precio automático.

---

# 11. TRABEM €/PF REAL

Calcular `€/PF presupuestado` (Precio recomendado / PF previstos),
`€/PF aceptado` (Precio aceptado / PF previstos) y `€/PF real` (Precio real /
PF reales). Alimentan el histórico comercial del segmento.

---

# 12. PRODUCTIVIDAD

Con HH registradas y homogéneas: `PF / HH` y `EIE / HH`. Calcular `MC1 / PF` y
`EIE / PF`. Separar productividad funcional, compresión técnica y coste
unitario funcional.

---

# 13. DESVIACIONES

Comparar previsión vs realidad. Calcular `Desviación PF %`, `Desviación EIE %`,
`Desviación HH %`, `Desviación MC1 %`, `Desviación precio %`,
`Desviación margen %`, `Desviación reutilización %`. Fórmula:
`(Real − Previsto) / Previsto × 100`. No calcular si el denominador no es
válido.

---

# 14. ACCURACY DE PRESUPUESTACIÓN

Registrar `Accuracy PF`, `Accuracy EIE`, `Accuracy MC1`, `Accuracy precio`,
`Accuracy margen`. Puede usarse `Accuracy = 100 − abs(desviación %)` con suelo
0. El objetivo no es precisión falsa, sino medir si `/presupuestar` mejora con
el histórico.

---

# 15. CAUSAS DE DESVIACIÓN

Clasificar `Causa desviación principal`: Cambio de alcance cliente · Requisitos
ambiguos · Reutilización sobreestimada · Reutilización infraestimada ·
Complejidad técnica no prevista · Integración externa · Correctivos ·
Infraestructura · Seguridad · Estimación PF incorrecta · Estimación EIE
incorrecta · Productividad superior a prevista · Productividad inferior a
prevista · Otro. Registrar explicación.

---

# 16. VALUE CASE REAL

Con evidencia posterior: `Value Case observado`; comparar con
`Value Case previsto`; registrar `Desviación Value Case`. No inventar
resultados económicos no observados.

---

# 17. MARGEN REAL

Calcular cuando proceda: `Margen real = Precio real − MC1 real` y
`Margen real %`. Comparar con margen esperado. Separar siempre MC1 de MC2.

---

# 18. APRENDIZAJE DEL MODELO

Cada cierre alimenta: TRABEM €/PF por segmento; PF/HH; EIE/HH; MC1/PF; EIE/PF;
margen; accuracy presupuestaria; duración real; reutilización; defectos; Value
Case observado. No modificar manualmente históricos para que el modelo parezca
más preciso.

---

# 19. SEGMENTACIÓN

Registrar siempre `Segmento cliente`: Clínica pequeña · Clínica / policlínica ·
Hospital · Grupo hospitalario · Otro. Permite calcular después P25/P50/P65/P75
€/PF por segmento.

---

# 20. CAMPOS DE NOTION PARA `/valorar`

Añadir o utilizar (agrupados):

**Relación con presupuesto:** Presupuesto relacionado · Precio recomendado
previsto · Precio aceptado · Forma de cobro · Segmento cliente · Facturación
anual cliente.

**Scope real:** Scope real · Boundary real · Cambio de alcance · Tipo trabajo
real.

**PF reales:** EI reales · EO reales · EQ reales · ILF reales · EIF reales · PF
reales · PF nuevos · PF modificados · PF eliminados · PF reutilizados ·
Confianza PF real.

**EIE real:** EIE real/materializado · EIE/PF · Factor K real.

**Producción:** HH reales · Base horas · PF/HH · EIE/HH.

**MC1 real:** Coste humano real · Coste IA real · Otros MC1 reales · MC1 real ·
MC1/PF.

**Reutilización:** Reutilización real · % reutilización real · Reutilización
demostrada · EIE creación reutilizable · EIE específico.

**Benchmark:** Benchmark externo €/PF · Percentil benchmark · Referencia
externa funcional.

**Comercial real:** Precio real · €/PF presupuestado · €/PF aceptado · €/PF
real · Margen real € · Margen real %.

**Value Case:** Value Case previsto · Value Case observado · Desviación Value
Case.

**Desviaciones:** Desviación PF % · Desviación EIE % · Desviación HH % ·
Desviación MC1 % · Desviación precio % · Desviación margen % · Desviación
reutilización %.

**Accuracy:** Accuracy PF · Accuracy EIE · Accuracy MC1 · Accuracy precio ·
Accuracy margen · Accuracy global presupuesto.

**Diagnóstico:** Causa desviación principal · Explicación desviación ·
Aprendizaje modelo · Confianza valoración final.

---

# 21. ACCURACY GLOBAL

No construir una fórmula sofisticada al principio. Mientras se acumula muestra,
calcular una media prudente de Accuracy PF, Accuracy MC1, Accuracy precio y
Accuracy margen. Registrar `Accuracy global presupuesto`. Después se podrán
ponderar variables según evidencia.

---

# 22. SALIDA OBLIGATORIA

**Proyecto:**
**Presupuesto baseline:**
**PF previstos / reales:**
**EIE previsto / real:**
**HH previstas / reales:**
**MC1 previsto / real:**
**Precio previsto / real:**
**Margen previsto / real:**
**Reutilización prevista / real:**
**Principales desviaciones:**
**Accuracy:**
**Causa:**
**Aprendizaje para `/presupuestar`:**
**Confianza:**

---

# 23. REGLA DE GOBIERNO

Si la valoración real muestra una desviación grande, no modificar
retrospectivamente `/presupuestar`. Registrar el error. El valor del sistema
está en acumular «qué creíamos que ocurriría» frente a «qué ocurrió
realmente».

---

# 24. RELACIÓN ENTRE LAS TRES SKILLS

- `/presupuestar`: predice qué construiremos, qué tamaño tendrá y qué debemos
  cobrar.
- `/imputar`: registra el trabajo, coste y productividad durante la ejecución.
- `/valorar`: mide qué construimos realmente y calibra el modelo.

---

# 25. OBJETIVO ORGANIZATIVO

La finalidad es que, con suficiente histórico, una persona pueda introducir
requisitos y obtener una valoración consistente sin depender del criterio
personal del CEO. Las valoraciones rutinarias con alta confianza, comparables
suficientes, margen correcto, Value Case coherente, capacidad de absorción
válida y desviación histórica controlada deben poder aprobarse sin intervención
extraordinaria. El CEO interviene fundamentalmente en excepciones.

---

# 26. PRINCIPIO FINAL

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

**Benchmark ISBSG (P65 provisional, €/PF por banda):** <30 y 30–100 PF → 925 ·
100–300 → 775 · 300–1.000 → 590 · 1.000–3.000 → 475. `Referencia externa
funcional = PF × €/PF de la banda`. No es tarifa; es contraste. PDR externo
(peer group .NET UE): P25 6,3 · P50 7,9 · P75 11,2 h/PF, para comprobar orden
de magnitud del esfuerzo convencional.

**Dónde se registra (dos capas):**

1. **PF reales y análisis IFPUG → Registro EIE**, en la ficha del módulo:
   campos `PF total`, `PF nuevos`, `PF reutilizados`, `€/PF (P65)`, `Referencia
   funcional (€)`, `EIE/PF`, `Confianza PF`, y el bloque auditable `##
   Valoración /valorar (IFPUG)` con la tabla de funciones.

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
valoración ni el baseline del presupuesto (§2, §23): cada revisión se añade con
su fecha.
