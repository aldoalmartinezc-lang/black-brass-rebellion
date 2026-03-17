#!/bin/bash
# GitHub Setup Script para BLACK: Brass Rebellion
# Ejecuta este script en tu máquina local: bash setup-github.sh

set -e

echo "======================================"
echo "Creando labels en GitHub..."
echo "======================================"

# Labels por sprint
gh label create "user-story" --color "0075ca" --description "Historia de usuario" || true
gh label create "sprint-1" --color "d73a4a" --description "Sprint 1 - Engine" || true
gh label create "sprint-2" --color "e99695" --description "Sprint 2 - Entities" || true
gh label create "sprint-3" --color "7057ff" --description "Sprint 3 - Systems" || true
gh label create "sprint-4" --color "008672" --description "Sprint 4 - UI" || true
gh label create "sprint-5" --color "0052cc" --description "Sprint 5 - QA" || true

# Labels por módulo
gh label create "engine" --color "f9d0c4" --description "Engine core" || true
gh label create "entity" --color "c5def5" --description "Game entities" || true
gh label create "system" --color "bfd4f2" --description "Game systems" || true
gh label create "ui" --color "d4c5f9" --description "User interface" || true
gh label create "qa" --color "b60205" --description "QA testing" || true

# Labels adicionales
gh label create "graphics" --color "cccccc" --description "Graphics rendering" || true
gh label create "physics" --color "aaaaaa" --description "Physics collision" || true
gh label create "gameplay" --color "ffffff" --description "Gameplay mechanics" || true
gh label create "mobile" --color "ffa500" --description "Mobile support" || true
gh label create "performance" --color "ffcc00" --description "Performance optimization" || true
gh label create "testing" --color "00ff00" --description "Testing automation" || true
gh label create "documentation" --color "0000ff" --description "Documentation" || true
gh label create "release" --color "ff00ff" --description "Release management" || true
gh label create "ci-cd" --color "ff6600" --description "CI/CD pipeline" || true
gh label create "integration" --color "00ffff" --description "Integration" || true
gh label create "core" --color "990000" --description "Core functionality" || true
gh label create "main" --color "009900" --description "Main entry point" || true
gh label create "input" --color "009999" --description "Input handling" || true
gh label create "controls" --color "999900" --description "Game controls" || true
gh label create "state-management" --color "990099" --description "State machine" || true
gh label create "rendering" --color "999999" --description "Rendering system" || true
gh label create "animation" --color "999999" --description "Animation system" || true
gh label create "enemies" --color "ff0000" --description "Enemy entities" || true
gh label create "player" --color "00ff00" --description "Player entity" || true
gh label create "bullets" --color "ffff00" --description "Bullet system" || true
gh label create "collision" --color "ff00ff" --description "Collision detection" || true
gh label create "shield" --color "00ffff" --description "Shield system" || true
gh label create "ufо" --color "ff6600" --description "UFO entity" || true
gh label create "scoring" --color "ffcc00" --description "Scoring system" || true
gh label create "persistence" --color "0099ff" --description "Data persistence" || true
gh label create "levels" --color "99ff00" --description "Level system" || true
gh label create "progression" --color "99ff99" --description "Game progression" || true
gh label create "spawning" --color "99ccff" --description "Spawn system" || true
gh label create "formation" --color "ccff99" --description "Enemy formation" || true
gh label create "hud" --color "ffcc99" --description "HUD elements" || true
gh label create "screens" --color "ff99cc" --description "Screen/scenes" || true
gh label create "narrative" --color "cc99ff" --description "Game narrative" || true
gh label create "sprites" --color "ffff99" --description "Sprite system" || true
gh label create "optimization" --color "ccccff" --description "Code optimization" || true
gh label create "compatibility" --color "ffcccc" --description "Cross-browser support" || true
gh label create "deployment" --color "ccffcc" --description "Deployment" || true

echo ""
echo "======================================"
echo "Creando 24 User Stories en GitHub..."
echo "======================================"

# US-01: GameLoop
gh issue create --title "US-01: GameLoop con requestAnimationFrame y delta time" \
  --body "Implementar el GameLoop que maneje la ejecución del juego con requestAnimationFrame y cálculo de delta time.

## Criterios de aceptación
- Crear clase GameLoop en src/engine/GameLoop.js
- Recibir updateFn y renderFn en constructor
- Implementar métodos: start(), stop(), pause(), resume()
- Delta time máximo capeado a 0.05 segundos
- Calcular FPS con rolling average de 60 frames
- Pasar tests unitarios con cobertura >= 80%
- ESLint y Prettier sin errores" \
  --label "user-story,sprint-1,engine,core,animation"

