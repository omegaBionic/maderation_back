var request = require('supertest')('http://localhost:8080');


describe('/api/get/product', function() {
        it('returns 200 status - ok', function(done) {
            this.timeout(10000);
            request
                .get('/api/get/product?key=4789725dd2d8061e7faf00fce9af48e1')
                .expect(200, done);
        });
        it('returns 200 status - is json', function(done) {
            this.timeout(10000);
            request
                .get('/api/get/product?key=4789725dd2d8061e7faf00fce9af48e1')
                .expect('Content-Type', /json/, done);
        });
        it('returns 500 status - bad key', function(done) {
            request
                .get('/api/get/product?key=bad-key_52cbba19c')
                .expect(500, done);
        });
        it('returns 500 status - bad parameter', function(done) {
            request
                .get('/api/get/product?bad_parameter=83c2c07ea1251a1a39ec46d52cbba19c')
                .expect(500, done);
        });
});