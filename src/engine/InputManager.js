/**
 * Input manager for keyboard and touch controls
 * Provides getters that return true only on the frame the key is pressed (for pulse events)
 */
export class InputManager {
  constructor() {
    // Key states: true if pressed this frame
    this._keyStates = {
      ArrowLeft: false,
      ArrowRight: false,
      Space: false,
      KeyP: false,
      Enter: false,
      // Touch states
      TouchLeft: false,
      TouchRight: false,
      TouchFire: false,
    }

    // Previous frame states (for pulse detection)
    this._prevKeyStates = { ...this._keyStates }

    // Continuous states (maintained across frames)
    this._heldKeys = new Set()

    // Bind event handlers
    this._onKeyDown = this._onKeyDown.bind(this)
    this._onKeyUp = this._onKeyUp.bind(this)
    this._onTouchStart = this._onTouchStart.bind(this)
    this._onTouchEnd = this._onTouchEnd.bind(this)

    // Add event listeners
    document.addEventListener('keydown', this._onKeyDown)
    document.addEventListener('keyup', this._onKeyUp)
    document.addEventListener('touchstart', this._onTouchStart)
    document.addEventListener('touchend', this._onTouchEnd)
  }

  /**
   * Update input state (call once per frame)
   * Resets pulse events and updates held keys
   */
  update() {
    // Save previous states for pulse detection
    this._prevKeyStates = { ...this._keyStates }

    // Reset pulse events (they only fire once)
    this._keyStates.KeyP = false
    this._keyStates.Space = false
    this._keyStates.Enter = false

    // Update continuous states from held keys
    this._keyStates.ArrowLeft = this._heldKeys.has('ArrowLeft')
    this._keyStates.ArrowRight = this._heldKeys.has('ArrowRight')
  }

  /**
   * @private
   */
  _onKeyDown(event) {
    const key = event.code

    if (!this._heldKeys.has(key)) {
      this._heldKeys.add(key)

      // Pulse events (only fire once on press)
      if (key === 'KeyP') {
        this._keyStates.KeyP = true
      }
      if (key === 'Space') {
        this._keyStates.Space = true
      }
      if (key === 'Enter') {
        this._keyStates.Enter = true
      }
    }

    // Prevent scrolling
    if (['ArrowUp', 'ArrowDown', 'Space'].includes(key)) {
      event.preventDefault()
    }
  }

  /**
   * @private
   */
  _onKeyUp(event) {
    const key = event.code
    this._heldKeys.delete(key)

    if (key === 'ArrowLeft') {
      this._keyStates.ArrowLeft = false
    }
    if (key === 'ArrowRight') {
      this._keyStates.ArrowRight = false
    }
  }

  /**
   * @private
   */
  _onTouchStart(event) {
    const touches = event.touches
    for (let i = 0; i < touches.length; i++) {
      const touch = touches[i]
      const x = touch.clientX
      const width = window.innerWidth

      if (x < width / 3) {
        this._keyStates.TouchLeft = true
      } else if (x > (2 * width) / 3) {
        this._keyStates.TouchRight = true
      } else {
        this._keyStates.TouchFire = true
      }
    }

    event.preventDefault()
  }

  /**
   * @private
   */
  _onTouchEnd(event) {
    this._keyStates.TouchLeft = false
    this._keyStates.TouchRight = false
    this._keyStates.TouchFire = false
    event.preventDefault()
  }

  /**
   * Get left input state (arrow left or touch left)
   * @returns {boolean}
   */
  get left() {
    return this._keyStates.ArrowLeft || this._keyStates.TouchLeft
  }

  /**
   * Get right input state (arrow right or touch right)
   * @returns {boolean}
   */
  get right() {
    return this._keyStates.ArrowRight || this._keyStates.TouchRight
  }

  /**
   * Get fire input state (space or touch fire)
   * Only true on frame space is pressed
   * @returns {boolean}
   */
  get fire() {
    return this._keyStates.Space || this._keyStates.TouchFire
  }

  /**
   * Get pause input (P key)
   * Only true on frame P is pressed
   * @returns {boolean}
   */
  get pause() {
    return this._keyStates.KeyP
  }

  /**
   * Get start input (space or enter)
   * Only true on frame the key is pressed
   * @returns {boolean}
   */
  get start() {
    return this._keyStates.Space || this._keyStates.Enter
  }

  /**
   * Clean up event listeners
   */
  destroy() {
    document.removeEventListener('keydown', this._onKeyDown)
    document.removeEventListener('keyup', this._onKeyUp)
    document.removeEventListener('touchstart', this._onTouchStart)
    document.removeEventListener('touchend', this._onTouchEnd)
  }
}
