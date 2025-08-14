import React from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'
import './styles/reset.scss'
import './styles/main.scss'

// if update the scroll position on page reload, it will be reset to the top
if (typeof window !== 'undefined') {
  window.onbeforeunload = function () {
    window.scrollTo(0, 0)
  }
}

// Find the root element and render the application
const root = createRoot(document.getElementById('root'))
root.render(<App />)
