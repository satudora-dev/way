import { combineReducers } from 'redux'
import users from './users'
import auth from './auth'
import projects from './projects'
import githubReports from './githubReports'

export default combineReducers({
  users,
  auth,
  projects,
  githubReports
})
