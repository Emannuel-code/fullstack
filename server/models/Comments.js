// comments.js
module.exports = (sequelize, DataTypes) => {
    const Comments = sequelize.define("Comments", {
      commentBody: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    });
  
    Comments.associate = (models) => {
      Comments.belongsTo(models.Posts, { as: 'post', foreignKey: 'postId' }); // Use o alias 'post' aqui
    };
  
    return Comments;
  };
  