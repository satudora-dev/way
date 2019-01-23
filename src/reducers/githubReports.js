const githubReports = (state = {noData: true}, action) => {
  switch (action.type) {
    case 'RECEIVE_GITHUBREPORTS_DATA':
      if(action.data){
        return action.data
      }
      break
    default:
      return state
  }
}

export default githubReports
