import { describe, it, expect, beforeEach } from 'vitest'
import { LevelSystem } from '../../../src/systems/LevelSystem.js'

describe('LevelSystem', () => {
  let levelSystem

  beforeEach(() => {
    levelSystem = new LevelSystem()
  })

  it('should create a LevelSystem with level 0', () => {
    expect(levelSystem.level).toBe(0)
  })

  it('should get config for current level', () => {
    const config = levelSystem.getCurrentConfig()

    expect(config.level).toBe(0)
    expect(config.invaderBaseSpeed).toBe(30)
    expect(config.enemyFireInterval).toBe(1.5)
  })

  it('should get config for specific level', () => {
    const config0 = levelSystem.getConfig(0)
    const config1 = levelSystem.getConfig(1)

    expect(config0.invaderBaseSpeed).toBe(30)
    expect(config1.invaderBaseSpeed).toBe(40)
    expect(config1.invaderBaseSpeed).toBeGreaterThan(config0.invaderBaseSpeed)
  })

  it('should increase difficulty per level', () => {
    for (let level = 0; level < 5; level++) {
      const config = levelSystem.getConfig(level)
      const nextConfig = levelSystem.getConfig(level + 1)

      expect(nextConfig.invaderBaseSpeed).toBeGreaterThan(config.invaderBaseSpeed)
      expect(nextConfig.enemyFireInterval).toBeLessThan(config.enemyFireInterval)
    }
  })

  it('should move to next level', () => {
    expect(levelSystem.level).toBe(0)

    levelSystem.nextLevel()
    expect(levelSystem.level).toBe(1)

    levelSystem.nextLevel()
    expect(levelSystem.level).toBe(2)
  })

  it('should cap at max level', () => {
    for (let i = 0; i < 10; i++) {
      levelSystem.nextLevel()
    }

    expect(levelSystem.level).toBeLessThan(10) // Should not exceed max
    expect(levelSystem.isMaxLevel()).toBe(true)
  })

  it('should reset to level 0', () => {
    levelSystem.level = 5
    levelSystem.reset()

    expect(levelSystem.level).toBe(0)
  })

  it('should have 6 levels', () => {
    expect(levelSystem.levelConfigs).toHaveLength(6)
  })

  it('should increase enemy fire intensity per level', () => {
    const config0 = levelSystem.getConfig(0)
    const config5 = levelSystem.getConfig(5)

    expect(config0.enemyFireInterval).toBeGreaterThan(config5.enemyFireInterval)
  })

  it('should decrease shield regeneration per level', () => {
    const config0 = levelSystem.getConfig(0)
    const config5 = levelSystem.getConfig(5)

    expect(config0.shieldRegenPercent).toBeGreaterThan(config5.shieldRegenPercent)
  })
})
