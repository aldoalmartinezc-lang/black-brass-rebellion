<<<BEGIN_ELEMENTOS_MD>>>
# elementos.md

## 1. Resolución base y estilo visual

### Resolución interna
- Canvas lógico: **320 x 180 px**
- Escalado recomendado: **x4**
- Resolución visible sugerida: **1280 x 720 px**
- Pixel art duro, sin antialiasing.

### Grilla base
- Unidad mínima de diseño: **2 x 2 px**
- Sprites principales alineados a múltiplos de 2 px
- HUD alineado a múltiplos de 4 px

### Paleta principal

#### Negro / casco / nave
- `#0D0D10` negro profundo
- `#1B1B22` sombra metálica
- `#2C2C36` contorno oscuro

#### Bronce / steampunk
- `#8C5A2B` bronce medio
- `#A86A33` bronce claro
- `#C68B44` reflejo de cobre

#### Vapor / acero
- `#7A828C` acero gris
- `#A7B0BA` acero claro
- `#D2D8DD` brillo mecánico

#### Energía / HUD / disparos aliados
- `#37C6FF` azul vapor
- `#7FE6FF` brillo azul
- `#B7F7FF` blanco azulado

#### Enemigo / peligro / régimen
- `#B3261E` rojo profundo
- `#E14B3B` rojo señal
- `#FF9A3C` naranja térmico

#### Naturaleza / Aurelia / esperanza
- `#4A8F57` verde musgo
- `#7DBE6A` verde vivo
- `#D7E8A2` crema orgánico

#### Fondo espacial
- `#05070B` negro espacial
- `#101722` azul noche industrial
- `#1A2230` neblina sideral

---

## 2. Layout del HUD

## HUD modo shooter
Canvas: 320x180

- Barra superior altura: **16 px**
- Margen general: **8 px**
- `score`: x=8, y=4
- `lives`: x=112, y=4
- `weapon`: x=180, y=4
- `boss_hp`: x=224, y=4, ancho=88, alto=8
- Área de juego: x=0..319, y=16..179
- Mensaje central temporal: caja 160x20 px, centrada en y=84

## HUD modo plataforma
- Barra superior altura: **20 px**
- `hp_jugador`: x=8, y=4, ancho=48, alto=8
- `weapon_energy`: x=64, y=4, ancho=40, alto=8
- `score`: x=112, y=4
- `vidas`: x=220, y=4
- `timer`: x=280, y=4

---

## 3. Sprites base

## 3.1 Nave BLACK
- Caja de sprite: **24 x 16 px**
- Hitbox sugerida: **14 x 10 px**

### Capas visuales
1. Contorno base negro
2. Cuerpo central tipo punta de flecha
3. Aletas laterales en bronce
4. Cabina azul
5. Chimenea trasera pequeña
6. Escape de vapor animado

### Dibujo paso a paso con Canvas 2D (`ctx`)
1. Dibujar cuerpo principal como polígono central en `#0D0D10`
2. Añadir bloque central de 10x8 px en `#1B1B22`
3. Añadir punta frontal de 4 px hacia adelante
4. Dibujar dos alas triangulares laterales en `#8C5A2B`
5. Dibujar cabina de 4x4 px en `#37C6FF`
6. Añadir remache brillante de 2x2 px en `#C68B44`
7. Dibujar chimenea trasera de 2x4 px en `#7A828C`
8. Añadir escape de 2 frames con vapor en `#7FE6FF`

### Frames
- idle_A
- idle_B
- hit_flash
- destroyed

---

## 3.2 Black a pie
- Caja de sprite: **16 x 24 px**
- Hitbox sugerida: **12 x 20 px**

### Silueta
- sombrero o visor corto
- gabardina compacta
- brazo cañón
- botas pesadas

### Dibujo paso a paso
1. Cabeza 6x6 px en `#0D0D10`
2. Ojo visor 2x2 px en `#37C6FF`
3. Torso 6x8 px en negro con detalle bronce
4. Brazo izquierdo 2x6 px
5. Brazo derecho tipo blaster 3x6 px
6. Piernas en dos bloques de 3x6 px
7. Gabardina trasera de 4x6 px en `#1B1B22`

### Animaciones mínimas
- idle: 2 frames
- run: 4 frames
- jump: 1 frame
- fall: 1 frame
- shoot: 1 frame
- damage: 1 frame
- death: 3 frames

---

