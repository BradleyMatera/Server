// models/galaxy.js

module.exports = (sequelize, DataTypes) => {
  const Galaxy = sequelize.define('Galaxy', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    size: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    imagePath: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  });

  return Galaxy;
};