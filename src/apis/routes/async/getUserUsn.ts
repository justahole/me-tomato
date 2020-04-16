import UserService from '@services/User'

export default async (ctx): Promise<void> => {
  ctx.body = {
    usn: 0,
  }
}
