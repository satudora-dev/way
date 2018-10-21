const auth = (state = [], action) => {
  switch (action.type) {
    case 'SET_CURRENT_USER':
      console.log(action)
      return {CurrentUserEmail: action.email}
      break;
    default:
      return state
  }
}

export default auth
