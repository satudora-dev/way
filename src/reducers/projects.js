const projects = (state = [], action) => {
  switch (action.type) {
    case 'PROJECTS_RECEIVE_DATA':
      let projects = []
      if(action.data){
        Object.keys(action.data).forEach(key =>{
          let userids = []
          Object.keys(action.data[key]).forEach(userid =>{
            userids.push({userid})
          });
          projects.push({
            project: key,
            userids: userids,
          })
        });
      }
      return [...projects]
    case 'PROJECTS_RECEIVE_ERROR':
      alert(action.message)
      break;
    default:
      return state
  }
}

export default projects
