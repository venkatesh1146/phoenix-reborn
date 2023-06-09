/*
  Author : Om Athalye
  email: om96athalye@gmail.com
  Bitbucket: https://bitbucket.org/OmAthalye/
*/

import { CSSProperties, styled } from '@linaria/react'
import React from 'react'

interface DateInputPropTypes {
  containerStyles?: CSSProperties
  /** Placeholder for input */
  childIcon?: JSX.Element | JSX.Element[]

  /** Font size of text */
  fontSize?: string

  /** CSS text-transform for input text */
  inputType: 'default' | 'registration'

  /** Width of the input */
  isDisabled?: boolean

  /** Theme of the input */
  isInvalid?: string | boolean

  /** If input is disabled */
  placeholder: string

  /** The error message, if input is invalid */
  theme?: 'light' | 'dark'

  /** Icon to prefix the input */
  transform?: 'capitalize' | 'lowercase' | 'uppercase'

  /** Type of input */
  width: 'small' | 'normal' | 'medium' | 'large' | 'full'

  /** Min and max dates */
  min?: string
  max?: string
  [x: string]: any
}

const defaultProps = {
  placeholder: '',
  fontSize: '1.12em',
  theme: 'dark',
  width: 'normal',
  inputType: 'default',
  min: '',
  max: '',
}

const inputWidth = {
  small: '12em',
  normal: '15em',
  medium: '20em',
  large: '27em',
  full: '100%',
}

/**
 * One input box to rule them all
 */
const DateInput = (props: DateInputPropTypes) => {
  const { width, isInvalid, containerStyles = {} } = props
  return (
    <InputContainer style={containerStyles} isInvalid={isInvalid} width={width}>
      {props.childIcon}
      <StyledInput
        required
        max={props.max}
        min={props.min}
        type="date"
        className="date-input"
        {...props}
      />
      <span className="err-msg">{props.isInvalid}</span>
    </InputContainer>
  )
}

const StyledInput = styled.input<any>`
  -webkit-font-smoothing: antialiased;

  &[inputType='default'] {
    outline: none;
    background: transparent;
    color: var(--gray);
    font-family: inherit;
    border: 0;
    padding: 0.6em 1.5em 0.5em;
    letter-spacing: 0.1em;
    width: 100%;
    -webkit-appearance: none;
    border-radius: 0;

    &::placeholder {
      color: var(--lighter-grey);
      text-transform: none;
      font-size: 0.9em;
      letter-spacing: 0;
    }
    &:focus {
      outline: none;
    }
  }
  &[inputType='registration'] {
    outline: none;
    background: #fafafa;
    color: var(--gray);
    font-family: inherit;
    border: 0;
    font-size: 1.12em;
    padding: 1.2em;
    margin-top: 1.5em;
    letter-spacing: 0.1em;
    width: 100%;
    -webkit-appearance: none;
    border-radius: var(--card-radius);
    font-weight: 900;
    transition: 0.2s all ease-in;
    background: white;
    font-weight: 500;
    box-shadow: 0 4px 5px 0 rgba(0, 0, 0, 0.1);
    &::placeholder {
      color: var(--lighter-gray);
      text-transform: none;
    }

    &:focus {
      background: var(--white);
      outline: none;
      box-shadow: var(--box-shadow);
    }
  }
  &[type='currency'] {
    padding: 0.6em 2em 0.5em;
  }
  text-transform: ${(props) => props.transform};

  &[isDisable] {
    pointer-events: none;
  }
  outline: none;
  border: 1px solid #e6e6e6;
  height: 2rem;
  padding: 4px 6px;
  border-radius: 4px;
`

const InputContainer = styled.div<any>`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;
  width: ${(props) => inputWidth[props.width]};
  i {
    position: absolute;
    left: 18px;
  }
  .err-msg {
    pointer-events: none;
    position: absolute;
    bottom: 0;
    left: 0;
    opacity: 0;
    font-size: 1em;
    font-weight: 400;
    color: #cc0000;
    transform: translateY(50%);
    transition: 0.4s;
    padding-left: 1em;
    padding-top: 0.4em;
  }

  &[isInvalid] {
    .err-msg {
      transform: translateY(100%);
      opacity: 1;
      transition: 0.4s;
    }
  }
`

DateInput.defaultProps = defaultProps

export default DateInput
