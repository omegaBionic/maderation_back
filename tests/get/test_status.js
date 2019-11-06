var request = require('supertest')('http://localhost:8080');


describe('/api/get/status', function() {
        it('returns 200 status - ok', function(done) {
            this.timeout(10000);
            request
                .get('/api/get/status?key=179616f1a4cecab2a7eab481b84d076c')
                .expect(200, done);
        });
        it('returns 200 status - is json', function(done) {
            this.timeout(10000);
            request
                .get('/api/get/status?key=179616f1a4cecab2a7eab481b84d076c')
                .expect('Content-Type', /json/, done);
        });
        it('returns 200 status - is json', function(done) {
            this.timeout(10000);
            request
                .get('/api/get/status?key=179616f1a4cecab2a7eab481b84d076c')
                .expect('{"status":200,"datas":"OK"}', done);
        });
});