const accounts = (state = {noData: true}, action) => {
  switch (action.type) {
    case 'RECEIVE_ACCOUNTS_DATA':
      if(action.data)
      return action.data
    case 'LOGIN_ERROR':
    case 'SIGNUP_ERROR':
    case 'SIGNOUT_ERROR':
      // alert(action.message)
      return state
    default:
      return state
  }
}

export default accounts