# US-02: InputManager
gh issue create --title "US-02: InputManager con teclado y touch" \
  --body "Implementar InputManager para manejar entrada de teclado y touch.

## Criterios de aceptación
- Crear clase InputManager en src/engine/InputManager.js
- Escuchar keydown/keyup y eventos touch
- Implementar getters: left, right, fire, pause, start
- Pause y start retornan true solo en el frame que se presionan
- Limpiar listeners en destroy()
- Tests unitarios para todas las entradas
- Compatibilidad con mouse/teclado y touch" \
  --label "user-story,sprint-1,engine,input,controls"

# US-03: StateMachine
gh issue create --title "US-03: StateMachine con transiciones de estados" \
  --body "Implementar máquina de estados para controlar los diferentes estados del juego.

## Criterios de aceptación
- Crear clase StateMachine en src/engine/StateMachine.js
- Estados: START, PLAYING, PAUSED, LEVEL_COMPLETE, GAME_OVER, WIN
- Implementar transiciones válidas según diseño
- Lanzar Error en transiciones inválidas
- Tests unitarios completos
- Cobertura >= 80%" \
  --label "user-story,sprint-1,engine,state-management"

# US-04: Renderer
gh issue create --title "US-04: Renderer con canvas 2D" \
  --body "Implementar Renderer para manejo del canvas HTML5.

## Criterios de aceptación
- Crear clase Renderer en src/engine/Renderer.js
- Obtener referencia al canvas y 2D context
- Implementar clearRect para limpiar el canvas
- Gestionar capas de dibujo
- Tests unitarios
- Validar dimensiones de canvas (560x460)" \
  --label "user-story,sprint-1,engine,rendering,graphics"

# US-05: Player
gh issue create --title "US-05: Player: movimiento, disparo y vidas" \
  --body "Implementar la nave del jugador (Black) con movimiento, disparo y sistema de vidas.

## Criterios de aceptación
- Crear clase Player en src/entities/Player.js
- Movimiento horizontal dentro de [0, CANVAS_W - width]
- Sistema de disparo con cooldown de 0.4s
- Sistema de vidas (3 iniciales)
- Invincibilidad temporal de 2s tras daño
- Parpadeo visual cuando invincible
- Tests unitarios y cobertura >= 80%
- draw() utiliza spriteRenderer.drawPlayer()" \
  --label "user-story,sprint-2,entity,player,gameplay"

# US-06: Invader
gh issue create --title "US-06: Invader: 3 tipos, animación y disparo" \
  --body "Implementar enemigos con 3 tipos distintos, animación y disparo aleatorio.

## Criterios de aceptación
- Crear clase Invader en src/entities/Invader.js
- Tipos: TOP (30pts), MID (20pts), BOT (10pts)
- Animación con 2 frames sincronizados
- Actualizar posición según movimiento de formación
- Sistema de puntos según tipo
- Tests unitarios
- Hitbox correcto: 24x16px" \
  --label "user-story,sprint-2,entity,enemies,animation"

# US-07: Bullet
gh issue create --title "US-07: Bullet: proyectiles de player y enemy" \
  --body "Implementar sistema de proyectiles para player y enemigos.

## Criterios de aceptación
- Crear clase Bullet en src/entities/Bullet.js
- Velocidad: 500 px/s (player), 200 px/s (enemy)
- Movimiento vertical según owner
- Deactivate cuando sale del canvas
- Dimensiones: 3x10px
- Colores diferenciados (verde player, rojo/ámbar enemy)
- Tests unitarios" \
  --label "user-story,sprint-2,entity,bullets,gameplay"

# US-08: CollisionSystem
gh issue create --title "US-08: CollisionSystem AABB completo" \
  --body "Implementar sistema de colisiones AABB para todas las entidades.

## Criterios de aceptación
- Crear clase CollisionSystem en src/systems/CollisionSystem.js
- Métodos estáticos para: player bullets vs invaders, vs UFO, vs shields
- Enemy bullets vs player, vs shields
- Invaders vs shields, vs línea del player
- Retornar array de eventos de colisión
- Tests unitarios completos
- Cobertura >= 80%" \
  --label "user-story,sprint-2,system,physics,collision"

# US-09: Shield
gh issue create --title "US-09: Shield: bloques destructibles y erosión" \
  --body "Implementar sistema de escudos con bloques destructibles.

