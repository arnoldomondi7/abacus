import { createStore, applyMiddleware } from 'redux'
import { rootReducers } from '../reducers/index.reducer'
import thunk from 'redux-thunk'

//create store.
const store = createStore(rootReducers, applyMiddleware(thunk))

export default store
