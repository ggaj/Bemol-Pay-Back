import { Router } from 'express';
import sessionsRouter from './sessions.routers';
import usersRouter from './users.routers';
import debitsRouter from './debits.routers'
import creditsRouter from './credits.routers'

const routes = Router();

routes.use('/users', usersRouter)
routes.use('/sessions', sessionsRouter);
routes.use('/debits', debitsRouter);
routes.use('/credits', creditsRouter);

export default routes;
