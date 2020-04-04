import { Service as service, Inject as inject } from 'typedi'
import { Sequelize } from 'sequelize'

/**
 * All user logic service
 */
@service()
export default class TodoService {
  constructor(
    @inject('TodoModel') private TodoModel: any,
    @inject('sequelize') private sequelize: Sequelize,
  ) { }

  async create({ user_id, name, pin }) {
    const todo = await this.TodoModel.create({
      user_id,
      name,
      pin
    })

    return todo
  }

  async getList({ complete, user_id, limit = 20, offset = 0 }) {
    const res = await this.TodoModel.findAndCountAll({
      where: {
        complete,
        user_id,
      },
      limit,
      offset
    })

    return { offset, ...res }
  }

}
