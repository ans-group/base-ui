import validator from 'validator'
import compact from 'lodash/compact'

const customMessages = {
  isEmail: 'Please provide a valid email address',
  isCreditCard: 'Please provide a valid card number',
  isAlpha: 'Please use letters only',
  isAlphanumeric: 'Please use letters and numbers only',
  isAfter: 'Please enter a date',
  isNumeric: 'Please enter a numeric value',
  isUrl: 'Please enter a valid URL',
  required: 'This field is required'
}

const getDefaultMessage = rule => customMessages[rule] || 'Please check this field'

const handleValidation = value => validation => {
  const rule = typeof validation === 'string' ? validation : validation.rule
  const options = validation.options || []
  // 'required' just checks value exists
  if (rule === 'required') return String(value) === '' && getDefaultMessage(rule)
  // otherwise validate using validator package
  return validator[rule] && (!validator[rule](String(value), ...options) && getDefaultMessage(rule))
}

const Validator = validations => value => compact(validations.map(handleValidation(value)))

export default Validator
