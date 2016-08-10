import Constants from '../constants'

const Actions = {
  save: (channel, data) => {
    return dispatch => {
      channel.push('lists:create', {list: data})
    }
  }
}

export default Actions
