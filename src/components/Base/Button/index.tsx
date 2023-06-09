import { styled } from '@linaria/react'
import PropTypes from 'prop-types'
import React from 'react'

import Icon from '../Icon'
import Image from '../Image'

const StyledButton = styled.button<any>`
  type: 'submit';
  border: none;
  outline: none;
  width: ${(props) => buttonSizes[props.size]};
  padding: 0.75em 0 0.65em;
  border-radius: 1.5em;
  font-size: 1em;
  letter-spacing: 1px;
  cursor: pointer;
  transition: 0.2s all ease;
  // text-transform: uppercase;
  align-items: center;
  margin: ${(props) => props.margin};
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
  &:hover {
    background-color: #d11868;
    &[theme='new'] {
      background-color: #1e17a0;
    }
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
  }
  i {
    margin-right: 1em;
    color: inherit;
    font-weight: 900;
  }
  img {
    margin-right: 1em;
  }
  &:disabled {
    cursor: not-allowed;
    background-color: #e5e5e5;
    color: #9b9b9b;
  }
  &[type='solid'] {
    background: ${(props) => buttonThemes[props.theme].bgCol};
    color: ${(props) => buttonThemes[props.theme].color};
  }
  &[type='outline'] {
  }

  @keyframes animate-stripes {
    0% {
      background-position: 0 0;
    }
    100% {
      background-position: 96px 0;
    }
  }
`

/**
 * One button to rule them all
 */
const Button = (props) => {
  const { label, onClick, icon, imgSrc, imgWidth } = props
  return (
    <StyledButton {...props} onClick={onClick}>
      {icon && <Icon name={icon} />}
      {imgSrc && <Image alt="btn-icon" src={imgSrc} width={imgWidth} />} {label}
    </StyledButton>
  )
}

interface ButtonPropTypes {
  /** Label of the button */
  isDisabled?: boolean

  /** Function to be called on button click */
  isLoading?: boolean

  /** Size of the button */
  label: string

  /** Theme of the button */
  margin?: string

  /** Type of the button */
  onClick: (param: any) => void

  /** If button is loading */
  size: 'small' | 'normal' | 'large'

  /** If button is disabled */
  theme: 'light' | 'primary' | 'gray' | 'new'

  /** Margin around the button */
  type: 'solid' | 'outline' | 'text'
  [x: string]: any
}

const defaultProps = {
  theme: 'primary',
  size: 'small',
  type: 'solid',
  margin: '1em 0',
  isLoading: false,
}

const buttonSizes = {
  small: '10em',
  normal: '15em',
  large: '90%',
}

const buttonThemes = {
  light: {
    color: '#FFFFFF',
    bgCol: 'transparent',
    bdCol: '#FFFFFF',
  },
  primary: {
    color: 'var(--white)',
    bgCol: 'var(--cerise)',
    bdCol: 'var(--cerise)',
  },
  gray: {
    color: 'var(--white)',
    bgCol: 'var(--gray)',
    bdCol: 'var(--gray)',
  },
  new: {
    color: 'var(--white)',
    bgCol: '#1E1750',
    bdCol: '#1E1750',
  },
}

Button.defaultProps = defaultProps

export default Button
