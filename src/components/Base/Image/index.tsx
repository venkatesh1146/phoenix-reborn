import NextImage, { ImageProps } from 'next/image'
import React from 'react'

export default function Image(props: ImageProps) {
  return <NextImage {...props} />
}
