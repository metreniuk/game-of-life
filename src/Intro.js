import React from "react"
import styled from "styled-components"

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

let Caption = styled.p`
  font-size: 24px;
  margin-top: 60px;
`

let Intro = () => (
  <React.Fragment>
    <Content>
      <Game>Game</Game>
      <Of>of</Of>
      <Life>Life</Life>
      <Caption>{`<- use arrows to navigate ->`}</Caption>
    </Content>
  </React.Fragment>
)

export default Intro
