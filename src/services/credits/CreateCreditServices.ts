import { getRepository } from 'typeorm';
import Transaction from '../../models/Transaction';
import apiBraspag from '../../lib/braspag.axios';

import { transactionRequestPayload, responsePayload } from '../../interface/transactionsPayload'
import getValidationPayload from '../../validations/BraspagValidations'
import AppError from '../../errors/AppError'

class CreateCreditServices {
  public async execute(payload: transactionRequestPayload): Promise<Transaction>{
    await getValidationPayload(payload)

    try {
      const body = {
        MerchantOrderId: payload.id,
          Customer: {
            Name: payload.name
          },
          Payment: {
            Provider: process.env.API_BRASPAG_PROVIDER,
            Type: payload.type,
            Amount: payload.amount,
            Installments: payload.installments,
            Capture: payload.capture || false,
            CreditCard: {
              CardNumber: payload.cardNumber,
              Holder: payload.holder,
              ExpirationDate: payload.expirationDate,
              SecurityCode: payload.securityCode,
              Brand: payload.brand
            }
          }
      }

      const { data } = await apiBraspag(true).post<responsePayload>('/v2/sales', body);

      const transactionRepository = getRepository(Transaction);

      const transaction = transactionRepository.create({
        order_id: data.MerchantOrderId,
        name: data.Customer.Name,
        type: data.Payment.Type,
        amount: data.Payment.Amount,
        installments: data.Payment.Installments,
        card_number: data.Payment.CreditCard.CardNumber,
        holder: data.Payment.CreditCard.Holder,
        expiration_date: data.Payment.CreditCard.ExpirationDate,
        brand: data.Payment.CreditCard.Brand,
        authorization_code: data.Payment.AuthorizationCode,
        payment_id: data.Payment.PaymentId,
        received_date: data.Payment.ReceivedDate,
        captured: payload.capture || false,
        provider: data.Payment.Provider,
        status: data.Payment.Status,
      });

      await transactionRepository.save(transaction);

      return transaction;


    } catch (error) {
      console.error(error)

      throw new AppError('Create fails transaction with credit card')
    }
  }
}

export default CreateCreditServices;
