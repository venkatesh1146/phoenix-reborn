import { styled } from '@linaria/react'

import { tm } from '~/styles/theme'

export const Divider = styled.div`
  border: 0.2px solid #e6e6e6;
  height: 0;
  margin: 2rem 0 2.62rem 0;
`
export const SubText = styled.p`
  font-family: 'Maven Pro';
  font-size: 0.9rem;
  text-align: center;
  color: ${tm((t) => t.colors.white)};
`
export const Text = styled.p`
  font-family: 'Marcellus';
  font-size: 1.5rem;
  line-height: 30px;
  text-align: center;
  color: ${tm((t) => t.colors.white)};
  margin: 0;
`
export const Wrapper = styled.div`
  height: 100%;
  width: 100vw;
  background: ${tm((t) => t.colors.primaryBgColor)};
  padding: 1.25rem;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  .info-text {
    border: none;
  }
  .footer-wrapper {
    background: none;
  }
  .diamond-tick {
    align-self: center;
  }
  @media screen and (min-width: 1024px) {
    flex-direction: row;
  }
`
export const ImageContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  @media screen and (min-width: 1024px) {
    width: 45%;
    margin-right: 2rem;
    border-right: 0.4px dashed ${tm((t) => t.colors.lightBgColor)};
  }
`
export const FundsWrapper = styled.div`
  background: ${tm((t) => t.colors.lightBgColor)};
  @media screen and (min-width: 1024px) {
    flex-grow: 1;
    padding: 0 2rem;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
`
