import { combineReducers } from 'redux'
import users from './users'
import auth from './auth'
import projects from './projects'

export default combineReducers({
  users,
  auth,
  projects,
})
