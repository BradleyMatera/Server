module.exports = (sequelize, DataTypes) => {
  const Planet = sequelize.define('Planet', {
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

  return Planet;
};