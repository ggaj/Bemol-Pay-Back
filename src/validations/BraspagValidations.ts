import * as Yup from 'yup';
import AppError from '../errors/AppError';

import { ErrosResponse } from '../interface/errosResponse'
import { transactionRequestPayload } from '../interface/transactionsPayload'
const getValidationPayload = async ( payload: transactionRequestPayload ) => {

  try {
    const schema = Yup.object().shape({
      id: Yup.string().required('Id da venda é obrigatório'),
      name: Yup.string().required('Nome do cliente é obrigatório'),
      type: Yup.string().required('Tipo é obrigatório'),
      amount: Yup.number().required('Total da compra é obrigatório'),
      capture: Yup.bool(),
      authenticate: Yup.bool(),
      installments: Yup.number().required('Número de parcelas é obrigatório'),
      cardNumber: Yup.string().required('Número do cartão é obrigatório'),
      holder: Yup.string().required('Nome escrito no cartão é obrigatório'),
      expirationDate: Yup.string().required('Data de expiração é obrigatória'),
      securityCode: Yup.string().required('Código de segurança é obrigatório'),
      brand: Yup.string().required('Bandeira do cartão é obrigatória'),
    });

    await schema.validate(payload, {
      abortEarly: false,
    });

    return { status: 200 }

  } catch (error) {
    const erros = error.inner.map((err: Yup.ValidationError): ErrosResponse => ({
      name: err.path,
      message: err.message
    }))
    throw new AppError('Validations Fails', 400, erros)
  }
}

export default getValidationPayload
