import { spriteRenderer } from '../utils/spriteRenderer.js'
import { CANVAS_W, CANVAS_H } from '../utils/constants.js'

/**
 * Game Over screen
 */
export class GameOverScreen {
  constructor(score, hiScore) {
    this.score = score
    this.hiScore = hiScore
    this.alpha = 0
    this.fadeIn = true
  }

  /**
   * Update screen animation
   * @param {number} dt
   */
  update(dt) {
    if (this.fadeIn) {
      this.alpha = Math.min(this.alpha + dt, 1.0)
    }
  }

  /**
   * Draw game over screen
   * @param {CanvasRenderingContext2D} ctx
   */
  draw(ctx) {
    // Semi-transparent overlay
    ctx.fillStyle = 'rgba(0, 0, 0, 0.8)'
    ctx.fillRect(0, 0, CANVAS_W, CANVAS_H)

    ctx.save()
    ctx.globalAlpha = this.alpha

    // Title
    spriteRenderer.drawCenteredText(ctx, 'GAME OVER', CANVAS_W / 2, 80, {
      font: 'bold 32px monospace',
      color: '#ff0000',
    })

    // Score display
    spriteRenderer.drawCenteredText(ctx, `YOUR SCORE: ${this.score}`, CANVAS_W / 2, 160, {
      font: 'bold 18px monospace',
      color: '#00ff00',
    })

    // Hi-score
    if (this.score >= this.hiScore) {
      spriteRenderer.drawCenteredText(ctx, 'NEW HIGH SCORE!', CANVAS_W / 2, 200, {
        font: 'bold 16px monospace',
        color: '#ffff00',
      })
    } else {
      spriteRenderer.drawCenteredText(ctx, `HI SCORE: ${this.hiScore}`, CANVAS_W / 2, 200, {
        font: 'bold 14px monospace',
        color: '#00ff00',
      })
    }

    // Instructions
    spriteRenderer.drawCenteredText(ctx, 'PRESS SPACE TO RETURN TO TITLE', CANVAS_W / 2, 280, {
      font: '12px monospace',
      color: '#ffff00',
    })

    ctx.restore()
  }
}
