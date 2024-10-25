// models/star.js

module.exports = (sequelize, DataTypes) => {
  const Star = sequelize.define('Star', {
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

  return Star;
};