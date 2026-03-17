import { UFO_Y, UFO_SPEED, UFO_WIDTH, UFO_HEIGHT, COLOR_UFO, CANVAS_W } from '../utils/constants.js'
import { randomInt } from '../utils/math.js'

/**
 * UFO entity - special ship that grants bonus points
 */
export class UFO {
  constructor() {
    this.x = 0
    this.y = UFO_Y
    this.active = false
    this.scoreValue = 0
  }

  /**
   * Spawn UFO from left side
   * Assigns random score value based on probabilites
   */
  spawn() {
    this.x = -UFO_WIDTH
    this.active = true

    // Score value probabilities (typical Space Invaders style)
    const roll = Math.random()
    if (roll < 0.4) {
      this.scoreValue = 50
    } else if (roll < 0.7) {
      this.scoreValue = 75
    } else if (roll < 0.9) {
      this.scoreValue = 100
    } else {
      this.scoreValue = 150
    }
  }

  /**
   * Update UFO position
   * @param {number} dt - Delta time in seconds
   */
  update(dt) {
    if (!this.active) return

    this.x += UFO_SPEED * dt

    // Deactivate if out of bounds
    if (this.x > CANVAS_W + UFO_WIDTH) {
      this.active = false
    }
  }

  /**
   * Hit UFO - deactivate and return score value
   * @returns {number} Score value
   */
  hit() {
    if (!this.active) return 0

    const value = this.scoreValue
    this.deactivate()
    return value
  }

  /**
   * Deactivate UFO
   */
  deactivate() {
    this.active = false
  }

  /**
   * Draw UFO
   * @param {CanvasRenderingContext2D} ctx
   */
  draw(ctx) {
    if (!this.active) return

    ctx.fillStyle = COLOR_UFO

    // Simple UFO shape - oval with detail
    ctx.beginPath()
    ctx.ellipse(this.x + UFO_WIDTH / 2, this.y + UFO_HEIGHT / 2, UFO_WIDTH / 2, UFO_HEIGHT / 3, 0, 0, Math.PI * 2)
    ctx.fill()

    // Bottom protrusion
    ctx.fillRect(this.x + UFO_WIDTH / 2 - 4, this.y + UFO_HEIGHT / 2, 8, UFO_HEIGHT / 2)

    // Draw score value as text (for visual feedback)
    ctx.fillStyle = '#ffffff'
    ctx.font = 'bold 8px monospace'
    ctx.textAlign = 'center'
    ctx.textBaseline = 'middle'
    ctx.fillText(this.scoreValue.toString(), this.x + UFO_WIDTH / 2, this.y + UFO_HEIGHT / 2)
  }

  // Getters
  get width() {
    return UFO_WIDTH
  }

  get height() {
    return UFO_HEIGHT
  }
}
