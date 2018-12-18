import React from "react"
import styled from "styled-components"
import { CanvasWorld } from "./CanvasWorld"

let Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 500px;
`

let Heading = styled.h2`
  font-size: 122px;
  margin: 0;
  line-height: 1;
`

let Game = styled(Heading)``

let Of = styled(Heading)``

let Life = styled(Heading)``

let Button = styled.a`
  margin-top: 80px;
  align-self: center;
  width: 200px;
  font-size: 32px;
  padding-bottom: 6px;
  border-radius: 4px;
  cursor: pointer;
  text-decoration: none;
`

let Caption = styled.p`
  font-size: 24px;
  margin-top: 60px;
`

let Intro = () => (
  <React.Fragment>
    <CanvasWorld />
    <Content>
      <Game>Game</Game>
      <Of>of</Of>
      <Life>Life</Life>
      {/* <Button href="/#1">Play</Button> */}
      <Caption>(use left/right arrows to navigate)</Caption>
    </Content>
  </React.Fragment>
)

export default Intro
