const tags = (state = [], action) => {
  switch (action.type) {
    case 'TAGS_RECEIVE_DATA':
      let tags = {}
      if(action.data){
        Object.keys(action.data).forEach(key =>{
          let userids = []
          Object.keys(action.data[key]).forEach(userid =>{
            userids.push({userid})
          });
          tags[key]={
            userids: userids,
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
