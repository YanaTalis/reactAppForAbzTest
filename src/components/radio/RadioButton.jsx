import React from 'react'
import { cx } from '../../utils/classNames'
import styles from './RadioButton.module.scss'

// radio component
function RadioButton({
  name,
  value,
  checked,
  onChange,
  children,
  className = '',
}) {
  return (
    <label className={cx(styles.radio, className)}>
      <input
        type="radio"
        name={name}
        value={value}
        checked={checked}
        onChange={onChange}
      />
      <span className={styles['radio__custom']}></span>
      <span className={styles['radio__label']}>{children}</span>
    </label>
  )
}

export default RadioButton
