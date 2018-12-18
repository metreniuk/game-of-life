import React, { Component } from "react"
import { Grid } from "./Grid"
import { makeWorld, mapWorld, worldNextState } from "./modules/game-of-life"

const toggle = cell => (cell ? 0 : 1)

class Table extends Component {
  static defaultProps = {
    rows: 8,
    cols: 8,
  }

  state = { world: makeWorld(this.props.rows, this.props.cols) }

  setWorld = fn => this.setState(({ world }) => ({ world: fn(world) }))

  toggleCell = ({ x, y }) =>
    this.setWorld(world =>
      mapWorld(
        (row, col, cell) => (row === x && col === y ? toggle(cell) : cell),
        world
      )
    )

  nextGeneration = () => this.setWorld(world => worldNextState(world))

  interval = null
  clearInterval = () => {
    if (this.interval) {
      window.clearInterval(this.interval)
    }
  }

  play = () => {
    this.clearInterval()
    this.interval = setInterval(this.nextGeneration, 700)
  }

  reset = () => {
    const { rows, cols } = this.props
    this.setWorld(() => makeWorld(rows, cols))
    this.clearInterval()
  }

  handleCellClick = cell => {
    this.toggleCell(cell)
    this.clearInterval()
  }

  render() {
    const { world } = this.state
    const { cellSize } = this.props

    return (
      <div>
        <Grid world={world} size={cellSize} onClick={this.handleCellClick} />
        <button onClick={this.nextGeneration}>next generation</button>
        <button onClick={this.play}>play</button>
        <button onClick={this.reset}>reset</button>
      </div>
    )
  }
}

export { Table }
