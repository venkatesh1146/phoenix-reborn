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
  position: relative;

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
      margin-right: 12px;
      margin-top: 4px;
    }
  }
`
export const Name = styled.p`
  font-size: 0.75rem;
  font-weight: 500;
  margin: 0.2rem 0;
`
export const Units = styled.p`
  font-size: 0.75rem;
  margin: 0.2rem 0;
  color: ${tm((t) => t.colors.secondaryTextColor)};
`
export const Amount = styled.p`
  font-size: 0.875rem;
  margin: 0.2rem 0;
`
export const Numbers = styled.div``
export const Status = styled.span<{
  color: string
}>`
  background-color: ${(props) => props.color ?? '#ffe47a'};
  border-radius: 0 0 8px 8px;
  font-size: 0.6rem;
  position: absolute;
  top: 0;
  right: 0.5rem;
  margin: 0 !important;
  padding: 4px 8px;
  min-width: 3rem;
  text-align: center;
  text-transform: capitalize;
`
