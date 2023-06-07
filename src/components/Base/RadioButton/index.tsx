import { css } from '@linaria/core'
import { styled } from '@linaria/react'
import React from 'react'

import Icon from '../Icon'

interface RadioButtonPropTypes {
  isVertical?: boolean
  [x: string]: any
}

const RadioButton = (props: RadioButtonPropTypes) => {
  return (
    <Radio isActive={props.isActive}>
      <Icon
        color={
          props.isActive
            ? props.activeColor
              ? props.activeColor
              : 'var(--cerise)'
            : props.color
            ? props.color
            : 'var(--gallery)'
        }
        name="wl-icon-check-circle"
        size="1.5em"
      />
    </Radio>
  )
}

const Radio = styled.div<{ isActive?: boolean }>`
  margin-right: 1em;
  width: 1.25em;
  height: 1.25em;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 2em;
  ${(props) =>
    !props.isActive
      ? css`
          background-color: #eaeaea;
          i {
            opacity: 0;
          }
        `
      : ''}
`

export default RadioButton
