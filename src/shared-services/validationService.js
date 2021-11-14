import validation from 'validation.js'
import {validatorsDictionary} from '../components/CustomComponents/validatorsDictionary';


const validationService = {
    validateInput: function({ type, value }) {
        const result = validatejs(
          {
            [type]: value
          },
          {
            [type]: validatorsDictionary[type]
          }
        );
      
        if (result) {
          return result[type][0];
        }
      
        return null;
      },
      getFormValidation: function(state) {
        const { inputs } = state;
      
        const updatedInputs = {};
      
        for (const [key, input] of Object.entries(inputs)) {
          updatedInputs[key] = validationService.getInputValidationState({
            input,
            value: input.value
          });
        }
      
        this.setState({
          inputs: updatedInputs
        });
      },
    
      getInputValidationState:function({ input, value }) {
        return {
          ...input,
          value,
          errorLabel: input.optional
            ? null
            : validationService.validateInput({ type: input.type, value })
        };
      },
      onInputChange:function({ id, value, cb = () => {},state }) {
        const { inputs } = state;
        this.setState(
          {
            inputs: {
              ...inputs,
              [id]: validationService.getInputValidationState({
                input: inputs[id],
                value
              })
            }
          },
          cb
        );
      },

    
}

export default validationService;