## 3.3 Aurelia retrato / diálogo
- Tamaño: **24 x 24 px**
- Cabello: `#C68B44`
- Ropa: `#4A8F57`
- Ojos: `#B7F7FF`

Uso:
- escenas de diálogo
- retratos en transición
- no jugable en MVP

---

## 3.4 Enemigos shooter

### Drone cobrador
- Tamaño: **14 x 10 px**
- Forma: caja voladora con pinzas
- Paleta: negro, rojo, bronce
- HP: bajo

### Caza consorcio
- Tamaño: **16 x 12 px**
- Forma: insecto industrial
- HP: medio

### Fragata recaudadora
- Tamaño: **28 x 18 px**
- Rol: miniboss
- Multipuntos de disparo

---

## 3.5 Enemigos plataforma

### Guardia cobrador
- Tamaño: **16 x 20 px**
- Disparo recto
- Casco rojo oscuro

### Autómata minero
- Tamaño: **18 x 18 px**
- Movimiento pesado
- Proyectil en arco

### Torreta de vapor
- Tamaño: **16 x 16 px**
- Fija
- Patrón de 3 disparos

### Inspector élite
- Tamaño: **16 x 24 px**
- Dash corto
- Disparo doble

---

## 4. Proyectiles

## Shooter
### Disparo base BLACK
- Tamaño: **4 x 2 px**
- Color: `#37C6FF`
- Trayectoria recta

### Disparo cargado
- Tamaño: **8 x 4 px**
- Color: `#7FE6FF`
- Atraviesa hasta 2 enemigos débiles

### Bala enemiga básica
- Tamaño: **3 x 3 px**
- Color: `#E14B3B`

### Orbe térmico
- Tamaño: **5 x 5 px**
- Color: `#FF9A3C`

## Plataforma
### Buster Black
- Tamaño: **4 x 4 px**
- Color: `#37C6FF`

### Disparo cargado terrestre
- Tamaño: **8 x 6 px**
- Color: `#B7F7FF`

---

## 5. Shields / barricadas del modo shooter

- Grilla por shield: **20 columnas x 12 filas**
- Tamaño de bloque lógico: **2 x 2 px**
- Tamaño visual total: **40 x 24 px**
- Cantidad por fase shooter estándar: **4**

### Materiales
- Capa externa: `#7A828C`
- Núcleo: `#A7B0BA`
- Daño: `#B3261E`

### Reglas visuales
- Los bloques desaparecen al recibir daño
- Los proyectiles aliados también destruyen shield
- La fila inferior tiene muesca central
- Los laterales superiores deben verse redondeados por escalones

### Patrón sugerido de ocupación
- Filas 1-3: sólido casi completo
- Filas 4-8: sólido con curvatura lateral
- Filas 9-12: dos patas laterales y hueco central

---

## 6. Tiles del modo plataforma
- Tamaño de tile: **16 x 16 px**

### Set básico
- piso metal
- piso cobre
- pared remachada
- tubería vertical
- tubería horizontal
- plataforma móvil
- pincho térmico
- puerta automática
- consola interactiva
- fondo industrial oscuro

### Reglas
- Colisión sólida: piso, pared, puerta cerrada
- Semisólida: plataforma fina
- Hazard: pinchos, vapor, ácido, engrane expuesto

---

## 7. Fondos

## Shooter
Capas:
1. estrellas lejanas
2. neblina industrial
3. siluetas de naves / fábricas
4. partículas de vapor

## Plataforma
Capas:
1. pared industrial oscura
2. tuberías medias
3. engranes lentos
4. vapor frontal ocasional

### Parallax
- capa 1: 0.2x
- capa 2: 0.4x
- capa 3: 0.7x
- capa frontal: 1.1x

---

## 8. Efectos
### Explosión chica
- 12 x 12 px
- 4 frames

### Explosión mediana
- 20 x 20 px
- 5 frames

### Explosión boss
- 48 x 48 px
- 8 frames

### Hit flash
- overlay blanco `#FFFFFF`
- duración: 60 ms

### Vapor
- partículas claras con drift vertical
- opacidad baja

---

## 9. Tipografía
- estilo pixel
- altura base: 8 px
- números: monoespaciados
- títulos: 12 px

---

## 10. Prioridad de producción de assets
1. Nave BLACK
2. Black a pie
3. Disparo aliado
4. Drone cobrador
5. Guardia cobrador
6. Shield
7. Tileset industrial básico
8. Boss 1
9. HUD
10. Efectos

<<<END_ELEMENTOS_MD>>>
