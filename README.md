# BLACK: Brass Rebellion

A retro-inspired arcade shoot-em-up built with vanilla JavaScript and HTML5 Canvas. Defend the Black Sector against waves of invading AIs in this classic Space Invaders homage.

**Status:** v1.0.0 - Complete & Production Ready

## 🎮 Gameplay

### Objective

Protect humanity from the Brass Rebellion - waves of alien invaders descending upon the Black Sector. Destroy all enemies to advance through 6 levels of increasing difficulty.

### Controls

**Keyboard:**
- `Arrow Left/Right` - Move your ship
- `Space` - Fire
- `P` - Pause game

**Touch/Mobile:**
- Left third of screen - Move left
- Right third of screen - Move right
- Center - Fire

### Game Mechanics

- **Player Ship (Black):** 3 lives, 2-second invincibility after being hit
- **Enemies:** 3 types worth 10-30 points each
  - Autômatas de Carbón (10 pts) - Bottom row
  - Soldados de Bronce (20 pts) - Middle rows
  - Exploradores del Éter (30 pts) - Top row
- **Shields:** 4 destructible bunkers that degrade as levels progress
- **UFO:** Special bonus enemy worth 50-150 random points
- **High Score:** Automatically saved and persisted

### Level Progression

6 levels with escalating difficulty:
- Enemy speed increases
- Enemy fire rate increases
- Shield regeneration decreases
- Maximum enemy bullets increases (3→5)

## 🚀 Quick Start

### Online (GitHub Pages)

Visit: `https://[usuario].github.io/black-brass-rebellion`

### Local Development

```bash
# Clone repository
git clone https://github.com/[usuario]/black-brass-rebellion.git
cd black-brass-rebellion

# Install dependencies
npm install

# Start dev server (http://localhost:3000)
npm run dev

# Build for production
npm run build

# Run tests
npm run test

# Run with coverage report
npm run test:coverage

# Run E2E tests
npm run test:e2e
```

## 🛠 Technology Stack

**Runtime:**
- JavaScript ES2022 (native modules)
- HTML5 Canvas 2D API

**Build & Development:**
- Vite 5.x - Fast bundler and dev server
- ESLint 8.x - Code quality
- Prettier 3.x - Code formatting

**Testing:**
- Vitest 1.x - Unit tests (target: 80% coverage)
- Playwright 1.x - E2E testing

**CI/CD:**
- GitHub Actions - Automated pipeline
- GitHub Pages - Automatic deployment

## 📁 Project Structure

```
black-brass-rebellion/
├── src/
│   ├── engine/              # Game engine core
│   │   ├── GameLoop.js      # Main update/render loop
│   │   ├── InputManager.js  # Keyboard & touch input
│   │   ├── StateMachine.js  # Game state management
│   │   └── Renderer.js      # Canvas wrapper
│   ├── entities/            # Game objects
│   │   ├── Player.js
│   │   ├── Invader.js
│   │   ├── Bullet.js
│   │   ├── Shield.js
│   │   └── UFO.js
│   ├── systems/             # Game logic
│   │   ├── CollisionSystem.js
│   │   ├── ScoreSystem.js
│   │   ├── LevelSystem.js
│   │   └── SpawnSystem.js
│   ├── ui/                  # Screens & HUD
│   │   ├── HUD.js
│   │   ├── StartScreen.js
│   │   ├── GameOverScreen.js
│   │   ├── LevelScreen.js
│   │   └── WinScreen.js
│   ├── utils/               # Helper functions
│   │   ├── constants.js
│   │   ├── aabb.js
│   │   ├── math.js
│   │   └── spriteRenderer.js
│   └── main.js              # Game orchestrator
├── tests/                   # Test suites
│   ├── unit/                # Unit tests
│   ├── e2e/                 # End-to-end tests
│   └── fixtures/            # Test data
├── index.html               # Entry point
├── package.json
├── vite.config.js
├── vitest.config.js
├── playwright.config.js
├── .eslintrc.js
├── .prettierrc
└── README.md
```

