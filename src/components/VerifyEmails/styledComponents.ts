import { styled } from '@linaria/react'

import { tm } from '~/styles/theme'

export const PageHeading = styled.p`
  font-family: 'Marcellus';
  font-weight: 500;
  font-size: 1.25rem;
  line-height: 21px;

  color: ${tm((t) => t.colors.white)};
`
export const Emails = styled.div`
  margin-bottom: 6rem;

  @media screen and (min-width: 1024px) {
    .email-wrapper {
      margin: 0.5rem !important;
      min-width: 18rem;
      flex-grow: 1;
    }
  }
  .email-wrapper {
    margin: 1rem 0;
  }
`
export const Heading = styled.div`
  font-family: 'DM Serif Display';
  font-weight: 500;
  font-size: 1.25rem;
  margin-bottom: 1.25rem;
  display: flex;
  align-items: center;
  .progress-circle-wrapper {
    flex-shrink: 0;
    margin-left: 0.5rem;
  }
  @media screen and (min-width: 1024px) {
    font-family: 'Marcellus';
    display: flex;
    justify-content: space-between;
    align-self: center;
  } ;
`
export const HeaderSection = styled.div`
  padding: 1.25rem;
  background: ${tm((t) => t.colors.primaryBgColor)};
  color: #fff;
`
export const EmailsSection = styled.div`
  background: ${tm((t) => t.colors.lightBgColor)};
  padding: 2rem 1.25rem;
  flex-grow: 1;
  @media screen and (min-width: 1024px) {
    padding: 0;
    margin: auto;
  }
`

export const Wrapper = styled.div`
  background-color: ${tm((t) => t.colors.white)};
  height: 100vh;
  width: 100vw;
  box-sizing: border-box;
  font-family: 'Maven Pro';
  display: flex;
  flex-direction: column;

  .footer-btn {
    @media screen and (max-width: 780px) {
      max-width: 300px;
      transform: translate(-50%);
      left: 50%;
    }
  }
  @media screen and (min-width: 1024px) {
    flex-direction: row;
  }
  .desktop-right-section {
    background: ${tm((t) => t.colors.lightBgColor)};
    display: flex;
    flex-direction: column;
    .emails-section {
      flex-grow: 1;
    }
  }
  .mf-desktop-left-section-wrapper {
    color: ${tm((t) => t.colors.white)};
  }
`

export const Body = styled.div`
  flex-grow: 1;
`
export const Text = styled.p`
  font-family: 'Maven Pro';
  font-size: 1rem;
  margin-bottom: 32px;
  .bold {
    font-weight: 500;
  }
`

export const EmailAndButton = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
`

export const EmailText = styled.p`
  font-size: 0.875rem;
`

export const EmailWrapper = styled.div<{ isExpanded: boolean }>`
  background: ${tm((t) => t.colors.white)};
  border-radius: 4px;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0.75rem 1.25rem;
  height: ${(props) => (props.isExpanded ? '12.25rem' : '4rem')};
  transition: height 0.1s cubic-bezier(0.89, -0.11, 1, 1);
  .otp-input-component {
    max-width: 60px;
  }
`
export const EmailTxt = styled.p`
  margin-right: auto;
  font-family: 'Maven Pro';
  font-style: normal;
  font-weight: 500;
  font-size: 0.875rem;
  line-height: 16px;

  color: #000000;
`
