# trabem-skills

Skills compartidas de Claude Code para el equipo TRABEM · Silvermind.
**Fuente única de la verdad**: la doctrina de imputación vive aquí, no en copias locales.

## Qué incluye

- **`/imputar`** — registra y actualiza en Notion la valoración EIE del trabajo
  AI-native del proyecto actual (EIE, productividad AI-native, MC1), en la base
  «📊 Registro EIE · Ingeniería AI-native TRABEM».

## Instalación (una vez por máquina)

Dentro de Claude Code:

```
/plugin marketplace add https://github.com/juanceldran/trabem-skills
/plugin install trabem@trabem-skills
```

Requisitos:
- Acceso de lectura a este repositorio con tu sesión de git/GitHub (es privado).
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
