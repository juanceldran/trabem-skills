# trabem-skills

Skills compartidas de Claude Code para el equipo TRABEM · Silvermind.
**Fuente única de la verdad**: la doctrina de imputación vive aquí, no en copias locales.

## Qué incluye

- **`/imputar`** — registra y actualiza en Notion la valoración EIE del trabajo
  AI-native del proyecto actual (EIE, productividad AI-native, valor técnico
  interno 70/30, MC1), en la base «📊 Registro EIE · Ingeniería AI-native TRABEM».
- **`/valorar`** — cierre ex post: PF válidos (IFPUG + puerta de calidad),
  referencia de construcción PF TRABEM, benchmark externo ISBSG, contraste con el
  presupuesto y aprendizaje del €/PF TRABEM.
- **`/presupuestar`** — estimación ex ante del **setup**: alcance, PF previstos,
  EIE/MC1 internos, referencia de construcción PF TRABEM, benchmark y forma de
  cobro. Baseline inmutable.

## Doctrina (vigente 2026-08-30)

- **PF = unidad funcional y comercial.** `Referencia construcción = PF válidos × PF_TRABEM_EUR`.
- **HH / EIE (70/30) = instrumentos internos** de productividad y calibración, **no** precio a cliente.
- **ISBSG = benchmark externo** (contraste), nunca tarifa TRABEM.
- Se valora el **setup / construcción** (PF). 
- Las constantes (90 €/PF, 70/30, bandas ISBSG, incentivo) viven **solo** en
  [`trabem/constants/`](trabem/constants/) — fuente única, versionada. Tests:
  `cd trabem && node --test`.

## Instalación (una vez por máquina)

Dentro de Claude Code:

```
/plugin marketplace add https://github.com/juanceldran/trabem-skills
/plugin install trabem@trabem-skills
```

Requisitos:
- El repositorio es público: no hace falta autenticación para añadir el marketplace.
- El conector MCP de Notion activo en Claude Code (la skill escribe en Notion).

Si tenías una copia personal antigua en `~/.claude/skills/imputar/`, bórrala para
no tener el comando duplicado:

```
rm -rf ~/.claude/skills/imputar
```

## Actualizaciones

Cuando la skill cambie, se hace push aquí. Para recibirla:

```
/plugin marketplace update trabem-skills
```

## Añadir skills nuevas

Crear `trabem/skills/<nombre>/SKILL.md` (con frontmatter `name`, `description`),
subir la versión en `trabem/.claude-plugin/plugin.json` y hacer push.

## Atajo para el equipo (bootstrap)

Para no tener que nombrar el repo ni Notion cada vez, añade esta línea a tu
`~/.claude/CLAUDE.md`:

> **Skills TRABEM:** para instalar o actualizar skills del equipo (p. ej. `/imputar`),
> la fuente es el plugin `trabem@trabem-skills` del repo
> https://github.com/juanceldran/trabem-skills.
> Instalar: `claude plugin marketplace add https://github.com/juanceldran/trabem-skills`
> + `claude plugin install trabem@trabem-skills -y`.
> Actualizar: `claude plugin marketplace update trabem-skills`.
> Procedimiento completo en Notion «Skills compartidas de Claude Code · instalación y versiones».

Con eso basta con pedirle a Claude Code *«instala /imputar»* o *«actualiza las skills
de TRABEM»* — sin URLs ni pasos que recordar.
