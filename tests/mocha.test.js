var request = require('supertest')('http://localhost:8080');



describe('/', function() {
        it('returns json 404 error', function(done) {
            request
                .get('/')
                .expect('{"status":404,"datas":"page not found"}', done);
        });
        it('returns code 404 error', function(done) {
            request
                .get('/')
                .expect(404, done);
        });
});