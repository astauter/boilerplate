// import db from '../index';
const User = require('./user');
const chai = require('chai');
const mocha = require('mocha');
const expect = chai.expect

describe('sequelize Models', () => {
  describe('User Models', () => {
    it('has the expected schema definition', () => {
      expect(User.attributes.email).to.be.an('object');
    })
  })
})
