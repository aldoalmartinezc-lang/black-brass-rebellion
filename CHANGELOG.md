# Changelog

All notable changes to BLACK: Brass Rebellion will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.0.0] - 2026-03-17

### Added

- **Engine Core**
  - GameLoop with requestAnimationFrame, delta time management, pause/resume
  - InputManager with keyboard (Arrow Keys, Space, P) and touch controls
  - StateMachine with valid state transitions
  - Renderer for Canvas 2D operations

- **Game Entities**
  - Player (Black ship) with movement, shooting, lives system
  - Invader enemies in 3 types with animation and scoring
  - Bullet system for player and enemy projectiles
  - Shield bunker with destructible grid blocks
  - UFO special enemy with bonus scoring

- **Game Systems**
  - CollisionSystem with AABB detection for all entity pairs
  - ScoreSystem with point tracking and hi-score persistence
  - LevelSystem with 6 levels of progressive difficulty
  - SpawnSystem for invader formation and UFO spawning

- **User Interface**
  - StartScreen with game lore and narrative
  - GameOverScreen with score display
  - LevelScreen with transition narrative
  - WinScreen for game completion
  - HUD showing score, level, lives, and FPS

- **Utilities**
  - AABB collision detection function
  - Math utilities (clamp, lerp, random, angle conversion)
  - Constants for all game configuration
  - Sprite rendering utilities

- **Build & Deployment**
  - Vite configuration for development and production builds
  - ESLint and Prettier configuration
  - Vitest unit testing framework
  - Playwright E2E testing setup
  - GitHub Actions CI/CD pipeline
  - GitHub Pages deployment automation

- **Documentation**
  - README with gameplay instructions and installation
  - Technical documentation of architecture
  - Inline code documentation with JSDoc

### Game Features

- Classic Space Invaders-inspired gameplay
- 6 levels with increasing difficulty
- Progressive enemy fire rate and speed
- Shield regeneration system per level
- UFO bonus scoring with random values
- High score persistence using localStorage
- Keyboard and touch control support
- Pause functionality (Press P)
- Frame rate monitoring

### Technical Features

- Modular ES6 architecture
- Comprehensive unit tests with >= 80% coverage
- Type-safe collision detection
- Sprite-based rendering
- Performance-optimized delta time management
- Cross-browser compatibility (Chrome, Firefox, Safari)

## [Unreleased]

### Planned Features

- Power-ups and special weapons
- Sound effects and music
- Multiplayer/competitive modes
- Additional level designs
- Mobile app version
- Leaderboard system

---

## Project Information

**Project:** BLACK: Brass Rebellion  
**Type:** Browser-based arcade game  
**Technology:** JavaScript ES2022, HTML5 Canvas  
**License:** MIT  
**Repository:** github.com/[usuario]/black-brass-rebellion
