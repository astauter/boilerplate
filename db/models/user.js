const Sequelize = require('sequelize');
const crypto = require('crypto');
const _ = require('lodash');
const db = require('../_db');

let User = db.define('user', {
  name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true
    }
  },
  password: {
    type: Sequelize.TEXT,
    allowNull: false
  },
  salt: {
    type: Sequelize.STRING,
  }
}, {
  hooks: {
    beforeCreate: setSaltAndPassword,
    beforeUpdate: setSaltAndPassword,
  }
  })

User.prototype.correctPassword = function (candidatePassword) {
  const candidateHash = User.encryptPassword(candidatePassword, this.salt)
  return this.password === candidateHash;
}
User.prototype.sanitize = function() {
  return _.omit(this.toJSON(), ['password', 'salt']);
}
User.generateSalt = function () {
  let buffer = crypto.randomBytes(16, function (err, buf) {
    if (err) throw err
    return buf
  });
  return buffer.toString('base64');
}
User.encryptPassword = function (plainText, salt) {
  let hash = crypto.createHash('sha256');
  hash.update(plainText);
  hash.update(salt);
  return hash.digest('hex');
}
function setSaltAndPassword (user) {
  if (user.changed('password')) {
    user.salt = User.generateSalt()
    user.password = User.encryptPassword(user.password, user.salt);
  }
}

module.exports = User;
