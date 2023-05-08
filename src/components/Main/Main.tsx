import { Container, Illustration, Title } from './Main.styles'

export type Props = {
  title: string
  description: string
}

export function Main({ title, description }: Props) {
  return (
    <Container>
      <Title>{title}</Title>
      <Illustration
        src="https://i.wlycdn.com/wealthy-home-page/wealthy-purple-logo.webp"
        alt="Wealthy"
      />
    </Container>
  )
}
