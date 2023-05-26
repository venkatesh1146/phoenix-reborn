import React from 'react'

import { Loader } from './styledComponents'

const defaultProps = {
  size: '30px',
  color: ' #6725f4',
}

const Spinner = (props: any) => {
  props = { ...defaultProps, ...props }
  return <Loader {...props}></Loader>
}

export default Spinner
