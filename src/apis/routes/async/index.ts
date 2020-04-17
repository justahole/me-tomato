import Router from 'koa-router'

import getUserUsn from './getUserUsn'
import createTodo from './createTodo'

export default new Router().get('/usn', getUserUsn).post('/todo', createTodo)

// .get('/usnChunk')
// .delete('/todo')
// .patch('/todo')
