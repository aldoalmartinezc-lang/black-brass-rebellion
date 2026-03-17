<<<BEGIN_JUGABILIDAD_MD>>>
# jugabilidad.md

## 1. Estructura general del gameplay

El juego alterna dos modos:

### Modo A: Shooter espacial
Inspirado en Space Invaders / arcade shooter.
- control horizontal libre
- disparo hacia arriba
- enemigos en formaciones o patrones
- fases de supervivencia, avance y boss

### Modo B: Plataforma run-and-gun
Inspirado en Mega Man clásico.
- movimiento lateral
- salto
- disparo
- enemigos de patrulla, torretas, hazards y mini-bosses

### Regla de campaña
Cada mundo sigue:
1. fase shooter
2. fase plataforma
3. boss final

---

## 2. Controles

## Shooter
- izquierda / derecha: mover nave
- arriba / abajo: microajuste opcional hasta 12 px verticales
- Z o J: disparo
- X o K: disparo cargado / power
- Enter: pausa

## Plataforma
- izquierda / derecha: mover
- Z o J: disparo
- X o K: salto
- mantener Z: carga
- abajo + salto: bajar por plataforma semisólida

---

## 3. Parámetros del jugador

## 3.1 Modo shooter: nave BLACK
- hitbox: **14 x 10 px**
- sprite visual: **24 x 16 px**
- velocidad horizontal: **120 px/s**
- velocidad vertical microajuste: **60 px/s**
- vidas base: **3**
- hp interno por vida: **1 hit**
- invulnerabilidad tras impacto: **1500 ms**

### Disparo base
- cooldown: **180 ms**
- velocidad proyectil: **220 px/s**
- daño: **1**
- cantidad simultánea máxima: **4**

### Disparo cargado
- tiempo de carga: **900 ms**
- velocidad: **200 px/s**
- daño: **3**
- cooldown tras uso: **400 ms**

---

## 3.2 Modo plataforma: Black a pie
- hitbox: **12 x 20 px**
- sprite visual: **16 x 24 px**
- velocidad caminar: **72 px/s**
- salto inicial: **-168 px/s**
- gravedad: **420 px/s²**
- caída máxima: **220 px/s**
- coyote time: **90 ms**
- jump buffer: **100 ms**
- invulnerabilidad tras daño: **1200 ms**

### Salud
- hp total: **12**
- daño enemigo básico: **2**
- daño hazard: **3**
- daño mini-boss / boss contacto: **4**

### Disparo base terrestre
- cooldown: **220 ms**
- velocidad proyectil: **180 px/s**
- daño: **1**

### Disparo cargado terrestre
- tiempo de carga: **1000 ms**
- daño: **4**
- velocidad: **170 px/s**
- atraviesa hasta **2** enemigos débiles

---

## 4. Enemigos shooter

### Drone cobrador
- hp: **1**
- score: **100**
- velocidad lateral formación: **14 px/s**
- avance al descender: **8 px**
- frecuencia de disparo: **0.25 shots/s**

### Caza consorcio
- hp: **2**
- score: **200**
- velocidad patrón: **28 px/s**
- frecuencia de disparo: **0.4 shots/s**

### Bombardero fiscal
- hp: **3**
- score: **350**
- patrón: ondulado
- frecuencia de disparo: **0.6 shots/s**

### Fragata recaudadora
- hp: **18**
- score: **1500**
- puntos débiles: **2**
- cooldown ataque principal: **1600 ms**

---

## 5. Enemigos plataforma

### Guardia cobrador
- hp: **2**
- score: **100**
- velocidad caminar: **32 px/s**
- cooldown disparo: **900 ms**

### Autómata minero
- hp: **4**
- score: **200**
- velocidad: **22 px/s**
- ataque parabólico cada **1400 ms**

### Torreta de vapor
- hp: **3**
- score: **150**
- ráfaga: **3** disparos
- intervalo interno: **140 ms**
- cooldown entre ráfagas: **1800 ms**

### Inspector élite
- hp: **6**
- score: **400**
- velocidad: **40 px/s**
- dash cada **2200 ms**
- disparo doble cada **1300 ms**

---

## 6. Bosses

## Boss 1: Recaudador de Hierro
### fase shooter
- hp total: **40**
- duración objetivo: **75 a 100 s**
- ráfaga frontal cada **1200 ms**
- drones invocados cada **6000 ms**
- láser barrido cada **9000 ms**
- score: **5000**

## Boss 2: Auditora Magna
### fase plataforma
- hp total: **56**
- sellos explosivos cada **1500 ms**
- cadenas descendentes cada **3200 ms**
- salto sísmico cada **5000 ms**
- score: **7000**

## Boss 3: Dorian Vale
### fase mixta
- hp fase 1 nave: **36**
- hp fase 2 terrestre: **28**
- score total: **12000**

