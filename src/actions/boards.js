import {
  GET_BOARDS,
  ADD_BOARD,
  ADD_CARD,
  ADD_LIST,
  DELETE_LIST
} from './types';
import uuid from 'uuid/v4';

export const getBoards = () => {
  const boards = JSON.parse(localStorage.getItem('boards')) || [];
  return {
    type: GET_BOARDS,
    payload: boards
  };
};

export const addBoard = name => {
  const board = {
    id: uuid(),
    name
  };
  return {
    type: ADD_BOARD,
    payload: board
  };
};

export const addCard = (id, cardInput) => {
  return {
    type: ADD_CARD,
    payload: {
      id,
      card: {
        id: uuid(),
        name: cardInput
      }
    }
  };
};

export const addList = (id, cardId, listInput, inc) => {
  return {
    type: ADD_LIST,
    payload: {
      id,
      cardId,
      list: inc ? { id: uuid(), name: listInput } : listInput
    }
  };
};

export const deleteList = (id, cardId, listId) => ({
  type: DELETE_LIST,
  payload: { id, cardId, listId }
});
