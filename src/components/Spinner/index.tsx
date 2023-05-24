import { styled } from '@linaria/react'
import React from 'react'

const defaultProps = {
  size: '30px',
  color: ' #6725f4',
}

const Spinner = (props: any) => {
  props = { ...defaultProps, ...props }
  return <Loader {...props}></Loader>
}

const Loader = styled.div<{ size: any }>`
  display: inline-block;
  width: ${(props) => props.size};
  height: ${(props) => props.size};
  vertical-align: text-bottom;
  border: calc(${(props) => props.size} / 10) solid
    ${(props: any) => props.color};
  border-right-color: transparent;
  border-radius: 50%;
  animation: loader 0.75s linear infinite;

  .loading {
    margin: -1px;
    position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    white-space: nowrap;
    border: 0;
  }

  @keyframes loader {
    to {
      transform: rotate(360deg);
    }
  }
`

export default Spinner
