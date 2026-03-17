import { GameLoop } from './engine/GameLoop.js'
import { InputManager } from './engine/InputManager.js'
import { StateMachine, STATES } from './engine/StateMachine.js'
import { Renderer } from './engine/Renderer.js'

import { Player } from './entities/Player.js'
import { Shield } from './entities/Shield.js'
import { UFO } from './entities/UFO.js'

import { CollisionSystem } from './systems/CollisionSystem.js'
import { ScoreSystem } from './systems/ScoreSystem.js'
import { LevelSystem } from './systems/LevelSystem.js'
import { SpawnSystem } from './systems/SpawnSystem.js'

import { HUD } from './ui/HUD.js'
import { StartScreen } from './ui/StartScreen.js'
import { GameOverScreen } from './ui/GameOverScreen.js'
import { LevelScreen } from './ui/LevelScreen.js'
import { WinScreen } from './ui/WinScreen.js'

import { CANVAS_W, CANVAS_H, PLAYER_Y, PLAYER_INITIAL_LIVES, SHIELD_Y, SHIELD_COUNT } from './utils/constants.js'
import { spriteRenderer } from './utils/spriteRenderer.js'

/**
 * Main game class - orchestrates all game systems
 */
class Game {
  constructor() {
    const canvas = document.getElementById('gameCanvas')
    if (!canvas) {
      throw new Error('Canvas element with id "gameCanvas" not found')
    }

    this.renderer = new Renderer(canvas)
    this.input = new InputManager()
    this.stateMachine = new StateMachine(STATES.START)
    this.gameLoop = new GameLoop(this.update.bind(this), this.render.bind(this))

    this.scoreSystem = new ScoreSystem()
    this.levelSystem = new LevelSystem()
    this.spawnSystem = new SpawnSystem()

    this.player = new Player((CANVAS_W - 32) / 2, PLAYER_Y)
    this.shields = []
    this.ufo = new UFO()

    this.playerBullets = []
    this.enemyBullets = []

    this.startScreen = new StartScreen()
    this.gameOverScreen = null
    this.levelScreen = null
    this.winScreen = null
    this.hud = new HUD(this.scoreSystem, this.levelSystem, this.player)

    this.killedInvadersCount = 0
    this.isPaused = false

    this.initShields()
  }

  initShields() {
    this.shields = []
    const shieldSpacing = CANVAS_W / (SHIELD_COUNT + 1)
    for (let i = 0; i < SHIELD_COUNT; i++) {
      const x = shieldSpacing * (i + 1) - 40
      this.shields.push(new Shield(x, SHIELD_Y))
    }
  }

  start() {
    this.gameLoop.start()
  }

  stop() {
    this.gameLoop.stop()
    this.input.destroy()
  }

  update(dt) {
    this.input.update()

    if (this.input.pause) {
      this.handlePause()
      return
    }

    switch (this.stateMachine.current) {
      case STATES.START:
        this.updateStartScreen(dt)
        break
      case STATES.PLAYING:
        this.updatePlaying(dt)
        break
      case STATES.LEVEL_COMPLETE:
        this.updateLevelComplete(dt)
        break
      case STATES.GAME_OVER:
        this.updateGameOver(dt)
        break
      case STATES.WIN:
        this.updateWin(dt)
        break
    }
  }

  updateStartScreen(dt) {
    this.startScreen.update(dt)
    if (this.input.start) {
      this.startNewGame()
      this.stateMachine.transition(STATES.PLAYING)
    }
  }

  updatePlaying(dt) {
    const config = this.levelSystem.getCurrentConfig()

    this.player.update(dt, this.input, this.playerBullets)
    this.spawnSystem.update(dt, this.killedInvadersCount)

    this.playerBullets = this.playerBullets.filter((b) => b.active)
    this.enemyBullets = this.enemyBullets.filter((b) => b.active)

    for (const bullet of this.playerBullets) {
      bullet.update(dt)
    }
    for (const bullet of this.enemyBullets) {
      bullet.update(dt)
    }

    this.ufo.update(dt)
    if (this.spawnSystem.shouldSpawnUFO()) {
      this.ufo.spawn()
      this.spawnSystem.resetUFOTimer()
    }

    const invaderCollisions = CollisionSystem.checkPlayerBulletsVsInvaders(this.playerBullets, this.spawnSystem.invaders)
    for (const { bullet, invader } of invaderCollisions) {
      invader.kill()
      bullet.deactivate()
      this.scoreSystem.addInvaderKill(invader.type)
      this.killedInvadersCount += 1
    }

    const ufoCollision = CollisionSystem.checkPlayerBulletsVsUFO(this.playerBullets, this.ufo)
    if (ufoCollision) {
      const points = this.ufo.hit()
      this.scoreSystem.addPoints(points)
    }

    const playerCollisions = CollisionSystem.checkEnemyBulletsVsPlayer(this.enemyBullets, this.player)
    if (playerCollisions.length > 0 && !this.player.isInvincible) {
      this.player.takeDamage()
      for (const { bullet } of playerCollisions) {
        bullet.deactivate()
      }
    }

    CollisionSystem.checkInvadersVsShields(this.spawnSystem.invaders, this.shields)

    if (CollisionSystem.checkInvadersVsPlayerLine(this.spawnSystem.invaders, PLAYER_Y)) {
      this.player.lives = 0
    }

    if (this.player.isDead) {
      this.scoreSystem.saveHiScore()
      this.gameOverScreen = new GameOverScreen(this.scoreSystem.score, this.scoreSystem.hiScore)
      this.stateMachine.transition(STATES.GAME_OVER)
      return
    }

    if (this.spawnSystem.allInvadersDead()) {
      this.levelScreen = new LevelScreen(this.levelSystem.level)
      this.stateMachine.transition(STATES.LEVEL_COMPLETE)
      return
    }
  }

