import React from "react"
import styled from "styled-components"
import { CanvasWorld } from "./CanvasWorld"

let Wrapper = styled.div`
  width: 100%;
  height: 100%;
`

let Content = styled.div`
  display: flex;
  flex-direction: column;
  width: 500px;
`

let Heading = styled.h2`
  font-size: 122px;
  margin: 0;
  line-height: 1;
`

let Game = styled(Heading)`
  align-self: flex-start;
`

let Of = styled(Heading)`
  align-self: center;
`

let Life = styled(Heading)`
  align-self: flex-end;
`

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

let Arrow = styled.span`
  position: relative;
  top: 3px;
`

let Intro = () => (
  <Wrapper>
    <CanvasWorld />
    <Content>
      <Game>Game</Game>
      <Of>of</Of>
      <Life>Life</Life>
      <Button href="/#1">
        Play <Arrow>-></Arrow>
      </Button>
    </Content>
  </Wrapper>
)

export default Intro
