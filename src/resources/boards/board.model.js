const uuid = require('uuid');

class Board {
  constructor({ title = 'default title', columns = [] }) {
    this.columns = columns.map(column => {
      return {
        ...column,
        id: uuid()
      };
    });

    if (
      this.columns.find(column => Board.isInvalidColumn(column)) ||
      this.columns.length === 0
    ) {
      return;
    }

    this.id = uuid();
    this.title = title;
  }

  static isInvalidColumn(column) {
    if (!column.order || !column.title || !column.id) {
      return true;
    }
  }
}

module.exports = Board;
