import { describe, it, expect, beforeEach } from 'vitest'
import { StateMachine, STATES } from '../../../src/engine/StateMachine.js'

describe('StateMachine', () => {
  let stateMachine

  beforeEach(() => {
    stateMachine = new StateMachine()
  })

  it('should create a StateMachine with initial state', () => {
    expect(stateMachine).toBeDefined()
    expect(stateMachine.current).toBe(STATES.START)
  })

  it('should transition to a valid state', () => {
    stateMachine.transition(STATES.PLAYING)
    expect(stateMachine.current).toBe(STATES.PLAYING)
  })

  it('should throw error on invalid transition', () => {
    expect(() => {
      stateMachine.transition(STATES.PAUSED)
    }).toThrow()
  })

  it('should validate all state constants', () => {
    expect(STATES.START).toBe('start')
    expect(STATES.PLAYING).toBe('playing')
    expect(STATES.PAUSED).toBe('paused')
    expect(STATES.LEVEL_COMPLETE).toBe('levelComplete')
    expect(STATES.GAME_OVER).toBe('gameOver')
    expect(STATES.WIN).toBe('win')
  })

  it('should follow valid transition chain: START -> PLAYING -> PAUSED -> PLAYING', () => {
    stateMachine.transition(STATES.PLAYING)
    expect(stateMachine.current).toBe(STATES.PLAYING)

    stateMachine.transition(STATES.PAUSED)
    expect(stateMachine.current).toBe(STATES.PAUSED)

    stateMachine.transition(STATES.PLAYING)
    expect(stateMachine.current).toBe(STATES.PLAYING)
  })

  it('should follow valid transition: PLAYING -> GAME_OVER -> START', () => {
    stateMachine.transition(STATES.PLAYING)
    stateMachine.transition(STATES.GAME_OVER)
    expect(stateMachine.current).toBe(STATES.GAME_OVER)

    stateMachine.transition(STATES.START)
    expect(stateMachine.current).toBe(STATES.START)
  })

  it('should follow valid transition: PLAYING -> LEVEL_COMPLETE -> PLAYING', () => {
    stateMachine.transition(STATES.PLAYING)
    stateMachine.transition(STATES.LEVEL_COMPLETE)
    expect(stateMachine.current).toBe(STATES.LEVEL_COMPLETE)

    stateMachine.transition(STATES.PLAYING)
    expect(stateMachine.current).toBe(STATES.PLAYING)
  })

  it('should follow valid transition: PLAYING -> WIN -> START', () => {
    stateMachine.transition(STATES.PLAYING)
    stateMachine.transition(STATES.WIN)
    expect(stateMachine.current).toBe(STATES.WIN)

    stateMachine.transition(STATES.START)
    expect(stateMachine.current).toBe(STATES.START)
  })

  it('should check state with is() method', () => {
    expect(stateMachine.is(STATES.START)).toBe(true)
    expect(stateMachine.is(STATES.PLAYING)).toBe(false)

    stateMachine.transition(STATES.PLAYING)
    expect(stateMachine.is(STATES.PLAYING)).toBe(true)
    expect(stateMachine.is(STATES.START)).toBe(false)
  })

  it('should check valid transitions with canTransition() method', () => {
    expect(stateMachine.canTransition(STATES.PLAYING)).toBe(true)
    expect(stateMachine.canTransition(STATES.PAUSED)).toBe(false)

    stateMachine.transition(STATES.PLAYING)
    expect(stateMachine.canTransition(STATES.PAUSED)).toBe(true)
    expect(stateMachine.canTransition(STATES.START)).toBe(false)
  })

  it('should throw error on invalid state name', () => {
    expect(() => {
      new StateMachine('invalid_state')
    }).toThrow()
  })

  it('should throw error on transition to invalid state name', () => {
    expect(() => {
      stateMachine.transition('invalid_state')
    }).toThrow()
  })
})
