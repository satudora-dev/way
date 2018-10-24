const positions = (state = [], action) => {
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
    case 'ADD_POSITION_ERROR':
      alert(action.message)
      return state
      break;
    default:
      return state
  }
}

export default positions
