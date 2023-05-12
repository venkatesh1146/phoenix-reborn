import FundSwitchCard from '../FundSwitchCard'

import { Container, Illustration, Title } from './Main.styles'

export type Props = {
  title: string
  description: string
}

export function Main({ title, description }: Props) {
  return (
    <Container>
      <FundSwitchCard
        data={{
          from: {
            fundName: 'Nippon Growth Fund',
            units: 52.3,
            amount: 50000,
            logoUrl: 'https://i.wlycdn.com/bank-logos/kotak-mahindra-bank.png',
          },
          to: {
            fundName: 'Axis Blue Chip Fund',
            units: 52.3,
            amount: 50000,
            logoUrl: 'https://i.wlycdn.com/credit_card/axis-bank-png.png',
          },
        }}
      />
    </Container>
  )
}
