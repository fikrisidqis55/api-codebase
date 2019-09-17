const request = require('supertest');
const AppServer = require('../../../bin/app/server');

describe(__filename, () => {
  let appServer = null;

  beforeEach(function () {
    appServer = new AppServer();
    this.server = appServer.server;
  });

  afterEach(function () {
    this.server.close();
  });

  it('Should return 200 for "/"', function (done) {
    request(this.server)
      .get('/')
      .expect(200)
      .end(done);
  });

});
