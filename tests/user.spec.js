import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../server/server';

chai.use(chaiHttp);

const { expect } = chai;

describe('ISS Location API ::: ', () => {
  it('should get home page', (done) => {
    chai.request(app)
      .get('/')
      .end((err, res) => {
        const message = 'You are welcome to Dear Diary, please hit a valid endpoint to get started.';
        expect(res.status).to.equal(200);
        expect(res.body).to.haveOwnProperty('message').to.eql(message);
        done();
      });
  });
});
