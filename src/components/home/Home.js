import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import './Home.css';

const Home = ({ boards, getBoards, addBoard, history }) => {
  useEffect(() => {
    getBoards();
  }, [getBoards]);

  const [showInput, setShowInput] = useState(false);
  const [boardName, setBoardName] = useState('');
  const newBoard = e => {
    e.persist();
    if (e.target.localName !== 'input') {
      setShowInput(!showInput);
    }
  };

  const formSubmitted = e => {
    e.preventDefault();
    if (boardName.trim() !== '') {
      addBoard(boardName);
      setBoardName('');
    } else {
      alert('Field is required');
    }
  };

  const goToBoard = id => {
    history.push(`/board/${id}`);
  };

  return (
    <div className="container">
      <div className="card" onClick={newBoard}>
        {!showInput ? <p>Create Board</p> : ''}
        {showInput ? (
          <div>
            <p className="board-name">Boardname</p>
            <form onSubmit={formSubmitted}>
              <input
                type="text"
                value={boardName}
                onChange={e => setBoardName(e.target.value)}
              />
            </form>
          </div>
        ) : (
          ''
        )}
      </div>
      <hr />
      <h3>Boards</h3>
      <div className="boards">
        {boards.map(({ id, name }) => (
          <div className="card" key={id} onClick={e => goToBoard(id)}>
            {name}
          </div>
        ))}
      </div>
    </div>
  );
};

Home.propTypes = {
  boards: PropTypes.array.isRequired,
  getBoards: PropTypes.func.isRequired,
  addBoard: PropTypes.func.isRequired
};

export default Home;
