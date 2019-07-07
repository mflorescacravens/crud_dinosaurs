'use strict';
module.exports = (sequelize, DataTypes) => {
  const dinosaur = sequelize.define('dinosaur', {
    name: DataTypes.STRING,
    type: DataTypes.STRING
  }, {});
  dinosaur.associate = function(models) {
    // associations can be defined here
  };
  return dinosaur;
};

// Method 2 via the .hook() method
var User = sequelize.define('User', {
  username: DataTypes.STRING,
  mood: {
    type: DataTypes.ENUM,
    values: ['happy', 'sad', 'neutral']
  }
})

User.hook('beforeValidate', function(user, fn) {
  user.mood = 'happy'
  fn(null, user)
})

User.hook('afterValidate', function(user) {
  return sequelize.Promise.reject("I'm afraid I can't let you do that!")
})