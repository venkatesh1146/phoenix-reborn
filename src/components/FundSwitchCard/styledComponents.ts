import { styled } from '@linaria/react'

import { tm } from '~/styles/theme'

export const ImageContainer = styled.div`
  width: 0.2rem;
  margin: 0 2rem 0 1.5rem;
  background: ${tm((t) => t.colors.lightBgColor)};
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
`

export const Wrapper = styled.div`
  display: flex;
  background-color: ${tm((t) => t.colors.white)};
  border-radius: 4px;
  padding: 1rem;
  font-family: 'Maven Pro';
  justify-content: space-around;
  .circular-image {
    border-radius: 50% !important;
  }
  .arrow-icon {
    margin: 0 1.25rem;
    align-self: center;
  }
`

export const FundDetails = styled.div``
export const Name = styled.p`
  font-size: 0.75rem;
  font-weight: 500;
`
export const Units = styled.p`
  font-size: 0.75rem;
  color: ${tm((t) => t.colors.secondaryTextColor)};
`
export const Amount = styled.p`
  font-size: 0.875rem;
`
