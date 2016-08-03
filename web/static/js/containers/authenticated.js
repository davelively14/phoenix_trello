import React from 'react'
import {connect} from 'react-redux'
import {routeActions} from 'react-router-redux'

class AuthenticatedContainer extends React.Component {
  componentDidMount() {
    const {dispatch, currentUser} = this.props

    // Check if jwt is present in the browser's local storage.
    if (localStorage.getItem('phoenixAuthToken')) {
      dispatch(Actions.currentUser())
    } else {
      dispatch(routeActions.push('/sign_up'))
    }
  }

  render() {
    // ...
  }
}

const mapStateToProps(state) {
  currentUser: state.session.currentUser
}

// docs:
// connect([mapStateToProps], [mapDispatchToProps], [mergeProps], [options])
// mapStateToProps: this function will be called any time the state updates
//   within the store. The state will be passed to the callback function.
// mapDispatchToProps: Send an object of functions and injects dispatch.
//
// The (AuthenticatedContainer) part is the component with which we're
// connecting the store. The AuthenticatedContainer would be rendered.
export default connect(mapStateToProps)(AuthenticatedContainer)
