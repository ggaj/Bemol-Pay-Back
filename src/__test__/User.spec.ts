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

  it('should be able create new users', async () => {
    const user = await request(app).post('/users').send({
      name: 'Gildo Jr',
      email: 'gildoaraujo@bemol.com.br',
      password: '123456'
    })

    expect(user.status).toBe(200);
    expect(user.body).toMatchObject(
      expect.objectContaining({
        id: expect.any(String),
        name: 'Gildo Jr',
        email: 'gildoaraujo@bemol.com.br',
        created_at: expect.any(String),
        updated_at: expect.any(String),
      })
    );
  })

  it('should be not able create users with duplicate mail', async () => {
    const user1 = await request(app).post('/users').send({
      name: 'Gildo Jr',
      email: 'gildoaraujo@bemol.com.br',
      password: '123456'
    })

    const user2 = await request(app).post('/users').send({
      name: 'Gildo Jr',
      email: 'gildoaraujo@bemol.com.br',
      password: '123456'
    })

    expect(user2.status).toBe(400);
    expect(user2.body).toEqual(
      expect.objectContaining({
        status: 'error',
        message: "Email address already used",
        errors: [],
      })
    );
  })
})
