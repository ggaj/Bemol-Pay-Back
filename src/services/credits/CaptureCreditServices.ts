import { getRepository } from 'typeorm';
import Transaction from '../../models/Transaction';
import apiBraspag from '../../lib/braspag.axios';

import { captureResponsePayload } from '../../interface/transactionsPayload'
import AppError from '../../errors/AppError'

class CaptureCreditServices {
  public async execute(id: string): Promise<void>{
    const transactionRepository = getRepository(Transaction)

    const transaction = await transactionRepository.findOne({ order_id: id })

    if(!transaction){
      throw new AppError(`Order Id ${id} not found`)
    }

    if(!transaction.payment_id){
      throw new AppError(`Braspag Id ${transaction.payment_id} not found`)
    }

    if(transaction.status === 10){
      throw new AppError(`Order Id ${id} already canceled`)
    }

    if(transaction.status === 2){
      throw new AppError(`Order Id ${id} already captured`)
    }

    try {
      const { data } = await apiBraspag(true).put<captureResponsePayload>(`/v2/sales/${transaction.payment_id}/capture`);

      transaction.status = data.Status
      transaction.captured = true

      await transactionRepository.save(transaction);

    } catch (error) {
      console.error(error)

      throw new AppError('Capture fails transaction with credit card')
    }
  }
}

export default CaptureCreditServices;
