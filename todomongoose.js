
const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
// Replace "test" with your database name.
// mongoose.connect('mongodb://localhost:27017/todojsondb');

const todoSchema = new mongoose.Schema({
  title: { type: String, default: "Todo"},
  completed: { type: Boolean, default: false}
})

const Todo = mongoose.model('Todos', todoSchema);

module.exports = Todo;
