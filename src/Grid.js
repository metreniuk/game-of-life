import React from "react"
import styled from "styled-components"
import { Cell } from "./Cell"
import { worldNextState, mapWorld } from "./modules/game-of-life"

let Wrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
`

let noop = () => {}

export class NextWorld extends React.Component {
  state = { showNext: false }

  render() {
    const { world, children } = this.props

    return children({
      world: this.state.showNext ? worldNextState(world) : world,
      onMouseEnter: () => this.setState({ showNext: true }),
      onMouseLeave: () => this.setState({ showNext: false }),
    })
  }
}

export class LivingWorld extends React.Component {
  static defaultProps = {
    speed: 500,
    restartIn: null,
  }
  state = { world: this.props.world }
  timerId = null
  restartInTimer = null

  next = () => this.setState(({ world }) => ({ world: worldNextState(world) }))

  componentDidMount() {
    const { speed, restartIn, world } = this.props
    this.timerId = setInterval(this.next, speed)

    if (restartIn) {
      this.restartInTimer = setInterval(() => {
        this.setState({ world }, () => {
          clearInterval(this.timerId)
          this.timerId = setInterval(this.next, speed)
        })
      }, restartIn)
    }
  }

  componentWillUnmount() {
    clearInterval(this.timerId)
    clearInterval(this.restartInTimer)
  }

  render() {
    const { children } = this.props
    const { world } = this.state

    return children({ world })
  }
}

export class Grid extends React.PureComponent {
  static defaultProps = {
    specialCells: [],
  }
  state = {
    showNext: false,
  }

  render() {
    const {
      world,
      size,
      specialCells,
      willDie = false,
      cellHandlers,
      ...rest
    } = this.props

    return (
      <Wrapper {...rest}>
        {world.map((row, x) => (
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
                  {...cellHandlers && cellHandlers[x][y]}
                />
              )
            })}
          </div>
        ))}
      </Wrapper>
    )
  }
}
