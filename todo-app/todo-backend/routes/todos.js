const express = require('express');
const { Todo } = require('../mongo')
const router = express.Router();
const counter = require('../redis')

/* GET todos listing. */
router.get('/', async (_, res) => {
  const todos = await Todo.find({})
  res.send(todos);
});

/* POST todo to listing. */
router.post('/', async (req, res) => {
  const todo = await Todo.create({
    text: req.body.text,
    done: false
  })
  counted_todos = await counter.getAsync('added_todos')
  if (!counted_todos) {
    counted_todos = 0
  }
  await counter.setAsync('added_todos', parseInt(counted_todos) + 1)
  res.send(todo);
});

const singleRouter = express.Router();

const findByIdMiddleware = async (req, res, next) => {
  const { id } = req.params
  req.todo = await Todo.findById(id)
  console.log(req.todo)
  if (!req.todo) return res.sendStatus(404)

  next()
}

/* DELETE todo. */
singleRouter.delete('/', async (req, res) => {
  await req.todo.delete()  
  res.sendStatus(200);
});

/* GET todo. */
singleRouter.get('/', async (req, res) => {
  res.send(req.todo)
});

/* PUT todo. */
singleRouter.put('/', async (req, res) => {
  const newTodo = await Todo.findByIdAndUpdate(req.todo._id, req.body, {new: true})
  res.send(newTodo)
});

router.use('/:id', findByIdMiddleware, singleRouter)


module.exports = router;
