const validatePaymentAmount = (goalType: any, amount: number) => {
  if (goalType) {
    const minAmt = 5000
    return amount > minAmt ? amount : minAmt
  } else {
    const minAmt = 2000
    return Math.ceil(amount / minAmt) * minAmt
  }
}

const validateFormField = {
  pan: (pan: string) => {
    const panRegex = /^([a-zA-Z]{3})(P)([a-zA-Z]{1})([0-9]{4})([a-zA-Z]{1})$/i
    return panRegex.test(pan)
  },
  name: (name: string) => {
    const nameRegex = /^[a-zA-Z ]*$/
    return nameRegex.test(name)
  },
  dob: (date: string) => {
    const dateRegex =
      /^(?:(?:31(\/)(?:0?[13578]|1[02]))\1|(?:(?:29|30)(\/)(?:0?[1,3-9]|1[0-2])\2))(?:(?:1[6-9]|[2-9]\d)?\d{2})$|^(?:29(\/)0?2\3(?:(?:(?:1[6-9]|[2-9]\d)?(?:0[48]|[2468][048]|[13579][26])|(?:(?:16|[2468][048]|[3579][26])00))))$|^(?:0?[1-9]|1\d|2[0-8])(\/)(?:(?:0?[1-9])|(?:1[0-2]))\4(?:(?:1[6-9]|[2-9]\d)?\d{2})$/
    return dateRegex.test(date)
  },
  mobile: (num: string) => {
    // const mobileNumRegex = /^([6-9]{1})([0-9]{9})$/;
    const mobileNumRegex = /^([0-9]+)$/
    return mobileNumRegex.test(num)
  },
  number: (acct: string) => {
    const acctRegex = /^\d+$/
    return acctRegex.test(acct)
  },
  ifsc: (ifsc: string) => {
    const ifscRegex = /^[A-Za-z]{4}[0][A-Za-z0-9]{6}$/
    return ifscRegex.test(ifsc)
  },
  email: (email: string) => {
    const re =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    return re.test(email)
  },
  password: (password: string) => {
    const re = /^.{6,}$/i
    return re.test(password)
  },
  nomineeName: (name: string) => {
    const nameRegex = /^[a-zA-Z ]*$/
    return nameRegex.test(name)
  },
  guardianName: (name: string) => {
    const nameRegex = /^[a-zA-Z ]*$/
    return nameRegex.test(name)
  },
  nomineeDOB: (date: string) => {
    const dateRegex =
      /^(?:(?:31(\/)(?:0?[13578]|1[02]))\1|(?:(?:29|30)(\/)(?:0?[1,3-9]|1[0-2])\2))(?:(?:1[6-9]|[2-9]\d)?\d{2})$|^(?:29(\/)0?2\3(?:(?:(?:1[6-9]|[2-9]\d)?(?:0[48]|[2468][048]|[13579][26])|(?:(?:16|[2468][048]|[3579][26])00))))$|^(?:0?[1-9]|1\d|2[0-8])(\/)(?:(?:0?[1-9])|(?:1[0-2]))\4(?:(?:1[6-9]|[2-9]\d)?\d{2})$/
    return dateRegex.test(date)
  },
}

const validateGoalInputField = (
  amount: number,
  min: number,
  multiple: number
) => {
  if (!!min && amount < min) {
    return {
      error: true,
      errorText: `Enter a minimum amount of ${min}`,
    }
  } else if (!!multiple && amount % multiple !== 0) {
    return {
      error: true,
      errorText: `Amount should be multiple of ${multiple}`,
    }
  }
  return {
    error: false,
  }
}

const validationErrorMessage = {
  pan: 'Please enter a correct PAN',
  name: 'Please enter full name as on PAN',
  dob: 'Please enter date in DD/MM/YYYY format eg: 01/01/1980',
  mobile: 'Please enter a valid mobile number',
  number: 'Please enter a valid account number',
  ifsc: 'Please enter a valid IFSC code',
  email: 'Please use your correct email',
  password: 'Please use more than 6 characters',
  nomineeName: 'Please enter valid nominee name',
  nomineeDOB: 'Please enter valid nominee date',
  guardianName: 'Please enter valid guardian name',
}

const WealthyValidations = {
  validatePaymentAmount,
  validateFormField,
  validationErrorMessage,
  validateGoalInputField,
}

export default WealthyValidations
