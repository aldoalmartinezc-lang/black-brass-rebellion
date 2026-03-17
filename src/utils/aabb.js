/**
 * Axis-Aligned Bounding Box collision detection
 * @param {Object} a - Object with x, y, width, height properties
 * @param {Object} b - Object with x, y, width, height properties
 * @returns {boolean} True if a and b are colliding
 */
export function aabb(a, b) {
  // Skip collision if either box has zero size
  if (a.width <= 0 || a.height <= 0 || b.width <= 0 || b.height <= 0) {
    return false
  }

  return (
    a.x < b.x + b.width &&
    a.x + a.width > b.x &&
    a.y < b.y + b.height &&
    a.y + a.height > b.y
  )
}
