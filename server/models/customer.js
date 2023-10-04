'use strict';
const { hashPassword } = require('../helpers/bcrypt');

const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Customer extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Customer.belongsToMany(models.Movie, {
        through: 'Bookmark',
        foreignKey:"MovieId"
      })
    }
  }
  Customer.init({
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: {
        msg: "Email must be unique"
      },
      validate: {
        notNull: {
          msg: 'Email is required'
        },
        notEmpty: {
          msg: "Email cannot be empty"
        },
        isEmail: { 
          msg: "Invalid email"
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Password is required'
        },
        notEmpty: {
          msg: "Password cannot be empty"
        },
        len: {
          args: [5],
          msg: "Password must be at least 5 characters long"
        }
      }
    },
    role: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'Customer',
  });
  Customer.beforeCreate((user) => {
    user.password = hashPassword(user.password)
    user.role = "Customer";
  });

  return Customer;
};