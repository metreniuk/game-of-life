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
    const {
      world,
      size,
      specialCells = [],
      willDie = false,
      onClick = noop,
    } = this.props

    const currentWorld = this.state.showNext ? worldNextState(world) : world

    return (
      <Wrapper
        onMouseEnter={() => this.setState({ showNext: true })}
        onMouseLeave={() => this.setState({ showNext: false })}
      >
        {currentWorld.map((row, x) => (
          <div key={x}>
            {row.map((alive, y) => {
              const special = specialCells.some(
                specialCell => x === specialCell[0] && y === specialCell[1]
              )

              return (
                <Cell
                  alive={alive}
                  key={y}
                  size={size}
                  special={special}
                  willDie={willDie}
                  onClick={() => onClick({ x, y })}
                />
              )
            })}
          </div>
        ))}
      </Wrapper>
    )
  }
}
