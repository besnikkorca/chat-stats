import { Model, DataTypes, Optional, CreationOptional } from 'sequelize';
import Password from 'utils/Password';
import sequelize from '../../services/db';

export type UserAttributes = {
  id: number;
  role: 'user' | 'admin';
  username: string;
  email: string;
  emailVerifiedAt?: Date;
  password: string;
  createdAt: Date;
  updatedAt: Date;
};

type UserCreationAttributes = Optional<UserAttributes, 'id' | 'role' | 'createdAt' | 'updatedAt'>;

export default class User extends Model<UserAttributes, UserCreationAttributes> {
  declare id: number;

  declare username: string;

  declare role: 'user' | 'admin';

  declare email: string;

  declare emailVerifiedAt?: Date;

  declare password: string;

  // createdAt can be undefined during creation
  declare createdAt: CreationOptional<Date>;

  // updatedAt can be undefined during creation
  declare updatedAt: CreationOptional<Date>;
}

User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    role: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 'user',
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    emailVerifiedAt: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE,
  },
  {
    sequelize,
    modelName: 'User',
    timestamps: true,
  }
);

User.beforeCreate(async (model) => {
  const hashedPassword = await Password.encrypt(model.password);
  model.setDataValue('password', hashedPassword);
});
