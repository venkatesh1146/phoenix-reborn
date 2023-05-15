// Derived from the lib https://github.com/shubhanus/otp-input-react
// Added By: Venkatesh Pullaganti😁 (https://github.com/venkatesh1146)

import React, { CSSProperties, useEffect, useRef } from 'react'

const inputDefaultStyles: CSSProperties = {
  width: 32,
  height: 32,
  textAlign: 'center',
  marginRight: 20,
}

interface InputPropsType {
  focus?: boolean
  autoFocus?: boolean
  numInputs?: number
  index: number
  onChange: (value: any) => void
  onInputFocus?: (index: any, event: any) => void
  disabled: boolean
  value: string
  secure?: boolean
  inputStyles?: CSSProperties | undefined
  otpType: 'number' | 'alpha' | 'alphanumeric' | 'any'
  className?: string
  onKeyDown?: (e: any) => void
  onInput?: (e: any) => void
  onPaste?: (e: any) => void
  placeholder?: string
  [x: string]: any
}

/**
 * This is react stateless component
 * Renders an input box
 * @param {Object} {
 *   focus,
 *   autoFocus,
 *   disabled,
 *   value,
 *   secure,
 *   ...rest
 * }
 * @returns
 */
const Input = ({
  focus,
  autoFocus,
  disabled,
  value,
  onInputFocus = (index, event) => {
    //pass
  },
  index,
  secure,
  inputStyles,
  otpType,
  className,
  ...rest
}: InputPropsType) => {
  const input = useRef<any>(null)
  const componentMounted = useRef(false)
  useEffect(() => {
    // When component mounts
    if (autoFocus && focus) {
      input?.current?.focus()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    // When component focus updates
    if (componentMounted.current && focus) {
      input.current.focus()
    }
    componentMounted.current = true
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [focus])

  const handelInputFocus = (event: any) => onInputFocus(index, event)
  let inputType = 'text'
  if (secure) {
    inputType = 'password'
  } else if (otpType === 'number') {
    inputType = 'tel'
  }
  return (
    <input
      style={{ ...inputDefaultStyles, ...inputStyles }}
      type={inputType}
      maxLength={1}
      ref={input}
      disabled={disabled}
      onFocus={handelInputFocus}
      value={value || ''}
      {...rest}
    />
  )
}

export default React.memo(Input)
