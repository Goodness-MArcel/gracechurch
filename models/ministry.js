const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Ministry extends Model {
    static associate(models) {
      // define association here if needed
    }

    toJSON() {
      const values = { ...this.get() };
      return values;
    }
  }

  Ministry.init({
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true
      }
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        notEmpty: true
      }
    },
    schedule: {
      type: DataTypes.STRING,
      allowNull: true
    },
    icon: {
      type: DataTypes.STRING,
      allowNull: true
    },
    imagePath: {
      type: DataTypes.STRING,
      allowNull: true
    },
    coordinator: {
      type: DataTypes.STRING,
      allowNull: true
    },
    contactEmail: {
      type: DataTypes.STRING,
      allowNull: true,
      validate: {
        isEmail: true
      }
    },
    active: {
      type: DataTypes.BOOLEAN,
      defaultValue: true
    }
  }, {
    sequelize,
    modelName: 'Ministry'
  });

  return Ministry;
};