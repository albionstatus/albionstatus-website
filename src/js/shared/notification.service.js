'use strict'

exports.authorize = function () {
  try {
    return Notification.requestPermission()
      .then(function (permission) {
        if (permission === 'denied')
          return
        else if (permission === 'default')
          return
        // Do something with the granted permission, if needed.
      })
  } catch (error) {
    // Safari doesn't return a promise for requestPermissions and it
    // throws a TypeError. It takes a callback as the first argument
    // instead.
    if (error instanceof TypeError) {
      Notification.requestPermission((permission) => {
        if (permission === 'denied')
          return
        else if (permission === 'default')
          return
      })
    } else {
      throw error
    }
  }
}

exports.show = function (title, options) {

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
    setTimeout(function () {
      notification.close()
    }, options.closeAfter)
  }

}

exports.isSupported = ('Notification' in window)
