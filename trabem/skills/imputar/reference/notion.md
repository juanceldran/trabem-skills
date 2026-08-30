# `/imputar` · Campos en Notion y plantilla de ficha

Material de consulta. **Cargar solo al crear una ficha nueva** o cuando haga
falta un campo que no se reconoce. Para actualizar una ficha existente, la
propia ficha ya muestra sus propiedades: no hace falta este fichero ni volcar
el esquema de la base.

Base: `📊 Registro EIE · Ingeniería AI-native TRABEM`
https://app.notion.com/p/700528d4041b40fa84a6877f32da635c

Antes de escribir una ficha nueva: inspecciona el esquema actual de la base
**una vez**; si tienes permisos, añade los campos que falten (no elimines
campos existentes).

---

## Propiedades

**Identificación:** `Módulo` (title), `Proyecto` (text), `Responsable` (text),
`Repositorio` (url), `Tipo proyecto` (select Propio/Cliente), `Resumen` (text).

**Origen y clasificación:**
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
`EIE pendiente`, `Factor K`.

**Valoración interna 70/30** (instrumentación, **no** precio a cliente; lo escribe
`/imputar`): `Valor técnico interno 70/30 (€)`, `€/PF observado interno` (cuando
haya PF). Tarifas en `constants/trabem.constants.json`.

**Comercial / funcional** (lo decide `/valorar`, no `/imputar`): `PF válidos`,
`Referencia construcción PF TRABEM (€)` (= PF válidos × PF_TRABEM_EUR),
`Benchmark externo ISBSG (€)` (contraste), `Precio final cliente (€)`.

**Histórico (legacy — no reescribir):** `Referencia técnica (€)`,
`Precio a cliente (por capas) (€)` — campos antiguos conservados para leer fichas
previas; los registros nuevos usan los campos de arriba.

**Productividad:** `EIE AI-acelerado`, `EIE humano-dominante`,
`AI-native rate %`, `Humano-dominante %`.

**Horas:** `Coste hora humano` (euro), `Horas humanas Claude`,
`Horas humanas fuera`, `Horas humanas totales`, `Base horas`
(select Registradas/Estimadas).

**MC1:** `Coste humano MC1`, `Coste IA`, `Otros MC1`, `MC1 total` (euro).

**Ratio:** `Ratio compresión`.

**Reutilización:** `Reutilizable` (checkbox, heredado), `Reutilización`
(select No/Parcial/Sí), `Reutilización demostrada` (checkbox),
`% reutilizable estimado`, `EIE creación reutilizable`,
`EIE trabajo específico`, `EIE evitado por reutilización`.

**Estado / confianza / fecha:** `Estado` (select En desarrollo / Cierre
provisional / Pendiente producción / En producción / Cerrado),
`Confianza` (select Baja/Media/Alta), `Confianza MC1` (select Baja/Media/Alta),
`Fecha valoración` (date).

---

## Plantilla del cuerpo de la ficha

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

En cada `/imputar` se añade una fila nueva a la bitácora; no se tocan las
filas anteriores.
