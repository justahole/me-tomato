import { Container } from 'typedi'
import ModelsLoader from './models'

export default async ({ sequelize }) => {
  Container.set('sequelize', sequelize);

  const connectedModels = await ModelsLoader(sequelize)

  /**
   * make sure models have connected database when get model in container;
   */
  Object.entries(connectedModels).forEach(([modelName, model]) => {
    Container.set(modelName, model);
  })

}
