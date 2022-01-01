const express = require('express');
const app = express();
const roomRoute = express.Router();

// Room model
let Room = require('../model/Room');

// Add Room
roomRoute.route('/add-room').post((req, res, next) => {
  Room.create(req.body, (error, data) => {
    if (error) {
      return next(error)
    } else {
      res.json(data)
    }
  })
});

// Get all room
roomRoute.route('/').get((req, res) => {
  Room.find((error, data) => {
    if (error) {
      return next(error)
    } else {
      res.json(data)
    }
  })
})

// Get single room
roomRoute.route('/read-room/:id').get((req, res) => {
  Room.findById(req.params.id, (error, data) => {
    if (error) {
      return next(error)
    } else {
      res.json(data)
    }
  })
})


// Update room
roomRoute.route('/update-room/:id').put((req, res, next) => {
  Room.findByIdAndUpdate(req.params.id, {
    $set: req.body
  }, (error, data) => {
    if (error) {
      return next(error);
      console.log(error)
    } else {
      res.json(data)
      console.log('Room successfully updated!')
    }
  })
})

// Delete room
roomRoute.route('/delete-room/:id').delete((req, res, next) => {
  Room.findByIdAndRemove(req.params.id, (error, data) => {
    if (error) {
      return next(error);
    } else {
      res.status(200).json({
        msg: data
      })
    }
  })
})

module.exports = roomRoute;