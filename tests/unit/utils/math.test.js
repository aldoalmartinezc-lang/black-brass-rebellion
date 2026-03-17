import { describe, it, expect } from 'vitest'
import {
  clamp,
  lerp,
  randomRange,
  randomInt,
  isBetween,
  normalizeAngle,
  toRadians,
  toDegrees,
} from '../../../src/utils/math.js'

describe('Math utilities', () => {
  describe('clamp', () => {
    it('should clamp value between min and max', () => {
      expect(clamp(5, 0, 10)).toBe(5)
      expect(clamp(-5, 0, 10)).toBe(0)
      expect(clamp(15, 0, 10)).toBe(10)
    })

    it('should handle edge cases', () => {
      expect(clamp(0, 0, 10)).toBe(0)
      expect(clamp(10, 0, 10)).toBe(10)
    })
  })

  describe('lerp', () => {
    it('should interpolate between values', () => {
      expect(lerp(0, 10, 0)).toBe(0)
      expect(lerp(0, 10, 0.5)).toBe(5)
      expect(lerp(0, 10, 1)).toBe(10)
    })

    it('should handle negative values', () => {
      expect(lerp(-10, 10, 0.5)).toBe(0)
    })
  })

  describe('randomRange', () => {
    it('should generate random number in range', () => {
      for (let i = 0; i < 100; i++) {
        const value = randomRange(0, 10)
        expect(value).toBeGreaterThanOrEqual(0)
        expect(value).toBeLessThan(10)
      }
    })

    it('should handle negative ranges', () => {
      for (let i = 0; i < 100; i++) {
        const value = randomRange(-10, 0)
        expect(value).toBeGreaterThanOrEqual(-10)
        expect(value).toBeLessThan(0)
      }
    })
  })

  describe('randomInt', () => {
    it('should generate random integer in range', () => {
      for (let i = 0; i < 100; i++) {
        const value = randomInt(0, 10)
        expect(Number.isInteger(value)).toBe(true)
        expect(value).toBeGreaterThanOrEqual(0)
        expect(value).toBeLessThan(10)
      }
    })
  })

  describe('isBetween', () => {
    it('should check if value is between min and max', () => {
      expect(isBetween(5, 0, 10)).toBe(true)
      expect(isBetween(0, 0, 10)).toBe(true)
      expect(isBetween(10, 0, 10)).toBe(true)
      expect(isBetween(-5, 0, 10)).toBe(false)
      expect(isBetween(15, 0, 10)).toBe(false)
    })
  })

  describe('normalizeAngle', () => {
    it('should normalize angles to 0-360 range', () => {
      expect(normalizeAngle(0)).toBe(0)
      expect(normalizeAngle(360)).toBe(0)
      expect(normalizeAngle(180)).toBe(180)
      expect(normalizeAngle(720)).toBe(0)
      expect(normalizeAngle(-90)).toBe(270)
    })
  })

  describe('toRadians', () => {
    it('should convert degrees to radians', () => {
      expect(toRadians(0)).toBe(0)
      expect(toRadians(180)).toBeCloseTo(Math.PI)
      expect(toRadians(90)).toBeCloseTo(Math.PI / 2)
      expect(toRadians(360)).toBeCloseTo(Math.PI * 2)
    })
  })

  describe('toDegrees', () => {
    it('should convert radians to degrees', () => {
      expect(toDegrees(0)).toBe(0)
      expect(toDegrees(Math.PI)).toBeCloseTo(180)
      expect(toDegrees(Math.PI / 2)).toBeCloseTo(90)
      expect(toDegrees(Math.PI * 2)).toBeCloseTo(360)
    })
  })
})
