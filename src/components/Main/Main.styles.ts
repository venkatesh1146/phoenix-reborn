import { styled } from '@linaria/react'

export const Container = styled.main`
  align-items: center;
  display: flex;
  flex-direction: column;
  height: 100%;
  justify-content: center;
  padding: 4rem;
  text-align: center;
  background: #f9f9f9;
`

export const Title = styled.h1`
  font-size: 2.5rem;
  text-transform: capitalize;
`

export const Description = styled.h2`
  font-size: 2rem;
`

export const Illustration = styled.img`
  width: min(40rem, 100%);
`
