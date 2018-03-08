export const authorize = () => {
  try {
    return Notification.requestPermission()
  } catch (error) {
    // Safari fix
    Notification.requestPermission((p) => {})
  }
}

export const show = (title, options) => {
  const notification = new Notification(
    title || 'No title set on options object!', {
      dir: options.dir || 'auto',
      lang: options.lang || 'en-US',
      body: options.body || '',
      tag: options.tag || '',
      icon: options.icon || ''
    }
  )
  if (options.closeAfter) {
    setTimeout(() => { notification.close() }, options.closeAfter)
  }
}

export const isSupported = typeof window !== 'undefined' && ('Notification' in window)
