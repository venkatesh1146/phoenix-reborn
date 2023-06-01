import { styled } from '@linaria/react'

import { tm } from '~/styles/theme'

export const AmountAndLogos = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-left: 1rem;
  @media screen and (min-width: 1024px) {
    border-top: 0.2px solid #888888;
    padding-top: 1.25rem;
    padding-left: 0;
    align-items: flex-start;
  }
`
export const Wrapper = styled.div`
  padding: 1.25rem 1.25rem 2rem 1.25rem;
  background: ${tm((t) => t.colors.secondaryBgColor)};
  border-radius: 8px;
  @media screen and (min-width: 1024px) {
    color: ${tm((t) => t.colors.white)};
    padding: 1.25rem;
  }
`
export const FundsCount = styled.p`
  font-family: 'Maven Pro';
  font-size: 0.8rem;
  text-transform: capitalize;
  color: #e6e6e6;
  display: flex;
  align-items: center;
  @media screen and (min-width: 1024px) {
    justify-content: right;
    font-size: 1.25rem;
  }
`
export const Heading = styled.p`
  font-family: 'Maven Pro';
  font-style: normal;
  font-weight: 600;
  font-size: 1rem;
  line-height: 19px;
  color: ${tm((t) => t.colors.white)};
  align-items: center;
`
export const Header = styled.div`
  display: flex;
  justify-content: space-between;
  @media screen and (min-width: 1024px) {
    align-items: center;
  }
`
export const Amount = styled.p`
  font-family: 'Maven Pro';
  font-weight: 500;
  font-size: 1.25rem;
  line-height: 24px;
  text-align: center;
  color: ${tm((t) => t.colors.white)};
  mix-blend-mode: normal;
`
