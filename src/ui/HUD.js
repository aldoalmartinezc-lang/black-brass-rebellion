import { spriteRenderer } from '../utils/spriteRenderer.js'
import { COLOR_HUD } from '../utils/constants.js'

/**
 * HUD - Heads Up Display showing score, level, and lives
 */
export class HUD {
  constructor(scoreSystem, levelSystem, player) {
    this.scoreSystem = scoreSystem
    this.levelSystem = levelSystem
    this.player = player
  }

  /**
   * Draw HUD
   * @param {CanvasRenderingContext2D} ctx
   * @param {number} canvasWidth
   * @param {number} canvasHeight
   */
  draw(ctx, canvasWidth, canvasHeight) {
    ctx.fillStyle = COLOR_HUD
    ctx.font = 'bold 12px monospace'

    // Score (top left)
    spriteRenderer.drawText(ctx, `SCORE: ${this.scoreSystem.score}`, 10, 10, {
      font: 'bold 12px monospace',
      color: COLOR_HUD,
    })

    // Level (top center)
    spriteRenderer.drawCenteredText(ctx, `LEVEL: ${this.levelSystem.level + 1}`, canvasWidth / 2, 10, {
      font: 'bold 12px monospace',
      color: COLOR_HUD,
    })

    // Hi-Score (top right)
    spriteRenderer.drawText(ctx, `HI: ${this.scoreSystem.hiScore}`, canvasWidth - 120, 10, {
      font: 'bold 12px monospace',
      color: COLOR_HUD,
    })

    // Lives (bottom left)
    spriteRenderer.drawText(ctx, `LIVES: ${this.player.lives}`, 10, canvasHeight - 20, {
      font: 'bold 12px monospace',
      color: COLOR_HUD,
    })

    // Draw life icons
    const lifeIconX = 85
    const lifeIconY = canvasHeight - 18
    for (let i = 0; i < this.player.lives; i++) {
      ctx.fillRect(lifeIconX + i * 12, lifeIconY, 8, 4)
    }
  }
}
