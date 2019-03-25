import {combineReducers} from 'redux'
import counterReducer from './counterReducer'
import userReducer from './userReducer'

const allReducers = combineReducers({
    counter: counterReducer,
    user: userReducer
})

export default allReducers
