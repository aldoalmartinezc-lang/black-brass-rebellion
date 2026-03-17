import { describe, it, expect, beforeEach } from 'vitest'
import { Bullet, BULLET_OWNER } from '../../../src/entities/Bullet.js'
import { CANVAS_H } from '../../../src/utils/constants.js'

describe('Bullet', () => {
  let bullet

  beforeEach(() => {
    bullet = new Bullet(280, 400, -500, BULLET_OWNER.PLAYER)
  })

  it('should create a bullet with initial state', () => {
    expect(bullet.x).toBe(280)
    expect(bullet.y).toBe(400)
    expect(bullet.vy).toBe(-500)
    expect(bullet.owner).toBe(BULLET_OWNER.PLAYER)
    expect(bullet.active).toBe(true)
  })

  it('should have correct dimensions', () => {
    expect(bullet.width).toBe(3)
    expect(bullet.height).toBe(10)
  })

  it('should move upward (negative velocity)', () => {
    const initialY = bullet.y

    bullet.update(0.1)

    expect(bullet.y).toBeLessThan(initialY)
    expect(bullet.y).toBe(initialY - 500 * 0.1)
  })

  it('should move downward with positive velocity', () => {
    const enemyBullet = new Bullet(280, 100, 200, BULLET_OWNER.ENEMY)
    const initialY = enemyBullet.y

    enemyBullet.update(0.1)

    expect(enemyBullet.y).toBeGreaterThan(initialY)
    expect(enemyBullet.y).toBe(initialY + 200 * 0.1)
  })

  it('should deactivate when going out of bounds (top)', () => {
    bullet.y = 5
    bullet.vy = -500 // Moving up

    bullet.update(0.1)

    expect(bullet.active).toBe(false)
  })

  it('should deactivate when going out of bounds (bottom)', () => {
    bullet.y = CANVAS_H - 5
    bullet.vy = 500 // Moving down

    bullet.update(0.1)

    expect(bullet.active).toBe(false)
  })

  it('should deactivate manually', () => {
    expect(bullet.active).toBe(true)

    bullet.deactivate()

    expect(bullet.active).toBe(false)
  })

  it('should distinguish between player and enemy bullets', () => {
    const playerBullet = new Bullet(280, 400, -500, BULLET_OWNER.PLAYER)
    const enemyBullet = new Bullet(280, 100, 200, BULLET_OWNER.ENEMY)

    expect(playerBullet.owner).toBe(BULLET_OWNER.PLAYER)
    expect(enemyBullet.owner).toBe(BULLET_OWNER.ENEMY)
  })
})
