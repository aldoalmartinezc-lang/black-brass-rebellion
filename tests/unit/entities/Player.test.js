import { describe, it, expect, beforeEach } from 'vitest'
import { Player } from '../../../src/entities/Player.js'
import { InputManager } from '../../../src/engine/InputManager.js'
import { Bullet, BULLET_OWNER } from '../../../src/entities/Bullet.js'
import { PLAYER_INITIAL_LIVES, CANVAS_W } from '../../../src/utils/constants.js'

describe('Player', () => {
  let player
  let input

  beforeEach(() => {
    player = new Player(260, 400)
    input = new InputManager()
  })

  it('should create a player with initial lives', () => {
    expect(player.lives).toBe(PLAYER_INITIAL_LIVES)
    expect(player.isDead).toBe(false)
  })

  it('should have initial properties', () => {
    expect(player.width).toBe(32)
    expect(player.height).toBe(18)
    expect(player.isInvincible).toBe(false)
    expect(player.invincibilityTimer).toBe(0)
  })

  it('should move left', () => {
    const bullets = []
    const initialX = player.x

    // Simulate left key press
    const leftEvent = new KeyboardEvent('keydown', { code: 'ArrowLeft' })
    document.dispatchEvent(leftEvent)
    input.update()

    player.update(0.1, input, bullets)
    expect(player.x).toBeLessThan(initialX)
  })

  it('should move right', () => {
    const bullets = []
    const initialX = player.x

    // Simulate right key press
    const rightEvent = new KeyboardEvent('keydown', { code: 'ArrowRight' })
    document.dispatchEvent(rightEvent)
    input.update()

    player.update(0.1, input, bullets)
    expect(player.x).toBeGreaterThan(initialX)
  })

  it('should clamp x position within canvas bounds', () => {
    const bullets = []

    // Move left
    for (let i = 0; i < 100; i++) {
      const leftEvent = new KeyboardEvent('keydown', { code: 'ArrowLeft' })
      document.dispatchEvent(leftEvent)
      input.update()
      player.update(0.1, input, bullets)
    }

    expect(player.x).toBeGreaterThanOrEqual(0)

    // Move right
    for (let i = 0; i < 100; i++) {
      const rightEvent = new KeyboardEvent('keydown', { code: 'ArrowRight' })
      document.dispatchEvent(rightEvent)
      input.update()
      player.update(0.1, input, bullets)
    }

    expect(player.x).toBeLessThanOrEqual(CANVAS_W - player.width)
  })

  it('should fire bullets with cooldown', () => {
    const bullets = []

    // Fire first bullet
    const spaceEvent1 = new KeyboardEvent('keydown', { code: 'Space' })
    document.dispatchEvent(spaceEvent1)

    player.update(0.1, input, bullets)
    expect(bullets).toHaveLength(1)

    // Try fire again immediately
    const spaceEvent2 = new KeyboardEvent('keydown', { code: 'Space' })
    document.dispatchEvent(spaceEvent2)

    player.update(0.01, input, bullets)
    expect(bullets).toHaveLength(1) // No new bullet due to cooldown

    // Wait for cooldown
    player.update(0.4, input, bullets)
    document.dispatchEvent(spaceEvent2)
    player.update(0.01, input, bullets)
    expect(bullets).toHaveLength(2) // New bullet after cooldown
  })

  it('should take damage and activate invincibility', () => {
    expect(player.isInvincible).toBe(false)
    expect(player.lives).toBe(PLAYER_INITIAL_LIVES)

    player.takeDamage()

    expect(player.isInvincible).toBe(true)
    expect(player.lives).toBe(PLAYER_INITIAL_LIVES - 1)
  })

  it('should die when lives reach 0', () => {
    player.lives = 1
    expect(player.isDead).toBe(false)

    player.takeDamage()
    expect(player.isDead).toBe(true)
    expect(player.lives).toBe(0)
  })

  it('should reset position but not lives', () => {
    player.lives = 1
    player.x = 100
    player.y = 100

    player.reset()

    expect(player.lives).toBe(1)
    expect(player.x).toBeCloseTo((CANVAS_W - player.width) / 2, 0)
    expect(player.bulletCooldown).toBe(0)
    expect(player.invincibilityTimer).toBe(0)
  })

  it('should lose invincibility after duration', () => {
    player.takeDamage()
    expect(player.isInvincible).toBe(true)

    player.invincibilityTimer = 0.1
    player.update(0.2, input, [])

    expect(player.isInvincible).toBe(false)
  })
})
