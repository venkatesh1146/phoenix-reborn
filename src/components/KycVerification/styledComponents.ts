import { styled } from '@linaria/react'

import { tm } from '~/styles/theme'

export const KycLink = styled.a`
  font-family: 'Maven Pro';
  font-weight: 500;
  font-size: 0.75rem;
  color: #6725f4;
  margin-top: -4px;
  text-decoration: none;
`

export const DoneStatus = styled.div`
  color: #14b195;
  font-family: 'Maven Pro';
  font-weight: 500;
  font-size: 0.75rem;
  line-height: 14px;
  text-align: center;
  height: max-content;
  display: flex;
  flex-shrink: 0;
  margin-left: auto;
  align-items: center;
`

export const SubTxt = styled.p`
  font-family: 'Maven Pro';
  font-size: 0.75rem;
  color: ${tm((t) => t.colors.secondaryTextColor)};
  margin: 8px 0;
`
export const Details = styled.div`
  flex-grow: 1;
`
export const PanNo = styled.p`
  font-family: 'Maven Pro';
  font-weight: 500;
  font-size: 0.75rem;
  color: #000000;
  margin: 0;
`
export const KycCard = styled.div`
  background: ${tm((t) => t.colors.white)};
  border-radius: 4px;
  display: flex;
  padding: 1.25rem;
  margin: 1rem 0;
  .profile-icon {
    margin-right: 0.75rem;
  }
`

export const HeadText = styled.p`
  font-family: 'Maven Pro';
  font-size: 1rem;
  line-height: 14px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  color: ${tm((t) => t.colors.secondaryTextColor)};
  margin: 0;
  margin-bottom: 1rem;
  @media screen and (min-width: 1024px) {
    font-family: 'Marcellus';
    color: ${tm((t) => t.colors.primaryTextColor)};
  }
`
export const KycStatus = styled.div`
  background: ${tm((t) => t.colors.lightBgColor)};
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  padding: 1.5rem 1.25rem;
  .kyc-completion {
    margin-top: 2rem;
  }
  @media screen and (min-width: 1024px) {
    flex-grow: 1;
  }
`
export const Wrapper = styled.div`
  height: 100vh;
  font-family: 'Maven Pro';
  display: flex;
  flex-direction: column;
  padding-bottom: 4rem;
  overflow: auto;
  @media screen and (min-width: 1024px) {
    padding: 0;
    flex-direction: row;
    .desktop-right-container {
      display: flex;
      flex-direction: column;
    }
  }
`

export const HeaderSection = styled.div`
  padding: 1.25rem;
  background: ${tm((t) => t.colors.primaryBgColor)};
  color: #fff;
`
export const Body = styled.div`
  flex-grow: 1;
`
export const PageHeading = styled.p`
  font-family: 'Maven Pro';
  font-weight: 500;
  font-size: 1.25rem;
  line-height: 21px;

  color: ${tm((t) => t.colors.white)};
  @media screen and (min-width: 1024px) {
    font-family: 'Marcellus';
    margin-top: 3rem;
  }
`
export const Text = styled.p`
  font-family: 'Maven Pro';
  font-size: 1rem;
  margin-bottom: 32px;
  .bold {
    font-weight: 500;
  }
`
export const Divider = styled.div`
  height: 0;
  border: 0.6px dashed ${tm((t) => t.colors.secondaryTextColor)};
  margin-top: 1.25rem;
`
