class UserError {
  constructor(message) {
    this.message = message
  }
}

class UserErrors {
  constructor(...userErrors) {
    this.userErrors = [...userErrors]
  }
}

module.exports = { 
  userError: UserError,
  userErrors: UserErrors
}
