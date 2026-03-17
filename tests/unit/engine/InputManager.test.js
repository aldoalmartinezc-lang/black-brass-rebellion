import { describe, it, expect, beforeEach, afterEach } from 'vitest'
import { InputManager } from '../../../src/engine/InputManager.js'

describe('InputManager', () => {
  let inputManager

  beforeEach(() => {
    inputManager = new InputManager()
  })

  afterEach(() => {
    inputManager.destroy()
  })

  it('should create an InputManager instance', () => {
    expect(inputManager).toBeDefined()
    expect(inputManager.left).toBe(false)
    expect(inputManager.right).toBe(false)
    expect(inputManager.fire).toBe(false)
    expect(inputManager.pause).toBe(false)
    expect(inputManager.start).toBe(false)
  })

  it('should detect left key (ArrowLeft)', () => {
    const event = new KeyboardEvent('keydown', { code: 'ArrowLeft' })
    document.dispatchEvent(event)
    inputManager.update()

    expect(inputManager.left).toBe(true)
    expect(inputManager.right).toBe(false)
  })

  it('should detect right key (ArrowRight)', () => {
    const event = new KeyboardEvent('keydown', { code: 'ArrowRight' })
    document.dispatchEvent(event)
    inputManager.update()

    expect(inputManager.right).toBe(true)
    expect(inputManager.left).toBe(false)
  })

  it('should detect fire key (Space)', () => {
    const event = new KeyboardEvent('keydown', { code: 'Space' })
    document.dispatchEvent(event)

    expect(inputManager.fire).toBe(true)

    inputManager.update()
    expect(inputManager.fire).toBe(false)
  })

  it('should detect pause key (KeyP)', () => {
    const event = new KeyboardEvent('keydown', { code: 'KeyP' })
    document.dispatchEvent(event)

    expect(inputManager.pause).toBe(true)

    inputManager.update()
    expect(inputManager.pause).toBe(false)
  })

  it('should detect start key (Enter)', () => {
    const event = new KeyboardEvent('keydown', { code: 'Enter' })
    document.dispatchEvent(event)

    expect(inputManager.start).toBe(true)

    inputManager.update()
    expect(inputManager.start).toBe(false)
  })

  it('should release keys on keyup', () => {
    // Press ArrowLeft
    const keyDownEvent = new KeyboardEvent('keydown', { code: 'ArrowLeft' })
    document.dispatchEvent(keyDownEvent)
    inputManager.update()
    expect(inputManager.left).toBe(true)

    // Release ArrowLeft
    const keyUpEvent = new KeyboardEvent('keyup', { code: 'ArrowLeft' })
    document.dispatchEvent(keyUpEvent)
    inputManager.update()
    expect(inputManager.left).toBe(false)
  })

  it('should clean up event listeners', () => {
    inputManager.destroy()

    const event = new KeyboardEvent('keydown', { code: 'Space' })
    document.dispatchEvent(event)
    inputManager.update()

    // After destroy, fire should not be detected
    expect(inputManager.fire).toBe(false)
  })

  it('should maintain continuous key states', () => {
    const event1 = new KeyboardEvent('keydown', { code: 'ArrowLeft' })
    document.dispatchEvent(event1)

    const event2 = new KeyboardEvent('keydown', { code: 'ArrowRight' })
    document.dispatchEvent(event2)

    inputManager.update()

    expect(inputManager.left).toBe(true)
    expect(inputManager.right).toBe(true)
  })
})
