import { act, renderHook } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import {
  getDocumentVisibilitySnapshot,
  subscribeToDocumentVisibility,
  useDocumentVisibility,
} from './useDocumentVisibility'

describe('useDocumentVisibility', () => {
  it('owns one visibility listener and cleans it up', () => {
    const add = vi.spyOn(document, 'addEventListener')
    const remove = vi.spyOn(document, 'removeEventListener')
    const { unmount } = renderHook(() => useDocumentVisibility())

    expect(add.mock.calls.filter(([name]) => name === 'visibilitychange')).toHaveLength(1)
    unmount()
    expect(remove.mock.calls.filter(([name]) => name === 'visibilitychange')).toHaveLength(1)
  })

  it('tracks hidden and visible transitions without losing rapid updates', () => {
    let state: DocumentVisibilityState = 'visible'
    const visibility = vi.spyOn(document, 'visibilityState', 'get').mockImplementation(() => state)
    const { result } = renderHook(() => useDocumentVisibility())

    expect(result.current).toBe(true)
    act(() => {
      state = 'hidden'
      document.dispatchEvent(new Event('visibilitychange'))
    })
    expect(result.current).toBe(false)
    act(() => {
      state = 'visible'
      document.dispatchEvent(new Event('visibilitychange'))
      state = 'hidden'
      document.dispatchEvent(new Event('visibilitychange'))
      state = 'visible'
      document.dispatchEvent(new Event('visibilitychange'))
    })
    expect(result.current).toBe(true)
    visibility.mockRestore()
  })

  it('returns a paused snapshot and no-op unsubscribe without a document', () => {
    expect(getDocumentVisibilitySnapshot(null)).toBe(false)
    expect(() => subscribeToDocumentVisibility(() => undefined, null)()).not.toThrow()
  })
})
