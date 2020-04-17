import Router from 'koa-router'

import getUserUsn from './getUserUsn'
import createTodo from './createTodo'
import deleteTodo from './deleteTodo'
import getTodo from './getTodo'

export default new Router()
  .get('/usn', getUserUsn)
  .get('/todo/:afterUsn', getTodo)
  .post('/todo', createTodo)
  .delete('/todo/:id', deleteTodo)

// .get('/usnChunk')
// .patch('/todo')
