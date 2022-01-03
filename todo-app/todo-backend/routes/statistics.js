const express = require('express');
const router = express.Router();
const counter = require('../redis')

router.get('/', async ( req, res) => {
  counts = await counter.getAsync('added_todos')
  if (!counts) {
    await counter.setAsync('added_todos', 0)
    counts = await counter.getAsync('added_todos')
  }
  console.log("Test that modification indeed succeed")
  res.send({"added_todos": parseInt(counts),})
});

module.exports = router