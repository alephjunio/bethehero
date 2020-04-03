const request = require('supertest');
const app = require('../../src/app');
const connection = require('../../src/database/connection');


describe('Sessions', () => {
    beforeEach(async () => {
        await connection.migrate.rollback();
        await connection.migrate.latest();
    });

    afterAll(async () => {
        await connection.destroy();
    });


    it('should be able to create a new session', async () => {

        data = {
            name: "APAD2",
            email: "contato@apd.com.br",
            whatsapp: "11000000000",
            city: "POA",
            uf: "SP"
        }
        const ong = await request(app)
            .post('/ongs')
            .send(data);

        const response = await request(app)
            .post('/sessions')
            .send({
                id: ong.body.id
            });

        expect(response.body.ong).toHaveProperty('name');
    });

});