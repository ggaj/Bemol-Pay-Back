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

  it('should be able create new session', async () => {
    await request(app).post('/users').send({
      name: 'Flor de Girassol',
      email: 'girassol@bemol.com.br',
      password: '123456'
    })

    const session = await request(app).post('/sessions').send({
      email: 'girassol@bemol.com.br',
      password: '123456'
    })

    expect(session.status).toBe(200);
    expect(session.body).toMatchObject(
      expect.objectContaining({
        user: {
          id: expect.any(String),
          name: 'Flor de Girassol',
          email: 'girassol@bemol.com.br',
          created_at: expect.any(String),
          updated_at: expect.any(String),
        },
        token: expect.any(String),
      })
    );
  })
})
