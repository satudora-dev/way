const positions = (state = {init: true}, action) => {
  switch (action.type) {
    case 'POSITIONS_RECEIVE_DATA':
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
    case 'POSITIONS_RECEIVE_ERROR':
      alert(action.message)
      return state
    default:
      return state
  }
}

export default positions
