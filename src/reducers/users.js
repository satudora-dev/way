const users = (state = {init: true}, action) => {
  switch (action.type) {
    case 'RECEIVE_USERS_DATA':
      let users = {}
      if(action.data){
        Object.keys(action.data).forEach(key =>{
          let userinfo = action.data[key]
          let projects = []
          if(userinfo.projects){
            Object.keys(userinfo.projects).forEach(project =>{
              projects.push(project);
            })
          }
          let tags = []
          if(userinfo.tags){
            Object.keys(userinfo.tags).forEach(tag =>{
              tags.push(tag);
            })
          }
          users[key] = {
            family: userinfo.family,
            given: userinfo.given,
            position: userinfo.position,
            projects: projects,
            tags: tags,
            icon: userinfo.icon,
          }
        });
      }
      return users
    case 'RECEIVE_USERS_ERROR':
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
