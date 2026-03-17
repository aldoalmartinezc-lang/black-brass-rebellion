import { describe, it, expect, beforeEach } from 'vitest'
import { Invader, INVADER_TYPES } from '../../../src/entities/Invader.js'

describe('Invader', () => {
  let invader

  beforeEach(() => {
    invader = new Invader(0, 0, INVADER_TYPES.MID, 100, 100)
  })

  it('should create an invader with initial state', () => {
    expect(invader.col).toBe(0)
    expect(invader.row).toBe(0)
    expect(invader.type).toBe(INVADER_TYPES.MID)
    expect(invader.x).toBe(100)
    expect(invader.y).toBe(100)
    expect(invader.alive).toBe(true)
    expect(invader.frame).toBe(0)
  })

  it('should have correct dimensions', () => {
    expect(invader.width).toBe(24)
    expect(invader.height).toBe(16)
  })

  it('should have correct points for each type', () => {
    const topInvader = new Invader(0, 0, INVADER_TYPES.TOP, 100, 100)
    const midInvader = new Invader(0, 1, INVADER_TYPES.MID, 100, 100)
    const botInvader = new Invader(0, 2, INVADER_TYPES.BOT, 100, 100)

    expect(topInvader.points).toBe(30)
    expect(midInvader.points).toBe(20)
    expect(botInvader.points).toBe(10)
  })

  it('should update position', () => {
    const initialX = invader.x
    const initialY = invader.y

    invader.updatePosition(10, 5)

    expect(invader.x).toBe(initialX + 10)
    expect(invader.y).toBe(initialY + 5)
  })

  it('should update animation frame', () => {
    invader.updateAnimation(0)
    expect(invader.frame).toBe(0)

    invader.updateAnimation(1)
    expect(invader.frame).toBe(1)
  })

  it('should die', () => {
    expect(invader.alive).toBe(true)

    invader.kill()

    expect(invader.alive).toBe(false)
  })

  it('should have all type constants defined', () => {
    expect(INVADER_TYPES.TOP).toBe(0)
    expect(INVADER_TYPES.MID).toBe(1)
    expect(INVADER_TYPES.BOT).toBe(2)
  })

  it('should update position multiple times', () => {
    invader.updatePosition(5, 3)
    invader.updatePosition(5, 3)
    invader.updatePosition(5, 3)

    expect(invader.x).toBe(115)
    expect(invader.y).toBe(109)
  })
})
