import React from 'react'

import DoneBadge from './DoneBadge'
import { ProgressBarPropsTypes } from './ProgressCircle'
import ProgressCircle from './ProgressCircle'
import { Text, Wrapper } from './styledComponents'

interface ProgressContainerPropsType extends ProgressBarPropsTypes {
  variant?: 'plain' | 'textOnRight'
  text?: string
  wrapperClassName?: string
}
export default function ProgressContainer({
  variant = 'plain',
  text = '2 more to go',
  wrapperClassName = '',
  ...barProps
}: ProgressContainerPropsType) {
  const isDone = barProps.progress === 100
  if (isDone)
    return (
      <div style={{ fontFamily: 'Maven Pro' }} className={wrapperClassName}>
        <DoneBadge />
      </div>
    )
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
