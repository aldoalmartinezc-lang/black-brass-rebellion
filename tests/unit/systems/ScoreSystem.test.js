import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest'
import { ScoreSystem } from '../../../src/systems/ScoreSystem.js'

describe('ScoreSystem', () => {
  let scoreSystem

  beforeEach(() => {
    scoreSystem = new ScoreSystem()
    // Clear localStorage
    try {
      localStorage.clear()
    } catch (e) {}
  })

  it('should create a ScoreSystem with initial state', () => {
    expect(scoreSystem.score).toBe(0)
    expect(scoreSystem.streakMultiplier).toBeGreaterThanOrEqual(1)
  })

  it('should add points', () => {
    scoreSystem.addPoints(100)
    expect(scoreSystem.score).toBe(100)

    scoreSystem.addPoints(50)
    expect(scoreSystem.score).toBe(150)
  })

  it('should add invader kill points', () => {
    // TOP type = 30 points
    scoreSystem.addInvaderKill(0)
    expect(scoreSystem.score).toBe(30)

    // MID type = 20 points
    scoreSystem.addInvaderKill(1)
    expect(scoreSystem.score).toBe(50)

    // BOT type = 10 points
    scoreSystem.addInvaderKill(2)
    expect(scoreSystem.score).toBe(60)
  })

  it('should apply streak multiplier', () => {
    scoreSystem.addInvaderKill(0, 2) // 30 * 2 = 60
    expect(scoreSystem.score).toBe(60)
  })

  it('should add UFO kill points', () => {
    scoreSystem.addUFOKill(100)
    expect(scoreSystem.score).toBe(100)

    scoreSystem.addUFOKill(150)
    expect(scoreSystem.score).toBe(250)
  })

  it('should track consecutive kills', () => {
    expect(scoreSystem.consecutiveKills).toBe(0)

    scoreSystem.addInvaderKill(0)
    expect(scoreSystem.consecutiveKills).toBe(1)

    scoreSystem.addInvaderKill(1)
    expect(scoreSystem.consecutiveKills).toBe(2)
  })

  it('should increase streak multiplier every 5 kills', () => {
    const initialMultiplier = scoreSystem.streakMultiplier

    for (let i = 0; i < 4; i++) {
      scoreSystem.addInvaderKill(0)
    }
    expect(scoreSystem.streakMultiplier).toBe(initialMultiplier)

    scoreSystem.addInvaderKill(0)
    expect(scoreSystem.streakMultiplier).toBeGreaterThan(initialMultiplier)
  })

  it('should track hi-score', () => {
    scoreSystem.score = 1000
    scoreSystem.saveHiScore()
    expect(scoreSystem.hiScore).toBe(1000)

    scoreSystem.score = 500
    scoreSystem.saveHiScore()
    expect(scoreSystem.hiScore).toBe(1000) // Stays at 1000
  })

  it('should reset score but keep hi-score', () => {
    scoreSystem.score = 1000
    scoreSystem.saveHiScore()

    scoreSystem.reset()

    expect(scoreSystem.score).toBe(0)
    expect(scoreSystem.hiScore).toBe(1000)
  })

  it('should reset streak multiplier on reset', () => {
    for (let i = 0; i < 5; i++) {
      scoreSystem.addInvaderKill(0)
    }

    const multiplierBefore = scoreSystem.streakMultiplier
    scoreSystem.reset()

    expect(scoreSystem.streakMultiplier).toBe(1)
  })
})
