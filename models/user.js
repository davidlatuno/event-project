var bcrypt = require("bcrypt-nodejs");
module.exports = function(sequelize, DataTypes) {
    var User = sequelize.define("User", {
        userName: DataTypes.STRING,
        picture: DataTypes.STRING,
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: {
              isEmail: true
            }
          },
          // The password cannot be null
          password: {
            type: DataTypes.STRING,
            allowNull: false
          },
        phonenumber: DataTypes.STRING,
        food: DataTypes.STRING,
        event: DataTypes.STRING,
        zipcode: DataTypes.STRING,
        radius: DataTypes.STRING
    });
    User.prototype.validPassword = function(password) {
        return bcrypt.compareSync(password, this.password);
      };
      // Hooks are automatic methods that run during various phases of the User Model lifecycle
      // In this case, before a User is created, we will automatically hash their password
      User.hook("beforeCreate", function(user) {
        user.password = bcrypt.hashSync(user.password, bcrypt.genSaltSync(10), null);
      });
    User.associate = function(models) {
        models.User.hasMany(models.Preference);
      };
    
    return User;
}