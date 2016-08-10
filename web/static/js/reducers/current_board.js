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

    case Constants.CURRENT_BOARD_LIST_CREATED:
      const lists = [...state.lists]
      lists.push(action.list)
      return {...state, lists: lists, showForm: false}

    case Constants.CURRENT_BOARD_CARD_CREATED:
      lists = [...state.lists]
      const {card} = action
      const listIndex = lists.findIndex((list) => {
        return list.id == card.list_id
      })
      return {...state, lists: lists}

    default:
      return state
  }
}
