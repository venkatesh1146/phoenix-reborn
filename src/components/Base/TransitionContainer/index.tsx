import React from 'react'
import { Transition } from 'react-transition-group'

interface TransitionContainerPropTypes {
  duration?: number
  visible: boolean
  [x: string]: any
}

const TransitionContainer = (props: TransitionContainerPropTypes) => {
  const duration = props.duration ?? 150
  const defaultStyle = {
    transition: `all ${duration}ms ease-in`,
    opacity: 0,
    height: 'inherit',
    width: 'inherit',
    position: 'absolute',
    pointerEvents: 'none',
    overflow: 'auto',
    ...props.customStyles,
  }

  const transitionForward = {
    entering: { opacity: 0, transform: 'translateX(2%)' },
    entered: { opacity: 1, transform: 'translateX(0%)', pointerEvents: 'all' },
    exiting: { opacity: 0, transform: 'translateX(-2%)' },
    exited: { opacity: 0 },
  }

  const transitionBackward = {
    entering: { opacity: 0, transform: 'translateX(-2%)' },
    entered: { opacity: 1, transform: 'translateX(0%)', pointerEvents: 'all' },
    exiting: { opacity: 0, transform: 'translateX(2%)' },
    exited: { opacity: 0 },
  }

  const transitionStyle: Record<string, any> = props.reverseTransition
    ? transitionBackward
    : transitionForward

  return (
    <Transition
      mountOnEnter
      unmountOnExit
      in={props.visible}
      timeout={duration}
    >
      {(state) => {
        return (
          <div
            style={{
              ...defaultStyle,
              ...transitionStyle[state],
            }}
          >
            {props.children}
          </div>
        )
      }}
    </Transition>
  )
}

export default TransitionContainer
