const Sequelize = require('sequelize');

module.exports = class Image extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        filename: {
          type: Sequelize.STRING(50),
          allowNull: true,
        },
        type: {
          type: Sequelize.INTEGER,
          allowNull: false,
        },
      },
      {
        sequelize,
        timestamps: false,
        modelName: 'Image',
        tableName: 'images',
        paranoid: false,
        charset: 'utf8mb4',
        collate: 'utf8mb4_general_ci',
      }
    );
  }

  static associate(db) {
    db.Image.belongsTo(db.Product, { foreignKey: 'p_id', targetKey: 'p_id' });
    db.Image.belongsTo(db.Board, { foreignKey: 'p_id', targetKey: 'post_id' });
  }
};
