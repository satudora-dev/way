const auth = (state = [], action) => {
  switch (action.type) {
    case 'SET_CURRENT_USER':
      return {CurrentUserEmail: action.email}
      break;
    default:
      return state
  }
}

export default auth
