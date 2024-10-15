'use strict';

module.exports = (sequelize, DataTypes) => {
  const Galaxy = sequelize.define('Galaxy', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    size: {
      type: DataTypes.STRING,
    },
  });

  return Galaxy;
};