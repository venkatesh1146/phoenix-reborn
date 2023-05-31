import { styled } from '@linaria/react'

import { tm } from '~/styles/theme'

export const DesktopRightSection = styled.div`
  flex-grow: 1;
  padding: 2.5rem;
  margin-left: auto;
  margin-right: auto;
  position: relative;
  height: 100%;
  overflow: auto;
  background-color: ${tm((t) => t.colors.lightBgColor)};
`
