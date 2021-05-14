export const authorizeNotification = () => {
  try {
    return Notification.requestPermission()
  } catch (error) {
    // Safari fix
    Notification.requestPermission(() => {})
  }
}

// eslint-disable-next-line no-undef
export const showNotification = (title: string, options: NotificationOptions & { closeAfter?: number }) => {
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

export const isNotificationSendingSupported = typeof window !== 'undefined' && ('Notification' in window)
