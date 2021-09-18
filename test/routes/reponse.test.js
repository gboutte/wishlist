const chai = require('chai');
const expect = chai.expect;
const chaiHttp = require('chai-http');
const db = require('../../src/models');
chai.use(chaiHttp);

const app = require('../../src/lib/app');

describe('Response', () => {
  before((done) => {
    db.User.destroy({ where: {} }).then(() => done());
  });


  it('Not found', (done) => {
    //First we register
    chai.request(app)
      .post('/api/install/user').send({
        username: 'gboutte',
        password: 'abcd1234'
      })
      .end((error, response) => {
        if (error) {
          return done(error);
        }
        // Now let's check our response
        expect(response).to.have.status(200);

        //Then if registered right we try an unkown route
        chai.request(app)
          .get('/api/sdfgsdfsd')
          .end((error, response) => {
            if (error) {
              return done(error);
            }
            // Now let's check our response
            expect(response).to.have.status(404);
            done();
          });

      });
  });

});

