/**
 * Score system - tracks points, hi-score, and multipliers
 */
export class ScoreSystem {
  constructor() {
    this.score = 0
    this._hiScore = 0
    this.streakMultiplier = 1
    this.consecutiveKills = 0

    // Load hi-score from localStorage
    this.loadHiScore()
  }

  /**
   * Get current score
   * @returns {number}
   */
  get score() {
    return this._score || 0
  }

  set score(value) {
    this._score = value
  }

  /**
   * Get hi-score
   * @returns {number}
   */
  get hiScore() {
    return this._hiScore
  }

  /**
   * Add points to score
   * @param {number} points
   */
  addPoints(points) {
    this.score += points
  }

  /**
   * Add invader kill with optional streak multiplier
   * @param {number} type - Invader type (0=TOP, 1=MID, 2=BOT)
   * @param {number} streakMultiplier - Optional multiplier (default 1)
   */
  addInvaderKill(type, streakMultiplier = 1) {
    const basePoints = type === 0 ? 30 : type === 1 ? 20 : 10
    const points = basePoints * streakMultiplier

    this.score += points
    this.consecutiveKills += 1

    // Increase multiplier every 5 kills
    if (this.consecutiveKills % 5 === 0) {
      this.streakMultiplier += 0.1
    }
  }

  /**
   * Add UFO kill
   * @param {number} scoreValue - Points from UFO (varies per spawn)
   */
  addUFOKill(scoreValue) {
    this.score += scoreValue
  }

  /**
   * Save hi-score to localStorage
   */
  saveHiScore() {
    if (this.score > this._hiScore) {
      this._hiScore = this.score
      try {
        localStorage.setItem('black-brass-rebellion-hiscore', this._hiScore.toString())
      } catch (e) {
        // localStorage might be disabled
      }
    }
  }

  /**
   * Load hi-score from localStorage
   */
  loadHiScore() {
    try {
      const saved = localStorage.getItem('black-brass-rebellion-hiscore')
      if (saved) {
        this._hiScore = parseInt(saved, 10)
      }
    } catch (e) {
      // localStorage might be disabled
    }
  }

  /**
   * Reset score for new game (but keep hi-score)
   */
  reset() {
    this.score = 0
    this.streakMultiplier = 1
    this.consecutiveKills = 0
  }
}
