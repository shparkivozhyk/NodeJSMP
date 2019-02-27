'use strict';
module.exports = (sequelize, DataTypes) => {
  const Product = sequelize.define('Product', {
    title: DataTypes.STRING,
    price: DataTypes.STRING,
    id: {
      primaryKey: true,
      type: DataTypes.STRING
    },
    reviews: DataTypes.STRING
  }, {});
  Product.associate = function(models) {
    // associations can be defined here
  };
  return Product;
};
