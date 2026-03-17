import { spriteRenderer } from '../utils/spriteRenderer.js'
import { CANVAS_W, CANVAS_H } from '../utils/constants.js'

/**
 * Level transition screen
 */
export class LevelScreen {
  constructor(levelNumber) {
    this.levelNumber = levelNumber
    this.alpha = 0
    this.displayTime = 0
    this.maxDisplayTime = 3.0 // Show for 3 seconds
  }

  /**
   * Update screen
   * @param {number} dt
   */
  update(dt) {
    this.displayTime += dt
    if (this.displayTime < 0.5) {
      this.alpha = this.displayTime / 0.5
    } else if (this.displayTime > this.maxDisplayTime - 0.5) {
      this.alpha = (this.maxDisplayTime - this.displayTime) / 0.5
    } else {
      this.alpha = 1.0
    }
  }

  /**
   * Check if screen display is complete
   * @returns {boolean}
   */
  isComplete() {
    return this.displayTime >= this.maxDisplayTime
  }

  /**
   * Draw level screen
   * @param {CanvasRenderingContext2D} ctx
   */
  draw(ctx) {
    // Semi-transparent overlay
    ctx.fillStyle = 'rgba(0, 0, 0, 0.6)'
    ctx.fillRect(0, 0, CANVAS_W, CANVAS_H)

    ctx.save()
    ctx.globalAlpha = this.alpha

    // Level display
    spriteRenderer.drawCenteredText(ctx, `LEVEL ${this.levelNumber + 1}`, CANVAS_W / 2, 120, {
      font: 'bold 28px monospace',
      color: '#00ff00',
    })

    // Narrative text
    const narratives = [
      'Deeper in the sector...',
      'Hostile activity increases...',
      'The enemy adapts...',
      'New threats emerge...',
      'Final stand approaches...',
      'Ultimate challenge...',
    ]

    const narrative = narratives[Math.min(this.levelNumber, narratives.length - 1)]
    spriteRenderer.drawCenteredText(ctx, narrative, CANVAS_W / 2, 200, {
      font: 'bold 16px monospace',
      color: '#ffff00',
    })

    spriteRenderer.drawCenteredText(ctx, 'PREPARE FOR BATTLE', CANVAS_W / 2, 280, {
      font: '12px monospace',
      color: '#00ff00',
    })

    ctx.restore()
  }
}
