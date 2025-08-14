import React from 'react'
import { cx } from '../../utils/classNames'
import styles from './Button.module.scss'

function Button({
  children,
  variant = 'primary',
  onClick,
  className,
  ...props
}) {
  return (
    <button
      className={cx(styles.btn, styles[`btn--${variant}`], className)}
      onClick={onClick}
      {...props}
    >
      {children}
    </button>
  )
}

export default Button
