import { describe, expect, it } from 'vitest'
import { shouldRunProjectAnimation } from './motion'

describe('project animation lifecycle', () => {
  it.each([
    [{ documentVisible: true, inView: true, reduceMotion: false }, true],
    [{ documentVisible: false, inView: true, reduceMotion: false }, false],
    [{ documentVisible: true, inView: false, reduceMotion: false }, false],
    [{ documentVisible: true, inView: true, reduceMotion: true }, false],
  ])('composes visibility, viewport, and reduced-motion state', (state, expected) => {
    expect(shouldRunProjectAnimation(state)).toBe(expected)
  })
})
