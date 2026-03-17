# Plan del Proyecto — BLACK: Brass Rebellion
# Juego de arcade browser, arquitectura modular, prácticas profesionales

## Metadata del proyecto
- Nombre: BLACK: Brass Rebellion
- Tipo: Browser game (arcade shoot 'em up)
- Metodología: Scrum (sprints de 1 semana simulada)
- Repositorio: github.com/[usuario]/black-brass-rebellion
- Rama principal: main (producción) / develop (integración)

## Stack tecnológico

### Runtime
- JavaScript ES2022 (módulos nativos)
- HTML5 Canvas API (2D context)
- Sin frameworks de UI

### Build & Dev
- Vite 5.x — bundler y dev server
- ESLint 8.x — linting con config "eslint:recommended"
- Prettier 3.x — formato de código

### Testing
- Vitest 1.x — unit tests (lógica de juego)
- Playwright 1.x — E2E tests (flujo de pantallas, controles)
- @vitest/coverage-v8 — cobertura de código (target: 80%)

### CI/CD
- GitHub Actions — pipeline automático en cada PR y push a main
- GitHub Pages — deploy automático desde rama main/dist/
- GitHub Releases — tags semánticos con CHANGELOG auto-generado

## Estructura de módulos (src/)

### engine/ — núcleo del motor
- GameLoop.js       — requestAnimationFrame, delta time, pause/resume
- InputManager.js   — teclado + touch, estado de teclas en cada frame
- StateMachine.js   — estados: start|playing|paused|gameover|levelcomplete|win
- Renderer.js       — referencia al canvas, clearRect, capas de dibujo

### entities/ — objetos del juego
- Player.js         — nave Black, movimiento, disparo, vidas, invincibilidad
- Invader.js        — los 3 tipos de enemigos, animación 2 frames, disparo
- Bullet.js         — proyectil (player o enemy), dirección, velocidad
- Shield.js         — bunker con grid de bloques destructibles
- UFO.js            — nave especial, aparición aleatoria, power-up al morir

### systems/ — lógica de dominio
- CollisionSystem.js — AABB entre todas las entidades
- ScoreSystem.js     — puntaje, multiplicadores, localStorage para hi-score
- LevelSystem.js     — configuración por nivel, dificultad, transición
- SpawnSystem.js     — formación de invaders, timers de UFO, regeneración

### ui/ — pantallas e interfaz
- HUD.js            — score, nivel, vidas (íconos de nave), hi-score
- StartScreen.js    — pantalla de inicio con lore de BLACK
- GameOverScreen.js — game over con score final y opción de reiniciar
- LevelScreen.js    — texto entre niveles con avance narrativo
- WinScreen.js      — victoria final

### utils/ — helpers reutilizables
- aabb.js           — función de colisión rect vs rect
- math.js           — clamp, lerp, random en rango
- constants.js      — TODAS las constantes del juego en un solo lugar
- spriteRenderer.js — funciones de dibujo de sprites (player, aliens, UFO)

## Sprints

### Sprint 0 — Setup (infraestructura)
- Crear repo con estructura de carpetas
- Configurar Vite, ESLint, Prettier, Vitest, Playwright
- GitHub Actions: CI pipeline
- GitHub Actions: deploy a Pages
- GitHub Projects: tablero Scrum con columnas
- Crear todos los GitHub Issues (User Stories del backlog)
- Crear templates: issue, PR, bug report
- Archivos base: package.json, index.html, README.md, CHANGELOG.md

### Sprint 1 — Motor del juego
- US-01: GameLoop con requestAnimationFrame y delta time
- US-02: InputManager con teclado y touch
- US-03: StateMachine con transiciones
- US-04: Renderer con canvas y clearRect
- Tests unitarios para cada módulo de engine/

### Sprint 2 — Entidades
- US-05: Player (movimiento, disparo, vidas, colisión)
- US-06: Invader (3 tipos, animación, disparo aleatorio)
- US-07: Bullet (player y enemy, velocidad, límites)
- US-08: CollisionSystem AABB completo
- Tests unitarios para entities/ y CollisionSystem

### Sprint 3 — Sistemas de juego
- US-09: Shield con bloques destructibles
- US-10: UFO con timer, power-up y score flotante
- US-11: ScoreSystem con multiplicadores y localStorage
- US-12: LevelSystem con dificultad progresiva
- US-13: SpawnSystem — formación, timers, regeneración
- Tests unitarios para systems/

### Sprint 4 — UI y experiencia
- US-14: HUD completo (score, nivel, vidas como íconos)
- US-15: StartScreen con lore de BLACK
- US-16: GameOver, LevelComplete y Win screens
- US-17: Controles táctiles (botones móvil)
- US-18: spriteRenderer con todos los sprites del universo
- Tests E2E con Playwright: flujo completo de pantallas

### Sprint 5 — QA, integración y release
- US-19: Integración completa (index.html + main.js conecta todo)
- US-20: Performance audit (60fps en hardware moderado)
- US-21: Compatibilidad Chrome, Firefox, Safari
- US-22: CHANGELOG.md completo
- US-23: README.md con instrucciones, capturas y créditos
- US-24: Tag v1.0.0, GitHub Release, deploy a Pages
- Tests E2E de gameplay completo

## Criterios de Definition of Done (DoD)
Para que una User Story se considere Done:
1. El código está en una feature branch (feature/US-XX-nombre)
2. Los tests unitarios pasan (vitest run)
3. La cobertura del módulo es >= 80%
4. ESLint no reporta errores
5. Prettier no reporta cambios pendientes
6. El CI de GitHub Actions pasa en verde
7. Se abrió un PR contra develop con descripción
8. El PR tiene al menos 1 review (Codex CLI con /review)
9. Se mergeó a develop y se cerró el issue correspondiente

## Definición de Ready (para entrar a un sprint)
- La User Story tiene criterios de aceptación escritos
- No tiene dependencias bloqueantes sin resolver
- Está estimada (talla S/M/L/XL)
- El diseño técnico está claro en design_document_v2.md
