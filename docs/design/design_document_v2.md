# Design Document v2 — BLACK: Brass Rebellion
# Arquitectura modular, interfaces de módulos, contratos de datos

## Estructura de carpetas del repositorio

```
black-brass-rebellion/
├── src/
│   ├── engine/
│   │   ├── GameLoop.js
│   │   ├── InputManager.js
│   │   ├── StateMachine.js
│   │   └── Renderer.js
│   ├── entities/
│   │   ├── Player.js
│   │   ├── Invader.js
│   │   ├── Bullet.js
│   │   ├── Shield.js
│   │   └── UFO.js
│   ├── systems/
│   │   ├── CollisionSystem.js
│   │   ├── ScoreSystem.js
│   │   ├── LevelSystem.js
│   │   └── SpawnSystem.js
│   ├── ui/
│   │   ├── HUD.js
│   │   ├── StartScreen.js
│   │   ├── GameOverScreen.js
│   │   ├── LevelScreen.js
│   │   └── WinScreen.js
│   ├── utils/
│   │   ├── aabb.js
│   │   ├── math.js
│   │   ├── constants.js
│   │   └── spriteRenderer.js
│   └── main.js
├── tests/
│   ├── unit/
│   │   ├── engine/
│   │   │   ├── GameLoop.test.js
│   │   │   ├── InputManager.test.js
│   │   │   └── StateMachine.test.js
│   │   ├── entities/
│   │   │   ├── Player.test.js
│   │   │   ├── Invader.test.js
│   │   │   ├── Bullet.test.js
│   │   │   └── Shield.test.js
│   │   ├── systems/
│   │   │   ├── CollisionSystem.test.js
│   │   │   ├── ScoreSystem.test.js
│   │   │   └── LevelSystem.test.js
│   │   └── utils/
│   │       ├── aabb.test.js
│   │       └── math.test.js
│   ├── e2e/
│   │   ├── screens.spec.js
│   │   ├── controls.spec.js
│   │   └── gameplay.spec.js
│   └── fixtures/
│       └── gameState.js
├── .github/
│   ├── workflows/
│   │   ├── ci.yml
│   │   ├── deploy.yml
│   │   └── release.yml
│   ├── ISSUE_TEMPLATE/
│   │   ├── user_story.md
│   │   └── bug_report.md
│   └── pull_request_template.md
├── docs/
│   └── design/
│       ├── concepto.md
│       ├── historia.md
│       ├── elementos.md
│       ├── jugabilidad.md
│       ├── Plan_v2.md
│       └── design_document_v2.md
├── public/
│   └── favicon.ico
├── index.html
├── vite.config.js
├── vitest.config.js
├── playwright.config.js
├── .eslintrc.js
├── .prettierrc
├── .gitignore
├── package.json
├── README.md
└── CHANGELOG.md
```

## Contratos de módulos (interfaces)

### engine/GameLoop.js
```javascript
export class GameLoop {
  constructor(updateFn, renderFn)
  // updateFn(dt: number): void  — dt en segundos, máx 0.05
  // renderFn(): void

  start(): void    // inicia el loop con requestAnimationFrame
  stop(): void     // cancela el frame pendiente
  pause(): void    // congela dt sin cancelar el loop
  resume(): void   // reanuda desde donde se pausó

  get fps(): number        // FPS actuales (rolling average 60 frames)
  get isRunning(): boolean
}
```

### engine/InputManager.js
```javascript
export class InputManager {
  constructor()
  // Escucha keydown/keyup y touch en el documento

  update(): void   // llamar al inicio de cada frame

  get left(): boolean    // ArrowLeft o botón táctil izquierdo
  get right(): boolean   // ArrowRight o botón táctil derecho
  get fire(): boolean    // Space o botón FIRE
  get pause(): boolean   // KeyP — solo true en el frame que se presiona
  get start(): boolean   // Space o Enter — solo true en el frame que se presiona

  destroy(): void  // remueve los event listeners
}
```

### engine/StateMachine.js
```javascript
export const STATES = {
  START: 'start',
  PLAYING: 'playing',
  PAUSED: 'paused',
  LEVEL_COMPLETE: 'levelComplete',
  GAME_OVER: 'gameOver',
  WIN: 'win'
}

export class StateMachine {
  constructor(initialState: string)

  get current(): string
  transition(newState: string): void
  // Lanza Error si la transición no está en la tabla de transiciones válidas

  // Transiciones válidas:
  // START → PLAYING
  // PLAYING → PAUSED, GAME_OVER, LEVEL_COMPLETE, WIN
  // PAUSED → PLAYING
  // LEVEL_COMPLETE → PLAYING
  // GAME_OVER → START
  // WIN → START
}
```

