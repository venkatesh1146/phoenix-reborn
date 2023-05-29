import React from 'react'

import { ProgressBarPropsTypes } from './ProgressCircle'
import ProgressCircle from './ProgressCircle'
import { Text, Wrapper } from './styledComponents'

interface ProgressContainerPropsType extends ProgressBarPropsTypes {
  variant?: 'plain' | 'textOnRight'
  text?: string
  wrapperClassName?: string
}
export default function ProgressContainer({
  variant = 'textOnRight',
  text = '2 more to go',
  wrapperClassName = '',
  ...barProps
}: ProgressContainerPropsType) {
  switch (variant) {
    case 'textOnRight':
      return (
        <Wrapper className={wrapperClassName}>
          <ProgressCircle {...barProps} />
          <Text>{text}</Text>
        </Wrapper>
      )
    case 'plain':
    default:
      return <ProgressCircle {...barProps} />
  }
}
