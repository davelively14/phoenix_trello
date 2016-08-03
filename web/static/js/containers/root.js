import React, { PropTypes } from 'react'
import { Provider } from 'react-redux'
import { Router, RoutingContext } from 'react-router'
import invariant from 'invariant'
import configureRoutes from '../routes'

// Establish required props for a Root component
const propTypes = {
  routerHistory: PropTypes.object.isRequired,
  store: PropTypes.object.isRequired
}

const Root = ({routerHistory, store}) => {

  // Invariant will return an error if routerHistory is falsey
  invariant(
    routerHistory,
    '<Root /> needs either a routingContext or routerHistory to render.'
  )

  return (
    <Provider store={store}>
      <Router history={routerHistory}>
        {configureRoutes(store)}
      </Router>
    </Provider>
  )
}

Root.propTypes = propTypes
export default Root
