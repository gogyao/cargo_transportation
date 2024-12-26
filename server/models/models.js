const sequelize = require("../db");
const { DataTypes } = require("sequelize");
const defaultRole = 'USER'


const User = sequelize.define("user", {
  email: {
    type: DataTypes.TEXT, unique: true, allowNull: false
  },
  password: {
    type: DataTypes.STRING, allowNull: false
  },
  role: {
    type: DataTypes.STRING(15), defaultValue: defaultRole
  },
  isActivated: {
    type: DataTypes.BOOLEAN, defaultValue: false
  },
  activationLink: {
    type: DataTypes.STRING
  }
},
  {
    timestamps: false,
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
  }
},
  {
    timestamps: false,
  }
);

const Order = sequelize.define("order", {
  name: { type: DataTypes.STRING },
  email: { type: DataTypes.TEXT },
  phoneNumber: { type: DataTypes.STRING(11) },
  dangerType: { type: DataTypes.INTEGER },
  pickupLocation: { type: DataTypes.TEXT },
  deliveryLocation: { type: DataTypes.TEXT },
  description: { type: DataTypes.TEXT },
  price: {type:DataTypes.TEXT},
  status: { type: DataTypes.TEXT, defaultValue: "В обработке" }
},
  {
    timestamps: false,
  }
)

module.exports = {
  User, Token, Order
}
