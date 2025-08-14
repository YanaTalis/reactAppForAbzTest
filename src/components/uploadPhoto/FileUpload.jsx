import React, { useRef } from 'react'
import { cx } from '../../utils/classNames'
import styles from './FileUpload.module.scss'

// component for file upload
function FileUpload({
  onChange,
  file,
  error,
  errorText,
  className = '',
  accept = '.jpg,.jpeg',
  placeholder = 'Upload your photo',
  disabled = false,
}) {
  const inputRef = useRef(null)

  const handleClick = () => {
    if (!disabled && inputRef.current) {
      inputRef.current.click()
    }
  }

  const handleFileChange = (e) => {
    if (!disabled) {
      onChange(e)
    }
  }

  return (
    <div className={cx(styles['file-upload__container'], className)}>
      <div
        className={cx(styles['file-upload__wrapper'], {
          [styles['file-upload__wrapper--error']]: error,
          [styles['file-upload__wrapper--disabled']]: disabled,
        })}
      >
        <label
          className={cx(styles['file-upload__label'], {
            [styles['file-upload__label--disabled']]: disabled,
          })}
        >
          <span
            className={cx(styles['file-upload__button'], {
              [styles['file-upload__button--disabled']]: disabled,
            })}
            onClick={disabled ? (e) => e.preventDefault() : undefined}
          >
            Upload
          </span>
          <input
            className={styles['file-upload__input']}
            type="file"
            accept={accept}
            onChange={handleFileChange}
            disabled={disabled}
            ref={inputRef}
          />
        </label>
        <span className={styles['file-upload__name']}>
          {file ? file.name : placeholder}
        </span>
      </div>
      {error && errorText && (
        <p className={styles['file-upload__error-text']}>{errorText}</p>
      )}
    </div>
  )
}

export default FileUpload
