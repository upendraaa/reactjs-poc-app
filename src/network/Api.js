import axios from 'axios';
const HEADER = 'http://'
const HOST = 'abr.business.gov.au'

export default axios.create({
  baseURL: HEADER+HOST
})