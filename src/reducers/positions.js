const positions = (state = {init: true}, action) => {
  switch (action.type) {
    case 'RECEIVE_POSITIONS_DATA':
      let positions = {}
      if(action.data){
        Object.keys(action.data).forEach(key =>{
          let userkeys = []
          Object.keys(action.data[key]).forEach(userkey =>{
            userkeys.push({userkey})
          });
          positions[key]={
            userkeys: userkeys,
          }
        });
      }
      return positions
    case 'RECEIVE_POSITIONS_ERROR':
    case 'UPDATE_POSITION_ERROR':
      // alert(action.message)
      return state
    default:
      return state
  }
}

export default positions
