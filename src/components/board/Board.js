import React, { useState, Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';

import './Board.css';

const Board = ({ board, addCard, addList, deleteList, history, getBoards }) => {
  const [cardInput, setCardInput] = useState('');
  const [listInput, setListInput] = useState('');
  const [draggedInfo, setDraggedInfo] = useState({});
  useEffect(() => {
    getBoards();
  }, [getBoards]);

  const formSubmitted = (e, id, cardId = null) => {
    e.persist();
    e.preventDefault();
    const name = e.target[0].name;

    if (name === 'cardInput') {
      if (cardInput.trim() === '') return alert('Field is required');
      addCard(id, cardInput);
      setCardInput('');
    } else {
      if (listInput.trim() === '') return alert('Field is required');
      addList(id, cardId, listInput);
      setListInput('');
    }

    e.target[0].value = '';
  };

  const drop = (e, boardId, cardId) => {
    e.persist();
    e.preventDefault();
    const { cardId: delCardId, list } = draggedInfo;
    deleteList(boardId, delCardId, list.id);
    addList(boardId, cardId, list, false);
    setDraggedInfo({});
  };

  const dragStart = (e, cardId, list) => {
    e.persist();
    console.log(e);
    setDraggedInfo({ cardId, list });
    // e.dataTransfer.setData('text/plain', JSON.stringify({ cardId, list }));
  };

  return (
    <div className="container" id="board">
      <button onClick={e => history.goBack()}>Back</button>
      {board ? (
        <Fragment>
          <header className="board">
            <h2>{board.name}</h2>
          </header>

          <hr />

          <div className="card form">
            <p>Create Card</p>
            <form onSubmit={e => formSubmitted(e, board.id)}>
              <input
                type="text"
                name="cardInput"
                onChange={e => setCardInput(e.target.value)}
                placeholder="Card name"
              />
            </form>
          </div>
          <hr />
          <h3>Cards</h3>
          <div className="board-cards">
            {board.cards
              ? board.cards.map(card => (
                  <div className="card" key={card.id}>
                    <p>{card.name}</p>
                    <form onSubmit={e => formSubmitted(e, board.id, card.id)}>
                      <input
                        type="text"
                        name="listInput"
                        placeholder="Create list"
                        onChange={e => setListInput(e.target.value)}
                      />
                    </form>
                    <ul
                      onDragOver={e => e.preventDefault()}
                      onDrop={e => drop(e, board.id, card.id)}>
                      {card.lists
                        ? card.lists.map(list => (
                            <li
                              key={list.id}
                              draggable
                              onDragStart={e => dragStart(e, card.id, list)}>
                              {list.name}
                            </li>
                          ))
                        : ''}
                    </ul>
                  </div>
                ))
              : ''}
          </div>
        </Fragment>
      ) : (
        <div style={{ marginTop: '1rem' }}>No Board</div>
      )}
    </div>
  );
};

Board.propTypes = {
  board: PropTypes.object,
  addCard: PropTypes.func.isRequired,
  addList: PropTypes.func.isRequired,
  deleteList: PropTypes.func.isRequired
};

export default Board;
