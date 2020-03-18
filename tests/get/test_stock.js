var request = require('supertest')('http://localhost:8085');


describe('/api/get/stock', function() {
        it('returns 200 status - ok', function(done) {
            this.timeout(10000);
            request
                .get('/api/get/stock?key=93f85cb0cc2fc22f5c2ad0f067c5e95116')
                .expect(200, done);
        });
        it('returns 200 status - is json', function(done) {
            this.timeout(10000);
            request
                .get('/api/get/stock?key=93f85cb0cc2fc22f5c2ad0f067c5e95116')
                .expect('Content-Type', /json/, done);
        });
        it('returns 500 status - bad key', function(done) {
            request
                .get('/api/get/stock?key=bad-key_52cbba19c')
                .expect(500, done);
        });
        it('returns 500 status - bad parameter', function(done) {
            request
                .get('/api/get/stock?bad_parameter=83c2c07ea1251a1a39ec46d52cbba19c')
                .expect(500, done);
        });
});