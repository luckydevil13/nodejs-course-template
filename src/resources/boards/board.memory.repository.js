const Board = require('./board.model');

const boards = [];

const getAll = async () => {
  return boards;
};

const getBoardById = async id => {
  return boards.find(board => board.id === id);
};

const createBoard = async board => {
  const newBoard = new Board(board);

  return newBoard ? boards.push(newBoard) && newBoard : null;
};

const deleteBoardById = async id => {
  // TODO should unassign board's tasks upon deletion
  const board = await getBoardById(id);
  if (!board) {
    return false;
  }
  const index = boards.indexOf(board);
  boards.splice(index, 1);

  return true;
};

const updateBoardById = async (id, data) => {
  const board = await getBoardById(id);
  if (board) {
    if (
      !data.title ||
      !Array.isArray(data.columns) ||
      data.columns.length === 0 ||
      data.columns.find(column => Board.isInvalidColumn(column))
    ) {
      return;
    }

    const index = boards.indexOf(board);
    boards[index].title = data.title;
    boards[index].id = data.id ? data.id : boards[index].id;
    boards[index].columns = data.columns;

    return boards[index];
  }
};

module.exports = {
  getAll,
  createBoard,
  getBoardById,
  updateBoardById,
  deleteBoardById,
};
