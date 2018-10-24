const tags = (state = [], action) => {
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
    case 'TAG_DELETE_ERROR':
    case 'TAG_ADD_ERROR':
      alert(action.message)
      return state
      break;
    default:
      return state
  }
}

export default tags