### entities/Player.js
```javascript
export class Player {
  constructor(x: number, y: number)

  // Propiedades públicas de solo lectura
  get x(): number
  get y(): number
  get width(): number   // 32
  get height(): number  // 18
  get lives(): number
  get isInvincible(): boolean
  get isDead(): boolean // lives === 0

  update(dt: number, input: InputManager, bullets: Bullet[]): void
  // — Mueve el player según input dentro de [0, CANVAS_W - width]
  // — Si fire y cooldown === 0: push a bullets, resetea cooldown
  // — Reduce cooldown y invincibilityTimer

  takeDamage(): void
  // — Resta 1 vida, activa invincibilidad 2s
  // — Si lives llega a 0: emite nada (el caller detecta isDead)

  reset(): void
  // — Vuelve a posición inicial, cooldown 0, invincibilidad 0
  // — NO resetea vidas

  draw(ctx: CanvasRenderingContext2D): void
  // — Usa spriteRenderer.drawPlayer()
  // — Si isInvincible: parpadea cada 100ms (Math.floor(timer/100) % 2)
}
```

### entities/Invader.js
```javascript
export const INVADER_TYPES = { TOP: 0, MID: 1, BOT: 2 }
// TOP = Exploradores del Éter (30 pts)
// MID = Soldados de Bronce (20 pts)
// BOT = Autómatas de Carbón (10 pts)

export class Invader {
  constructor(col: number, row: number, type: number, x: number, y: number)

  get x(): number
  get y(): number
  get width(): number   // 24 (hitbox, menor que celda)
  get height(): number  // 16
  get type(): number
  get alive(): boolean
  get frame(): number   // 0 o 1

  updatePosition(dx: number, dy: number): void
  // Mueve el invader según el desplazamiento de la formación

  updateAnimation(animFrame: number): void
  // Sincroniza el frame de animación con el global

  kill(): void
  // Marca alive = false

  get points(): number
  // TOP → 30, MID → 20, BOT → 10

  draw(ctx: CanvasRenderingContext2D): void
}
```

### entities/Bullet.js
```javascript
export const BULLET_OWNER = { PLAYER: 'player', ENEMY: 'enemy' }

export class Bullet {
  constructor(x: number, y: number, vy: number, owner: string)
  // vy negativo = sube (player), vy positivo = baja (enemy)

  get x(): number
  get y(): number
  get width(): number  // 3
  get height(): number // 10
  get owner(): string
  get active(): boolean

  update(dt: number): void
  // Mueve según vy*dt. Si sale del canvas (y<0 o y>H): active = false

  deactivate(): void

  draw(ctx: CanvasRenderingContext2D): void
  // Verde si player, rojo/ámbar si enemy (según paleta de elementos.md)
}
```

### entities/Shield.js
```javascript
export class Shield {
  constructor(x: number, y: number)
  // x, y = esquina superior izquierda
  // Crea grid de bloques según la forma definida en elementos.md

  get x(): number
  get y(): number
  get bounds(): {x, y, width, height}  // bounding box del shield entero

  checkBulletCollision(bullet: Bullet): boolean
  // Recorre el grid, detecta colisión AABB bullet vs bloque 4x4
  // Si hay hit: destruye el bloque y los adyacentes (erosión)
  // Retorna true si hubo colisión

  erodeFromBottom(invaderY: number): void
  // Destruye todos los bloques cuya Y >= invaderY
  // Llamar cuando un invader baja a la altura del shield

  get isEmpty(): boolean
  // true si todos los bloques están destruidos

  reset(percentage: number): void
  // Regenera percentage% de los bloques (para nuevos niveles)
  // percentage 1.0 = 100%, 0.6 = 60%, 0.0 = sin regeneración

  draw(ctx: CanvasRenderingContext2D): void
}
```

