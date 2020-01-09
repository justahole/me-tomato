
/**
 * combined user model for controller all the use logic
 */
export default class UserService {
  /**
   * check the register message
   * @param {object} form
   * @param {string} form.password
   * @param {string} form.username
   * @return {boolean} valid or not
   */
  registerVerification(form: { password: string, username: string }): boolean {
    return !!(form.password && form.username);
  }
}
