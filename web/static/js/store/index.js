import { createStore, applyMiddleware } from 'redux'
import { routerMiddleware } from 'react-router-redux'
import createLogger from 'redux-logger'
import thunkMiddleware from 'redux-thunk'
import reducers from '../reducers'

const loggerMiddleware = createLogger({
  level: 'info',
  collapsed: true
})

// Configuring our store with three middlewares:
// 1. routerMiddleware to dispatch router actions to the store
// 2. redux-thunk to dispatch async actions
// 3. redux-logger to log any action and state changes through the browser's
//    console.
export default function configureStore(browserHistory) {
  const reduxRouterMiddleware = routerMiddleware(browserHistory)
  const createStoreWithMiddleware = applyMiddleware(reduxRouterMiddleware, thunkMiddleware, loggerMiddleware)(createStore)

  return createStoreWithMiddleware(reducers)
}
