import { Service, Inject } from 'typedi'

@Service()
export default class AsyncService {
  constructor(@Inject('UserUsnModel') private UserUsnModel) {}

  async getUserUsn({ user_id }) {
    return this.UserUsnModel.findOne({
      where: {
        user_id: user_id,
      },
    })
  }
}
