import { aabb } from '../utils/aabb.js'
import { BULLET_OWNER } from '../entities/Bullet.js'

/**
 * Collision detection system
 */
export class CollisionSystem {
  /**
   * Check player bullets vs invaders
   * @param {Bullet[]} bullets
   * @param {Invader[]} invaders
   * @returns {Array} Array of {bullet, invader} collision events
   */
  static checkPlayerBulletsVsInvaders(bullets, invaders) {
    const collisions = []

    for (const bullet of bullets) {
      if (!bullet.active || bullet.owner !== BULLET_OWNER.PLAYER) continue

      for (const invader of invaders) {
        if (!invader.alive) continue

        if (aabb(bullet, invader)) {
          collisions.push({ bullet, invader })
        }
      }
    }

    return collisions
  }

  /**
   * Check player bullets vs UFO
   * @param {Bullet[]} bullets
   * @param {UFO} ufo
   * @returns {Object|null} {bullet, ufo} or null
   */
  static checkPlayerBulletsVsUFO(bullets, ufo) {
    if (!ufo.active) return null

    for (const bullet of bullets) {
      if (!bullet.active || bullet.owner !== BULLET_OWNER.PLAYER) continue

      if (aabb(bullet, ufo)) {
        return { bullet, ufo }
      }
    }

    return null
  }

  /**
   * Check player bullets vs shields
   * @param {Bullet[]} bullets
   * @param {Shield[]} shields
   * @returns {Array} Array of {bullet, shield} collision events
   */
  static checkPlayerBulletsVsShields(bullets, shields) {
    const collisions = []

    for (const bullet of bullets) {
      if (!bullet.active || bullet.owner !== BULLET_OWNER.PLAYER) continue

      for (const shield of shields) {
        if (shield.checkBulletCollision(bullet)) {
          collisions.push({ bullet, shield })
        }
      }
    }

    return collisions
  }

  /**
   * Check enemy bullets vs player
   * @param {Bullet[]} bullets
   * @param {Player} player
   * @returns {Array} Array of {bullet} collision events
   */
  static checkEnemyBulletsVsPlayer(bullets, player) {
    const collisions = []

    for (const bullet of bullets) {
      if (!bullet.active || bullet.owner !== BULLET_OWNER.ENEMY) continue

      if (!player.isInvincible && aabb(bullet, player)) {
        collisions.push({ bullet })
      }
    }

    return collisions
  }

  /**
   * Check enemy bullets vs shields
   * @param {Bullet[]} bullets
   * @param {Shield[]} shields
   * @returns {Array} Array of {bullet, shield} collision events
   */
  static checkEnemyBulletsVsShields(bullets, shields) {
    const collisions = []

    for (const bullet of bullets) {
      if (!bullet.active || bullet.owner !== BULLET_OWNER.ENEMY) continue

      for (const shield of shields) {
        if (shield.checkBulletCollision(bullet)) {
          collisions.push({ bullet, shield })
        }
      }
    }

    return collisions
  }

  /**
   * Check invaders vs shields
   * @param {Invader[]} invaders
   * @param {Shield[]} shields
   * @returns {Array} Array of {invader, shield} collision events
   */
  static checkInvadersVsShields(invaders, shields) {
    const collisions = []

    for (const invader of invaders) {
      if (!invader.alive) continue

      for (const shield of shields) {
        if (aabb(invader, shield.bounds)) {
          shield.erodeFromBottom(invader.y)
          collisions.push({ invader, shield })
        }
      }
    }

    return collisions
  }

  /**
   * Check if any invader reached player line
   * @param {Invader[]} invaders
   * @param {number} playerY
   * @returns {boolean}
   */
  static checkInvadersVsPlayerLine(invaders, playerY) {
    for (const invader of invaders) {
      if (!invader.alive) continue

      if (invader.y + invader.height >= playerY) {
        return true
      }
    }

    return false
  }
}
