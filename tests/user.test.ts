import request from 'supertest';
import  app  from '../src/index';

import { UserService } from '../src/services/users.services';

jest.mock('../src/services/users.services.ts');
const MockUserService = UserService as jest.MockedClass<typeof UserService>;

describe('User Routes', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  it('GET /api/v1/user/home → welcome message', async () => {
    const res = await request(app).get('/api/v1/user/home');
    expect(res.status).toBe(200);
    expect(res.body).toBe('Welcome to johns Lendsqr assessment');
  });

  it('POST /api/v1/user/create-user → success', async () => {
    MockUserService.prototype.isBlacklisted.mockResolvedValue(false);
    MockUserService.prototype.getUserByEmail.mockResolvedValue(undefined);
    MockUserService.prototype.createUser.mockResolvedValue({
      id: '1',
      email: 'test@example.com',
      name: 'Test User',
      password: 'hashedpassword',
    });

    const res = await request(app)
      .post('/api/v1/user/create-user')
      .send({
        email: 'test@example.com',
        password: 'Pass@123',
        name: 'Test User'
      });

    expect(res.status).toBe(201);
    expect(res.body.data).toMatchObject({
      id: '1',
      email: 'test@example.com',
      name: 'Test User'
    });
    expect(MockUserService.prototype.createUser).toHaveBeenCalled();
  });

  it('GET /api/v1/user/ → authenticated user', async () => {
  const fakeUser = { id: '1', email: 'john@doe.com', name: 'John Doe', password: 'hashedpassword' };
  MockUserService.prototype.getUserById.mockResolvedValue(fakeUser);

  const res = await request(app)
    .get('/api/v1/user/')
    .set('x-user-id', '1'); 

  expect(res.status).toBe(200);
  expect(res.body.data).toEqual(fakeUser);
});
});
