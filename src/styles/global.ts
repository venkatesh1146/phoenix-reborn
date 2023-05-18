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
      margin:0;
      padding: 0;
      height:100vh;
      width:100vw;
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
    @font-face {
      font-family: 'Marcellus';
      src: url('https://i.wlycdn.com/articles/Marcellus-regular-font-.ttf')
        format('truetype');
    }
  }
`

export const desktop_container = css`
  @media screen and (min-width: 1024px) {
    max-width: 1000px;
  }
`
