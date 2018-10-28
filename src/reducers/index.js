import { combineReducers } from 'redux'
import accounts from './accounts'
import positions from './positions'
import projects from './projects'
import tags from './tags'
import users from './users'
import auth from './auth'

export default combineReducers({
  accounts,
  positions,
  projects,
  tags,
  users,
  auth,
})
