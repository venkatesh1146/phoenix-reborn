import ProgressCircle from '../ProgressCircle'
import DoneBadge from '../ProgressCircle/DoneBadge'

import { Container } from './Main.styles'
export function Main() {
  return (
    <Container>
      <ProgressCircle
        size={64}
        progress={50}
        indicatorWidth={10}
        indicatorCap={'square'}
        spinnerMode={true}
        variant={'textOnRight'}
      />
      <DoneBadge />
    </Container>
  )
}
