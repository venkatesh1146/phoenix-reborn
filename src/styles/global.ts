import { GlobalStyleComponent, createGlobalStyle, css } from 'styled-components'

import { theme } from '.'

export const GlobalStyles: any = createGlobalStyle`

  ${() => css`
    * {
      margin: 0;
      outline: 0;
      padding: 0;
      -webkit-font-smoothing: antialiased;
      -moz-osx-font-smoothing: grayscale;
    }

    *,
    *::before,
    *::after {
      box-sizing: border-box;
    }

    html {
      font-size: 62.5%;
      min-width: 320px;
    }

    body {
      font-family: ${theme.font.family};
      font-size: ${theme.font.sizes.medium};
      scroll-behavior: smooth;
      line-height: 1.2;
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
  `};


 @font-face {
    font-family: 'Maven-Pro';
    font-style: normal;
    font-weight: 600;
    src: url("https://i.wlycdn.com/wealthy-fonts/Maven-pro.ttf") format('woff');
  }

  @font-face {
    font-family:'MavenPro';
    src: url("https://i.wlycdn.com/wealthy-home-page/mavenPro-regular.woff") format("truetype");
}

  :root {
    --cobalt: #193076;
    --cerise: #F21976;
    --white: #FFFFFF;
    --concrete: #F3F3F3;
    --gallery: #EAEAEA;
    --pale-white: #eff1f7;
    --dove-gray: #666666;
    --gray: #4A4A4A;
    --light-gray: #737373;
    --lighter-gray: #9b9b9b;
    --box-shadow: 0 8px 20px 0 rgba(0, 0, 0, 0.1);
    --card-radius: 0.25em;
    --primary-color: var(--cobalt);
    --secondary-color: var(--cerise);
    --primary-font: 'MavenPro';
    --bounce-easing: 0.2s all cubic-bezier(0.23, 1, 0.320, 1);
    --modal-blue: #0057e7;
    --light-blue: #4d90fe;
    --debt: #02c3ff;
    --equity: #8c5ad4;
  }

  html,
  body {
    height: 100%;
    width: 100%;
    margin: 0;
  }

  body {
    font-family: var(--primary-font), Helvetica, Arial, sans-serif;
    background: var(--pale-white);
  }

  @media only screen
    and (min-device-width : 320px)
    and (max-device-width : 375px)
    and (orientation : portrait) {
      body {
        font-size: 12px;
      }
    }

  @media only screen
    and (min-device-width : 376px)
    and (max-device-width : 410px)
    and (orientation : portrait) {
      body {
        font-size: 14px;
      }
    }    
`
