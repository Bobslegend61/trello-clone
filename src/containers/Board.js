import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import Board from '../components/board/Board';
import { addCard, addList, deleteList, getBoards } from '../actions/boards';

const mapStateToProps = (
  { boards },
  {
    match: {
      params: { id }
    }
  }
) => ({
  board:
    boards.find(board => board.id === id) || localStorage.getItem('boards')
      ? JSON.parse(localStorage.getItem('boards')).find(
          board => board.id === id
        )
      : null
});

const mapDispatchToProps = dispatch => ({
  getBoards: () => dispatch(getBoards()),
  addCard: (id, cardInput) => dispatch(addCard(id, cardInput)),
  addList: (id, cardId, listInput, inc = true) =>
    dispatch(addList(id, cardId, listInput, inc)),
  deleteList: (id, cardId, listId) => dispatch(deleteList(id, cardId, listId))
});

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(Board)
);
