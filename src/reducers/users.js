const users = (state = {init: true}, action) => {
  switch (action.type) {
    case 'USERS_RECEIVE_DATA':
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
    case 'USERS_RECEIVE_ERROR':
    case 'SIGNUP_ERROR':
    case 'NAME_EDIT_ERROR':
    case 'TAG_DELETE_ERROR':
    case 'TAG_ADD_ERROR':
    case 'UPDATE_PROJECTS_ERROR':
    case 'UPDATE_TAG_ERROR':
      alert(action.message)
      return state
      break;
    default:
      return state
  }
}

export default users
