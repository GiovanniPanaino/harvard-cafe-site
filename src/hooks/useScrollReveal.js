import { useEffect } from 'react'

function prefersReducedMotion() {
  return window.matchMedia?.('(prefers-reduced-motion: reduce)').matches
}

export function useScrollReveal() {
  useEffect(() => {
    const revealItems = document.querySelectorAll('.reveal')

    if (prefersReducedMotion()) {
      revealItems.forEach((item) => item.classList.add('is-visible'))
      return undefined
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          entry.target.classList.toggle('is-visible', entry.isIntersecting)
        })
      },
      { threshold: 0.18, rootMargin: '0px 0px -10% 0px' },
    )

    revealItems.forEach((item) => observer.observe(item))
    return () => observer.disconnect()
  }, [])
}