### entities/UFO.js
```javascript
export class UFO {
  constructor()

  get active(): boolean
  get x(): number
  get y(): number   // fija: 50px desde arriba del canvas
  get width(): number  // 48
  get height(): number // 20
  get scoreValue(): number  // asignado al spawn

  spawn(): void
  // Activa el UFO, lo pone en x = -60, asigna scoreValue aleatorio
  // según tabla de probabilidades de jugabilidad.md

  update(dt: number): void
  // Si active: mueve x += SPEED * dt
  // Si x > CANVAS_W + 60: deactivate()

  hit(): PowerUp | null
  // Desactiva el UFO, retorna un PowerUp o null según probabilidad

  deactivate(): void

  draw(ctx: CanvasRenderingContext2D): void
}
```

### systems/CollisionSystem.js
```javascript
import { aabb } from '../utils/aabb.js'

export class CollisionSystem {
  // Todas las funciones retornan un array de eventos de colisión
  // para que el caller (main.js) pueda reaccionar apropiadamente

  static checkPlayerBulletsVsInvaders(bullets, invaders)
  // → [{ bullet, invader }] para cada hit

  static checkPlayerBulletsVsUFO(bullets, ufo)
  // → { bullet, ufo } | null

  static checkPlayerBulletsVsShields(bullets, shields)
  // → [{ bullet, shield }]

  static checkEnemyBulletsVsPlayer(bullets, player)
  // → [{ bullet }] — el player siempre es uno solo

  static checkEnemyBulletsVsShields(bullets, shields)
  // → [{ bullet, shield }]

  static checkInvadersVsShields(invaders, shields)
  // Verifica si algún invader está a la misma Y que un shield
  // → [{ invader, shield }]

  static checkInvadersVsPlayerLine(invaders, playerY)
  // → true si algún invader llega a playerY (game over inmediato)
}
```

### systems/ScoreSystem.js
```javascript
export class ScoreSystem {
  constructor()

  get score(): number
  get hiScore(): number  // persistido en localStorage

  addPoints(points: number): void
  addInvaderKill(type: number, streakMultiplier?: number): void
  // Suma puntos según tipo de invader y multiplicador de racha

  addUFOKill(scoreValue: number): void

  saveHiScore(): void   // persiste en localStorage si score > hiScore
  loadHiScore(): void   // carga de localStorage al iniciar

  reset(): void         // score = 0, hiScore se mantiene
}
```

### systems/LevelSystem.js
```javascript
export class LevelSystem {
  constructor()

  get level(): number

  getConfig(level: number): LevelConfig
  // Retorna objeto con:
  // { invaderBaseSpeed, invaderSpeedPerKill, enemyFireInterval,
  //   shieldRegenPercent, ufoScoreTable, maxEnemyBullets }

  nextLevel(): void
  // Incrementa level, retorna nueva config

  reset(): void
}
```

### utils/aabb.js
```javascript
export function aabb(a, b) {
  // a y b deben tener: { x, y, width, height }
  return (
    a.x < b.x + b.width  &&
    a.x + a.width > b.x  &&
    a.y < b.y + b.height &&
    a.y + a.height > b.y
  )
}
```

### utils/constants.js
```javascript
// Canvas
export const CANVAS_W = 560
export const CANVAS_H = 460

// Player
export const PLAYER_SPEED = 280        // px/s — de jugabilidad.md
export const PLAYER_BULLET_SPEED = 500 // px/s
export const BULLET_COOLDOWN = 0.4     // segundos
export const PLAYER_Y = 400            // posición Y fija

// Invaders
export const INVADER_COLS = 5
export const INVADER_ROWS = 4
export const INVADER_CELL_W = 48       // ancho de celda en grid
export const INVADER_CELL_H = 36       // alto de celda en grid
export const INVADER_HITBOX_W = 24
export const INVADER_HITBOX_H = 16
export const INVADER_STEP_DOWN = 20    // px al tocar el borde
export const INVADER_GRID_OFFSET_X = 80  // margen izquierdo del grid
export const INVADER_GRID_OFFSET_Y = 80  // margen superior del grid

// Bullets
export const MAX_ENEMY_BULLETS = 3
export const ENEMY_BULLET_SPEED = 200  // px/s

// UFO
export const UFO_Y = 50
export const UFO_SPEED = 120           // px/s
export const UFO_MIN_INTERVAL = 25    // segundos
export const UFO_MAX_INTERVAL = 35    // segundos

// Shields
export const SHIELD_BLOCK_SIZE = 4    // px
export const SHIELD_Y = 330           // Y de los shields
export const SHIELD_COUNT = 4

// Timing
export const ANIM_INTERVAL = 0.5      // segundos entre frames de animación
export const DT_CAP = 0.05            // segundos máximo de delta time

// Colores — de elementos.md (sustituir con los valores reales)
export const COLOR_PLAYER    = '#[del elementos.md]'
export const COLOR_ALIEN_TOP = '#[del elementos.md]'
export const COLOR_ALIEN_MID = '#[del elementos.md]'
export const COLOR_ALIEN_BOT = '#[del elementos.md]'
export const COLOR_UFO       = '#[del elementos.md]'
export const COLOR_SHIELD    = '#[del elementos.md]'
export const COLOR_BULLET_P  = '#[del elementos.md]'
export const COLOR_BULLET_E  = '#[del elementos.md]'
export const COLOR_HUD       = '#[del elementos.md]'
export const COLOR_BG        = '#000000'
```

