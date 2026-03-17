<<<BEGIN_ARQUITECTURA_JUEGO_MD>>>
# arquitectura_juego.md

## 1. Visión general

El juego es un arcade híbrido 2D retro steampunk espacial que intercala dos modos principales:

1. **Shooter espacial**
2. **Plataforma run-and-gun**

La estructura híbrida no es decorativa; define el ritmo, la identidad y la progresión de la campaña.

- **Modo nave**: escala macro, guerra industrial, patrones, presión, flotas.
- **Modo terrestre**: escala micro, infiltración, precisión, hazards, contacto humano con el daño del régimen.

---

## 2. Regla estructural por mundo

Cada mundo se organiza en tres bloques:

### A. Fase shooter
Objetivo:
- viaje interestelar
- oleadas
- asalto inicial
- persecución
- destrucción de convoyes o defensas orbitales

### B. Fase plataforma
Objetivo:
- infiltración
- exploración lineal
- hazards
- rescates
- sabotaje
- mini-bosses

### C. Boss
Tipos posibles:
- boss solo nave
- boss solo terrestre
- boss mixto de dos etapas

---

## 3. Estructura recomendada del MVP

### Vertical Slice inicial
- Mundo 1
  - 1A shooter
  - 1B plataforma
  - 1C boss shooter
- Mundo 2
  - 2A shooter
  - 2B plataforma
  - 2C boss plataforma
- Mundo 3
  - 3A shooter
  - 3B plataforma
  - 3C boss mixto

Esto permite probar:
- transición entre modos
- HUD dual
- curva de dificultad base
- lectura narrativa entre fases
- al menos un boss por tipo

---

## 4. Loop de juego

## Loop macro
1. Intro breve del mundo
2. Fase shooter
3. Pantalla de transición narrativa
4. Fase plataforma
5. Pantalla previa a boss
6. Boss
7. Resultados / score / bonus
8. Siguiente mundo

## Loop micro shooter
1. spawn del jugador
2. formación enemiga activa
3. patrón de movimiento
4. intercambio de fuego
5. posible drop de power-up
6. limpieza de oleada
7. transición a siguiente mini-oleada o boss

## Loop micro plataforma
1. spawn o checkpoint
2. avance lateral
3. combate con enemigos locales
4. interacción con hazards / plataformas
5. drop de mejora o cápsula
6. mini-boss o puerta
7. llegada al boss o salida de fase

---

## 5. Arquitectura modular recomendada

## Módulos núcleo
- `Game`
- `SceneManager`
- `StateMachine`
- `InputManager`
- `AudioManager`
- `AssetManager`
- `SaveManager`
- `ScoreSystem`
- `DifficultySystem`

## Módulos de gameplay shooter
- `ShooterScene`
- `PlayerShip`
- `EnemyFormation`
- `EnemyShooter`
- `ProjectileSystem`
- `ShieldSystem`
- `PowerUpSystem`
- `ShooterBossController`

## Módulos de gameplay plataforma
- `PlatformScene`
- `PlayerRunner`
- `TilemapSystem`
- `CollisionSystem`
- `EnemyGroundAI`
- `PlatformHazardSystem`
- `CheckpointSystem`
- `PlatformBossController`

## Módulos compartidos
- `HUDRenderer`
- `DialogueOverlay`
- `TransitionScene`
- `FXSystem`
- `AnimationSystem`

---

## 6. Modelo de escenas

Escenas recomendadas:
- `BootScene`
- `TitleScene`
- `IntroScene`
- `WorldMapScene` opcional futuro
- `ShooterScene`
- `NarrativeTransitionScene`
- `PlatformScene`
- `BossScene` o boss integrado a cada escena
- `ResultsScene`
- `GameOverScene`

Para MVP, `BossScene` puede ir integrada a `ShooterScene` o `PlatformScene`.

---

## 7. Máquina de estados del jugador

## Nave
- spawn
- idle
- moving
- firing
- charging
- hit
- invulnerable
- destroyed

## Black a pie
- idle
- run
- jump
- fall
- shoot
- charge
- hurt
- invulnerable
- death

---

## 8. Sistemas de transición entre modos

### Regla narrativa
Las transiciones deben comunicar cambio de escala:
- del cielo a la fábrica
- de la flota al corredor
- del asalto al sabotaje

### Regla técnica
Cada transición debe:
1. cerrar score parcial
2. conservar vidas / hp según tabla de conversión
3. reiniciar cámara y escena
4. mostrar texto breve del mundo
5. precargar boss o tiles del siguiente segmento

### Conversión recomendada de estado
- vidas globales: compartidas
- hp de plataforma: se rellena a máximo al inicio de fase plataforma
- power-ups shooter: no se trasladan a plataforma
- score: siempre acumulado
- continues: globales

---

## 9. Diseño de dificultad por mezcla de modos

### Principio
La dificultad no debe subir igual en ambos modos.

- Shooter: aumenta densidad, velocidad y presión
- Plataforma: aumenta precisión, lectura de hazards y castigo táctico

### Patrón recomendado por mundo
- Mundo 1: enseñanza
- Mundo 2: consolidación
- Mundo 3: mezcla plena
- Mundo 4+: variación de patrones y bosses más largos

---

## 10. Narrativa funcional

La narrativa debe entrar en tres puntos:
1. introducción de mundo
2. transición entre shooter y plataforma
3. antes y después del boss

No debe interrumpir demasiado el loop arcade.

### Formato recomendado
- retrato simple
- fondo fijo
- 2 a 4 líneas máximo
- duración skippable

---

## 11. Alcance de producción recomendado

## MVP realista
- 1 nave jugable
- 1 personaje jugable
- 3 enemigos shooter
- 4 enemigos plataforma
- 2 power-ups principales
- 1 tileset industrial
- 1 tileset exterior mínimo
- 3 bosses
- 3 mundos híbridos

## No incluir aún
- árbol de habilidades complejo
- inventario
- diálogos largos
- NPCs interactivos amplios
- mapa abierto
- físicas avanzadas
- armas excesivas

---

## 12. Prioridades de programación

### Fase 1
- loop shooter estable
- disparos
- enemigos básicos
- shields
- HUD shooter

### Fase 2
- movimiento y salto de Black
- tile collisions
- enemigos plataforma
- HUD plataforma
- checkpoints

### Fase 3
- sistema de transición entre modos
- score global
- continues
- narrativa entre escenas

### Fase 4
- boss shooter
- boss plataforma
- boss mixto

### Fase 5
- pulido
- efectos
- audio
- balance
- dificultad

---

## 13. Identidad final del juego

La mezcla Space Invaders + Mega Man no debe sentirse como dos minijuegos pegados, sino como dos escalas del mismo conflicto:

- en la nave, Black combate la maquinaria visible del régimen
- a pie, Black atraviesa los espacios donde ese régimen destruyó la vida humana

Ese contraste sostiene tanto el gameplay como el mensaje del juego.

<<<END_ARQUITECTURA_JUEGO_MD>>>
