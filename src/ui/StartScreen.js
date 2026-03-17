import { spriteRenderer } from '../utils/spriteRenderer.js'
import { CANVAS_W, CANVAS_H } from '../utils/constants.js'

/**
 * Start screen - game intro with lore
 */
export class StartScreen {
  constructor() {
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
   * Draw start screen
   * @param {CanvasRenderingContext2D} ctx
   */
  draw(ctx) {
    // Background
    ctx.fillStyle = '#000000'
    ctx.fillRect(0, 0, CANVAS_W, CANVAS_H)

    // Title
    ctx.save()
    ctx.globalAlpha = this.alpha
    spriteRenderer.drawCenteredText(ctx, 'BLACK: BRASS REBELLION', CANVAS_W / 2, 60, {
      font: 'bold 24px monospace',
      color: '#00ff00',
    })

    // Lore
    const loreLines = [
      'In the year 2847, rogue AIs',
      'invade the Black Sector.',
      '',
      'You are the last defender.',
      '',
      'Protect humanity from',
      'the Brass Rebellion.',
    ]

    let y = 120
    for (const line of loreLines) {
      if (line === '') {
        y += 10
        continue
      }
      spriteRenderer.drawCenteredText(ctx, line, CANVAS_W / 2, y, {
        font: '12px monospace',
        color: '#00ff00',
      })
      y += 20
    }

    // Instructions
    y += 20
    spriteRenderer.drawCenteredText(ctx, 'ARROW KEYS / TOUCH TO MOVE', CANVAS_W / 2, y, {
      font: '10px monospace',
      color: '#ffff00',
    })

    y += 15
    spriteRenderer.drawCenteredText(ctx, 'SPACE / TAP TO SHOOT', CANVAS_W / 2, y, {
      font: '10px monospace',
      color: '#ffff00',
    })

    y += 25
    spriteRenderer.drawCenteredText(ctx, 'PRESS SPACE TO START', CANVAS_W / 2, y, {
      font: 'bold 14px monospace',
      color: '#ff0000',
    })

    ctx.restore()
  }
}
