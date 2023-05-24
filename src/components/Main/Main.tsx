import { Container } from './Main.styles'

export type Props = {
  title: string
  description: string
}

export function Main(p: Props) {
  return <Container>Welcome to Client Web App</Container>
}
