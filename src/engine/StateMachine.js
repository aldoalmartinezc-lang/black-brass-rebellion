/**
 * Game state constants
 */
export const STATES = {
  START: 'start',
  PLAYING: 'playing',
  PAUSED: 'paused',
  LEVEL_COMPLETE: 'levelComplete',
  GAME_OVER: 'gameOver',
  WIN: 'win',
}

/**
 * State machine for managing game states and transitions
 */
export class StateMachine {
  constructor(initialState = STATES.START) {
    // Validate initial state
    if (!Object.values(STATES).includes(initialState)) {
      throw new Error(`Invalid initial state: ${initialState}`)
    }

    this._currentState = initialState

    // Define valid transitions
    this._validTransitions = {
      [STATES.START]: [STATES.PLAYING],
      [STATES.PLAYING]: [STATES.PAUSED, STATES.GAME_OVER, STATES.LEVEL_COMPLETE, STATES.WIN],
      [STATES.PAUSED]: [STATES.PLAYING],
      [STATES.LEVEL_COMPLETE]: [STATES.PLAYING],
      [STATES.GAME_OVER]: [STATES.START],
      [STATES.WIN]: [STATES.START],
    }
  }

  /**
   * Get current state
   * @returns {string}
   */
  get current() {
    return this._currentState
  }

  /**
   * Transition to a new state
   * @param {string} newState - The state to transition to
   * @throws {Error} If transition is invalid
   */
  transition(newState) {
    // Validate state exists
    if (!Object.values(STATES).includes(newState)) {
      throw new Error(`Invalid state: ${newState}`)
    }

    // Check if transition is valid
    const allowedTransitions = this._validTransitions[this._currentState]
    if (!allowedTransitions.includes(newState)) {
      throw new Error(
        `Invalid transition: ${this._currentState} -> ${newState}. ` +
          `Allowed transitions: ${allowedTransitions.join(', ')}`
      )
    }

    this._currentState = newState
  }

  /**
   * Check if a state is the current state
   * @param {string} state
   * @returns {boolean}
   */
  is(state) {
    return this._currentState === state
  }

  /**
   * Check if a transition is valid from current state
   * @param {string} newState
   * @returns {boolean}
   */
  canTransition(newState) {
    return this._validTransitions[this._currentState].includes(newState)
  }
}
