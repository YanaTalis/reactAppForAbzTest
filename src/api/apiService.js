import { MAIN_URL } from '../constants'

const apiRequest = async (endpoint) => {
  try {
    const res = await fetch(`${MAIN_URL}${endpoint}`, {
      headers: {
        'Content-Type': 'application/json',
      },
    })
    if (!res.ok) {
      throw new Error(`HTTP ${res.status}`)
    }
    return await res.json()
  } catch (e) {
    throw new Error(`API request failed (${endpoint}): ${e.message}`)
  }
}

export const getToken = async () => {
  const res = await apiRequest('/token')
  return res.token
}

// GET users
export const getUsers = (page = 1, count = 6) =>
  apiRequest(`/users?page=${page}&count=${count}`)

// GET positions
export const getPositions = () => apiRequest('/positions')

export const registerUser = async (formData) => {
  try {
    const token = await getToken()
    const dataToSend = new FormData()
    dataToSend.append('name', formData.name)
    dataToSend.append('email', formData.email)
    dataToSend.append('phone', formData.phone)
    dataToSend.append('position_id', formData.position_id)
    dataToSend.append('photo', formData.photo)

    const response = await fetch(`${MAIN_URL}/users`, {
      method: 'POST',
      headers: {
        Token: token,
      },
      body: dataToSend,
    })

    const result = await response.json()
    if (!result.success) {
      throw new Error(result.message || 'Registration failed')
    }
    return result
  } catch (e) {
    console.error('Registration error:', e)
    throw (e)
  }
}
