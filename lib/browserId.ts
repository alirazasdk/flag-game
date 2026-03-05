export function getBrowserId(): string {
  if (typeof window === 'undefined') return ''
  let id = localStorage.getItem('browser_id')
  if (!id) {
    id = crypto.randomUUID()
    localStorage.setItem('browser_id', id)
  }
  return id
}
