'use strict';

module.exports = (sequelize, DataTypes) => {
  const Star = sequelize.define('Star', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    size: {
      type: DataTypes.STRING,
    },
  });

  return Star;
};