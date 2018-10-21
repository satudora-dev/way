const accounts = (state = [], action) => {
  switch (action.type) {
    case 'ACCOUNTS_RECEIVE_DATA':
      let accounts = {}
      if(action.data){
        Object.keys(action.data).forEach(key =>{
          let account = action.data[key];
          accounts[key] = {
            email: account.email,
            registered: account.registerd,
            token: account.token,
          }
        });
      }
      return accounts
    case 'ACCOUNTS_RECEIVE_ERROR':
      alert(action.message)
      return state
      break;
    default:
      return state
  }
}

export default accounts
