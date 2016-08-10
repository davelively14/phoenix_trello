import React, {PropTypes} from 'react'
import Actions from '../../actions/current_board'
import CardForm from '../../components/cards/form'
import Card from '../../components/cards/card'

export default class ListCard extends React.Component {

  _renderCards() {
    const {cards, dispatch, boardId} = this.props

    return cards.map((card) => {
      return (
        <Card
          key={card.id}
          dispatch={dispatch}
          boardId={boardId}
          {...card}
          onDrop={::this._handleDropCard} />
      )
    })
  }

  _renderForm() {
    const {isAddingNewCard} = this.props

    if (!isAddingNewCard) return false

    let {id, dispatch, formErrors, channel} = this.props

    return (
      <CardForm
        listId={id}
        dispatch={dispatch}
        errors={formErrors}
        channel={channel}
        onCancelClick={::this._hideCardForm}
        onSubmit={::this._hideCardForm} />
    )
  }

  _renderAddNewCard() {
    const {isAddingNewCard} = this.props

    if (isAddingNewCard) return false

    return (
      <a className="add-new" href="#" onClick={::this._handleAddClick}>Add a new card...</a>
    )
  }

  _handleAddClick(e) {
    e.preventDefault()

    const {dispatch, id} = this.props

    dispatch(Actions.showCardForm(id))
  }

  _handleDropCard({source, target}) {
    this.props.onDropCard({source, target})
  }

  _hideCardForm() {
    const {dispatch} = this.props

    dispatch(Actions.showCardForm(null))
  }

  // TODO drag and drop tracking
  render() {
    const {name, id, connectDragSource, connectDropTarget, connectCardDropTarget, isDragging} = this.props

    // This says, if dragging no style, otherwise block style
    const styles = {
      display: isDragging ? 'none' : 'block'
    }

    return (
      <div id={`list_${id}`} className="list" style={styles}>
        <div className="inner">
          <header>
            <h4>{name}</h4>
          </header>
          <div className="cards-wrapper">
            {::this._renderCards()}
          </div>
          <footer>
            {::this._renderForm()}
            {::this._renderAddNewCard()}
          </footer>
        </div>
      </div>
    )
  }
}
