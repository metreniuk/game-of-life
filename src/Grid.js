import React from "react"
import styled from "styled-components"
import { Cell } from "./Cell"

let Wrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
`

export const Grid = () => (
  <Wrapper>
    {Array(10)
      .fill()
      .map((_, i) => (
        <Cell key={i} />
      ))}
  </Wrapper>
)