## Criterios de aceptación
- Crear clase Shield en src/entities/Shield.js
- Grid de bloques 4x4px según forma definida
- Detección de colisión de proyectiles
- Erosión de bloques adyacentes al impacto
- Regeneración parametrizable por nivel
- Bounding box del shield
- Tests unitarios
- Visualización correcta de bloques dañados" \
  --label "user-story,sprint-3,entity,shield,gameplay"

# US-10: UFO
gh issue create --title "US-10: UFO: nave especial con power-ups" \
  --body "Implementar nave UFO especial con aparición aleatoria y power-ups.

## Criterios de aceptación
- Crear clase UFO en src/entities/UFO.js
- Aparición aleatoria entre 25-35 segundos
- Movimiento horizontal a 120 px/s
- Puntuación aleatoria según probabilidades
- Generación de power-ups al destruir
- Dimensiones: 48x20px
- Tests unitarios
- Visualización del UFO" \
  --label "user-story,sprint-3,entity,gameplay"

# US-11: ScoreSystem
gh issue create --title "US-11: ScoreSystem: puntos, multiplicadores y persistencia" \
  --body "Implementar sistema de puntuación con multiplicadores y persistencia.

## Criterios de aceptación
- Crear clase ScoreSystem en src/systems/ScoreSystem.js
- Sumar puntos según tipo de invader
- Multiplicadores de racha
- Hi-score persistido en localStorage
- Métodos: addPoints, addInvaderKill, addUFOKill, saveHiScore, loadHiScore
- Tests unitarios
- Validar persistencia en localStorage" \
  --label "user-story,sprint-3,system,scoring,persistence"

# US-12: LevelSystem
gh issue create --title "US-12: LevelSystem: dificultad progresiva" \
  --body "Implementar sistema de niveles con dificultad progresiva.

## Criterios de aceptación
- Crear clase LevelSystem en src/systems/LevelSystem.js
- 6 niveles predefinidos
- Configuración: velocidad invaders, cadencia disparo, regeneración shields
- Método getConfig() retorna parámetros del nivel
- nextLevel() incrementa nivel
- Tests unitarios
- Validar progresión de dificultad" \
  --label "user-story,sprint-3,system,levels,progression"

# US-13: SpawnSystem
gh issue create --title "US-13: SpawnSystem: formación y timers" \
  --body "Implementar sistema de spawn para formación de invaders y UFO.

## Criterios de aceptación
- Crear clase SpawnSystem en src/systems/SpawnSystem.js
- Grid de invaders: 5x4 formación
- Timers para UFO (25-35s)
- Regeneración de invaders al limpiar pantalla
- Movimiento de formación con bounce en bordes
- Tests unitarios
- Validar espaciado de grid y posiciones iniciales" \
  --label "user-story,sprint-3,system,spawning,formation"

# US-14: HUD
gh issue create --title "US-14: HUD: score, nivel y vidas" \
  --body "Implementar HUD en pantalla con información del juego.

## Criterios de aceptación
- Crear clase HUD en src/ui/HUD.js
- Mostrar score actual y hi-score
- Mostrar nivel actual
- Mostrar vidas como íconos de nave
- Actualizar en tiempo real
- Tests unitarios
- Validar posicionamiento y formato" \
  --label "user-story,sprint-4,ui,hud,graphics"

# US-15: StartScreen
gh issue create --title "US-15: StartScreen: pantalla de inicio con lore" \
  --body "Implementar pantalla de inicio con narrativa de BLACK.

## Criterios de aceptación
- Crear clase StartScreen en src/ui/StartScreen.js
- Mostrar título y lore del universo
- Botón o instrucción para comenzar
- Cambio de estado a PLAYING
- Transición suave
- Tests unitarios
- Validar legibilidad del texto" \
  --label "user-story,sprint-4,ui,screens,narrative"

# US-16: Game Over/Level/Win Screens
gh issue create --title "US-16: Game Over, Level Complete y Win screens" \
  --body "Implementar pantallas de fin de juego, nivel completado y victoria.

## Criterios de aceptación
- Crear clases: GameOverScreen, LevelScreen, WinScreen
- GameOverScreen: mostrar score final, opción de reiniciar
- LevelScreen: transición entre niveles con narrative
- WinScreen: pantalla de victoria final
- Transiciones de estado correctas
- Tests unitarios
- Animaciones de transición" \
  --label "user-story,sprint-4,ui,screens,gameplay"

