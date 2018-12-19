const users = (state = {noData: true}, action) => {
  switch (action.type) {
    case 'RECEIVE_USERS_DATA':
      if(action.data){
        return action.data
      }
      break
    case 'UPDATE_IMAGE_ERROR':
      break
    case 'EDIT_NAME_ERROR':
      break
    case 'INITIALIZE_NOW_ERROR':
      break
    case 'UPDATE_NOW_ERROR':
      break
    case 'UPDATE_POSITION_ERROR':
      break
    case 'UPDATE_PROJECTS_ERROR':
      break
    case 'ADD_TAG_ERROR':
      break
    case 'DELETE_TAG_ERROR':
      // alert(action.message)
      return state
    default:
      return state
  }
}

export default users
