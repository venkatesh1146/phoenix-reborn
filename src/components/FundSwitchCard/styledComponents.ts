import { styled } from '@linaria/react'

import { tm } from '~/styles/theme'

export const ImageContainer = styled.div`
  width: 3px;
  margin: 0 2rem 0 1.5rem;
  background: ${tm((t) => t.colors.lightBgColor)};
  display: flex;
  justify-content: center;
  align-items: center;
`

export const Wrapper = styled.div`
  display: flex;
  background-color: ${tm((t) => t.colors.white)};
  border-radius: 0.5rem;
  padding: 1rem;
  font-family: 'Maven Pro';
  justify-content: space-around;

  .arrow-icon {
    margin: 0 1.25rem;
    align-self: center;
  }
`

export const FundDetails = styled.div`
  .circular-image {
    border-radius: 50% !important;
  }
  @media screen and (min-width: 1024px) {
    display: flex;
    align-items: center;
    .circular-image {
      margin-right: 4px;
    }
  }
`
export const Name = styled.p`
  font-size: 0.75rem;
  font-weight: 500;
  margin: 0.1rem 0;
`
export const Units = styled.p`
  font-size: 0.75rem;
  margin: 0.1rem 0;
  color: ${tm((t) => t.colors.secondaryTextColor)};
`
export const Amount = styled.p`
  font-size: 0.875rem;
  margin: 0.1rem 0;
`
export const Numbers = styled.div``
