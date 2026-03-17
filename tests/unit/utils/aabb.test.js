import { describe, it, expect } from 'vitest'
import { aabb } from '../../../src/utils/aabb.js'

describe('aabb - Axis-Aligned Bounding Box collision', () => {
  it('should detect collision between overlapping rectangles', () => {
    const a = { x: 0, y: 0, width: 10, height: 10 }
    const b = { x: 5, y: 5, width: 10, height: 10 }

    expect(aabb(a, b)).toBe(true)
    expect(aabb(b, a)).toBe(true)
  })

  it('should detect no collision between separated rectangles', () => {
    const a = { x: 0, y: 0, width: 10, height: 10 }
    const b = { x: 20, y: 20, width: 10, height: 10 }

    expect(aabb(a, b)).toBe(false)
    expect(aabb(b, a)).toBe(false)
  })

  it('should detect collision when rectangles are touching at edge', () => {
    const a = { x: 0, y: 0, width: 10, height: 10 }
    const b = { x: 10, y: 0, width: 10, height: 10 }

    expect(aabb(a, b)).toBe(false) // Touching edge is not collision
  })

  it('should detect collision when one rectangle is inside another', () => {
    const outer = { x: 0, y: 0, width: 100, height: 100 }
    const inner = { x: 25, y: 25, width: 50, height: 50 }

    expect(aabb(outer, inner)).toBe(true)
    expect(aabb(inner, outer)).toBe(true)
  })

  it('should handle negative coordinates', () => {
    const a = { x: -10, y: -10, width: 20, height: 20 }
    const b = { x: 0, y: 0, width: 20, height: 20 }

    expect(aabb(a, b)).toBe(true)
  })

  it('should handle zero-size rectangles', () => {
    const a = { x: 5, y: 5, width: 0, height: 0 }
    const b = { x: 0, y: 0, width: 10, height: 10 }

    expect(aabb(a, b)).toBe(false)
  })

  it('should be commutative', () => {
    const a = { x: 10, y: 10, width: 20, height: 20 }
    const b = { x: 25, y: 15, width: 15, height: 15 }

    expect(aabb(a, b)).toBe(aabb(b, a))
  })
})
