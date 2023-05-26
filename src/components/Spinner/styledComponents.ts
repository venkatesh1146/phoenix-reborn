import { styled } from '@linaria/react'

import { tm } from '~/styles/theme'
export const Wrapper = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
`
export const Loader = styled.div<{ size: any }>`
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
