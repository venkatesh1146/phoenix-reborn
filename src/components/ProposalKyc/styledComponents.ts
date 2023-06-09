import { styled } from '@linaria/react'

import { tm } from '~/styles/theme'

export const Title = styled.p`
  font-family: 'Marcellus';
  font-style: normal;
  font-weight: 400;
  font-size: 1.5rem;
  line-height: 53px;
  color: ${tm((t) => t.colors.white)};
`
export const Text = styled.p`
  color: ${tm((t) => t.colors.secondaryTextColor)};
`
