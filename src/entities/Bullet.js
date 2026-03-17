import { CANVAS_H, BULLET_WIDTH, BULLET_HEIGHT, COLOR_BULLET_P, COLOR_BULLET_E } from '../utils/constants.js'

export const BULLET_OWNER = {
  PLAYER: 'player',
  ENEMY: 'enemy',
}

/**
 * Bullet entity - projectile from player or enemy
 */
export class Bullet {
  constructor(x, y, vy, owner) {
    this.x = x
    this.y = y
    this.vy = vy // velocity Y (negative = up, positive = down)
    this.owner = owner
    this.active = true
  }

  /**
   * Update bullet state
   * @param {number} dt - Delta time in seconds
   */
  update(dt) {
    this.y += this.vy * dt

    // Deactivate if out of bounds
    if (this.y < 0 || this.y > CANVAS_H) {
      this.active = false
    }
  }

  /**
   * Deactivate this bullet
   */
  deactivate() {
    this.active = false
  }

  /**
   * Draw bullet
   * @param {CanvasRenderingContext2D} ctx
   */
  draw(ctx) {
    ctx.fillStyle = this.owner === BULLET_OWNER.PLAYER ? COLOR_BULLET_P : COLOR_BULLET_E
    ctx.fillRect(this.x, this.y, BULLET_WIDTH, BULLET_HEIGHT)
  }

  // Getters
  get width() {
    return BULLET_WIDTH
  }

  get height() {
    return BULLET_HEIGHT
  }
}
