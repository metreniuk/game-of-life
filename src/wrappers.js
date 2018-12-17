import React from "react"
import { Box } from "rebass"
import styled from "styled-components"

export let TextWrapper = props => <Box width={800} bg="white" {...props} />

export let CanvasWrapper = styled.div`
  position: relative;
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`
