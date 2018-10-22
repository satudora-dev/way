const projects = (state = [], action) => {
  switch (action.type) {
    case 'PROJECTS_RECEIVE_DATA':
      let projects ={}
      if(action.data){
        Object.keys(action.data).forEach(key =>{
          let members = []
          Object.keys(action.data[key].members).forEach(userid =>{
            members.push({userid})
          });
          projects[key]={
            members: members,
          }
        });
      }
      return projects
    case 'PROJECTS_RECEIVE_ERROR':
    case 'SET_PROJECTS_ERROR':
      alert(action.message)
      return state
      break;
    default:
      return state
  }
}

export default projects
