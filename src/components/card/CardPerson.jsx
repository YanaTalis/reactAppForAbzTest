import React from 'react'
import { cx } from '../../utils/classNames'
import styles from './CardPerson.module.scss'

// cards for people in the team
function CardPerson({ photo, name, position, email, phone }) {
  return (
    <div className={styles['person-card']}>
      <img className={styles['person-card__photo']} src={photo} alt={name} />
      <p className={styles['person-card__name']}>{name}</p>
      <div className={styles['person-card__description']}>
        <p className={styles['person-card__position']}>{position}</p>
        <p className={styles['person-card__email']}>{email}</p>
        <p className={styles['person-card__phone']}>{phone}</p>
      </div>
    </div>
  )
}

export default CardPerson
