const chai = require('chai');
const chaihttp = require('chai-http');
const faker =require('faker');
const mongoose = require('mongoose');

const { expect, assert, should } = chai;

const server = require('../../../app');

chai.use(chaihttp);

let token;

describe('User routes', () => {
  const signup='/users/signup';
  const signin='/users/signin';
  const secret='/users/secret';
  const user={ email: faker.internet.email(), password: faker.internet.password() };
  const presave={ email: 'danesh.eee12@gmail.com', password: faker.internet.password() };

  before( (done) => {
    chai
      .request(server)
      .post(signup)
      .send(presave)
      .end((err, res) => {
        expect(res.status).to.equal(200);
        token=res.body.token;
        done();

      });
  });
});
