import { getRepository } from 'typeorm';
import Transaction from '../../models/Transaction';
import apiBraspag from '../../lib/braspag.axios';

import { voidResponsePayload } from '../../interface/transactionsPayload'
import AppError from '../../errors/AppError'

class VoidCreditServices {
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

    try {
      const { data } = await apiBraspag(true).put<voidResponsePayload>(`/v2/sales/${transaction.payment_id}/void`);

      transaction.status = data.Status

      await transactionRepository.save(transaction);

    } catch (error) {
      console.error(error)

      throw new AppError('Void fails transaction with credit card')
    }
  }
}

export default VoidCreditServices;
