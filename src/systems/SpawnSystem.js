import { Invader, INVADER_TYPES } from '../entities/Invader.js'
import {
  INVADER_COLS,
  INVADER_ROWS,
  INVADER_CELL_W,
  INVADER_CELL_H,
  INVADER_GRID_OFFSET_X,
  INVADER_GRID_OFFSET_Y,
  INVADER_STEP_DOWN,
  CANVAS_W,
} from '../utils/constants.js'
import { randomInt } from '../utils/math.js'

/**
 * Spawn system - manages invader formation and UFO timers
 */
export class SpawnSystem {
  constructor() {
    this.invaders = []
    this.invaderDirection = 1 // 1 for right, -1 for left
    this.invaderSpeed = 30 // px/s
    this.invaderAccelerator = 0 // Speed increase from kills

    this.ufoTimer = 0
    this.ufoNextSpawnTime = 0
    this.animationFrame = 0
    this.animationCounter = 0

    this.spawnInitialFormation()
  }

  /**
   * Spawn initial invader formation
   */
  spawnInitialFormation() {
    this.invaders = []

    for (let row = 0; row < INVADER_ROWS; row++) {
      for (let col = 0; col < INVADER_COLS; col++) {
        const type =
          row === 0 ? INVADER_TYPES.TOP : row === 1 ? INVADER_TYPES.TOP : row === 2 ? INVADER_TYPES.MID : INVADER_TYPES.BOT

        const x = INVADER_GRID_OFFSET_X + col * INVADER_CELL_W
        const y = INVADER_GRID_OFFSET_Y + row * INVADER_CELL_H

        this.invaders.push(new Invader(col, row, type, x, y))
      }
    }

    this.ufoNextSpawnTime = randomInt(25, 35)
  }

  /**
   * Update spawn system
   * @param {number} dt - Delta time in seconds
   * @param {number} killCount - Number of invaders killed this level
   */
  update(dt, killCount = 0) {
    // Update animation frame
    this.animationCounter += dt
    if (this.animationCounter >= 0.5) {
      this.animationFrame = 1 - this.animationFrame
      this.animationCounter = 0
    }

    // Update invader formation
    const currentSpeed = this.invaderSpeed + killCount * 2
    const moveX = currentSpeed * this.invaderDirection * dt

    let hitEdge = false
    let maxX = 0
    let minX = CANVAS_W

    // Update positions and check for edge
    for (const invader of this.invaders) {
      invader.updatePosition(moveX, 0)
      invader.updateAnimation(this.animationFrame)

      if (invader.x < minX) {
        minX = invader.x
      }
      if (invader.x + invader.width > maxX) {
        maxX = invader.x + invader.width
      }
    }

    // Check boundaries
    if (minX <= 0 || maxX >= CANVAS_W) {
      hitEdge = true
    }

    // Step down and reverse direction
    if (hitEdge) {
      this.invaderDirection *= -1

      for (const invader of this.invaders) {
        invader.updatePosition(0, INVADER_STEP_DOWN)
      }
    }

    // Update UFO timer
    this.ufoTimer += dt
  }

  /**
   * Check if UFO should spawn
   * @returns {boolean}
   */
  shouldSpawnUFO() {
    return this.ufoTimer >= this.ufoNextSpawnTime
  }

  /**
   * Reset UFO timer after spawn
   */
  resetUFOTimer() {
    this.ufoTimer = 0
    this.ufoNextSpawnTime = randomInt(25, 35)
  }

  /**
   * Check if all invaders are dead
   * @returns {boolean}
   */
  allInvadersDead() {
    return this.invaders.every((inv) => !inv.alive)
  }

  /**
   * Regenerate invaders for next level
   * @param {number} percentage - Percentage to regenerate (0-1)
   */
  regenerateInvaders(percentage) {
    this.spawnInitialFormation()

    // Reduce health if needed (in this version, just respawn all)
    if (percentage < 1.0) {
      const killCount = Math.floor(this.invaders.length * (1 - percentage))
      const invadersToKill = this.invaders.slice(0, killCount)
      invadersToKill.forEach((inv) => inv.kill())
    }
  }

  /**
   * Get all alive invaders
   * @returns {Invader[]}
   */
  getAliveInvaders() {
    return this.invaders.filter((inv) => inv.alive)
  }

  /**
   * Get invader count
   * @returns {number}
   */
  get invaderCount() {
    return this.invaders.length
  }

  /**
   * Get alive invader count
   * @returns {number}
   */
  get aliveInvaderCount() {
    return this.getAliveInvaders().length
  }

  /**
   * Set invader speed
   * @param {number} speed
   */
  setInvaderSpeed(speed) {
    this.invaderSpeed = speed
  }
}
