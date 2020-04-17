import { Service, Inject } from 'typedi'
import { Sequelize } from 'sequelize'

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
  }): Promise<{ usn: number; message: string }> {
    const usn = await this.sequelize.transaction(async (transaction) => {
      console.log('user_id', user_id, name)
      const { id: todoID } = await this.TodoModel.create(
        {
          user_id,
          name,
        },
        { transaction }
      )

      const { usn, usn_id } = await this.UserUsnModel.findOne({
        where: { user_id },
      })

      /** @TODO make sure usn is the same */
      await this.UserUsnModel.update(
        {
          usn: usn + 1,
        },
        { where: { user_id, usn }, transaction }
      )

      await this.TodoUsnModel.create(
        {
          usn: usn + 1,
          resource_id: todoID,
          user_usn_id: usn_id,
        },
        {
          transaction,
        }
      )

      return usn
    })

    return {
      message: 'successfully',
      usn,
    }
  }
}
