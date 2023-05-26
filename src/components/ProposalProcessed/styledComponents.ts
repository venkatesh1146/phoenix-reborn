import { styled } from '@linaria/react'

import { tm } from '~/styles/theme'
export const HeaderSection = styled.div`
  background: ${tm((t) => t.colors.primaryBgColor)};
  display: flex;
  flex-direction: column;
  padding: 1.25rem;
  .tick-icon {
    align-self: center;
  }
  .funds-switch-wrapper {
    margin-bottom: 1.5rem;
  }
`
export const Text = styled.p`
  font-family: 'Maven Pro';
  font-weight: 500;
  font-size: 1rem;
  text-align: center;
  color: ${tm((t) => t.colors.white)};
  margin: 0;
  margin-bottom: 2rem;
`

export const Wrapper = styled.div``
