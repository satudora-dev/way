const auth = (state = {noData: true}, action) => {
  switch (action.type) {
    case 'SET_CURRENT_USER':
      return {currentUserID: action.currentUserID}
    default:
      return state
  }
}

export default auth