# US-17: Touch Controls
gh issue create --title "US-17: Controles táctiles: botones móvil" \
  --body "Implementar controles táctiles para versión móvil.

## Criterios de aceptación
- Crear botones virtuales: izquierda, derecha, fuego
- Integrar con InputManager
- Respuesta táctil visual
- Tests E2E con Playwright
- Compatibilidad con diferentes tamaños de pantalla
- No interferir con controles de teclado" \
  --label "user-story,sprint-4,ui,mobile,controls"

# US-18: spriteRenderer
gh issue create --title "US-18: spriteRenderer: renderización de sprites" \
  --body "Implementar funciones de renderización de sprites.

## Criterios de aceptación
- Crear módulo spriteRenderer en src/utils/spriteRenderer.js
- Funciones: drawPlayer, drawInvader, drawUFO, drawShield, drawBullet
- Colores según paleta de elementos.md
- Animación de invaders (2 frames)
- Parpadeo de invincibilidad del player
- Tests unitarios
- Validar calidad visual" \
  --label "user-story,sprint-4,graphics,rendering,sprites"

# US-19: Integration
gh issue create --title "US-19: Integración completa: main.js y coordinación" \
  --body "Integrar todos los módulos en main.js para formar el juego completo.

## Criterios de aceptación
- Crear src/main.js orquestando GameLoop, InputManager, StateMachine
- Instanciar todas las entidades y sistemas
- Conectar eventos de colisión
- Manejar transiciones de estado
- Pasar tests E2E completos
- CI en verde
- Performance > 60fps" \
  --label "user-story,sprint-5,integration,core,main"

# US-20: Performance
gh issue create --title "US-20: Performance audit: 60fps en hardware moderado" \
  --body "Auditoría de performance para garantizar 60fps consistentes.

## Criterios de aceptación
- Medir FPS en hardware moderado (laptop estándar)
- Optimizar bucles de colisión
- Validar renderización eficiente
- Eliminar memory leaks
- Profiling con Chrome DevTools
- Documentar resultados
- Tests de rendimiento" \
  --label "user-story,sprint-5,qa,performance,optimization"

# US-21: Compatibility
gh issue create --title "US-21: Compatibilidad navegadores: Chrome, Firefox, Safari" \
  --body "Validar compatibilidad en navegadores principales.

## Criterios de aceptación
- Tests en Chrome, Firefox, Safari
- Canvas API funcional en todos
- Touch events funcionales
- LocalStorage disponible
- No hay console errors
- Documentar incompatibilidades encontradas
- Tests E2E en CI para múltiples navegadores" \
  --label "user-story,sprint-5,qa,compatibility,testing"

# US-22: CHANGELOG
gh issue create --title "US-22: CHANGELOG.md: documentación de versión" \
  --body "Crear CHANGELOG.md con historial de cambios.

## Criterios de aceptación
- Formato estándar: Keep a Changelog
- Secciones: Added, Changed, Fixed, Removed
- Listar todas las features implementadas
- Incluir breaking changes si existen
- Enlaces a issues y PRs
- Versión v1.0.0 listada" \
  --label "user-story,sprint-5,documentation,release"

# US-23: README
gh issue create --title "US-23: README.md: instrucciones y créditos" \
  --body "Crear README.md con instrucciones de uso y créditos.

## Criterios de aceptación
- Descripción del proyecto
- Instrucciones de instalación
- Cómo jugar (controles)
- Controles de teclado y móvil
- Capturas de pantalla del gameplay
- Créditos a inspiraciones (Space Invaders)
- Licencia (MIT)
- Enlaces al repositorio" \
  --label "user-story,sprint-5,documentation,release"

# US-24: Release
gh issue create --title "US-24: Release v1.0.0 y deploy a GitHub Pages" \
  --body "Crear tag de versión v1.0.0 y desplegar a GitHub Pages.

## Criterios de aceptación
- Crear tag v1.0.0 en git
- GitHub Release automático con CHANGELOG
- Deploy automático a GitHub Pages
- Juego accesible en dominio Pages
- Adjuntar dist/ como artefacto en release
- Validar que el juego funciona en Pages
- Tests E2E de gameplay en producción" \
  --label "user-story,sprint-5,release,deployment,ci-cd"

echo ""
echo "======================================"
echo "✅ Script completado!"
echo "======================================"
echo "Se han creado todos los labels e issues en GitHub."
echo "Próximo paso: Ejecutar Sprint 1"
