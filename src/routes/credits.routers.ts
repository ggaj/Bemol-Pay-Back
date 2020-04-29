import { Router } from 'express'
import CreateCreditServices from '../services/credits/CreateCreditServices'
import CaptureCreditServices from '../services/credits/CaptureCreditServices'
import VoidCreditServices from '../services/credits/VoidCreditServices'
import ensureAuthenticated from '../middlewares/ensureAuthenticated';

import { transactionRequestPayload } from "../interface/transactionsPayload";

const creditsRouter = Router()

creditsRouter.use(ensureAuthenticated);

creditsRouter.post('/', async (request, response) => {
  const creditService = new CreateCreditServices();

  const payload:transactionRequestPayload = request.body

  const creditResponse = await creditService.execute(payload)

  return response.json(creditResponse)
})

creditsRouter.put('/:id/void', async (request, response) => {
  const voidService = new VoidCreditServices();

  const { id } = request.params

  await voidService.execute(id)

  return response.send()
})

creditsRouter.put('/:id/capture', async (request, response) => {
  const captureService = new CaptureCreditServices();

  const { id } = request.params

  await captureService.execute(id)

  return response.json({ message: `Order id ${id} captured` })
})

export default creditsRouter
