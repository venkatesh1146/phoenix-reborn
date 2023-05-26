import { styled } from '@linaria/react'

import { tm } from '~/styles/theme'
export const FundsCount = styled.p`
  color: ${tm((t) => t.colors.secondaryTextColor)};
  font-size: 0.8rem;
  font-family: 'Maven Pro';
`
export const Wrapper = styled.div`
  background: ${tm((t) => t.colors.lightBgColor)};
  padding: 1.2rem 1.2rem 3.8rem 1.2rem;
  @media (min-width: 1100px) {
    border-radius: 16px;
  }
`
export const Heading = styled.div`
  font-family: 'Marcellus';
  font-size: 1.25rem;
  text-transform: capitalize;
  display: flex;
  justify-content: space-between;
  align-items: center;
`
export const FundSwitches = styled.div`
  margin: 1.5rem 0;
  display: flex;
  flex-direction: column;
  @media (min-width: 1024px) {
    flex-direction: row;
  }
  .fund-switch-wrapper {
    margin: 0.5rem;
  }
`
