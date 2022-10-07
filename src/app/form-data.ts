export const FORM_ERRORS: any = {
    name: '',
    password: '',
    email: '',
    age: '',
    site: '',
    role: ''
}

export const VALUE_LENGTH: any = {
  name: 0,
  password: 0
}

export const VALIDATION_MESSAGES: any = {
  name: {
    required: 'Name is required.',
    minlength: 'Name must be at least 4 characters long.',
    maxlength: "Max name's long is 15 characters.",
  },
  password: {
    required: 'Password is required.',
    minlength: 'Password must be at least 7 characters long.'
  },
  email: {
    required: 'Email is required.',
    emailValidator: 'Email has invalid format.'
  },
  age: {
    required: 'Age is required.',
    ageValidator: 'Age must be a number in range 1 - 122.'
  },
  site: {
    required: 'Site field is required.',
    urlFormat: 'Site url has invalid format.',
    pending: 'Checking in progress...'
  },
  role: {
    required: 'Role is required.'
  }
}