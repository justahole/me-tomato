import { Service, Inject } from 'typedi'
import { Sequelize, Op } from 'sequelize'
import { pick } from 'lodash'
import TodoService from '@services/Todo'

@Service()
export default class AsyncService {
  constructor(
    @Inject('UserUsnModel') private UserUsnModel,
    @Inject('TodoModel') private TodoModel,
    @Inject('TodoUsnModel') private TodoUsnModel,
    @Inject('sequelize') private sequelize: Sequelize,
    private todoService: TodoService
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
      const newTodo = await this.todoService.create(
        { user_id, name },
        transaction
      )

      const todoID = newTodo.id

      const { usn } = await this.UserUsnModel.findOne({
        where: { user_id },
      })

      /** @TODO make sure usn is the same */
      await this.addUserUSN({ usn, user_id }, transaction)

      const { index, usn: todoUsn, id: usnId } = await this.TodoUsnModel.create(
        {
          usn: usn + 1,
          resource_id: todoID,
          user_id: user_id,
        },
        {
          transaction,
        }
      )

      return { ...newTodo.dataValues, usnId: usnId, usn: todoUsn, index }
    })
  }

  async addUserUSN({ usn, user_id }, transaction?) {
    return await this.UserUsnModel.update(
      { usn: usn + 1 },
      { where: { user_id: user_id, usn: usn } },
      transaction && { transaction }
    )
  }

  async deleteTodo({ user_id, todoID }) {
    return await this.sequelize.transaction(async (transaction) => {
      const deleteAcount = await this.todoService.delete(
        { user_id: user_id, id: todoID },
        transaction
      )

      if (deleteAcount === 0) {
        throw new Error('todo not exist')
      }

      const { usn } = await this.UserUsnModel.findOne({
        where: { user_id },
      })

      await this.addUserUSN({ usn, user_id }, transaction)

      await this.markTodoDeleted(
        { usn: usn + 1, resource_id: todoID, user_id },
        transaction
      )

      return {
        usn: usn + 1,
      }
    })
  }

  async markTodoDeleted({ usn, user_id, resource_id }, transaction?) {
    return await this.TodoUsnModel.update(
      {
        usn: usn,
        deleted: true,
      },
      { where: { user_id, resource_id } },
      transaction && { transaction }
    )
  }

  async updateTodo({ user_id, todoID, ...params }) {
    return this.sequelize.transaction(async (transaction) => {
      /**
       * 先判断是否有这个资源，如果是delete抛出错误，
       *
       */
      const todoUSNInstance =
        (await this.TodoUsnModel.findOne({
          where: {
            user_id: user_id,
            resource_id: todoID,
          },
        })) || {}

      if (todoUSNInstance.deleted !== false) {
        throw new Error('is not exist')
      }

      const { usn } = await this.UserUsnModel.findOne({
        where: { user_id },
      })

      await this.addUserUSN({ usn, user_id }, transaction)

      await this.todoService.edit(
        { user_id, id: todoID, ...params },
        transaction
      )

      await this.TodoUsnModel.update(
        {
          usn: usn + 1,
          ...pick(params, ['custom_index']),
        },
        {
          where: {
            user_id: user_id,
            resource_id: todoID,
          },
        },
        { transaction }
      )

      return {
        usn: usn + 1,
      }
    })
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
