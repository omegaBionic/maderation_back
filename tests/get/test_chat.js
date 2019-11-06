var request = require('supertest')('http://localhost:8080');


describe('/api/get/chat', function() {
        it('returns 200 status - ok', function(done) {
            this.timeout(10000);
            request
                .get('/api/get/chat?key=80aacfbde81d03d20788f370417651cc')
                .expect(200, done);
        });
        it('returns 200 status - is json', function(done) {
            this.timeout(10000);
            request
                .get('/api/get/chat?key=80aacfbde81d03d20788f370417651cc')
                .expect('Content-Type', /json/, done);
        });
        it('returns 500 status - bad key', function(done) {
            request
                .get('/api/get/chat?key=bad-key_52cbba19c')
                .expect(500, done);
        });
        it('returns 500 status - bad parameter', function(done) {
            request
                .get('/api/get/chat?bad_parameter=83c2c07ea1251a1a39ec46d52cbba19c')
                .expect(500, done);
        });
});