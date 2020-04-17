import Router from 'koa-router'

import getUserUsn from './getUserUsn'

export default new Router().get('/usn', getUserUsn)
