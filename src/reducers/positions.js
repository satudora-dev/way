const positions = (state = {noData: true}, action) => {
  switch (action.type) {
    case 'RECEIVE_POSITIONS_DATA':
      if(action.data){
        return action.data
      }
    case 'UPDATE_POSITION_ERROR':
      // alert(action.message)
      return state
    default:
      return state
  }
}

export default positions
