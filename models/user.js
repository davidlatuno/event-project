module.exports = function(sequelize, DataTypes) {
    var User = sequelize.define("User", {
        name: DataTypes.STRING,
        picture: DataTypes.STRING,
        email: DataTypes.STRING,
        password: DataTypes.STRING,
        phonenumber: DataTypes.STRING,
        food: DataTypes.STRING,
        event: DataTypes.STRING,
        zipcode: DataTypes.STRING,
        radius: DataTypes.STRING
    });
    User.associate = function(models) {
        models.User.hasMany(models.Preference);
      };
    
    return User;
}