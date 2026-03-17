import {
  INVADER_HITBOX_W,
  INVADER_HITBOX_H,
  COLOR_ALIEN_TOP,
  COLOR_ALIEN_MID,
  COLOR_ALIEN_BOT,
} from '../utils/constants.js'

export const INVADER_TYPES = {
  TOP: 0, // Exploradores del Éter - 30 pts
  MID: 1, // Soldados de Bronce - 20 pts
  BOT: 2, // Autómatas de Carbón - 10 pts
}

/**
 * Invader entity - enemy ship
 */
export class Invader {
  constructor(col, row, type, x, y) {
    this.col = col
    this.row = row
    this.type = type
    this.x = x
    this.y = y

    this.alive = true
    this.frame = 0 // 0 or 1 for animation
  }

  /**
   * Update position (called when formation moves)
   * @param {number} dx
   * @param {number} dy
   */
  updatePosition(dx, dy) {
    this.x += dx
    this.y += dy
  }

  /**
   * Update animation frame
   * @param {number} animFrame - Global animation frame (0 or 1)
   */
  updateAnimation(animFrame) {
    this.frame = animFrame
  }

  /**
   * Kill this invader
   */
  kill() {
    this.alive = false
  }

  /**
   * Draw invader
   * @param {CanvasRenderingContext2D} ctx
   */
  draw(ctx) {
    if (!this.alive) return

    // Get color based on type
    const color =
      this.type === INVADER_TYPES.TOP
        ? COLOR_ALIEN_TOP
        : this.type === INVADER_TYPES.MID
          ? COLOR_ALIEN_MID
          : COLOR_ALIEN_BOT

    ctx.fillStyle = color

    // Draw body - simple rectangle that changes with frame
    const width = this.frame === 0 ? INVADER_HITBOX_W : INVADER_HITBOX_W - 2
    const xOffset = this.frame === 0 ? 0 : 1
    ctx.fillRect(this.x + xOffset, this.y, width, INVADER_HITBOX_H)

    // Draw eyes (simple dots)
    ctx.fillStyle = '#000000'
    ctx.fillRect(this.x + 4 + xOffset, this.y + 2, 2, 2)
    ctx.fillRect(this.x + 12 + xOffset, this.y + 2, 2, 2)
  }

  // Getters
  get width() {
    return INVADER_HITBOX_W
  }

  get height() {
    return INVADER_HITBOX_H
  }

  get points() {
    return this.type === INVADER_TYPES.TOP ? 30 : this.type === INVADER_TYPES.MID ? 20 : 10
  }
}
