const tags = (state = {init: true}, action) => {
  switch (action.type) {
    case 'RECEIVE_TAGS_DATA':
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
    case 'RECEIVE_TAGS_ERROR':
    case 'ADD_TAG_ERROR':
    case 'DELETE_TAG_ERROR':
      alert(action.message)
      return state
    default:
      return state
  }
}

export default tags
