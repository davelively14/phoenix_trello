import Constants from '../constants'

// Default is no currentBoard selected
const initialState = {
  connectedUsers: [],
  channel: null,
  showForm: false,
  showUsersForm: false,
  editingListId: null,
  addingNewCardInListId: null,
  error: null,
  fetching: true
}

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case Constants.CURRENT_BOARD_FETCHING:
      return {...state, fetching: true}

    case Constants.BOARDS_SET_CURRENT_BOARD:
      return {...state, fetching: false, ...action.board}

    case Constants.CURRENT_BOARD_CONNECTED_TO_CHANNEL:
      return {...state, channel: action.channel}

    case Constants.CURRENT_BOARD_MEMBER_ADDED:
      const {memnbers} = state
      members.push(action.user)
      return {...state, members: members, showUsersForm: false}

    default:
      return state
  }
}
