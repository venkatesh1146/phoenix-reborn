import { styled } from '@linaria/react'

export const Wrapper = styled.div`
  display: flex;
  padding: 1.5rem;
  justify-content: space-between;
  align-items: center;
  position: fixed;
  width: 100vw;
  bottom: 0;
  left: 0;
  box-sizing: border-box;
  background: linear-gradient(
    0deg,
    #faf7ff 85.11%,
    rgba(250, 247, 255, 0) 100%
  );
  .cta-button {
    flex-grow: 1;
    border-radius: 2rem;
    min-height: 3.25rem;
    font-weight: 500;
  }
`
export const CallIconContainer = styled.a`
  width: 2.9rem;
  border: 1px solid #6725f4;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 2.9rem;
  margin-right: 1rem;
`
