import { css } from '@linaria/core'

import { theme } from '.'
export const globals = css`
  :global() {
    html {
      box-sizing: border-box;
    }

     html,
    body,
    #__next {
      height: 100%;
    }

    input,
    button,
    textarea,
    select {
      font: inherit;
    }
  }

    *,
    *:before,
    *:after {
      box-sizing: inherit;
    }

    @font-face {
      font-family: 'Maven Pro';
      src: url('https://i.wlycdn.com/wealthy-fonts/Maven-pro.ttf')
        format('truetype');
    }
  }
`