---

## 7. Shields del modo shooter
- cantidad estándar: **4**
- hp por bloque: **1**
- bloques por shield: aprox **170**

### daño recibido
- bala enemiga: destruye 1 bloque
- bala aliada: destruye 1 bloque
- explosión: radio de 2 bloques
- contacto enemigo: destruye 6 bloques

---

## 8. Power-ups

### Steam Core
- efecto: mayor cadencia
- duración: **8000 ms**
- cooldown shooter modificado a **110 ms**

### Bronze Shield
- efecto: 1 impacto gratis
- duración máxima: **12000 ms** o hasta recibir golpe

### Overcharge Shot
- efecto: daño x2 del disparo base
- duración: **7000 ms**

### Repair Capsule
- plataforma: recupera **4 hp**
- shooter: da **1 vida** si vidas < 3, si no da **1000 score**

### Time Valve
- efecto: ralentiza enemigos a 70%
- duración: **5000 ms**

### Drop rate
- enemigo común: **6%**
- miniboss: **20%**
- boss: drop garantizado

---

## 9. Puntuación

### Shooter
- drone cobrador: **100**
- caza consorcio: **200**
- bombardero fiscal: **350**
- fragata: **1500**
- boss: **5000+**

### Plataforma
- guardia: **100**
- autómata minero: **200**
- torreta: **150**
- inspector élite: **400**
- miniboss: **1000**
- boss: **7000+**

### Bonus
- shield restante: **50 puntos por cada 10 bloques restantes**
- vida intacta al terminar fase: **1000**
- clear rápido bronze: **500**
- clear rápido silver: **1000**
- clear rápido gold: **2000**

### Extra life
- cada **20000 puntos**

---

## 10. Curva de dificultad

### Shooter
Para mundo `w`, empezando en 1:
- velocidad formación = `14 + (w - 1) * 3`
- multiplicador disparo enemigo = `1 + (w - 1) * 0.12`
- multiplicador hp miniboss = `1 + (w - 1) * 0.18`

### Plataforma
Para mundo `w`:
- hp enemigo = `baseHp + floor((w - 1) * 0.6)`
- velocidad enemigo = `baseSpeed * (1 + (w - 1) * 0.08)`
- cooldown enemigo = `baseCooldown * (1 - (w - 1) * 0.06)`

### Límites
- cooldown mínimo: **420 ms**
- hp máximo enemigo común: **10**
- densidad máxima shooter: **18 enemigos activos**
- densidad máxima plataforma: **8 enemigos activos**

---

## 11. Ritmo de fase

## Shooter
- duración objetivo: **90 a 150 s**
- mini-oleadas: **3**
- boss: **1**
- transición narrativa: **5 a 8 s**

## Plataforma
- duración objetivo: **120 a 240 s**
- checkpoints: **2**
- mini-boss opcional: **1**
- boss final si aplica: **1**

---

## 12. Cámara

## Shooter
- fija
- sin scroll

## Plataforma
- follow lateral suave
- dead zone horizontal: **48 px**
- dead zone vertical: **24 px**
- look-ahead: **20 px**
- smoothing: **8**

---

## 13. Colisiones

## Shooter
- nave usa hitbox reducida
- proyectiles contra shield destruyen bloques
- proyectiles fuera de pantalla se reciclan de inmediato

## Plataforma
- colisión AABB
- plataformas semisólidas desde arriba
- hazards ignoran parte del knockback

---

## 14. Knockback

## Plataforma
- empuje horizontal: **60 px/s**
- impulso vertical: **-70 px/s**
- lock de control: **180 ms**

---

## 15. Estados del jugador

## Shooter
- spawn
- idle
- moving
- firing
- charging
- damaged
- destroyed

## Plataforma
- idle
- run
- jump
- fall
- shoot
- charge
- hurt
- death

---

## 16. Checkpoints y continues
- checkpoints plataforma: **2** por fase
- shooter: reinicio de fase completa
- continues iniciales: **3**
- sin continues: game over
- opción arcade: reinicio desde inicio de mundo

---

## 17. Reglas de balance
1. El modo shooter debe sentirse más rápido y vulnerable.
2. El modo plataforma debe sentirse más táctico.
3. Ningún boss debe durar más de 2 minutos en normal.
4. El disparo cargado debe ser útil sin dominar.
5. Ningún power-up debe ser requisito.
6. Mundo 1 enseña ambos modos con baja penalización.
7. Mundo 3 muestra la mezcla completa de sistemas.

---

## 18. Orden de implementación
1. loop shooter completo
2. loop plataforma completo
3. HUD doble
4. power-ups
5. boss shooter
6. boss plataforma
7. transiciones entre modos
8. score / continues / checkpoints
9. curva de dificultad
10. pulido audiovisual

<<<END_JUGABILIDAD_MD>>>
