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

**Hay que hacerlo en cada máquina.** El plugin no vive en la cuenta de Claude,
vive en la instalación local: que un cambio esté en `main` no lo empuja a nadie.
Compartir cuenta no actualiza a los demás.

### Comprobar que ha entrado

1. **Versión** — la instalada debe coincidir con la de
   [`trabem/.claude-plugin/plugin.json`](trabem/.claude-plugin/plugin.json) en `main`.
2. **Comportamiento** — es la prueba que de verdad zanja el asunto: lanza
   `/imputar`. Desde la 3.7.0 **tiene que preguntarte quién imputa** antes de
   escribir nada. Si no lo pregunta, sigues en una versión anterior.

### Si la versión no sube por mucho que actualices

Casi siempre es una copia personal antigua que tapa al plugin:

```
rm -rf ~/.claude/skills/imputar
```

Con esa carpeta presente el comando local gana y el plugin no llega a usarse:
puedes actualizar el marketplace indefinidamente sin ver ningún cambio.

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
