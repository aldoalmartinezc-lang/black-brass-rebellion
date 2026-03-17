import { SHIELD_BLOCK_SIZE, COLOR_SHIELD } from '../utils/constants.js'

/**
 * Shield entity - destructible bunker with grid-based blocks
 */
export class Shield {
  constructor(x, y) {
    this.x = x
    this.y = y

    // Shield shape - 7 rows, 5 blocks per row
    // True = block exists, False = destroyed
    this.grid = [
      [true, true, true, true, true],
      [true, true, true, true, true],
      [true, true, true, true, true],
      [true, false, true, false, true],
      [true, false, false, false, true],
      [false, false, false, false, false],
      [false, false, false, false, false],
    ]

    this.blockSize = SHIELD_BLOCK_SIZE
    this.gridWidth = 5
    this.gridHeight = this.grid.length
  }

  /**
   * Check collision between bullet and shield
   * @param {Bullet} bullet
   * @returns {boolean}
   */
  checkBulletCollision(bullet) {
    // Get bullet grid coordinates
    const bulletGridX = Math.floor((bullet.x - this.x) / this.blockSize)
    const bulletGridY = Math.floor((bullet.y - this.y) / this.blockSize)

    if (
      bulletGridX < 0 ||
      bulletGridX >= this.gridWidth ||
      bulletGridY < 0 ||
      bulletGridY >= this.gridHeight
    ) {
      return false
    }

    if (!this.grid[bulletGridY]?.[bulletGridX]) {
      return false
    }

    // Destroy block
    this.grid[bulletGridY][bulletGridX] = false

    // Erode adjacent blocks
    this.erodeBlock(bulletGridX - 1, bulletGridY)
    this.erodeBlock(bulletGridX + 1, bulletGridY)
    this.erodeBlock(bulletGridX, bulletGridY - 1)
    this.erodeBlock(bulletGridX, bulletGridY + 1)

    bullet.deactivate()
    return true
  }

  /**
   * Erode a block if it exists
   * @private
   */
  erodeBlock(gridX, gridY) {
    if (
      gridX >= 0 &&
      gridX < this.gridWidth &&
      gridY >= 0 &&
      gridY < this.gridHeight &&
      this.grid[gridY][gridX]
    ) {
      this.grid[gridY][gridX] = false
    }
  }

  /**
   * Erode shield from bottom (when invader reaches it)
   * @param {number} invaderY
   */
  erodeFromBottom(invaderY) {
    const relativeY = invaderY - this.y
    const gridY = Math.floor(relativeY / this.blockSize)

    // Destroy all blocks at or below invader
    for (let row = gridY; row < this.gridHeight; row++) {
      for (let col = 0; col < this.gridWidth; col++) {
        this.grid[row][col] = false
      }
    }
  }

  /**
   * Check if shield is completely destroyed
   * @returns {boolean}
   */
  get isEmpty() {
    for (const row of this.grid) {
      for (const block of row) {
        if (block) return false
      }
    }
    return true
  }

  /**
   * Get shield bounds
   * @returns {Object} {x, y, width, height}
   */
  get bounds() {
    return {
      x: this.x,
      y: this.y,
      width: this.gridWidth * this.blockSize,
      height: this.gridHeight * this.blockSize,
    }
  }

  /**
   * Reset shield (regenerate blocks)
   * @param {number} percentage - 0-1, percentage of blocks to regenerate
   */
  reset(percentage) {
    // Restore all blocks
    this.grid = [
      [true, true, true, true, true],
      [true, true, true, true, true],
      [true, true, true, true, true],
      [true, false, true, false, true],
      [true, false, false, false, true],
      [false, false, false, false, false],
      [false, false, false, false, false],
    ]

    // Destroy percentage of blocks
    if (percentage < 1.0) {
      const totalBlocks = this.gridWidth * this.gridHeight
      const blocksToDestroy = Math.floor(totalBlocks * (1 - percentage))
      let destroyed = 0

      for (let row = 0; row < this.gridHeight && destroyed < blocksToDestroy; row++) {
        for (let col = 0; col < this.gridWidth && destroyed < blocksToDestroy; col++) {
          if (this.grid[row][col]) {
            this.grid[row][col] = false
            destroyed++
          }
        }
      }
    }
  }

  /**
   * Draw shield
   * @param {CanvasRenderingContext2D} ctx
   */
  draw(ctx) {
    ctx.fillStyle = COLOR_SHIELD

    for (let row = 0; row < this.gridHeight; row++) {
      for (let col = 0; col < this.gridWidth; col++) {
        if (this.grid[row][col]) {
          const blockX = this.x + col * this.blockSize
          const blockY = this.y + row * this.blockSize
          ctx.fillRect(blockX, blockY, this.blockSize, this.blockSize)
        }
      }
    }
  }
}
