import { Service, Inject } from 'typedi'
import { Sequelize, Op } from 'sequelize'

@Service()
export default class AsyncService {
  constructor(
    @Inject('UserUsnModel') private UserUsnModel,
    @Inject('TodoModel') private TodoModel,
    @Inject('TodoUsnModel') private TodoUsnModel,
    @Inject('sequelize') private sequelize: Sequelize
  ) {}

  async getUserUsn({ user_id }) {
    return this.UserUsnModel.findOne({
      where: {
        user_id: user_id,
      },
    })
  }

  async createTodo({
    user_id,
    name,
  }: {
    user_id: string
    name: string
  }): Promise<{ usn: number; message: string }> {
    return await this.sequelize.transaction(async (transaction) => {
      const newTodo = await this.TodoModel.create(
        {
          user_id,
          name,
        },
        { transaction }
      )

      const todoID = newTodo.id

      const { usn } = await this.UserUsnModel.findOne({
        where: { user_id },
      })

      /** @TODO make sure usn is the same */
      await this.UserUsnModel.update(
        {
          usn: usn + 1,
        },
        { where: { user_id, usn } },
        { transaction }
      )

      const { index, usn: todoUsn } = await this.TodoUsnModel.create(
        {
          usn: usn + 1,
          resource_id: todoID,
          user_id: user_id,
        },
        {
          transaction,
        }
      )

      return { ...newTodo.dataValues, usn: todoUsn, index }
    })
  }

  async deleteTodo({ user_id, todoID }) {
    return await this.sequelize.transaction(async (transaction) => {
      const exist =
        (await this.TodoModel.destroy(
          {
            where: {
              user_id: user_id,
              id: todoID,
            },
          },
          { transaction }
        )) !== 0

      if (!exist) {
        /**
         * @TODO delete export
         */
        throw 'todoID is not exist'
      }

      const { usn } = await this.UserUsnModel.findOne({
        where: { user_id },
      })

      await this.UserUsnModel.update(
        {
          usn: usn + 1,
        },
        { where: { user_id, usn } },
        { transaction }
      )

      await this.TodoUsnModel.update(
        {
          usn: usn + 1,
          deleted: true,
        },
        {
          where: {
            resource_id: todoID,
            user_id: user_id,
          },
        },
        {
          transaction,
        }
      )

      return {
        usn: usn + 1,
      }
    })
  }

  async updateTodo({ user_id, todoID }) {
    return { user_id, todoID }
  }

  async getUSNChunkAfterUSN({ user_id, afterUsn }) {
    const todos = await this.TodoUsnModel.findAll({
      where: {
        user_id,
        usn: {
          [Op.gt]: afterUsn,
        },
      },
    })

    const existTodos = todos.filter((todo) => !todo.deleted)

    const todosDetails =
      existTodos.length !== 0
        ? await this.TodoModel.findAll({
            where: {
              id: {
                [Op.in]: existTodos.map((todo) => todo.resource_id),
              },
            },
          })
        : []

    const todosDetailsDit = todosDetails.reduce((dist, { dataValues }) => {
      return {
        ...dist,
        [dataValues.id]: dataValues,
      }
    }, {})

    return todos.map((todo) => {
      if (!todo.dataValues.deleted) {
        todo.dataValues.detail = todosDetailsDit[todo.resource_id]
      }
      return todo.dataValues
    })
  }
}
