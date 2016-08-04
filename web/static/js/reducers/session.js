import Constants from '../constants'

const initialState= {
  currentUser: null,
  error: null,
  channel: null,
  error: null
}

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case Constants.CURRENT_USER:
      return {...state, currentUser: action.currentUser}

    case Constants.SESSIONS_ERROR:
      return {...state, error: action.error}

    case Constants.USER_SIGNED_OUT:
      return initialState

    case Constants.SOCKET_CONNECTED:
      return {...state, socket: action.socket, channel: action.channel}

    default:
      return state
  }
}
