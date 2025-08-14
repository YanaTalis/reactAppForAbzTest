export const classNames = (...classes) => {
  return classes.filter(Boolean).join(' ')
}

export const cx = (...args) => {
  const classes = []

  args.forEach((arg) => {
    if (!arg) return 

    if (typeof arg === 'string') {
      classes.push(arg)
    } else if (Array.isArray(arg)) {
      classes.push(cx(...arg))
    } else if (typeof arg === 'object') {
      Object.keys(arg).forEach((key) => {
        if (arg[key]) {
          classes.push(key)
        }
      })
    }
  })

  return classes.join(' ')
}
