/**
 * @Author: Syam Pillai <syambhai>
 * @Date:   2018-02-26T17:09:04+05:30
 * @Email:  syam@wealthy.in
 * @Last modified by:   apple
 * @Last modified time: 2018-03-03T17:47:31+05:30
 */

import { css } from '@linaria/core'
import { styled } from '@linaria/react'
import PropTypes from 'prop-types'

/**
 * Basic text component to use all over the app
 */
const Text = styled.p<any>`
  font-family: var(--primary-font);
  /* -webkit-font-smoothing: antialiased; */
  ${(props) =>
    props.type === 'primary'
      ? css`
          font-size: 1.12em;
          margin: 0;
          color: var(--primary-color);
          font-weight: 400;
        `
      : ''}
  ${(props) =>
    props.type === 'secondary'
      ? css`
          font-size: 1em;
          margin: 0;
          color: var(--dove-gray);
        `
      : ''} 
      
      ${(props) =>
    props.type === 'tertiary'
      ? css`
          font-size: 0.9em;
          color: var(--light-gray);
          margin: 0;
          font-weight: 300;
        `
      : ''}
  ${(props) =>
    props.fontSize &&
    css`
      font-size: ${props.fontSize};
    `}
  ${(props) =>
    props.textAlign &&
    css`
      text-align: ${props.textAlign};
    `}
  ${(props) =>
    props.color
      ? css`
          color: ${props.color};
        `
      : ''}
  ${(props) => (props.additionalStyles ? css(props.additionalStyles) : '')}
`

const propTypes = {
  /** Type of the Text field */
  additionalStyles: PropTypes.string,

  /** User defined text color **eg: '#ff5465' or 'red'** */
  color: PropTypes.string,

  /** User defined text font-size, **eg: '1em'** */
  fontSize: PropTypes.string,

  /** Any additional styles that need be applied. Should be in backticks `` */
  type: PropTypes.oneOf(['primary', 'secondary', 'tertiary']).isRequired,
}

const defaultProps = {
  type: 'primary',
}

Text.propTypes = propTypes
Text.defaultProps = defaultProps

/** @component */
export default Text
