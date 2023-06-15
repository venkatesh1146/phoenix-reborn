/**
 * @Author: Syam Pillai <syambhai>
 * @Date:   2018-02-26T17:09:04+05:30
 * @Email:  syam@wealthy.in
 * @Last modified by:   apple
 * @Last modified time: 2018-03-03T17:47:31+05:30
 */

import { styled } from '@linaria/react'
import PropTypes from 'prop-types'

/**
 * Basic text component to use all over the app
 */
const Text = styled.p<any>``

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
