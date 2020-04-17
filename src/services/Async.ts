import { Service, Inject } from 'typedi'

@Service()
export default class AsyncService {
  constructor(@Inject('UserUsnModel') private UserUsnModel: any)

  async getUserUsn({ user_id }) {
    return user_id
  }
}
