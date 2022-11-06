import type { Router } from 'vue-router'

const isInternalLink = (href: string | undefined) => href?.startsWith('/')
type InterpolationEl = HTMLElement & {
  $componentUpdated?: Function
  $destroy?: Function
}

export const createInterpolateDirective = (router: Router) => ({
  mounted(el: InterpolationEl) {
    const navigate = (event: Event) => {
      const target = event.target as HTMLElement
      const href = target.getAttribute('href')
      if (!href)
        return

      event.preventDefault()
      router.push(href)
    }
    const links = Array.from(el.getElementsByTagName('a')).filter((link) => {
      const href = link.getAttribute('href')
      return href && isInternalLink(href)
    })
    const addListeners = (links: Element[]) => {
      links.forEach((link) => {
        const href = link.getAttribute('href')
        if (!href)
          return

        if (isInternalLink(href))
          link.addEventListener('click', navigate, false)
      })
    }
    const removeListeners = (links: Element[]) => {
      links.forEach(link => link.removeEventListener('click', navigate, false))
    }
    addListeners(links)
    el.$componentUpdated = () => {
      removeListeners(links)
      nextTick(() => addListeners(links))
    }
    el.$destroy = () => removeListeners(links)
  },
  updated: (el: InterpolationEl) => el.$componentUpdated?.(),
  beforeUnmount: (el: InterpolationEl) => el.$destroy?.(),
})
