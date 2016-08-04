import React from 'react'
import {connect} from 'react-redux'
import Actions from '../actions/sessions'
import {routeActions} from 'react-router-redux'
import Header from '../layouts/header'

class AuthenticatedContainer extends React.Component {
  componentDidMount() {
    const {dispatch, currentUser} = this.props
    const phoenixAuthToken = localStorage.getItem('phoenixAuthToken')

    if (phoenixAuthToken && !currentUser) {
      dispatch(Actions.currentUser())
    } else if (!phoenixAuthToken) {
      dispatch(routeActions.push('/sign_in'))
    }
  }

  render() {
    const {currentUser, dispatch} = this.props

    if (!currentUser) return false

    return (
      <div className="application-container">
        <Header currentUser={currentUser} dispatch={dispatch} />
        <div className="main-container">
          {this.props.children}
        </div>
      </div>
    )
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
