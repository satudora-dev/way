const auth = (state = {init: true}, action) => {
  switch (action.type) {
    case 'SET_CURRENT_USER':
      return {CurrentUserKey: action.userkey}
      break;
    default:
      return state
  }
}

export default auth
