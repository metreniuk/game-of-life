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

export let HorizontalCenter = styled.div`
  display: flex;
  justify-content: ${props => props.justify || "center"};
`

export let Finger = styled.span`
  position: relative;
  top: 5px;
  font-size: 28px;
`
