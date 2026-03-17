/**
 * Level system - manages difficulty progression
 */
export class LevelSystem {
  constructor() {
    this.level = 0

    // Level configurations - difficulty increases per level
    this.levelConfigs = [
      {
        level: 0,
        invaderBaseSpeed: 30,
        invaderSpeedPerKill: 5,
        enemyFireInterval: 1.5,
        shieldRegenPercent: 1.0,
        maxEnemyBullets: 3,
      },
      {
        level: 1,
        invaderBaseSpeed: 40,
        invaderSpeedPerKill: 6,
        enemyFireInterval: 1.3,
        shieldRegenPercent: 0.8,
        maxEnemyBullets: 3,
      },
      {
        level: 2,
        invaderBaseSpeed: 50,
        invaderSpeedPerKill: 7,
        enemyFireInterval: 1.1,
        shieldRegenPercent: 0.6,
        maxEnemyBullets: 4,
      },
      {
        level: 3,
        invaderBaseSpeed: 60,
        invaderSpeedPerKill: 8,
        enemyFireInterval: 0.9,
        shieldRegenPercent: 0.5,
        maxEnemyBullets: 4,
      },
      {
        level: 4,
        invaderBaseSpeed: 70,
        invaderSpeedPerKill: 10,
        enemyFireInterval: 0.7,
        shieldRegenPercent: 0.4,
        maxEnemyBullets: 5,
      },
      {
        level: 5,
        invaderBaseSpeed: 80,
        invaderSpeedPerKill: 12,
        enemyFireInterval: 0.5,
        shieldRegenPercent: 0.3,
        maxEnemyBullets: 5,
      },
    ]
  }

  /**
   * Get current level
   * @returns {number}
   */
  get level() {
    return this._level
  }

  set level(value) {
    this._level = value
  }

  /**
   * Get configuration for a specific level
   * @param {number} levelNumber
   * @returns {Object}
   */
  getConfig(levelNumber) {
    const config = this.levelConfigs[Math.min(levelNumber, this.levelConfigs.length - 1)]
    return { ...config }
  }

  /**
   * Get configuration for current level
   * @returns {Object}
   */
  getCurrentConfig() {
    return this.getConfig(this.level)
  }

  /**
   * Move to next level
   */
  nextLevel() {
    this.level = Math.min(this.level + 1, this.levelConfigs.length - 1)
  }

  /**
   * Reset to level 0
   */
  reset() {
    this.level = 0
  }

  /**
   * Check if at max level
   * @returns {boolean}
   */
  isMaxLevel() {
    return this.level >= this.levelConfigs.length - 1
  }
}
