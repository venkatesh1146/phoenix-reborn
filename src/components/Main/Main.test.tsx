import { render, screen } from '~/utils/tests'

import { Main } from '.'

const props = {
  title: 'NextJS Boilerplate',
  description:
    'NextJS, ReactJS, TypeScript, Styled-Components, Storybook, Jest and Testing-Library',
}

describe('<Main />', () => {
  it('renders the heading', () => {
    const { container } = render(<Main {...props} />)
    //TODO: add tests
  })
})