  updateLevelComplete(dt) {
    this.levelScreen.update(dt)

    if (this.levelScreen.isComplete()) {
      if (this.levelSystem.isMaxLevel()) {
        this.winScreen = new WinScreen(this.scoreSystem.score, this.scoreSystem.hiScore)
        this.scoreSystem.saveHiScore()
        this.stateMachine.transition(STATES.WIN)
      } else {
        this.levelSystem.nextLevel()
        this.startNewLevel()
        this.stateMachine.transition(STATES.PLAYING)
      }
    }
  }

  updateGameOver(dt) {
    this.gameOverScreen.update(dt)
    if (this.input.start) {
      this.startNewGame()
      this.stateMachine.transition(STATES.START)
    }
  }

  updateWin(dt) {
    this.winScreen.update(dt)
    if (this.input.start) {
      this.startNewGame()
      this.stateMachine.transition(STATES.START)
    }
  }

  startNewGame() {
    this.scoreSystem.reset()
    this.levelSystem.reset()
    this.player.reset()
    this.player.lives = PLAYER_INITIAL_LIVES
    this.killedInvadersCount = 0
    this.spawnSystem.spawnInitialFormation()
    this.playerBullets = []
    this.enemyBullets = []
    this.initShields()
    this.ufo.deactivate()
    this.startScreen = new StartScreen()
  }

  startNewLevel() {
    const config = this.levelSystem.getCurrentConfig()
    this.spawnSystem.setInvaderSpeed(config.invaderBaseSpeed)
    this.spawnSystem.regenerateInvaders(config.shieldRegenPercent)
    this.playerBullets = []
    this.enemyBullets = []
    this.player.reset()
    this.killedInvadersCount = 0

    for (const shield of this.shields) {
      shield.reset(config.shieldRegenPercent)
    }
  }

  handlePause() {
    if (this.stateMachine.is(STATES.PLAYING)) {
      this.isPaused = true
      this.stateMachine.transition(STATES.PAUSED)
      this.gameLoop.pause()
    } else if (this.stateMachine.is(STATES.PAUSED)) {
      this.isPaused = false
      this.stateMachine.transition(STATES.PLAYING)
      this.gameLoop.resume()
    }
  }

  render() {
    this.renderer.clear()

    switch (this.stateMachine.current) {
      case STATES.START:
        this.startScreen.draw(this.renderer.getContext())
        break

      case STATES.PLAYING:
      case STATES.PAUSED:
        this.renderGameplay()
        if (this.isPaused) {
          const ctx = this.renderer.getContext()
          ctx.fillStyle = 'rgba(0, 0, 0, 0.5)'
          ctx.fillRect(0, 0, CANVAS_W, CANVAS_H)
          spriteRenderer.drawCenteredText(ctx, 'PAUSED', CANVAS_W / 2, CANVAS_H / 2, {
            font: 'bold 32px monospace',
            color: '#ffff00',
          })
        }
        break

      case STATES.LEVEL_COMPLETE:
        this.renderGameplay()
        this.levelScreen.draw(this.renderer.getContext())
        break

      case STATES.GAME_OVER:
        this.gameOverScreen.draw(this.renderer.getContext())
        break

      case STATES.WIN:
        this.winScreen.draw(this.renderer.getContext())
        break
    }
  }

  renderGameplay() {
    const ctx = this.renderer.getContext()

    this.player.draw(ctx)

    for (const invader of this.spawnSystem.invaders) {
      invader.draw(ctx)
    }

    for (const bullet of this.playerBullets) {
      bullet.draw(ctx)
    }

    for (const bullet of this.enemyBullets) {
      bullet.draw(ctx)
    }

    for (const shield of this.shields) {
      shield.draw(ctx)
    }

    this.ufo.draw(ctx)

    this.hud.draw(ctx, CANVAS_W, CANVAS_H)

    ctx.fillStyle = '#00ff00'
    ctx.font = '10px monospace'
    ctx.textAlign = 'right'
    ctx.fillText(`FPS: ${Math.round(this.gameLoop.fps)}`, CANVAS_W - 10, 10)
  }
}

let game

function init() {
  try {
    game = new Game()
    game.start()
  } catch (error) {
    console.error('Failed to initialize game:', error)
    document.body.innerHTML = `<p>Error: ${error.message}</p>`
  }
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init)
} else {
  init()
}

window.addEventListener('beforeunload', () => {
  if (game) {
    game.stop()
  }
})

export { Game }
