module.exports = function(sequelize, DataTypes) {
    var User = sequelize.define("User", {
        email: DataTypes.STRING,
        password: DataTypes.STRING,
        food: DataTypes.STRING,
        event: DataTypes.STRING,
        zipcode: DataTypes.STRING,
        radius: DataTypes.STRING
    });
    
    return User;
}