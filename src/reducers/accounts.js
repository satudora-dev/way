const accounts = (state = {init: true}, action) => {
  switch (action.type) {
    case 'ACCOUNTS_RECEIVE_DATA':
      let accounts = {}
      if(action.data){
        Object.keys(action.data).forEach(key =>{
          let account = action.data[key];
          accounts[key] = {
            email: account.email,
            registered: account.registered,
            token: account.token,
          }
        });
      }
      return accounts
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
