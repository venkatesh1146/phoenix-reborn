import { styled } from '@linaria/react'
import PropTypes from 'prop-types'

/**
 * Generic icon component
 */
const Icon = styled.i.attrs({
  className: (props) => props.name,
})`
  display: flex;
  cursor: ${(props) => (props.onClick ? 'pointer' : 'normal')};
  color: ${(props) => props.color};
  font-size: ${(props) => props.size};
  align-self: ${(props) => props.alignSelf};
  transition: 0.2s all ease-in;
`

const propTypes = {
  /** Name of the icon */
  alignSelf: PropTypes.string,

  /** Function to be called on icon click */
  color: PropTypes.string,

  /** Size of the icon in em or px */
  name: PropTypes.string.isRequired,

  /** Primary color of the icon */
  onClick: PropTypes.func,

  /** CSS align-self property */
  size: PropTypes.string,
}

const defaultProps = {
  color: 'var(--gray)',
  size: '1em',
  alignSelf: 'center',
}

Icon.propTypes = propTypes
Icon.defaultProps = defaultProps

export default Icon
