import { styled } from '@linaria/react'

const primaryColor = '#6725f4'
const primaryDenseColor = '#571fd1'
const secondaryColor = '#fbf9ff'
const secondaryTextColor = '#7e7e7e'

export const DefaultButton = styled.button<{
  full_width?: boolean
  primary?: boolean
}>`
  background-color: ${(props) =>
    props.primary ? `${primaryColor}` : '#FBF9FF'};
  font-size: 0.8rem;
  line-height: 1.25rem;
  border: 0;
  border-radius: 0.5rem;
  width: ${(props) => (props.full_width ? '100%' : 'inherit')};
  padding: 0.5rem 1rem;
  cursor: pointer;
  &:active {
    background-color: #e1dfe6;
  }
  &[disabled] {
    background-color: #c8c6cc !important;
    color: #ffffff !important;
    opacity: 0.7;
    cursor: not-allowed;
  }
`

export const PrimaryButton = styled(DefaultButton)`
  background-color: ${primaryColor};
  color: #fff;
  font-family: 'Maven Pro';
`

export const DefaultBlockButton = styled(DefaultButton)`
  border-radius: 50px;
  font-size: 1rem;
  height: 60px;
  width: 100%;
`

export const FooterButton = styled(PrimaryButton)`
  background-color: ${(props) =>
    props.primary ? `${primaryColor}` : `${secondaryColor}`};
  color: ${(props) =>
    props.primary ? `${secondaryColor}` : `${primaryColor}`};
  border-radius: 50px;
  font-size: 1rem;
  height: 60px;
  position: fixed;
  bottom: 24px;
  width: calc(100% - 48px);
  font-family: 'Maven Pro';
  font-weight: 500;
  ::after {
    color: ${(props) =>
      props.primary ? `${secondaryColor}` : `${primaryColor}`};
  }
  &[disabled] {
    color: ${secondaryTextColor};
    &::after {
      color: ${secondaryTextColor};
    }
  }
  z-index: 1;
`

export const RoundButton = styled(PrimaryButton)`
  color: #6725f4;
  border: 1px solid #6725f4;
  font-size: 0.85rem;
  font-weight: 400;
  text-align: center;
  background-color: #fff;
  padding: 8px 16px;
  border-radius: 24px;
  height: 32px;
  line-height: 1;
  &[disabled] {
    border: 1px solid grey;
    color: lightgrey !important;
  }
`
export const OutlinedButton = styled(PrimaryButton)`
  background-color: transparent;
  border: 1px solid ${primaryColor};
  color: ${primaryColor};
`
export const TextButton = styled(OutlinedButton)`
  border: none;
`

export const DefaultActionButton = styled.button<{ src: string }>`
  width: 56px;
  height: 56px;
  /* background: url('${(props) => props.src}') no-repeat center; */
  background-color: #fff;
  border-radius: 50%;
  border: 0;
  &[disabled] {
    background-color: #c6bed5 !important;
  }
`

export const DefaultSecondaryActionButton = styled(DefaultActionButton)`
  background-color: #333;
`

export const DefaultPrimaryActionButton = styled(DefaultActionButton)`
  background-color: ${primaryColor};
  flex-shrink: 0;
  &:active {
    background-color: ${primaryDenseColor};
  }
`

export const ShareButton = styled(DefaultSecondaryActionButton)`
  position: fixed;
  right: 30px;
  bottom: 48px;
`

export const CompareButton = styled(ShareButton)`
  border-radius: 50px;
  width: auto;
  padding: 16px;
  font-family: Lato;
  font-weight: 700;
  font-size: 1rem;
  z-index: 2;
  color: #fff !important;
  @media screen and (min-width: 1024px) {
    right: 232px;
  }
  display: flex;
  align-items: center;
  justify-content: center;
`
