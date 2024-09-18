const mongoose = require('mongoose');
const { Schema } = mongoose;

const list = new Schema({
    name: String,
    status: String
  });
  
const modelList = mongoose.model('list', list);

module.exports = modelList;

  