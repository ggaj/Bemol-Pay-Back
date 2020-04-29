export interface transactionRequestPayload {
  id: string,
  name: string
  type: string,
  amount: number,
  currency: string,
  country: string,
  installments: number,
  capture: boolean,
  authenticate: boolean,
  cardNumber:string,
  holder:string,
  expirationDate:string,
  securityCode:string,
  brand:string
}


export interface responsePayload {
  MerchantOrderId: string,
  Customer: {
    Name: string
  },
  Payment: {
    CreditCard: {
      CardNumber: string,
      Holder: string,
      ExpirationDate: string,
      SaveCard: boolean,
      Brand: string
    },
    DebitCard: {
      CardNumber: string,
      Holder: string,
      ExpirationDate: string,
      SaveCard: boolean,
      Brand: string
    },
    Installments: number,
    Authenticate: boolean,
    ProofOfSale: string,
    AcquirerTransactionId: string,
    AuthorizationCode: string,
    PaymentId: string,
    Type: string,
    Amount: number,
    ReceivedDate: string,
    CapturedAmount: number,
    CapturedDate: string,
    Currency: string,
    Country: string,
    Provider: string,
    ReasonCode: number,
    ReasonMessage: string,
    Status: number,
    ProviderReturnCode: string,
    ProviderReturnMessage: string,
    Links: [
      {
        Method: string,
        Rel: string,
        Href: string
      },
      {
        Method: string,
        Rel: string,
        Href: string
      }
    ]
  }
}

export interface voidResponsePayload {
  Status: number,
  ReasonCode: number,
  ReasonMessage: string,
  ProviderReturnCode: string,
  ProviderReturnMessage: string,
}

export interface captureResponsePayload {
  Status: number,
  ReasonCode: number,
  ReasonMessage: string,
  ProviderReturnCode: string,
  ProviderReturnMessage: string,
}
