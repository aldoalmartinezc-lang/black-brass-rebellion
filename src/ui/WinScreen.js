import { spriteRenderer } from '../utils/spriteRenderer.js'
import { CANVAS_W, CANVAS_H } from '../utils/constants.js'

/**
 * Win screen - victory screen
 */
export class WinScreen {
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
   * Draw win screen
   * @param {CanvasRenderingContext2D} ctx
   */
  draw(ctx) {
    // Background
    ctx.fillStyle = '#000000'
    ctx.fillRect(0, 0, CANVAS_W, CANVAS_H)

    ctx.save()
    ctx.globalAlpha = this.alpha

    // Title
    spriteRenderer.drawCenteredText(ctx, 'VICTORY', CANVAS_W / 2, 60, {
      font: 'bold 40px monospace',
      color: '#00ff00',
    })

    // Victory message
    const messages = [
      'You have saved humanity.',
      '',
      'The Brass Rebellion is defeated.',
      'The Black Sector is secure.',
      '',
      'Rest now, brave defender.',
    ]

    let y = 140
    for (const msg of messages) {
      if (msg === '') {
        y += 10
        continue
      }
      spriteRenderer.drawCenteredText(ctx, msg, CANVAS_W / 2, y, {
        font: '14px monospace',
        color: '#00ff00',
      })
      y += 20
    }

    // Score
    spriteRenderer.drawCenteredText(ctx, `FINAL SCORE: ${this.score}`, CANVAS_W / 2, 280, {
      font: 'bold 16px monospace',
      color: '#ffff00',
    })

    // Instructions
    y += 20
    spriteRenderer.drawCenteredText(ctx, 'PRESS SPACE TO RETURN TO TITLE', CANVAS_W / 2, 350, {
      font: '12px monospace',
      color: '#00ff00',
    })

    ctx.restore()
  }
}
