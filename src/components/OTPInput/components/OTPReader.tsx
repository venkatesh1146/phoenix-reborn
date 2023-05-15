// Derived from the lib https://github.com/shubhanus/otp-input-react
// Added By: Venkatesh Pullaganti😁 (https://github.com/venkatesh1146)
import React, { CSSProperties, useMemo } from 'react'

import useOTP from '../../../hooks/useOTP'

import Input from './Input'

interface OtpInputPropTypes {
  className?: string
  inputClassName?: string
  OTPLength?: number
  onChange: (otp: string) => void
  disabled?: boolean
  autoFocus?: boolean
  secure?: boolean
  otpType: 'number' | 'alpha' | 'alphanumeric' | 'any'
  value: string | number
  inputStyles?: CSSProperties
  style: CSSProperties
  placeholder?: string[]
}

const OtpInput = ({
  OTPLength = 6,
  disabled = false,
  autoFocus,
  value = '',
  onChange,
  otpType,
  secure,
  className,
  inputClassName = '',
  inputStyles,
  style,
  placeholder,
}: OtpInputPropTypes) => {
  const {
    activeInput,
    getOtpValue,
    handleOnChange,
    handleOnKeyDown,
    handelOnInput,
    handleOnPaste,
    onInputFocus,
  } = useOTP({
    autoFocus,
    value,
    otpType,
    onChange,
    OTPLength,
  })

  // Needs to be memorized
  const renderInputs = useMemo(() => {
    const otp = getOtpValue()
    const inputs = []

    // eslint-disable-next-line no-plusplus
    for (let index = 0; index < OTPLength; index++) {
      inputs.push(
        <Input
          className={inputClassName}
          inputStyles={inputStyles}
          key={index}
          focus={activeInput === index}
          value={otp[index]}
          onChange={handleOnChange}
          onKeyDown={handleOnKeyDown}
          onInput={handelOnInput}
          onPaste={handleOnPaste}
          onInputFocus={onInputFocus}
          index={index}
          // onBlur={() => setActiveInput(-1)}
          disabled={disabled}
          autoFocus={autoFocus}
          secure={secure}
          data-testid="input"
          otpType={otpType}
          placeholder={placeholder && placeholder[index]}
        />
      )
    }

    return inputs
  }, [
    getOtpValue,
    OTPLength,
    inputClassName,
    inputStyles,
    activeInput,
    handleOnChange,
    handleOnKeyDown,
    handelOnInput,
    handleOnPaste,
    onInputFocus,
    disabled,
    autoFocus,
    secure,
    otpType,
    placeholder,
  ])

  return (
    <div
      style={{
        display: 'flex',
        ...style,
      }}
      className={`${className}`}
      data-testid="otp-input-root"
    >
      {renderInputs}
    </div>
  )
}

OtpInput.defaultProps = {
  className: '',
  inputClassName: '',
  OTPLength: 4,
  onChange: () => {
    //pass
  },
  disabled: false,
  secure: false,
  autoFocus: false,
  value: '',
  otpType: 'any',
  inputStyles: {},
  style: {},
  placeholder: undefined,
}

export default OtpInput
