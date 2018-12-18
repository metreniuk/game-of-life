import React from "react"
import styled from "styled-components"
import { Cell } from "./Cell"
import { worldNextState } from "./modules/game-of-life"

let Wrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
`

let noop = () => {}

export class Grid extends React.Component {
  state = { showNext: false }

  render() {
    const { world, size, onClick = noop } = this.props

    const currentWorld = this.state.showNext ? worldNextState(world) : world

    return (
      <Wrapper
        onMouseEnter={() => this.setState({ showNext: true })}
        onMouseLeave={() => this.setState({ showNext: false })}
      >
        {currentWorld.map((row, x) => (
          <div key={x}>
            {row.map((alive, y) => (
              <Cell
                alive={alive}
                key={y}
                size={size}
                onClick={() => onClick({ x, y })}
              />
            ))}
          </div>
        ))}
      </Wrapper>
    )
  }
}
