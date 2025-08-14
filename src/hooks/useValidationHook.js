import { useState, useCallback } from 'react'
import {
  validateName,
  validateEmail,
  validatePhone,
  validatePhoto,
  validatePosition,
  validateForm,
} from '../utils/validation'

export const useValidationHook = () => {
  const [errors, setErrors] = useState({})
  const [changed, setChanged] = useState({})

  // Validate eachfield
  const validateField = useCallback((nameFunc, value) => {
    let error = null

    switch (nameFunc) {
      case 'name':
        error = validateName(value)
        break
      case 'email':
        error = validateEmail(value)
        break
      case 'phone':
        error = validatePhone(value)
        break
      case 'position_id':
        error = validatePosition(value)
        break
      case 'photo':
        error = validatePhoto(value)
        break
      default:
        break
    }

    setErrors((prev) => ({
      ...prev,
      [nameFunc]: error,
    }))

    return error
  }, [])

  // Validate whole form
  const validateFormData = useCallback((formData) => {
    const formErrors = validateForm(formData)
    setErrors(formErrors)
    return Object.keys(formErrors).length === 0
  }, [])

  // Mark field as touched
  const setFieldChanged = useCallback((fieldName) => {
    setChanged((prev) => ({
      ...prev,
      [fieldName]: true,
    }))
  }, [])

  // Clear errors after sending
  const clearErrors = useCallback(() => {
    setErrors({})
    setChanged({})
  }, [])

  // Recieve error for specific field
  const getFieldError = useCallback(
    (fieldName) => {
      return changed[fieldName] ? errors[fieldName] : null
    },
    [errors, changed]
  )

  // Check whole form
  const isFormValid = useCallback((formData) => {
    const formErrors = validateForm(formData)
    const allFieldsFilled =
      formData.name &&
      formData.email &&
      formData.phone &&
      formData.position_id &&
      formData.photo

    return Object.keys(formErrors).length === 0 && allFieldsFilled
  }, [])

  return {
    validateField,
    validateFormData,
    setFieldChanged,
    getFieldError,
    isFormValid,
    clearErrors
  }
}
