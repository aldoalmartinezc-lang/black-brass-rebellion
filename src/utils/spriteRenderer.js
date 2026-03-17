import { COLOR_PLAYER, COLOR_ALIEN_TOP, COLOR_ALIEN_MID, COLOR_ALIEN_BOT, COLOR_BULLET_P, COLOR_BULLET_E } from '../utils/constants.js'

/**
 * Sprite rendering utilities
 */
export const spriteRenderer = {
  /**
   * Draw player ship
   */
  drawPlayer(ctx, player) {
    // Blink when invincible
    if (player.isInvincible && Math.floor(player.invincibilityTimer * 10) % 2 === 0) {
      return
    }

    ctx.fillStyle = COLOR_PLAYER
    ctx.beginPath()
    ctx.moveTo(player.x + player.width / 2, player.y) // Top point
    ctx.lineTo(player.x, player.y + player.height) // Bottom left
    ctx.lineTo(player.x + player.width, player.y + player.height) // Bottom right
    ctx.closePath()
    ctx.fill()
  },

  /**
   * Draw invader
   */
  drawInvader(ctx, invader) {
    if (!invader.alive) return

    const color =
      invader.type === 0 ? COLOR_ALIEN_TOP : invader.type === 1 ? COLOR_ALIEN_MID : COLOR_ALIEN_BOT

    ctx.fillStyle = color

    const width = invader.frame === 0 ? invader.width : invader.width - 2
    const xOffset = invader.frame === 0 ? 0 : 1

    ctx.fillRect(invader.x + xOffset, invader.y, width, invader.height)

    // Eyes
    ctx.fillStyle = '#000000'
    ctx.fillRect(invader.x + 4 + xOffset, invader.y + 2, 2, 2)
    ctx.fillRect(invader.x + 12 + xOffset, invader.y + 2, 2, 2)
  },

  /**
   * Draw bullet
   */
  drawBullet(ctx, bullet) {
    ctx.fillStyle = bullet.owner === 'player' ? COLOR_BULLET_P : COLOR_BULLET_E
    ctx.fillRect(bullet.x, bullet.y, bullet.width, bullet.height)
  },

  /**
   * Draw UFO
   */
  drawUFO(ctx, ufo) {
    if (!ufo.active) return

    ctx.fillStyle = '#ff00ff'
    ctx.beginPath()
    ctx.ellipse(ufo.x + ufo.width / 2, ufo.y + ufo.height / 2, ufo.width / 2, ufo.height / 3, 0, 0, Math.PI * 2)
    ctx.fill()

    ctx.fillRect(ufo.x + ufo.width / 2 - 4, ufo.y + ufo.height / 2, 8, ufo.height / 2)

    ctx.fillStyle = '#ffffff'
    ctx.font = 'bold 8px monospace'
    ctx.textAlign = 'center'
    ctx.textBaseline = 'middle'
    ctx.fillText(ufo.scoreValue.toString(), ufo.x + ufo.width / 2, ufo.y + ufo.height / 2)
  },

  /**
   * Draw shield
   */
  drawShield(ctx, shield) {
    ctx.fillStyle = '#00ffff'

    for (let row = 0; row < shield.gridHeight; row++) {
      for (let col = 0; col < shield.gridWidth; col++) {
        if (shield.grid[row][col]) {
          const blockX = shield.x + col * shield.blockSize
          const blockY = shield.y + row * shield.blockSize
          ctx.fillRect(blockX, blockY, shield.blockSize, shield.blockSize)
        }
      }
    }
  },

  /**
   * Draw text centered
   */
  drawCenteredText(ctx, text, x, y, options = {}) {
    const { font = '16px monospace', color = '#00ff00', size = 16 } = options

    ctx.font = font
    ctx.fillStyle = color
    ctx.textAlign = 'center'
    ctx.textBaseline = 'middle'
    ctx.fillText(text, x, y)
  },

  /**
   * Draw text left-aligned
   */
  drawText(ctx, text, x, y, options = {}) {
    const { font = '16px monospace', color = '#00ff00' } = options

    ctx.font = font
    ctx.fillStyle = color
    ctx.textAlign = 'left'
    ctx.textBaseline = 'top'
    ctx.fillText(text, x, y)
  },
}
