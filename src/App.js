import React from "react"
import { injectGlobal } from "styled-components"
import { Grid } from "./Grid"

injectGlobal`
	@font-face {
	  font-family: 'Xkcd';
	  src: url('./xkcd.otf');
  }
  
  * {
    font-family: "Xkcd", sans-serif;
    color: #006ec8;
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

function App() {
  return (
    <div>
      <Grid />
    </div>
  )
}

export default App
