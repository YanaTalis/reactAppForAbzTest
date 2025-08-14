// Validation rules for every field (from test task documentation)
export const validationSchemas = {
  name: {
    minLength: 2,
    maxLength: 60,
    pattern: /^[a-zA-Zа-яА-ЯҐґЄєЇї\s]+$/,
  },

  email: {
    minLength: 6,
    maxLength: 100,
    pattern:
      /^(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])$/,
  },

  phone: {
    pattern: /^[\+]{0,1}380([0-9]{9})$/,
  },

  photo: {
    allowedTypes: ['image/jpeg', 'image/jpg'],
    maxSize: 5 * 1024 * 1024,
  },

  postposition: {
    minLength: 1,
  },
}

// what if mistakes
export const validateName = (name) => {
  if (!name || name.trim().length === 0) {
    return 'You need to write your name'
  }

  if (name.length < validationSchemas.name.minLength) {
    return 'Name must include at least 2 letters'
  }

  if (name.length > validationSchemas.name.maxLength) {
    return 'Name must include max 60 letters'
  }

  if (!validationSchemas.name.pattern.test(name)) {
    return 'Name must contain letters only'
  }

  return null
}

export const validateEmail = (email) => {
  if (!email || email.trim().length === 0) {
    return 'You need to write your email'
  }

  if (!validationSchemas.email.pattern.test(email)) {
    return 'You need to write a valid email'
  }

  return null
}

export const validatePhone = (phone) => {
  if (!phone || phone.trim().length === 0) {
    return 'You need to write your phone'
  }

  if (!validationSchemas.phone.pattern.test(phone)) {
    return 'Phone number must be in format: +38 (XXX) XXX - XX - XX'
  }

  return null
}

export const validatePhoto = (file) => {
  if (!file) {
    return 'You need to upload your photo'
  }

  if (!validationSchemas.photo.allowedTypes.includes(file.type)) {
    return 'Photo must be JPG or JPEG format'
  }

  if (file.size > validationSchemas.photo.maxSize) {
    return 'Photo size must be less than 5MB'
  }

  return null
}

export const validatePosition = (positionId) => {
  if (!positionId || positionId === '') {
    return 'Please select your position'
  }

  return null
}

// genral validation function for all fields
export const validateForm = (formData) => {
  const errors = {}

  const nameError = validateName(formData.name)
  if (nameError) errors.name = nameError

  const emailError = validateEmail(formData.email)
  if (emailError) errors.email = emailError

  const phoneError = validatePhone(formData.phone)
  if (phoneError) errors.phone = phoneError

  const positionError = validatePosition(formData.position_id)
  if (positionError) errors.position_id = positionError

  const photoError = validatePhoto(formData.photo)
  if (photoError) errors.photo = photoError

  return errors // obj with errors
}
