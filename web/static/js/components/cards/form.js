import React, {PropTypes} from 'react'
import Actions from '../../actions/lists'
import PageClick from 'react-page-click'

export default class CardForm extends React.Component {
  _handleSubmit(e) {
    e.preventDefault()

    let {dispatch, channel, listId} = this.props
    let {name} = this.refs

    let data = {
      list_id: listId,
      name: name.value
    }

    dispatch(Actions.createdCard(channel, data))
    this.props.onSubmit()
  }

  componentDidMount() {
    this.refs.name.focus()
  }

  _handleCancelClick(e) {
    e.preventDefault()

    this.props.onCancelClick()
  }

  render() {
    return (
      <PageClick onClick={::this._handleCancelClick}>
        <div className="card form">
          <form id="new_card_form" onSubmit={::this._handleSubmit}>
            <textarea ref="name" id="card_name" type="text" required="true" rows={5} />
            <button type="submit">Add</button> or <a href="#" onClick={::this._handleCancelClick}>cancel</a>
          </form>
        </div>
      </PageClick>
    )
  }
}
