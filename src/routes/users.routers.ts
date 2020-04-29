import { Router } from 'express';

import CreateUserServices from '../services/CreateUserServices';

const usersRouter = Router();

usersRouter.post('/', async (request, response) => {
  const { name, email, password } = request.body;

  const createUser = new CreateUserServices();

  const user = await createUser.execute({
    name,
    email,
    password,
  });

  delete user.password;

  return response.json(user);
});

export default usersRouter;
