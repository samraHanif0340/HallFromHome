import validatorsDictionary from '../components/customComponents/validatorsDictionary';
import validatejs from 'validate.js'

export default function validate(fieldName, value,fieldCompare) {

    var formValues = {}
    formValues[fieldName] = value
    console.log(formValues)

    var formFields = {}
    formFields[fieldName] = validatorsDictionary[fieldCompare]

    console.log(formFields)

    const result = validatejs(formValues, formFields)
    console.log(result)

    if (result) {
      return result[fieldName]
    }
    return null
  }