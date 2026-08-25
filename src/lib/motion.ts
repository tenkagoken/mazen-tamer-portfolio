export function shouldRunProjectAnimation({
  documentVisible,
  inView,
  reduceMotion,
}: {
  documentVisible: boolean
  inView: boolean
  reduceMotion: boolean
}) {
  return documentVisible && inView && !reduceMotion
}
