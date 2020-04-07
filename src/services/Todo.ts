import { Service as service, Inject as inject } from 'typedi'
import { Sequelize } from 'sequelize'
import { pick } from 'lodash'

/**
 * All user logic service
 */
@service()
export default class TodoService {
  constructor(
    @inject('TodoModel') private TodoModel: any,
    @inject('sequelize') private sequelize: Sequelize,
  ) { }

  async create({ user_id, name }) {

    const todo = await this.TodoModel.create({
      user_id,
      name
    })

    return todo

  }

  async getList({ limit = 20, offset = 0, ...params }) {

    const filter = pick(params, ['pin', 'user_id', 'complete'])

    const res = await this.TodoModel.findAndCountAll({
      where: filter,
      limit,
      offset
    })

    return { offset, ...res }
    
  }

  async delete({ user_id, id }) {
    
    return await this.TodoModel.destroy({
      where: {
        user_id: user_id,
        id: id
      }
    })

  }

  async edit({ user_id, id, ...params}) {
    const newFields = pick(params, ['name', 'pin', 'complete'])
    
    const wanneComplete = newFields.complete

    return await this.TodoModel.update(
      {
        ...newFields,
        completed_at: wanneComplete ? new Date() : undefined
      },
      {
        where: { 
          user_id: user_id,
          id: id
        }
      }
    )
    
  }
}
