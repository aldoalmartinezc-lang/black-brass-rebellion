// Canvas dimensions
export const CANVAS_W = 560
export const CANVAS_H = 460

// Player constants
export const PLAYER_SPEED = 280 // px/s
export const PLAYER_BULLET_SPEED = 500 // px/s
export const BULLET_COOLDOWN = 0.4 // seconds
export const PLAYER_Y = 400 // fixed Y position
export const PLAYER_WIDTH = 32
export const PLAYER_HEIGHT = 18
export const PLAYER_INITIAL_LIVES = 3
export const PLAYER_INVINCIBILITY_DURATION = 2.0 // seconds

// Invader constants
export const INVADER_COLS = 5
export const INVADER_ROWS = 4
export const INVADER_CELL_W = 48 // cell width
export const INVADER_CELL_H = 36 // cell height
export const INVADER_HITBOX_W = 24
export const INVADER_HITBOX_H = 16
export const INVADER_STEP_DOWN = 20 // px when hitting edge
export const INVADER_GRID_OFFSET_X = 80 // left margin
export const INVADER_GRID_OFFSET_Y = 80 // top margin

// Bullet constants
export const MAX_ENEMY_BULLETS = 3
export const ENEMY_BULLET_SPEED = 200 // px/s
export const BULLET_WIDTH = 3
export const BULLET_HEIGHT = 10

// UFO constants
export const UFO_Y = 50 // fixed Y position
export const UFO_SPEED = 120 // px/s
export const UFO_MIN_INTERVAL = 25 // seconds
export const UFO_MAX_INTERVAL = 35 // seconds
export const UFO_WIDTH = 48
export const UFO_HEIGHT = 20

// Shield constants
export const SHIELD_BLOCK_SIZE = 4 // px
export const SHIELD_Y = 330 // Y position of shields
export const SHIELD_COUNT = 4

// Animation timing
export const ANIM_INTERVAL = 0.5 // seconds between frames
export const DT_CAP = 0.05 // maximum delta time per frame

// Colors (from elementos.md color palette)
export const COLOR_PLAYER = '#00ff00' // Green
export const COLOR_ALIEN_TOP = '#ff0000' // Red (Exploradores del Éter)
export const COLOR_ALIEN_MID = '#ffaa00' // Orange (Soldados de Bronce)
export const COLOR_ALIEN_BOT = '#aaaaaa' // Gray (Autómatas de Carbón)
export const COLOR_UFO = '#ff00ff' // Magenta
export const COLOR_SHIELD = '#00ffff' // Cyan
export const COLOR_BULLET_P = '#00ff00' // Green (player)
export const COLOR_BULLET_E = '#ff5500' // Orange-red (enemy)
export const COLOR_HUD = '#00ff00' // Green
export const COLOR_BG = '#000000' // Black

// Game state names
export const GAME_STATES = {
  START: 'start',
  PLAYING: 'playing',
  PAUSED: 'paused',
  LEVEL_COMPLETE: 'levelComplete',
  GAME_OVER: 'gameOver',
  WIN: 'win',
}
