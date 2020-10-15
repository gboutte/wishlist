const chai = require('chai');
const expect = chai.expect;
const chaiHttp = require('chai-http');
const db = require('../../src/models');
chai.use(chaiHttp);

const app = require('../../src/lib/app');

describe('Installation', function(){
    before(function(done) {
        db.User.destroy({where:{}}).then(()=>done());
    });


    describe('Install route', () => {
        it('Only install routes are allowed', (done) => {
            chai.request(app)
                .get('/api/my/route')
                .end((error, response) => {
                    if (error) done(error);
                    // Now let's check our response
                    expect(response).to.have.status(403);
                    expect(response.body).to.have.property('errors');
                    expect(response.body.errors).to.include('NEED_INSTALL');
                    done();
                });
        });   
            
        it('Register wrong input', (done) => {
            chai.request(app)
            .post('/api/install/user').send({
                username:"gb",
                password:"abcd"
            })
            .end((error, response) => {
                if (error) done(error);
                // Now let's check our response
                expect(response).to.have.status(400);
                expect(response.body).to.have.property('errors');
                done();
            });
        }); 
        it('Register', (done) => {
            chai.request(app)
            .post('/api/install/user').send({
                username:"gboutte",
                password:"abcd1234"
            })
            .end((error, response) => {
                if (error) done(error);
                // Now let's check our response
                expect(response).to.have.status(200);
                done();
            });
        });
        it('Can\'t register two time', (done) => {
            chai.request(app)
            .post('/api/install/user').send({
                username:"gboutte",
                password:"abcd1234"
            })
            .end((error, response) => {
                if (error) done(error);
                // Now let's check our response
                expect(response).to.have.status(403);
                expect(response.body).to.have.property('errors');
                expect(response.body.errors).to.include('ALREADY_INSTALLED');
                done();
            });
        });
    });

});

