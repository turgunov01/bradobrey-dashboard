import { deleteCookie, getCookie, setCookie, type H3Event } from 'h3'

const shouldUseSecureCookie = !import.meta.dev

export function getBarberTokenCookieName(event: H3Event) {
  return String(useRuntimeConfig(event).barberTokenCookieName)
}

export function getBarberToken(event: H3Event) {
  return getCookie(event, getBarberTokenCookieName(event)) || null
}

export function setBarberToken(event: H3Event, token: string) {
  setCookie(event, getBarberTokenCookieName(event), token, {
    httpOnly: true,
    maxAge: 60 * 60 * 12,
    path: '/',
    sameSite: 'lax',
    secure: shouldUseSecureCookie
  })
}

export function clearBarberToken(event: H3Event) {
  deleteCookie(event, getBarberTokenCookieName(event), {
    httpOnly: true,
    path: '/',
    sameSite: 'lax',
    secure: shouldUseSecureCookie
  })
}
