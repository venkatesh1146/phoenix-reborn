import { styled } from '@linaria/react'

export const Divider = styled.div`
  border: 0.2px solid #e6e6e6;
  height: 0;
  margin: 2rem 0 2.62rem 0;
`
export const SubText = styled.p`
  font-family: 'Maven Pro';
  font-size: 0.9rem;
  text-align: center;
  color: #ffffff;
`
export const Text = styled.p`
  font-family: 'Marcellus';
  font-size: 1.5rem;
  line-height: 30px;
  text-align: center;
  color: #ffffff;
  margin: 0;
`
export const Wrapper = styled.div`
  height: 100%;
  width: 100vw;
  background: #1e1730;
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
`
