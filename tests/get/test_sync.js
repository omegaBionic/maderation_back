var request = require('supertest')('http://localhost:8085');


describe('/api/get/sync', function() {
    /* good request test */
    it('declare good key returns 200 status - ok', function(done) {
        this.timeout(10000);
        request
            .get('/api/get/role?key=33f85cb0c62f522f5c2ad09067c5e83a&id=UniqueIdDeclaredForTestsFfbe52cd002cd01825259a1700cc760e')
            .expect(200, done);
    });
    it('returns 200 with good key - ok', function(done) {
        this.timeout(10000);
        request
            .get('/api/get/sync?key=03f1ce90995780a5c6fe80eacccfb080&id=UniqueIdDeclaredForTestsFfbe52cd002cd01825259a1700cc760e')
            .expect(200, done);
    });
    it('returns 200 with good key - is json', function(done) {
        this.timeout(10000);
        request
            .get('/api/get/sync?key=03f1ce90995780a5c6fe80eacccfb080&id=UniqueIdDeclaredForTestsFfbe52cd002cd01825259a1700cc760e')
            .expect(200, done);
    });
/* bad request test */
    it('returns 404 status for bad key - bad key', function(done) {
        this.timeout(10000);
        request
            .get('/api/get/sync?key=03f1ce90995780a5c6fe80eacccfb080&id=idTestExample1f27bad424fa872edc3c2cfc50c4daa1d')
            .expect(404, done);
    });
    it('returns 404 status for bad key - is json', function(done) {
        this.timeout(10000);
        request
            .get('/api/get/sync?key=03f1ce90995780a5c6fe80eacccfb080?id=idTestExample1f27bad424fa872edc3c2cfc50c4daa1d')
            .expect('Content-Type', /json/, done);
    });
    it('returns 500 status - bad key', function(done) {
        request
            .get('/api/get/sync?key=bad-e90995780a5c6fe80eacccfb080')
            .expect(500, done);
    });
    it('returns 500 status - bad parameter', function(done) {
        request
            .get('/api/get/sync?bad_parameter=03f1ce90995780a5c6fe80eacccfb080')
            .expect(500, done);
    });
});