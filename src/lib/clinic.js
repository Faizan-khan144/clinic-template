import { brand } from '../brand.js'

const WEEKDAY_INDEX = { Sun: 0, Mon: 1, Tue: 2, Wed: 3, Thu: 4, Fri: 5, Sat: 6 }

export function clinicNow(date = new Date()) {
  const parts = new Intl.DateTimeFormat('en-US', {
    timeZone: brand.timezone,
    weekday: 'short',
    hour: 'numeric',
    minute: 'numeric',
    hour12: false,
  }).formatToParts(date)

  const get = (type) => parts.find((p) => p.type === type)?.value
  const weekday = WEEKDAY_INDEX[get('weekday')]
  const hour = Number(get('hour')) % 24
  const minute = Number(get('minute'))
  const now = hour + minute / 60

  const today = brand.schedule.find((s) => s.weekdays?.includes(weekday))
  const order = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']

  for (let i = 0; i < 7; i++) {
    const idx = (weekday + i) % 7
    const slot = brand.schedule.find((s) => s.weekdays?.includes(idx))
    if (!slot) continue
    if (i === 0 && now >= slot.opens && now < slot.closes) {
      return { open: true, label: 'Open now', detail: `Closes ${formatTime(slot.closes)} today`, today: slot }
    }
    if (i === 0 && now < slot.opens) {
      return { open: false, label: 'Closed now', detail: `Opens ${formatTime(slot.opens)} today`, today: slot }
    }
    if (i > 0) {
      return {
        open: false,
        label: 'Closed now',
        detail: `Opens ${formatTime(slot.opens)} ${order[idx]}`,
        today,
      }
    }
  }

  return { open: false, label: 'Closed now', detail: 'Emergency cover at any hour', today }
}

export function formatTime(hour) {
  const h = Math.floor(hour)
  const suffix = h >= 12 ? 'PM' : 'AM'
  const display = h % 12 === 0 ? 12 : h % 12
  return `${display}:00 ${suffix}`
}

export const mapsLink = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(brand.address)}`

export const whatsappLink = (text) =>
  `https://wa.me/${brand.whatsappDigits}${text ? `?text=${encodeURIComponent(text)}` : ''}`
