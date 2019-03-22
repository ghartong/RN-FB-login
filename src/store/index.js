import { compose, createStore, applyMiddleware } from 'redux'
import allReducers from '../reducers/allReducers'
import thunk from 'redux-thunk'

const middleware = [thunk]
// eslint-disable-next-line no-underscore-dangle
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

const store = createStore(allReducers, composeEnhancers(applyMiddleware(...middleware)))

export default store
