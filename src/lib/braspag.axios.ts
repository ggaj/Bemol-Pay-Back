require('dotenv/config')
import axios from 'axios'

const braspapApi = ( transaction: boolean ) => axios.create({
  baseURL: `${transaction ? process.env.URL_TRANSACTION : process.env.URL_SERVICE}`,
  headers: {
    Merchantid: process.env.MERCHANT_ID,
    MerchantKey: process.env.MERCHANT_KEY
  }
})

export default braspapApi
