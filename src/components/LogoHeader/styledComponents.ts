import { styled } from '@linaria/react'

import { tm } from '~/styles/theme'
export const HeaderWrapper = styled.div`
  width: 100%;
  margin-bottom: 1.5rem;
  height: 7.2rem;
  display: flex;
  align-items: center;
  padding: 1.5rem;
  background-color: ${tm((t) => t.colors.primaryBgColor)};
`
