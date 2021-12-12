
const validatorsDictionary = {
  
  textField:{
    presence:{
      allowEmpty: false,
      message: '^*REQUIRED',
    },
    length:{
      minimum:4,
      message: '^must contains atleast 4 characters',
    }
  
  },

  email: {
    length: {
      minimum: 8,
     // message: '^EMAIL must contains atleast 8 characters',
    },
    email: {
      message: '^Enter a valid EMAIL (abc@abc.com)'
    },
    presence:
    // {
      
    //   message: '^*REQUIRED',
    // },
    {
      allowEmpty: false,
      message: '^*REQUIRED',
    }
  },


  password: {
    length: {
      minimum: 10,
      message: '^PASSWORD must contains atleast 10 characters',
    },
    presence:
    {

      // format: {
      //   pattern: /^(34|37|4|5[1-5]).*$/,
      //   message: function(value, attribute, validatorOptions, attributes, globalOptions) {
      //     return validate.format("^%{num} is not a valid credit card number", {
      //       num: value
      //     });
      //   }
      message: '^*REQUIRED',
    },
  },

  select:{
    presence:{
      message:"^*REQUIRED"
    }
  
  }
}


export default validatorsDictionary;

