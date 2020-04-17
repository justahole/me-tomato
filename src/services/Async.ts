import { Service, Inject } from 'typedi'

@Service()
export default class AsyncService {
  constructor(
    @Inject('UserUsnModel') private UserUsnModel,
    @Inject('TodoModel') private TodoModel,
    @Inject('TodoUsnModel') private TodoUsnModel
  ) {}

  async getUserUsn({ user_id }) {
    return this.UserUsnModel.findOne({
      where: {
        user_id: user_id,
      },
    })
  }

  async createTodo({ user_id, name }) {
    await this.sequelize.transaction(async (transaction) => {
      const todo = await this.TodoModel.create({
        user_id,
        name,
      })

      return todo
    })
  }

  // async signUp({ email, password }) {
  //   const salt = randomBytes(32)
  //   const newUser = await this.sequelize.transaction(async (transaction) => {
  //     const user = await this.UserModel.create({}, { transaction })

  //     await this.SaltModel.create(
  //       {
  //         user_id: user.id,
  //         salt: salt.toString('hex'),
  //       },
  //       { transaction }
  //     )

  //     await this.UserUsnModel.create(
  //       { user_id: user.id, usn: 0 },
  //       { transaction }
  //     )

  //     const hashedPassword = await argon2.hash(password, { salt })

  //     await this.AuthModel.create(
  //       {
  //         user_id: user.id,
  //         auth_type: 'mail',
  //         auth_id: email,
  //         auth_access_token: hashedPassword,
  //       },
  //       { transaction }
  //     )

  //     return user
  //   })
  // async create({ user_id, name }) {
  //   const todo = await this.TodoModel.create({
  //     user_id,
  //     name,
  //   })

  //   return todo
  // }
}
