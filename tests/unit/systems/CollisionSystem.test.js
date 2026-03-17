import { describe, it, expect, beforeEach, vi } from 'vitest'
import { CollisionSystem } from '../../../src/systems/CollisionSystem.js'
import { Player } from '../../../src/entities/Player.js'
import { Invader, INVADER_TYPES } from '../../../src/entities/Invader.js'
import { Bullet, BULLET_OWNER } from '../../../src/entities/Bullet.js'

describe('CollisionSystem', () => {
  let player
  let invader
  let playerBullet
  let enemyBullet

  beforeEach(() => {
    player = new Player(260, 400)
    invader = new Invader(0, 0, INVADER_TYPES.MID, 100, 100)
    playerBullet = new Bullet(280, 200, -500, BULLET_OWNER.PLAYER)
    enemyBullet = new Bullet(280, 380, 200, BULLET_OWNER.ENEMY)
  })

  describe('checkPlayerBulletsVsInvaders', () => {
    it('should detect collision between player bullet and invader', () => {
      playerBullet.y = 100
      playerBullet.x = 100

      const collisions = CollisionSystem.checkPlayerBulletsVsInvaders([playerBullet], [invader])

      expect(collisions).toHaveLength(1)
      expect(collisions[0].bullet).toBe(playerBullet)
      expect(collisions[0].invader).toBe(invader)
    })

    it('should not detect collision with inactive bullet', () => {
      playerBullet.active = false
      playerBullet.y = 100
      playerBullet.x = 100

      const collisions = CollisionSystem.checkPlayerBulletsVsInvaders([playerBullet], [invader])

      expect(collisions).toHaveLength(0)
    })

    it('should not detect collision with dead invader', () => {
      invader.kill()
      playerBullet.y = 100
      playerBullet.x = 100

      const collisions = CollisionSystem.checkPlayerBulletsVsInvaders([playerBullet], [invader])

      expect(collisions).toHaveLength(0)
    })

    it('should ignore enemy bullets', () => {
      enemyBullet.y = 100
      enemyBullet.x = 100

      const collisions = CollisionSystem.checkPlayerBulletsVsInvaders([enemyBullet], [invader])

      expect(collisions).toHaveLength(0)
    })
  })

  describe('checkEnemyBulletsVsPlayer', () => {
    it('should detect collision between enemy bullet and player', () => {
      enemyBullet.y = 400
      enemyBullet.x = 260

      const collisions = CollisionSystem.checkEnemyBulletsVsPlayer([enemyBullet], player)

      expect(collisions).toHaveLength(1)
      expect(collisions[0].bullet).toBe(enemyBullet)
    })

    it('should not detect collision with invincible player', () => {
      player.invincibilityTimer = 1.0
      enemyBullet.y = 400
      enemyBullet.x = 260

      const collisions = CollisionSystem.checkEnemyBulletsVsPlayer([enemyBullet], player)

      expect(collisions).toHaveLength(0)
    })

    it('should not detect collision with inactive bullet', () => {
      enemyBullet.active = false
      enemyBullet.y = 400
      enemyBullet.x = 260

      const collisions = CollisionSystem.checkEnemyBulletsVsPlayer([enemyBullet], player)

      expect(collisions).toHaveLength(0)
    })

    it('should ignore player bullets', () => {
      playerBullet.y = 400
      playerBullet.x = 260

      const collisions = CollisionSystem.checkEnemyBulletsVsPlayer([playerBullet], player)

      expect(collisions).toHaveLength(0)
    })
  })

  describe('checkInvadersVsPlayerLine', () => {
    it('should detect invader at player line', () => {
      invader.y = 390
      const playerY = 400

      const collision = CollisionSystem.checkInvadersVsPlayerLine([invader], playerY)

      expect(collision).toBe(true)
    })

    it('should not detect collision above player line', () => {
      invader.y = 300
      const playerY = 400

      const collision = CollisionSystem.checkInvadersVsPlayerLine([invader], playerY)

      expect(collision).toBe(false)
    })

    it('should not detect dead invader', () => {
      invader.kill()
      invader.y = 390
      const playerY = 400

      const collision = CollisionSystem.checkInvadersVsPlayerLine([invader], playerY)

      expect(collision).toBe(false)
    })

    it('should detect with multiple invaders', () => {
      const invader2 = new Invader(1, 1, INVADER_TYPES.MID, 150, 350)
      const playerY = 400

      const collision = CollisionSystem.checkInvadersVsPlayerLine([invader, invader2], playerY)

      expect(collision).toBe(false) // Neither at or past player line

      invader2.y = 405
      const collision2 = CollisionSystem.checkInvadersVsPlayerLine([invader, invader2], playerY)

      expect(collision2).toBe(true)
    })
  })

  describe('checkPlayerBulletsVsUFO', () => {
    it('should return null if UFO is inactive', () => {
      const mockUFO = { active: false }

      const collision = CollisionSystem.checkPlayerBulletsVsUFO([playerBullet], mockUFO)

      expect(collision).toBeNull()
    })

    it('should detect collision with active UFO', () => {
      const mockUFO = {
        active: true,
        x: 280,
        y: 50,
        width: 48,
        height: 20,
      }
      playerBullet.y = 50
      playerBullet.x = 280

      const collision = CollisionSystem.checkPlayerBulletsVsUFO([playerBullet], mockUFO)

      expect(collision).not.toBeNull()
      expect(collision.bullet).toBe(playerBullet)
    })
  })
})
