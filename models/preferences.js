module.exports = function(sequelize, DataTypes) {
    var Preference = sequelize.define("Preference", {
        keyword: DataTypes.STRING,
        
    });
    Preference.associate = function (models) {
        models.Preference.belongsTo(models.User, {
          onDelete: "CASCADE",
          foreignKey: {
            allowNull: false
          }
        });
    
      };
    
    return Preference;
}