export const ALPHABET = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'

export const ALPHANUMERIC = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'


export const NUMERIC = '0123456789'


export const HTTP_STATUS_OK = 200
export const HTTP_STATUS_BAD_REQUEST = 400
export const DEFAULT_ERROR_MESSAGE = 'Something went wrong. Please try again.'
export const TEN_DIGIT_MSISDN_REGEX = new RegExp(/^(?=[0-9]{10})([0-9]{3})([0-9]{3})([0-9]{4})$/)
export const ZERO_LEADING_MSISDN_REGEX = new RegExp(/^(?=0[0-9]{10})(0)([0-9]{3})([0-9]{3})([0-9]{4})$/)
export const COUNTRY_CODE_234_MSISDN_REGEX = new RegExp(/^(?=234[0-9]{10})(234)([0-9]{3})([0-9]{3})([0-9]{4})$/)
export const INTERNATIONAL_FORMAT_MSISDN_REGEX = new RegExp(/^(?=\+234[0-9]{10})(\+234)([0-9]{3})([0-9]{3})([0-9]{4})$/)