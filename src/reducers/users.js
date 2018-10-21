const users = (state = [], action) => {
  switch (action.type) {
    case 'USERS_RECEIVE_DATA':
      let users = []
      if(action.data){
        Object.keys(action.data).forEach(key =>{
          let userinfo = action.data[key]
          let projects = []
          Object.keys(userinfo.projects).forEach(project =>{
            projects.push(project);
          }
          let tags = []
          Object.keys(userinfo.tags).forEach(tag =>{
            tags.push(tag);
          }
          users.push({
            userid: key,
            family: userinfo.family,
            given: userinfo.given,
            position: userinfo.position,
            projects: projects,
            tags: tags
          })
        });
      }
      return [...users]
    case 'USERS_RECEIVE_ERROR':
      alert(action.message)
      break;
    default:
      return state
  }
}

export default users
