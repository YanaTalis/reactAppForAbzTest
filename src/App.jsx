import React, { useRef, useState } from 'react'
import Header from './components/header/Header.jsx'
import HeroSection from './components/hero/HeroSection.jsx'
import GetSection from './components/getSection/GetSection.jsx'
import PostSection from './components/postSection/PostSection.jsx'

const App = () => {
  // create ref for PostSection and go to it from Header
  const postSectionRef = useRef(null)
  const getSectionRef = useRef(null)

  // to take our new person in getSection
  const handleSuccessRegistration = () => {
    if (getSectionRef.current) {
      getSectionRef.current.refreshUsers()
    }
  }

  return (
    <div>
      <Header postSectionRef={postSectionRef} getSectionRef={getSectionRef} />
      <HeroSection postSectionRef={postSectionRef} />
      <GetSection ref={getSectionRef} />
      <PostSection
        ref={postSectionRef}
        onSuccessRegistration={handleSuccessRegistration}
      />
    </div>
  )
}

export default App
