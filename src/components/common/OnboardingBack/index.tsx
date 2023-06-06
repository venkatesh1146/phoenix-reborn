import { styled } from '@linaria/react'
import { PropTypes } from 'prop-types'
import React from 'react'

import Icon from '~/components/Base/Icon'

const BackButtonWrapper = styled.div`
  position: absolute;
  top: 5em;
  left: 5em;
  @media (max-width: 768px) {
    top: 5em;
    left: 0.5em;
  }
  z-index: 4;
  cursor: pointer;
  /* color: ${(props) =>
    props.theme === 'light' ? '#FFF' : 'var(--dove-gray)'}; */
  mix-blend-mode: luminosity;
  p {
    margin: 0px;
    font-size: 0.8em;
    text-align: center;
    color: inherit;
    opacity: 0;
    transition: all ease-in 0.2s;
    transform: translateY(-20%);
  }
  i {
    color: inherit;
  }
  &:hover {
    p {
      opacity: 1;
      transform: translateY(0);
    }
  }
  &.dashboard-button-arrow {
    top: 2rem !important;
    font-size: 0.7em;
    left: 3em;
  }
`

const OnboardingBack = (props) => {
  return (
    <BackButtonWrapper
      className={props.className}
      onClick={props.goBackFunction}
    >
      <Icon
        name="wl-icon-arrow-back"
        size={props.size ? props.size : '2.5em'}
      />
      <p>Back</p>
    </BackButtonWrapper>
  )
}

const propTypes = {
  /**
   * Calling this function on click
   */
  goBackFunction: PropTypes.func.isRequired,

  /**
   * Theme of the button eg. light
   */
  theme: PropTypes.string,

  /**
   * Size of the button eg. 2.5em
   */
  size: PropTypes.string,
}

const defaultProps = {
  size: '2.5em',
}

OnboardingBack.propTypes = propTypes
OnboardingBack.defaultProps = defaultProps

export default OnboardingBack
