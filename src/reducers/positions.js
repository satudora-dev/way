const positions = (state = [], action) => {
  switch (action.type) {
    case 'POSITIONS_RECEIVE_DATA':
      let positions = []
      if(action.data){
        Object.keys(action.data).forEach(key =>{
          let userids = []
          Object.keys(action.data[key]).forEach(userid =>{
            userids.push({userid})
          });
          positions.push({
            position: key,
            userids: userids,
          })
        });
      }
      return [...positions]
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
