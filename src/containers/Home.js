import { connect } from 'react-redux';

import Home from '../components/home/Home';

import { getBoards, addBoard } from '../actions/boards';

const mapStateToProps = ({ boards }) => ({
  boards
});

const mapDispatchToProps = dispatch => ({
  getBoards: e => dispatch(getBoards()),
  addBoard: name => dispatch(addBoard(name))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home);
