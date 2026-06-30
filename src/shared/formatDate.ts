const AR_TIMEZONE = 'America/Argentina/Buenos_Aires'

export function formatOrderTime(isoString: string): string {
  return new Date(isoString).toLocaleTimeString('es-AR', {
    hour: '2-digit',
    minute: '2-digit',
    timeZone: AR_TIMEZONE,
  })
}

export function formatOrderDate(isoString: string): string {
  return new Date(isoString).toLocaleDateString('es-AR', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
    timeZone: AR_TIMEZONE,
  })
}

export function formatOrderDateTime(isoString: string): string {
  return new Date(isoString).toLocaleDateString('es-AR', {
    day: '2-digit',
    month: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    timeZone: AR_TIMEZONE,
  })
}
