import styled, { injectGlobal } from 'styled-components';

/* Global Styling */
export function globalStyling() {
    return(
        injectGlobal`
            *, *:before, *:after {
                font-family: Arial, Helvetica, sans-serif;
                padding: 0;
                margin: 0;
                box-sizing: border-box;
                outline: 0;
            }

            *::-ms-clear {
                display: none;
            }

            body {
                background: #E9EBEE;
                -ms-overflow-style: scrollbar !important;
            }

            #root {
                width: 100%;
                display: block;
                margin: auto;
                @media(min-width: 1081px){
                    width: 480px;
                }   
            }

            // Browser Form overwrites
            input, textarea {
                -webkit-appearance: none;
                appearance: none;
            }
            select {
                border-radius: 0;
            }

            textarea {
                resize: none;
            }

            input[type=submit] {
                cursor: pointer;
            }

            /* Mobile Overrides */
            // remove ugly highlight color
            * {
                -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
            }

            html {
                -webkit-font-smoothing: antialiased;
            }

            dl, h1, h2, h3, h4, h5, h6, ol, p, ul {
                margin: 0;
                padding: 0;
            }

            ul, ol {
                list-style: none;
            }

            input, textarea {
                -webkit-appearance: none;
                appearance: none;
            }

            img {
                max-width: 100%;
                height: auto;
            }
        `
    )
};