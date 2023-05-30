import { styled } from '@linaria/react'

import { tm } from '~/styles/theme'
export const Wrapper = styled.div`
  background: ${tm((t) => t.colors.primaryBgColor)};
  padding: 1.25rem;
  display: flex;
  border-top: 0.5px dashed #a69ebc;
`
export const Text = styled.p`
  font-size: 0.8rem;
  font-family: 'Maven Pro';
  margin: 0;
  line-height: 20px;
  margin-left: 0.5rem;
  color: #a69ebc;
`
