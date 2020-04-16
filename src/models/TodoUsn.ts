import {
  Sequelize,
  Model,
  BOOLEAN,
  INTEGER,
  STRING,
  UUID,
  UUIDV4,
} from 'sequelize'

export default class extends Model {
  static injectSequelize(sequelize: Sequelize): void {
    this.init(
      {
        id: {
          type: UUID,
          primaryKey: true,
          defaultValue: UUIDV4,
        },
        usn: {
          type: INTEGER,
        },
        index: {
          type: INTEGER,
          autoIncrement: true,
          unique: true,
        },
        custom_index: {
          type: INTEGER,
        },
        resource_id: {
          type: STRING,
        },
        deleted: {
          type: BOOLEAN,
          defaultValue: false,
        },
      },
      {
        sequelize: sequelize,
        modelName: 'todo_usn',
      }
    )
  }
}
