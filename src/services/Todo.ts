import { Service as service, Inject as inject } from 'typedi'
import { Sequelize, Op } from 'sequelize'
import { pick } from 'lodash'

/**
 * All user logic service
 */
@service()
export default class TodoService {
  constructor(
    @inject('TodoModel') private TodoModel,
    @inject('sequelize') private sequelize: Sequelize
  ) {}

  async create({ user_id, name }, transaction?) {
    const todo = await this.TodoModel.create(
      {
        user_id,
        name,
      },
      transaction && { transaction }
    )

    return todo
  }

  async getList({ limit = 20, offset = 0, ...params }) {
    const { sortBy = 'pin', reverse, orderlist, ...filter } = pick(params, [
      'sortBy',
      'reverse',
      'orderlist',
      'pin',
      'user_id',
      'complete',
    ])

    const dereaction = reverse ? 'ASC' : 'DESC'

    if (orderlist) {
      filter.id = { [Op.in]: orderlist }
    }

    const res = await this.TodoModel.findAndCountAll({
      where: filter,
      limit,
      offset,
      order: [
        [sortBy, dereaction],
        orderlist
          ? Sequelize.fn.apply(Sequelize, [
              'FIELD',
              Sequelize.col('id'),
              ...orderlist,
            ])
          : undefined,
      ].filter((orderRule) => orderRule),
    })

    return { offset, ...res }
  }

  async delete({ user_id, id }, transaction?) {
    return await this.TodoModel.destroy(
      {
        where: {
          user_id: user_id,
          id: id,
        },
      },
      transaction && { transaction }
    )
  }

  async edit({ user_id, id, ...params }, transaction?) {
    const newFields = pick(params, ['name', 'pin', 'complete'])

    const wanneComplete = newFields.complete

    return await this.TodoModel.update(
      {
        ...newFields,
        completed_at: wanneComplete ? new Date() : undefined,
      },
      {
        where: {
          user_id: user_id,
          id: id,
        },
      },
      transaction && { transaction }
    )
  }
}
