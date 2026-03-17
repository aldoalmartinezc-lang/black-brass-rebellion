import { CANVAS_W, CANVAS_H, COLOR_BG } from '../utils/constants.js'

/**
 * Canvas renderer for 2D drawing
 */
export class Renderer {
  constructor(canvasElement) {
    if (!canvasElement) {
      throw new Error('Canvas element is required')
    }

    this.canvas = canvasElement
    this.ctx = this.canvas.getContext('2d')

    if (!this.ctx) {
      throw new Error('Could not get 2D context from canvas')
    }

    // Set canvas dimensions
    this.canvas.width = CANVAS_W
    this.canvas.height = CANVAS_H

    // Initialize context properties
    this.ctx.imageSmoothingEnabled = false
    this.ctx.fillStyle = COLOR_BG
    this.ctx.fillRect(0, 0, CANVAS_W, CANVAS_H)
  }

  /**
   * Clear the canvas with background color
   */
  clear() {
    this.ctx.fillStyle = COLOR_BG
    this.ctx.fillRect(0, 0, CANVAS_W, CANVAS_H)
  }

  /**
   * Get the 2D context for drawing
   * @returns {CanvasRenderingContext2D}
   */
  getContext() {
    return this.ctx
  }

  /**
   * Get canvas width
   * @returns {number}
   */
  get width() {
    return this.canvas.width
  }

  /**
   * Get canvas height
   * @returns {number}
   */
  get height() {
    return this.canvas.height
  }

  /**
   * Save the current context state (for transformations)
   */
  save() {
    this.ctx.save()
  }

  /**
   * Restore the previous context state
   */
  restore() {
    this.ctx.restore()
  }

  /**
   * Translate the context
   * @param {number} x
   * @param {number} y
   */
  translate(x, y) {
    this.ctx.translate(x, y)
  }

  /**
   * Rotate the context (in radians)
   * @param {number} angle - Angle in radians
   */
  rotate(angle) {
    this.ctx.rotate(angle)
  }

  /**
   * Scale the context
   * @param {number} scaleX
   * @param {number} scaleY
   */
  scale(scaleX, scaleY) {
    this.ctx.scale(scaleX, scaleY)
  }

  /**
   * Set fill color
   * @param {string} color - CSS color string
   */
  setFillColor(color) {
    this.ctx.fillStyle = color
  }

  /**
   * Set stroke color
   * @param {string} color - CSS color string
   */
  setStrokeColor(color) {
    this.ctx.strokeStyle = color
  }

  /**
   * Set line width
   * @param {number} width
   */
  setLineWidth(width) {
    this.ctx.lineWidth = width
  }

  /**
   * Fill a rectangle
   * @param {number} x
   * @param {number} y
   * @param {number} width
   * @param {number} height
   */
  fillRect(x, y, width, height) {
    this.ctx.fillRect(x, y, width, height)
  }

  /**
   * Stroke a rectangle
   * @param {number} x
   * @param {number} y
   * @param {number} width
   * @param {number} height
   */
  strokeRect(x, y, width, height) {
    this.ctx.strokeRect(x, y, width, height)
  }

  /**
   * Fill a circle
   * @param {number} x - Center X
   * @param {number} y - Center Y
   * @param {number} radius
   */
  fillCircle(x, y, radius) {
    this.ctx.beginPath()
    this.ctx.arc(x, y, radius, 0, Math.PI * 2)
    this.ctx.fill()
  }

  /**
   * Stroke a circle
   * @param {number} x - Center X
   * @param {number} y - Center Y
   * @param {number} radius
   */
  strokeCircle(x, y, radius) {
    this.ctx.beginPath()
    this.ctx.arc(x, y, radius, 0, Math.PI * 2)
    this.ctx.stroke()
  }

  /**
   * Draw text
   * @param {string} text
   * @param {number} x
   * @param {number} y
   * @param {Object} options - Font, align, baseline, etc.
   */
  drawText(text, x, y, options = {}) {
    const {
      font = '16px monospace',
      align = 'left',
      baseline = 'top',
      color = '#00ff00',
    } = options

    this.ctx.font = font
    this.ctx.textAlign = align
    this.ctx.textBaseline = baseline
    this.ctx.fillStyle = color
    this.ctx.fillText(text, x, y)
  }

  /**
   * Get text metrics
   * @param {string} text
   * @param {string} font
   * @returns {Object}
   */
  getTextMetrics(text, font = '16px monospace') {
    this.ctx.font = font
    const metrics = this.ctx.measureText(text)
    return {
      width: metrics.width,
      height: parseInt(font),
    }
  }
}
