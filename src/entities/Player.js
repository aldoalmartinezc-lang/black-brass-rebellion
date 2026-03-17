import {
  CANVAS_W,
  PLAYER_Y,
  PLAYER_SPEED,
  PLAYER_BULLET_SPEED,
  BULLET_COOLDOWN,
  PLAYER_WIDTH,
  PLAYER_HEIGHT,
  PLAYER_INITIAL_LIVES,
  PLAYER_INVINCIBILITY_DURATION,
} from '../utils/constants.js'
import { clamp } from '../utils/math.js'
import { Bullet, BULLET_OWNER } from './Bullet.js'

/**
 * Player entity - the Black ship
 */
export class Player {
  constructor(x, y) {
    this.x = x
    this.y = y
    this._width = PLAYER_WIDTH
    this._height = PLAYER_HEIGHT

    this.lives = PLAYER_INITIAL_LIVES
    this.invincibilityTimer = 0
    this.bulletCooldown = 0

    // Velocity
    this.vx = 0
  }

  /**
   * Update player state
   * @param {number} dt - Delta time in seconds
   * @param {InputManager} input
   * @param {Bullet[]} bullets - Bullet array to push new bullets to
   */
  update(dt, input, bullets) {
    // Horizontal movement
    this.vx = 0
    if (input.left) {
      this.vx = -PLAYER_SPEED
    }
    if (input.right) {
      this.vx = PLAYER_SPEED
    }

    this.x += this.vx * dt
    this.x = clamp(this.x, 0, CANVAS_W - this._width)

    // Shooting
    this.bulletCooldown -= dt
    if (input.fire && this.bulletCooldown <= 0) {
      const bulletX = this.x + this._width / 2 - 1.5 // Center the bullet
      const bulletY = this.y - 10
      bullets.push(new Bullet(bulletX, bulletY, -PLAYER_BULLET_SPEED, BULLET_OWNER.PLAYER))
      this.bulletCooldown = BULLET_COOLDOWN
    }

    // Update invincibility timer
    this.invincibilityTimer -= dt
    if (this.invincibilityTimer < 0) {
      this.invincibilityTimer = 0
    }
  }

  /**
   * Take damage - reduce life and activate invincibility
   */
  takeDamage() {
    this.lives -= 1
    this.invincibilityTimer = PLAYER_INVINCIBILITY_DURATION
  }

  /**
   * Reset player position and timers (but not lives)
   */
  reset() {
    this.x = (CANVAS_W - this._width) / 2
    this.y = PLAYER_Y
    this.vx = 0
    this.bulletCooldown = 0
    this.invincibilityTimer = 0
  }

  /**
   * Draw player
   * @param {CanvasRenderingContext2D} ctx
   */
  draw(ctx) {
    // Blink when invincible
    if (this.isInvincible && Math.floor(this.invincibilityTimer * 10) % 2 === 0) {
      return
    }

    // Simple triangle for player ship
    ctx.fillStyle = '#00ff00'
    ctx.beginPath()
    ctx.moveTo(this.x + this._width / 2, this.y) // Top point
    ctx.lineTo(this.x, this.y + this._height) // Bottom left
    ctx.lineTo(this.x + this._width, this.y + this._height) // Bottom right
    ctx.closePath()
    ctx.fill()
  }

  // Getters
  get width() {
    return this._width
  }

  get height() {
    return this._height
  }

  get isInvincible() {
    return this.invincibilityTimer > 0
  }

  get isDead() {
    return this.lives <= 0
  }
}
