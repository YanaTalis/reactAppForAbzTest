import React from 'react'
import { cx } from '../../utils/classNames'
import styles from './Input.module.scss'

// input component with standard props
function Input({
  type = 'text',
  name,
  placeholder,
  value,
  onChange,
  onBlur,
  helperText,
  error,
  className = '',
  ...props
}) {
  return (
    <div className={cx(styles.input, className)}>
      <input
        className={cx(styles['input__field'], {
          [styles['input__field--error']]:
            error && styles['input__field--error'],
        })}
        type={type}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        {...props}
      />
      {(helperText || error) && (
        <p
          className={cx(styles['input__helper-text'], {
            [styles['input__helper-text--error']]: error,
          })}
        >
          {error || helperText}
        </p>
      )}
    </div>
  )
}

export default Input
