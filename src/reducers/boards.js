import {
  GET_BOARDS,
  ADD_BOARD,
  ADD_CARD,
  ADD_LIST,
  DELETE_LIST
} from '../actions/types';

const saveBoard = board => {
  if (localStorage.getItem('boards')) {
    localStorage.setItem('boards', JSON.stringify(board));
  } else {
    localStorage.setItem('boards', JSON.stringify(board));
  }
};

const boards = (state = [], { type, payload }) => {
  let boards;
  switch (type) {
    case GET_BOARDS:
      return payload;
    case ADD_BOARD:
      saveBoard([...state, payload]);
      return [...state, payload];
    case ADD_CARD:
      boards = state.map(board => {
        if (board.id === payload.id) {
          if (board.cards) {
            board.cards = [...board.cards, payload.card];
          } else {
            board.cards = [payload.card];
          }
        }
        return board;
      });
      saveBoard(boards);
      return boards;
    case ADD_LIST:
      boards = state.map(board => {
        if (board.id === payload.id) {
          board.cards.map(card => {
            if (card.id === payload.cardId) {
              if (card.lists) {
                card.lists = [...card.lists, payload.list];
              } else {
                card.lists = [payload.list];
              }
            }
            return card;
          });
        }
        return board;
      });
      saveBoard(boards);
      return boards;
    case DELETE_LIST:
      boards = state.map(board => {
        if (board.id === payload.id) {
          board.cards.map(card => {
            if (card.id === payload.cardId) {
              card.lists = card.lists.filter(({ id }) => id !== payload.listId);
            }
            return card;
          });
        }
        return board;
      });
      saveBoard(boards);
      return boards;
    default:
      return state;
  }
};

export default boards;
