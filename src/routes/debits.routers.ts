import { Router } from 'express'
import CreateDebitServices from '../services/CreateDebitServices'
import ensureAuthenticated from '../middlewares/ensureAuthenticated';

import { transactionRequestPayload } from '../interface/transactionsPayload';

const debitsRouter = Router()

debitsRouter.use(ensureAuthenticated);

debitsRouter.post('/', async(request, response) => {
  const debitService = new CreateDebitServices();

  const payload:transactionRequestPayload = request.body

  const debitResponse = await debitService.execute(payload)

  return response.json(debitResponse)
})

export default debitsRouter
