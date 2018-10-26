const tags = (state = {init: true}, action) => {
  switch (action.type) {
    case 'TAGS_RECEIVE_DATA':
      let tags = {}
      if(action.data){
        Object.keys(action.data).forEach(key =>{
          let userkeys = []
          Object.keys(action.data[key]).forEach(userkey =>{
            userkeys.push({userkey})
          });
          tags[key]={
            userkeys: userkeys,
          }
        });
      }
      return tags
    case 'TAGS_RECEIVE_ERROR':
      alert(action.message)
      return state
    default:
      return state
  }
}

export default tags
