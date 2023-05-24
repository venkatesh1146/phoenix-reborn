import { styled } from '@linaria/react'
import PropTypes from 'prop-types'

/**
 * Generic image component
 */
const Image = styled.img<{
  width?: string
  height?: string
}>`
  height: ${(props) => props.height || '16px'};
  width: ${(props) => props.width || 'auto'};
`

Image.propTypes = {
  /** Image source (URL or reference) */
  alt: PropTypes.string,

  /** Alt text */
  height: PropTypes.string,

  /** Width of the image */
  src: PropTypes.string.isRequired,

  /** Height of the image */
  width: PropTypes.string,
}

/** @component */
export default Image
