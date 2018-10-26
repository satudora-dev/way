const projects = (state = {init: true}, action) => {
  switch (action.type) {
    case 'PROJECTS_RECEIVE_DATA':
      let projects ={}
      if(action.data){
        Object.keys(action.data).forEach(key =>{
          let members = []
          Object.keys(action.data[key].members).forEach(userkey =>{
            members.push({userkey})
          });
          projects[key]={
            members: members,
          }
        });
      }
      return projects
    case 'PROJECTS_RECEIVE_ERROR':
      alert(action.message)
      return state
    default:
      return state
  }
}

export default projects
