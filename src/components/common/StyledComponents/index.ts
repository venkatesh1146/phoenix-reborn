import { styled } from '@linaria/react'

import { tm } from '~/styles/theme'

export const H1 = styled.h1`
  font-family: 'Marcellus';
  font-style: normal;
  font-weight: 400;
  font-size: 42px;
  line-height: 53px;

  color: ${tm((t) => t.colors.primaryTextColor)};
`
export const P = styled.p`
  margin: 0;
  color: ${tm((t) => t.colors.secondaryTextColor)};
`
