import React from "react"
import { injectGlobal } from "styled-components"

injectGlobal`
	@font-face {
	  font-family: 'Xkcd';
	  src: url('./xkcd.otf');
  }

  *:focus{
    outline: none;
  }

  /* slides navigator from the bottom */ 
  button[color="text"] {
    color: #006ec8;
    background-color: #006ec8;
  }
  
`

const Setup = () => null

export { Setup }
