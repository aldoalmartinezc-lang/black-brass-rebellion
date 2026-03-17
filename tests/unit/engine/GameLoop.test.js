import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest'
import { GameLoop } from '../../../src/engine/GameLoop.js'

describe('GameLoop', () => {
  let gameLoop
  let updateFn
  let renderFn

  beforeEach(() => {
    updateFn = vi.fn()
    renderFn = vi.fn()
    gameLoop = new GameLoop(updateFn, renderFn)
  })

  afterEach(() => {
    gameLoop.stop()
  })

  it('should create a GameLoop instance', () => {
    expect(gameLoop).toBeDefined()
    expect(gameLoop.running).toBe(false)
  })

  it('should start and stop the game loop', () => {
    gameLoop.start()
    expect(gameLoop.running).toBe(true)

    gameLoop.stop()
    expect(gameLoop.running).toBe(false)
  })

  it('should pause and resume the game loop', () => {
    gameLoop.start()
    expect(gameLoop.running).toBe(true)

    gameLoop.pause()
    // Should still be running but paused
    expect(gameLoop.running).toBe(true)

    gameLoop.resume()
    expect(gameLoop.running).toBe(true)
  })

  it('should call update and render functions', (done) => {
    gameLoop.start()

    // Wait a bit for the first frame
    setTimeout(() => {
      gameLoop.stop()
      expect(updateFn).toHaveBeenCalled()
      expect(renderFn).toHaveBeenCalled()
      done()
    }, 50)
  })

  it('should cap delta time to DT_CAP', (done) => {
    gameLoop.start()

    setTimeout(() => {
      gameLoop.stop()
      const calls = updateFn.mock.calls
      calls.forEach((call) => {
        const dt = call[0]
        expect(dt).toBeLessThanOrEqual(0.05) // DT_CAP = 0.05
      })
      done()
    }, 100)
  })

  it('should track FPS', (done) => {
    gameLoop.start()

    setTimeout(() => {
      gameLoop.stop()
      expect(gameLoop.fps).toBeGreaterThan(0)
      expect(gameLoop.fps).toBeLessThanOrEqual(10000) // Reasonable FPS range
      done()
    }, 100)
  })

  it('should not call update when paused', (done) => {
    gameLoop.pause()
    gameLoop.start()

    const initialCallCount = updateFn.mock.calls.length

    setTimeout(() => {
      gameLoop.stop()
      const finalCallCount = updateFn.mock.calls.length
      expect(finalCallCount).toBe(initialCallCount)
      done()
    }, 50)
  })
})
