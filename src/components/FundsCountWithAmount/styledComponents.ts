import { styled } from '@linaria/react'

import { tm } from '~/styles/theme'

export const Heading = styled.div`
  margin-left: 1.25rem;
`
export const SubText = styled.p`
  color: #a69ebc;
  font-size: 0.8rem;
  opacity: 0.6;
  margin: 0;
`
export const NameSection = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  border-bottom: 0.2px solid #00000074;
  padding: 1.2rem;
`
export const Wrapper = styled.div`
  background: ${tm((t) => t.colors.secondaryBgColor)};
  color: #fff;
  border-radius: 0.5rem;
  font-family: 'Maven Pro';
  font-size: 1rem;
`
export const Text = styled.p`
  color: #e6e6e6;
  font-size: 1rem;
  font-weight: 600;
  margin: 0;
`
export const Amount = styled.p`
  border-radius: 0.25rem;
  text-align: center;
  padding: 0.8rem 0;
  font-size: 1.2rem;
  font-weight: 500;
  margin: 0;
  color: ${tm((t) => t.colors.white)};
  mix-blend-mode: normal;
`
export const SubSection = styled.div`
  padding: 1rem;
  color: #e6e6e6;
  display: flex;
  justify-content: space-between;
`
export const TotalTxt = styled.p`
  text-align: center;
  margin: 0;
  font-family: 'Maven Pro';
  font-size: 0.8rem;
  text-align: right;
`
export const NumbersContainer = styled.div``
