import {pushPath} from 'react-router-redux'
import Constants from '../constants'
import {httpPost} from '../utils'

const Actions = {}

// I prefer the other way to do this. Just list a bunch of functions. This
// creates an object with functions. Seems like an extra layer of complexity for
// no apparent reason.
//
// Also, I think this is incorrect. It's combining actions and reducers in one.
// In the future, use the architecture from learn-redux project in the Redux
// folder.
//
// Also, the silly function((data) => { functionBody}) horse shit...just do it:
// function(data) { functionBody }

Actions.sign_up(data) {
  return dispatch => {
    httpPost('/api/v1/registrations', {user: data})
      .then((data) => {
        localStorage.setItem('phoenixAuthToken', data.jwt)

        dispatch({
          type: Constants.CURRENT_USER,
          currentUser: data.user
        })

        dispatch(pushPath('/'))
      })
      .catch((error) => {
        error.response.json()
          .then((errorJSON) => {
            dispatch({
              type: Constants.REGISTRATIONS_ERROR,
              errors: errorJSON.errors
            })
          })
      })
  }
}

export default Actions
