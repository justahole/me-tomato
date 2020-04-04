import { Container } from 'typedi'
import modelsLoader from './models'
import config from '../config'

export default async ({ sequelize }): Promise<void> => {
  Container.set('sequelize', sequelize)

  const Models = await modelsLoader(sequelize)

  /**
   * make sure models have connected database when get model in container;
   */
  Object.entries(Models).forEach(([ModelName, Model]) => {
    Container.set(ModelName, Model)
  })

  Container.set('config', config)
}
