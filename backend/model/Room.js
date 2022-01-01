const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define collection and schema
let Room = new Schema({
  room_name: {
    type: String
  },
  room_email: {
    type: String
  },
  section: {
    type: String
  },
  subjects: {
    type: Array
  },
  gender: {
    type: String
  },
  dob: {
    type: Date
  }
}, {
  collection: 'rooms'
})

module.exports = mongoose.model('Room', Room)