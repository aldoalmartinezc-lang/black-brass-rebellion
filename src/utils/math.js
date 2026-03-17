/**
 * Clamp a value between min and max
 * @param {number} value
 * @param {number} min
 * @param {number} max
 * @returns {number}
 */
export function clamp(value, min, max) {
  return Math.max(min, Math.min(max, value))
}

/**
 * Linear interpolation between a and b
 * @param {number} a - Start value
 * @param {number} b - End value
 * @param {number} t - Interpolation factor (0-1)
 * @returns {number}
 */
export function lerp(a, b, t) {
  return a + (b - a) * t
}

/**
 * Generate random number between min (inclusive) and max (exclusive)
 * @param {number} min
 * @param {number} max
 * @returns {number}
 */
export function randomRange(min, max) {
  return Math.random() * (max - min) + min
}

/**
 * Generate random integer between min (inclusive) and max (exclusive)
 * @param {number} min
 * @param {number} max
 * @returns {number}
 */
export function randomInt(min, max) {
  return Math.floor(randomRange(min, max))
}

/**
 * Check if a value is between min and max (inclusive)
 * @param {number} value
 * @param {number} min
 * @param {number} max
 * @returns {boolean}
 */
export function isBetween(value, min, max) {
  return value >= min && value <= max
}

/**
 * Normalize angle to 0-360 range
 * @param {number} angle - Angle in degrees
 * @returns {number}
 */
export function normalizeAngle(angle) {
  return ((angle % 360) + 360) % 360
}

/**
 * Convert degrees to radians
 * @param {number} degrees
 * @returns {number}
 */
export function toRadians(degrees) {
  return degrees * (Math.PI / 180)
}

/**
 * Convert radians to degrees
 * @param {number} radians
 * @returns {number}
 */
export function toDegrees(radians) {
  return radians * (180 / Math.PI)
}
