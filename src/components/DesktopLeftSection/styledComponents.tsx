import { styled } from '@linaria/react'

import { tm } from '~/styles/theme'

export const Wrapper = styled.div`
  background-color: ${tm((t) => t.colors.primaryBgColor)};
  background-image: url('https://i.wlycdn.com/articles/lines-design-pattern-with-transparency.svg');
  background-position: top right;
  background-repeat: no-repeat;
  height: 100%;
  padding: 2.5rem;
  display: flex;
  flex-direction: column;
  color: ${tm((t) => t.colors.white)};
  min-width: 40%;
`

export const ChildrenContainer = styled.div``
export const FooterWrapper = styled.div`
  padding: 2rem 2rem 0 2rem;
  margin-top: auto;
`
