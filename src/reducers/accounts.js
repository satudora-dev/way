const accounts = (state = {init: true}, action) => {
  switch (action.type) {
    case 'ACCOUNTS_RECEIVE_DATA':
      if(action.data)
      return action.data
    case 'ACCOUNTS_RECEIVE_ERROR':
    case 'LOGIN_ERROR':
    case 'SIGNOUT_ERROR':
      alert(action.message)
      return state
    default:
      return state
  }
}

export default accounts
