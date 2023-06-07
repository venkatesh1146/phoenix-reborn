import { css } from '@linaria/core'
import { styled } from '@linaria/react'
import PropTypes from 'prop-types'

/**
 * Generic container with flex display
 */
const Container = styled.div<any>`
  display: flex;
  justify-content: ${(props: any) => props.justify};
  align-items: ${(props) => props.align};
  flex: ${(props) => props.flex};

  ${(props) =>
    props.isColumn &&
    css`
      flex-direction: column;
    `}
  ${(props) =>
    props.isPadded &&
    css`
      padding: 1em;
    `}
`

const propTypes = {
  /** If layout has to be a column */
  align: PropTypes.string,

  /** If container needs padding */
  flex: PropTypes.string,

  /** CSS justify-content value */
  isColumn: PropTypes.bool,

  /** CSS align-items value */
  isPadded: PropTypes.bool,

  /** CSS flex value */
  justify: PropTypes.string,
}

const defaultProps = {
  justify: 'center',
  align: 'center',
}

Container.propTypes = propTypes
Container.defaultProps = defaultProps

/** @component */
export default Container
