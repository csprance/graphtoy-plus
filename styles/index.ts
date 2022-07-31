import { createGlobalStyle } from 'styled-components';

export const linkColor = '#ffb010';
export const inputBg = '#202020';
export const inputBgDisabled = '#545454';
export const ctrlColor = '#606060';
export const ctrlColorHover = '#b08010';
export const red = '#ec0909';
export const green = '#2cd863';
export const blue = '#1dadef';
export const mainBgColor = '#202020';
export const guiBgColor = '#404040';
export const fontColor = '#fff';

export const GlobalStyles = createGlobalStyle`
  :root {
    --ctrlColor: #606060;
    --ctrlColorHover: #b08010;
  }
  
  .sr-only {
    position:absolute;
    left:-10000px;
    top:auto;
    width:1px;
    height:1px;
    overflow:hidden;
  }

  body {
    color: #ffffff;
    font-family: verdana, tahoma, serif;
    font-size: 15px;
    background-color: #202020;
    margin: 0;
    border: 0;
    padding: 5px 24px 24px;
  }

  h1 {
    display: inline;
  }

  .ml {
    display: inline;
  }

  .ms {
    display: none;
  }

  div#formulaButtonBar {
    width: 100%;
    display: flex;
    padding-bottom: 24px;
  }

  div#formulaParamBar {
    width: 100%;
    display: flex;
    align-items: center;
    padding-top: 8px;
  }

  .uiFuncPanel {
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-start;
    align-items: flex-start;
    align-content: flex-start;

    row-gap: 12px;
    column-gap: 12px;
  }

  .uiFuncGrid {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    align-items: start;
  }

  .uiFunc,
  .uiFuncB {
    box-sizing: border-box;
    margin: 3px;
    border-color: #000000;
    border-radius: 6px;
    color: #ffffff;
    padding-top: 6px;
    cursor: pointer;
    text-align: center;
    height: 32px;
    background-color: var(--ctrlColor);
    user-select: none;
  }

  .uiFunc {
    width: 88px;
  }

  .uiFuncB {
    grid-column: auto/span 2;
  }

  .uiFunc:hover,
  .uiFuncB:hover {
    background-color: var(--ctrlColorHover);
  }

  .parts {
    display: grid;
    grid-template-columns: 1fr 1fr;
    padding-top: 16px;
    column-gap: 16px;
  }

  .part {
    box-sizing: border-box;
  }

  .guiWindow {
    background-color: #404040;
    padding: 8px;
    border-radius: 6px;
  }

  td {
    padding: 0;
    border: 0;
  }

  a {
    text-decoration: none;
    color: #ffb010;
  }

  a:hover {
    color: #ffffff;
  }

  .userInput {
    background-color: #202020;
    color: #ffffff;
    padding: 4px;
    font-size: 15px;
    border-radius: 6px;
  }

  .formVis {
    flex-shrink: 0;
    cursor: pointer;
    color: #808080;
  }

  .formVisDar1 {
    color: #ffc040;
  }

  .formVisDar2 {
    color: #ffffa0;
  }

  .formVisDar3 {
    color: #a0ffc0;
  }

  .formVisDar4 {
    color: #40c0ff;
  }

  .formVisDar5 {
    color: #d0a0ff;
  }

  .formVisDar6 {
    color: #ff80b0;
  }

  .userInputButtonsBig,
  .userInputButtonsMedium,
  .userInputButtonsSmall {
    background-color: var(--ctrlColor);
    border-color: #000000;
    color: #ffffff;
    padding: 2px 1px 2px 1px;
    cursor: pointer;
    text-align: center;
    border-radius: 6px;
    user-select: none;
  }

  .userInputButtonsBig {
    min-width: 76px;
  }

  .userInputButtonsMedium {
    min-width: 32px;
  }

  .userInputButtonsSmall {
    min-width: 48px;
  }

  .userInputButtonsBig:hover,
  .userInputButtonsMedium:hover,
  .userInputButtonsSmall:hover {
    background-color: var(--ctrlColorHover);
  }

  @media only screen and (max-width: 1024px) {
    body {
      padding: 0;
    }

    .parts {
      display: grid;
      grid-template-columns: 1fr;
      padding-top: 0;
      column-gap: 0;
    }

    .part {
      box-sizing: border-box;
      padding-bottom: 16px;
    }

    .ml {
      display: none;
    }

    .ms {
      display: inline;
    }

    div#formulaButtonBar {
      padding-bottom: 12px;
    }

    .uiFuncGrid {
      grid-template-columns: 1fr 1fr 1fr;
      width: 100%;
    }

    .uiFunc {
      width: auto;
      justify-self: stretch;
    }

    .guiWindow {
      border-radius: 0;
    }
  }
`;
export const PrismA11lyTheme = createGlobalStyle`
  /**
 * a11y-dark theme for JavaScript, CSS, and HTML
 * Based on the okaidia theme: https://github.com/PrismJS/prism/blob/gh-pages/themes/prism-okaidia.css
 * @author ericwbailey
 */

  code[class*="language-"],
  pre[class*="language-"] {
    color: #f8f8f2;
    background: none;
    font-family: Consolas, Monaco, 'Andale Mono', 'Ubuntu Mono', monospace;
    text-align: left;
    white-space: pre;
    word-spacing: normal;
    word-break: normal;
    word-wrap: normal;
    line-height: 1.5;

    -moz-tab-size: 4;
    -o-tab-size: 4;
    tab-size: 4;

    -webkit-hyphens: none;
    -moz-hyphens: none;
    -ms-hyphens: none;
    hyphens: none;
  }

  /* Code blocks */
  pre[class*="language-"] {
    padding: 1em;
    margin: 0.5em 0;
    overflow: auto;
    border-radius: 0.3em;
  }

  :not(pre) > code[class*="language-"],
  pre[class*="language-"] {
    background: #2b2b2b;
  }

  /* Inline code */
  :not(pre) > code[class*="language-"] {
    padding: 0.1em;
    border-radius: 0.3em;
    white-space: normal;
  }

  .token.comment,
  .token.prolog,
  .token.doctype,
  .token.cdata {
    color: #d4d0ab;
  }

  .token.punctuation {
    color: #fefefe;
  }

  .token.property,
  .token.tag,
  .token.constant,
  .token.symbol,
  .token.deleted {
    color: #ffa07a;
  }

  .token.boolean,
  .token.number {
    color: #00e0e0;
  }

  .token.selector,
  .token.attr-name,
  .token.string,
  .token.char,
  .token.builtin,
  .token.inserted {
    color: #abe338;
  }

  .token.operator,
  .token.entity,
  .token.url,
  .language-css .token.string,
  .style .token.string,
  .token.variable {
    color: #da60c3;
  }

  .token.atrule,
  .token.attr-value,
  .token.function {
    color: #ffd700;
  }

  .token.keyword {
    color: #00e0e0;
  }

  .token.regex,
  .token.important {
    color: #ffd700;
  }

  .token.important,
  .token.bold {
    font-weight: bold;
  }

  .token.italic {
    font-style: italic;
  }

  .token.entity {
    cursor: help;
  }

  @media screen and (-ms-high-contrast: active) {
    code[class*="language-"],
    pre[class*="language-"] {
      color: windowText;
      background: window;
    }

    :not(pre) > code[class*="language-"],
    pre[class*="language-"] {
      background: window;
    }

    .token.important {
      background: highlight;
      color: window;
      font-weight: normal;
    }

    .token.atrule,
    .token.attr-value,
    .token.function,
    .token.keyword,
    .token.operator,
    .token.selector {
      font-weight: bold;
    }

    .token.attr-value,
    .token.comment,
    .token.doctype,
    .token.function,
    .token.keyword,
    .token.operator,
    .token.property,
    .token.string {
      color: highlight;
    }

    .token.attr-value,
    .token.url {
      font-weight: normal;
    }
  }
`;
