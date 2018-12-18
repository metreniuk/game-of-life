import { injectGlobal } from "styled-components"

injectGlobal`
  *:focus{
    outline: none;
  }

  a:visited {
    color: #006ec8;
  }

  /* slides navigator from the bottom */ 
  button[color="text"] {
    color: #006ec8;
    background-color: #006ec8;
  }
  
`

const Setup = () => null

export { Setup }
