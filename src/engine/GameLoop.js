import { DT_CAP } from '../utils/constants.js'

/**
 * Main game loop using requestAnimationFrame
 * Handles delta time calculation, pause/resume, and FPS tracking
 */
export class GameLoop {
  constructor(updateFn, renderFn) {
    this.updateFn = updateFn
    this.renderFn = renderFn

    this.isRunning = false
    this.isPaused = false

    this.lastTime = 0
    this.frameId = null

    // FPS tracking
    this.fpsFrames = []
    this.fps = 60

    // Pause state
    this.pausedDt = 0
  }

  /**
   * Start the game loop
   */
  start() {
    if (this.isRunning) return

    this.isRunning = true
    this.isPaused = false
    this.lastTime = performance.now()
    this.frameId = requestAnimationFrame((time) => this._frame(time))
  }

  /**
   * Stop the game loop
   */
  stop() {
    if (!this.isRunning) return

    this.isRunning = false
    this.isPaused = false

    if (this.frameId !== null) {
      cancelAnimationFrame(this.frameId)
      this.frameId = null
    }
  }

  /**
   * Pause the game loop (keeps dt frozen)
   */
  pause() {
    this.isPaused = true
  }

  /**
   * Resume the game loop from pause
   */
  resume() {
    this.isPaused = false
    this.lastTime = performance.now()
  }

  /**
   * Internal frame handler
   * @private
   */
  _frame(currentTime) {
    if (!this.isRunning) return

    // Calculate delta time
    let dt = (currentTime - this.lastTime) / 1000 // Convert to seconds
    this.lastTime = currentTime

    // Cap delta time to prevent large jumps
    dt = Math.min(dt, DT_CAP)

    // Track FPS (rolling average of last 60 frames)
    this.fpsFrames.push(dt > 0 ? 1 / dt : 0)
    if (this.fpsFrames.length > 60) {
      this.fpsFrames.shift()
    }
    this.fps = this.fpsFrames.reduce((a, b) => a + b, 0) / this.fpsFrames.length

    // Update and render
    if (!this.isPaused) {
      this.updateFn(dt)
    }
    this.renderFn()

    // Schedule next frame
    this.frameId = requestAnimationFrame((time) => this._frame(time))
  }

  /**
   * Get current FPS (rolling average)
   * @returns {number}
   */
  get fps() {
    return this._fps || 0
  }

  set fps(value) {
    this._fps = value
  }

  /**
   * Check if game loop is running
   * @returns {boolean}
   */
  get running() {
    return this.isRunning
  }
}