## Convenciones de código

- Módulos: ES modules con import/export explícito
- Clases: PascalCase — Player, Invader, GameLoop
- Funciones y variables: camelCase — updatePosition, deltaTime
- Constantes: UPPER_SNAKE_CASE en constants.js
- Archivos: camelCase — gameLoop.js, spriteRenderer.js
- Tests: mismo nombre que el módulo + .test.js o .spec.js
- Sin `var` — solo `const` y `let`
- Sin efectos secundarios en imports
- Cada módulo exporta solo lo que otros módulos necesitan
- Comentarios JSDoc en métodos públicos

## Configuración de herramientas

### vite.config.js
```javascript
import { defineConfig } from 'vite'
export default defineConfig({
  root: '.',
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    sourcemap: true
  },
  server: { port: 3000 }
})
```

### vitest.config.js
```javascript
import { defineConfig } from 'vitest/config'
export default defineConfig({
  test: {
    environment: 'jsdom',
    coverage: {
      provider: 'v8',
      reporter: ['text', 'lcov'],
      thresholds: { lines: 80, functions: 80, branches: 70 }
    },
    include: ['tests/unit/**/*.test.js']
  }
})
```

### playwright.config.js
```javascript
import { defineConfig } from '@playwright/test'
export default defineConfig({
  testDir: './tests/e2e',
  use: {
    baseURL: 'http://localhost:3000',
    headless: true
  },
  webServer: {
    command: 'npx vite --port 3000',
    port: 3000,
    reuseExistingServer: true
  }
})
```

### .eslintrc.js
```javascript
module.exports = {
  env: { browser: true, es2022: true },
  extends: ['eslint:recommended'],
  parserOptions: { ecmaVersion: 2022, sourceType: 'module' },
  rules: {
    'no-unused-vars': 'error',
    'no-console': 'warn',
    'prefer-const': 'error',
    'no-var': 'error'
  }
}
```

### .prettierrc
```json
{
  "semi": false,
  "singleQuote": true,
  "tabWidth": 2,
  "trailingComma": "es5",
  "printWidth": 100
}
```

## GitHub Actions Workflows

### .github/workflows/ci.yml
Trigger: push y PR a develop y main
Jobs:
1. lint — npx eslint src/
2. format-check — npx prettier --check src/
3. unit-tests — npx vitest run --coverage
4. e2e-tests — npx playwright test
5. coverage-report — sube el reporte a GitHub Actions artifacts
Falla si coverage < 80% en unit tests

### .github/workflows/deploy.yml
Trigger: push a main (merge de PR de release)
Jobs:
1. build — npm run build
2. deploy — sube dist/ a GitHub Pages con actions/deploy-pages@v4

### .github/workflows/release.yml
Trigger: push de tag v*.*.* (ej: v1.0.0)
Jobs:
1. generate-changelog — lee CHANGELOG.md, extrae la sección del tag
2. create-release — crea GitHub Release con el changelog como body
3. attach-dist — adjunta el dist/ como zip al release

## Pull Request Template (.github/pull_request_template.md)
```markdown
## User Story relacionada
Closes #[número de issue]

## Cambios realizados
- [ ] Describe brevemente qué se implementó

## Tests
- [ ] Unit tests pasan (vitest run)
- [ ] Cobertura >= 80% en el módulo
- [ ] E2E tests pasan si aplica

## Checklist DoD
- [ ] ESLint sin errores
- [ ] Prettier aplicado
- [ ] CI en verde
- [ ] Descripción del PR clara
```
