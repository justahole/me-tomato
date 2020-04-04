import { Sequelize } from 'sequelize'
import config from '../config'

export default async (): Promise<Sequelize> => {
  const DIALECT = 'mysql'
  
  const sequelize = new Sequelize(
    config.database.name,
    config.database.user,
    config.database.password,
    {
      host: config.database.host,
      dialect: DIALECT,
      /**
       * acquire: that pool will try to get connection before throwing error
       * idle: a connection can be idle before being released
       */
      pool: {
        max: config.database.pool.max,
        min: config.database.pool.min,
        acquire: config.database.pool.acquire,
        idle: config.database.pool.idle,
      },
      define: {
        underscored: true,
      },
    },
  )
  
  /**
   * test connect 
   */
  await sequelize.authenticate()

  return sequelize
}