## 📊 Architecture

### Modular Design

Each system is self-contained and communicates through well-defined interfaces:

- **Engine** - Manages update loop, input, state transitions
- **Entities** - Game objects (Player, Enemies, Projectiles, etc.)
- **Systems** - Game logic (Collisions, Scoring, Levels, Spawning)
- **UI** - Screen rendering and HUD display

### State Management

Game flow through finite state machine:
```
START → PLAYING ⟷ PAUSED → LEVEL_COMPLETE → PLAYING → ... → WIN
            ↓
        GAME_OVER → START
```

### Collision Detection

AABB (Axis-Aligned Bounding Box) collision system checking:
- Player bullets vs Invaders, Shields, UFO
- Enemy bullets vs Player, Shields
- Invaders vs Shields, Player line

## ✅ Testing

### Unit Tests

```bash
npm run test              # Run all unit tests
npm run test:watch       # Watch mode
npm run test:coverage    # Generate coverage report
```

Test coverage target: **≥ 80%**

### E2E Tests

```bash
npm run test:e2e         # Run Playwright tests
npm run test:e2e:ui      # Interactive mode
```

## 🎨 Visual Design

**Color Palette (Neon Retro):**
- Player: Green (#00ff00)
- Invaders: Red/Orange/Gray (#ff0000, #ffaa00, #aaaaaa)
- Bullets: Green/Orange (#00ff00, #ff5500)
- UI Text: Green/Yellow (#00ff00, #ffff00)
- Background: Black (#000000)

**Typography:**
- Font: Monospace (Courier New, monospace fallback)
- Retro arcade aesthetic with crisp pixel rendering

## 🎯 Performance

- **Target FPS:** 60 frames per second
- **Target Resolution:** 560x460 pixels (classic arcade aspect ratio)
- **Delta Time Cap:** 0.05 seconds (prevents large jumps)
- **Responsive:** Works on mobile and desktop browsers

## 🌐 Browser Support

| Browser | Support |
|---------|---------|
| Chrome/Chromium | ✅ Full |
| Firefox | ✅ Full |
| Safari | ✅ Full |
| Edge | ✅ Full |
| Mobile Chrome | ✅ Full |
| Mobile Safari | ✅ Full |

## 📝 Development Guidelines

### Code Style

- ESLint configuration enforces style rules
- Prettier formats code on save
- No `var` declarations (const/let only)
- JSDoc comments for public methods

### Commit Conventions

Format: `[type]: [description]`
- `feat:` - New feature
- `fix:` - Bug fix
- `refactor:` - Code restructuring
- `test:` - Testing additions
- `docs:` - Documentation
- `chore:` - Tooling/config

### Definition of Done

1. Code complete in feature branch
2. Unit tests pass (≥80% coverage)
3. ESLint clean
4. Prettier formatted
5. CI/CD passing
6. PR reviewed and approved
7. Merged to develop

## 🐛 Known Limitations

- No sound effects or music (v1.0.0)
- No network multiplayer (local only)
- No advanced shaders or WebGL
- No save/load game state
- Mobile version optimizations TBD

## 🔮 Future Enhancements

- Sound effects and background music
- Power-up system
- Advanced enemy types
- Leaderboard (backend integration)
- Mobile app (PWA/native)
- Competitive multiplayer
- Level editor

## 📄 License

MIT License - See LICENSE file for details

## 👏 Credits

**Inspired by:**
- Space Invaders (Atari, 1978)
- Arcade game design principles

**Built with:**
- Vite - Lightning-fast build tool
- Vitest - Unit testing framework
- Playwright - E2E testing
- GitHub - Version control & deployment

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'feat: add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📞 Support

For issues, questions, or suggestions, please open a GitHub issue.

---

**Made with ❤️ in the Black Sector**

v1.0.0 - Production Ready
