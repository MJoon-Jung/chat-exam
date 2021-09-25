const Sequelize = require('sequelize');

module.exports = class Chat extends Sequelize.Model {
    static init(sequelize) {
        return super.init({
           user: {
               type: Sequelize.STRING(20),
               allowNull: false,
           },
           content: Sequelize.TEXT,
           image: Sequelize.STRING,
        }, {
            sequelize,
            timestamps: true,
            underscored: false,
            modelName: 'Chat',
            tableName: 'chats',
            paranoid: false,
            charset: 'utf8',
            collate: 'utf8_general_ci',
        });
    }

    static associate(db) {
        db.Chat.belongsTo(db.Room, { foreignKey: 'roomId', targetKey: 'id'}); 
    }
}