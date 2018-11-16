const users = (state = {noData: true}, action) => {
  switch (action.type) {
    case 'RECEIVE_USERS_DATA':
      if(action.data){
        return action.data
      }
    case 'UPDATE_IMAGE_ERROR':
    case 'EDIT_NAME_ERROR':
    case 'UPDATE_POSITION_ERROR':
    case 'UPDATE_PROJECTS_ERROR':
    case 'ADD_TAG_ERROR':
    case 'DELETE_TAG_ERROR':
      // alert(action.message)
      return state
    default:
      return state
  }
}

export default users
