import { useSyncExternalStore } from 'react'

export function getDocumentVisibilitySnapshot(target: Document | null | undefined = typeof document === 'undefined' ? undefined : document) {
  return target ? target.visibilityState !== 'hidden' : false
}

export function subscribeToDocumentVisibility(
  onChange: () => void,
  target: Document | null | undefined = typeof document === 'undefined' ? undefined : document,
) {
  if (!target) return () => undefined
  target.addEventListener('visibilitychange', onChange)
  return () => target.removeEventListener('visibilitychange', onChange)
}

export function useDocumentVisibility() {
  return useSyncExternalStore(
    subscribeToDocumentVisibility,
    getDocumentVisibilitySnapshot,
    () => false,
  )
}
