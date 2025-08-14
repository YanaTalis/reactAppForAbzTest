import React from 'react'
import styles from './Loader.module.scss'
import { cx } from '../../utils/classNames'

const Loader = ({ size = 48, className = '' }) => {
  return (
    <span
      className={cx(styles.loader, className)}
      style={{ width: size, height: size }}
      aria-label="loading"
    />
  )
}

export default Loader
