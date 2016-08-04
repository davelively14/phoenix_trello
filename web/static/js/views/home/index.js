import React from 'react'
import {connect} from 'react-router'
import classnames from 'classnames'

import {setDocumentTitle} from '../utils'
import Actions from '../../actions/boards'
import BoardCard from '../../components/boards/card'
import BoardForm from '../../components/boards/form'

class HomeIndexView extends React.Component {

  // Upon mounting, will change the document title to Boards and dispatch an
  // action to load the boards from the backend.
  componentDidMount() {
    setDocumentTitle('Boards')

    const {dispatch} = this.props
    dispatch(Actions.fetchBoards())
  }

  _renderOwnedBoards() {
    const {fetching} = this.props

    let content = false

    // TODO Interesting spinners. The prop 'fetching' will be true while the
    // client is waiting for the backend to respond.  That prop is set by the
    // actions/boards.js BOARDS-FETCHING call. The 'classnames' npm lib
    // will evaluate the values and supply the keys that are true. So, while
    // loading, fa, fa-spinner, and fa-spin will be active.  Once fetched, then
    // fa and fa-user will be active below.
    const iconClasses = classnames({
      fa: true,
      'fa-user': !fetching,
      'fa-spinner': fetching,
      'fa-spin': fetching
    })

    // Only renders something to content if fetching is complete.
    if (!fetching) {
      content = (
        <div className="boards-wrapper">
          {::this._renderBoards(this.props.ownedBoards)}
          {::this._renderAddNewBoard()}
        </div>
      )
    }

    return (
      <section>
        <header className="view-header">
          <h3><i className={iconClasses}> My boards</i></h3>
        </header>
        {content}
      </section>
    )
  }

  _renderBoards(boards) {
    return boards.map((board) => {
      return <Board key={board.id} dispatch={this.props.dispatch} {...board} />
    })
  }

  _renderAddNewBoard() {
    let {showForm, dispatch, formErrors} = this.props

    if (!showForm) return this._renderAddButton()

    return (
      <BoardForm dispatch={dispatch} errors={formErrors} onCancelClick={::this._handleCancelClick} />
    )
  }

  _renderAddButton() {
    return (
      <div className="board add-new" onClick={::this._handleAddNewClick}>
        <div className="inner">
          <a id="add_new_board">Add new board...</a>
        </div>
      </div>
    )
  }

  _handleAddNewClick() {
    let {dispatch} = this.props

    dispatch(Actions.showForm(true))
  }

  _handleCancelClick() {
    this.props.dispatch(Actions.showForm(false))
  }

  render() {
    return (
      <div className="view-container boards index">
        {::this._renderOwnedBoards}
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  state.boards
}

export default connect(mapStateToProps)(HomeIndexView)
