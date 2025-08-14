import React from 'react'
import logoImg from '../../img/logo.svg'
import Button from '../button/Button'
import { cx } from '../../utils/classNames'
import styles from './Header.module.scss'

// Header's component
function Header({ postSectionRef, getSectionRef }) {
  // Function, that works when we clic on btn Users
  const handleUsersClick = () => {
    getSectionRef?.current?.scrollTo?.()
  }

  // When SignUp clicked, we go to postFormSection
  const handleSignUpClick = () => {
    if (postSectionRef && postSectionRef.current) {
      postSectionRef.current.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <header className={styles.header}>
      <div className="container">
        <div className={styles['header__row']}>
          <div className={styles['header__logo']}>
            <img src={logoImg} alt="logoAbz" />
          </div>
          <nav className={styles['header__nav']}>
            <ul className={styles['nav-list']}>
              <li>
                <Button variant="primary" onClick={handleUsersClick}>
                  Users
                </Button>
              </li>
              <li>
                <Button variant="primary" onClick={handleSignUpClick}>
                  Sign up
                </Button>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </header>
  )
}

export default Header
