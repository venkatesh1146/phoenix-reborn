import Dialog from 'rc-dialog'
import { useState } from 'react'

import ProgressCircle from '../ProgressCircle'
import DoneBadge from '../ProgressCircle/DoneBadge'

import { Container } from './Main.styles'
export function Main() {
  const [open, setOpen] = useState(false)
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
      <Dialog
        visible={open}
        title="Verify details"
        onClose={() => setOpen(false)}
      >
        <p>
          Artificial Intelligence (AI) refers to the simulation of human
          intelligence in machines that are programmed to think and learn like
          humans. It encompasses a range of technologies and techniques aimed at
          enabling computers to perform tasks that traditionally require human
          intelligence. AI utilizes algorithms, data, and computational power to
          process information, recognize patterns, make decisions, and solve
          complex problems. It has found applications in various fields,
          including healthcare, finance, transportation, and entertainment. AI
          has the potential to revolutionize industries, improve efficiency, and
          enhance decision-making. However, ethical considerations, privacy
          concerns, and the need for human oversight remain important factors to
          ensure the responsible and beneficial development and deployment of AI
          technologies.
        </p>
      </Dialog>
      <button
        onClick={() => {
          setOpen(!open)
        }}
      >
        click
      </button>
    </Container>
  )
}
