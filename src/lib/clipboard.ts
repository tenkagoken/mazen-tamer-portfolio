export async function writeEmailToClipboard(email: string, clipboard: Pick<Clipboard, 'writeText'> | undefined) {
  if (!clipboard?.writeText) return false
  try {
    await clipboard.writeText(email)
    return true
  } catch (error) {
    if (error instanceof DOMException) return false
    throw error
  }
}
