const projects = (state = {noData: true}, action) => {
  switch (action.type) {
    case 'RECEIVE_PROJECTS_DATA':
      if(action.data){
        return action.data
      }
      break
    case 'RECEIVE_PROJECTS_ERROR':
      break
    case 'UPDATE_PROJECTS_ERROR':
      // alert(action.message)
      return state
    default:
      return state
  }
}

export default projects
