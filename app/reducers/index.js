/* combineReducers is not currently used, but eventually should be for modular code :D */
import { combineReducers } from 'redux'
import campuses from './campusReducer'
import students from './studentReducer'

export default combineReducers({ campuses, students });
