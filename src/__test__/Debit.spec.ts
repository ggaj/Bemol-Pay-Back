import request from 'supertest';
import { Connection, getConnection } from 'typeorm';
import createConnection from '../database';

import app from '../app';

let connection: Connection;

describe('Transaction', () => {
  beforeAll(async () => {
    connection = await createConnection('test-connection');
    await connection.runMigrations();
  });

  beforeEach(async () => {
    await connection.query('DELETE FROM users');
    await connection.query('DELETE FROM transactions');
  });

  afterAll(async () => {
    const mainConnection = getConnection();

    await connection.close();
    await mainConnection.close();
  });

  it('should be able create new debit transaction', async () => {

    await request(app).post('/users').send({
      name: 'Rosa Linda',
      email: 'rosa@bemol.com.br',
      password: '123456'
    })

    const session = await request(app).post('/sessions').send({
      email: 'rosa@bemol.com.br',
      password: '123456'
    })

    const debit = await request(app).post('/debits').set('Authorization', `Bearer ${session.body.token}`).send({
      id: Date.now(),
      name: "Gildo Jr",
      type: "DebitCard",
      amount: 1000,
      installments: 1,
      capture: true,
      authenticate: false,
      cardNumber: "4111111111111111",
      holder: "Gildo G A Junior",
      expirationDate: "09/2030",
      securityCode: "123",
      brand: "Elo"
    })

    expect(debit.status).toBe(200);
  })
})
