import React from 'react'
import successImage from '../../img/success-image.svg'
import styles from './ModalSuccess.module.scss'

function ModalSuccess() {
  return (
    <div className={styles.modal}>
      <div className={styles['modal__content']}>
        <h2 className={styles['modal__title']}>User successfully registered</h2>
        <img
          src={successImage}
          alt="Success"
          className={styles['modal__image']}
        />
      </div>
    </div>
  )
}

export default ModalSuccess
