import { Container } from 'typedi'
import modelsLoader from './models'
import config from '../config'

export default async ({ sequelize }): Promise<void> => {
  Container.set('sequelize', sequelize)

  const connectedModels = await modelsLoader(sequelize)

  /**
   * make sure models have connected database when get model in container;
   */
  Object.entries(connectedModels).forEach(([modelName, model]) => {
    Container.set(modelName, model)
  })

  Container.set('config', config)
}
