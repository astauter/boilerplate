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
    allowNull: false,
  }
}, {
  instanceMethods: {
    correctPassword: function (candidatePassword) {
      const candidateHash = this.Model.encryptPassword(candidatePassword, this.salt)
      return this.password === candidateHash;
    },
    sanitize: function () {
      return _.omit(this.toJSON(), ['password', 'salt']);
    }
  },
  classMethods: {
    generateSalt: function () {
      let buffer = crypto.randomBytes(16, function (err, buf) {
        if (err) throw err
        return buf
      });
      return buffer.toString('base64');
    },
    encryptPassword: function (plainText, salt) {
      let hash = crypto.createHash('sha256');
      hash.update(plainText);
      hash.update(salt);
      return hash.digest('hex');
    },
  },
  hooks: {
    beforeCreate: setSaltAndPassword,
    beforeUpdate: setSaltAndPassword,
  }
})

function setSaltAndPassword (user) {
  if (user.changed('password')) {
    user.salt = user.Model.generateSalt()
    user.password = user.Model.encryptPassword(user.password, user.salt);
  }
}

module.exports = User;
