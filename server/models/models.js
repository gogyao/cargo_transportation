const sequelize = require("../db");
const { DataTypes } = require("sequelize");
const defaultRole = 'USER'


const User = sequelize.define("user", {
  email: { 
    type: DataTypes.TEXT, unique:true, allowNull:false
  },
  password: { 
    type: DataTypes.STRING, allowNull: false
  },
  role: {
    type: DataTypes.STRING(15), defaultValue:defaultRole
  },
  isActivated: { 
    type: DataTypes.BOOLEAN, defaultValue:false
  },
  activationLink: { 
    type: DataTypes.STRING
  }
});

const Token = sequelize.define("token", {
    user: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'users',
        key: 'id',
      },
    },
    refreshToken: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
);

module.exports = {
    User, Token
}
