const uuid = require('uuid');
const mongoose = require('mongoose');

const columnSchema = new mongoose.Schema(
  {
    _id: {
      type: String,
      default: uuid
    },
    title: String,
    order: Number
  },
  { versionKey: false }
);

const boardSchema = new mongoose.Schema(
  {
    _id: {
      type: String,
      default: uuid
    },
    title: String,
    columns: {
      type: [columnSchema],
      default: []
    }
  },
  {
    versionKey: false
  }
);

boardSchema.virtual('id').get(function() {
  return this._id;
});

boardSchema.set('toJSON', { virtuals: true });
boardSchema.set('toObject', { virtuals: true });

columnSchema.virtual('id').get(function() {
  return this._id;
});

columnSchema.set('toJSON', { virtuals: true });
columnSchema.set('toObject', { virtuals: true });

const Board = mongoose.model('Board', boardSchema);

module.exports = Board;
