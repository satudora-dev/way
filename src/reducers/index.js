import { combineReducers } from 'redux'
import accounts from './accounts'
import positions from './positions'
import projects from './projects'
import tags from './tags'
import users from './users'

export default combineReducers({
  accounts,
  positions,
  projects,
  tags, 
  users,
})
