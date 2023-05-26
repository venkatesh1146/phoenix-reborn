import { styled } from '@linaria/react'

import { tm } from '~/styles/theme'
export const Wrapper = styled.div`
  font-family: 'Marcellus' !important;
  font-size: 1.625rem;
  color: ${tm((t) => t.colors.white)};
`
