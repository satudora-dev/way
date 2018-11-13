const tags = (state = {noData: true}, action) => {
  switch (action.type) {
    case 'RECEIVE_TAGS_DATA':
      if(action.data){
        return action.data
      }
    case 'ADD_TAG_ERROR':
    case 'DELETE_TAG_ERROR':
      // alert(action.message)
      return state
    default:
      return state
  }
}

export default tags
