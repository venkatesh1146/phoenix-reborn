import NextImage, { ImageProps } from 'next/image'
import React from 'react'

export default function Image(props: ImageProps) {
  return <NextImage width={16} height={16} {...props} />
}
