var request = require('supertest')('http://localhost:8085');


describe('/api/get/supplier', function() {
        it('returns 200 status - ok', function(done) {
            this.timeout(10000);
            request
                .get('/api/get/supplier?key=3ff85cb0c62fc22z5c2adff067c5e83a')
                .expect(200, done);
        });
        it('returns 200 status - is json', function(done) {
            this.timeout(10000);
            request
                .get('/api/get/supplier?key=3ff85cb0c62fc22z5c2adff067c5e83a')
                .expect('Content-Type', /json/, done);
        });
        it('returns 500 status - bad key', function(done) {
            request
                .get('/api/get/supplier?key=bad-key_52cbba19c')
                .expect(500, done);
        });
        it('returns 500 status - bad parameter', function(done) {
            request
                .get('/api/get/supplier?bad_parameter=83c2c07ea1251a1a39ec46d52cbba19c')
                .expect(500, done);
        });
});