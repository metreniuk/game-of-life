import React, { Component, Fragment } from "react"
import { Grid } from "./Grid"
import { makeWorld, mapWorld, worldNextState } from "./modules/game-of-life"

const toggle = cell => (cell ? 0 : 1)
const alive = () => 1

const handlersWithCell = ({ x, y }, cellHandlers) =>
  Object.entries(cellHandlers).reduce(
    (fns, [key, fn]) => ({
      ...fns,
      [key]: () => fn({ x, y }),
    }),
    {}
  )

// TODO counter of generations (without repetitions)
// TODO slider (with accelerating the speed on edges) for time-traveling
class Table extends Component {
  static modes = {
    default: "default",
    creator: "creator",
  }

  static defaultProps = {
    rows: 8,
    cols: 8,
    speed: 500,
    mode: "default",
  }

  handleCellMouseDown = cell => {
    this.setState({ isDrawing: true })
    this.toggleCell(cell)
    this.clearInterval()
  }

  handleCellMouseUp = cell => {
    this.setState({ isDrawing: false })
  }

  handleCellMouseEnter = cell => {
    if (this.state.isDrawing) {
      this.riseCell(cell)
    }
  }

  state = {
    world: makeWorld(this.props.rows, this.props.cols),
    isDrawing: false,
    cellHandlers: mapWorld(
      (x, y) =>
        handlersWithCell(
          { x, y },
          {
            onMouseDown: this.handleCellMouseDown,
            onMouseUp: this.handleCellMouseUp,
            onMouseEnter: this.handleCellMouseEnter,
          }
        ),
      makeWorld(this.props.rows, this.props.cols)
    ),
    speed: this.props.speed,
  }

  setWorld = fn => this.setState(({ world }) => ({ world: fn(world) }))

  toggleCell = ({ x, y }) =>
    this.setWorld(world =>
      mapWorld(
        (row, col, cell) => (row === x && col === y ? toggle(cell) : cell),
        world
      )
    )

  riseCell = ({ x, y }) =>
    this.setWorld(world =>
      mapWorld(
        (row, col, cell) => (row === x && col === y ? alive(cell) : cell),
        world
      )
    )

  nextGeneration = () => this.setWorld(world => worldNextState(world))

  interval = null
  clearInterval = () => {
    if (this.interval) {
      window.clearTimeout(this.interval)
    }
  }

  play = () => {
    this.clearInterval()
    this.interval = setTimeout(() => {
      window.requestAnimationFrame(this.nextGeneration)
      this.play()
    }, this.state.speed)
  }

  pause = () => this.clearInterval()

  reset = () => {
    const { rows, cols, speed } = this.props
    this.setWorld(() => makeWorld(rows, cols))
    this.clearInterval()
    this.setState({ speed })
  }

  handleGridLeave = () => this.setState({ isDrawing: false })

  speedFromValue = value => 1100 - value

  valueFromSpeed = speed => 1100 - speed

  handleSpeedChange = e =>
    this.setState({ speed: this.speedFromValue(e.target.value) }, this.play())

  copyWorld = () =>
    navigator.permissions
      .query({ name: "clipboard-write" })
      .then(({ state }) => {
        if (["prompt", "granted"].includes(state)) {
          console.log("clipboard-write persmission is granted")
          return
        }
        throw new Error("permission not granted")
      })
      .then(() =>
        navigator.clipboard.writeText(JSON.stringify(this.state.world))
      )
      .then(() => console.log("Successfully wrote to the clipboard"))
      .catch(err => console.log(`Failed to write to clipboard: ${err}.`))

  pasteWorld = () =>
    navigator.permissions
      .query({ name: "clipboard-read" })
      .then(({ state }) => {
        if (["prompt", "granted"].includes(state)) {
          console.log("clipboard-read persmission is granted")
          return
        }
        throw new Error("permission not granted")
      })
      .then(() => navigator.clipboard.readText())
      .then(JSON.parse)
      .then(world => {
        console.log(world)
        this.setState({ world })
      })
      .catch(err => console.log(`Failed to write to clipboard: ${err}.`))

  render() {
    const { world } = this.state
    const { cellSize, mode } = this.props

    return (
      <div>
        <label>
          speed:{" "}
          <input
            type="range"
            value={this.valueFromSpeed(this.state.speed)}
            min={100}
            max={1000}
            onChange={this.handleSpeedChange}
          />
        </label>
        <Grid
          world={world}
          size={cellSize}
          onMouseLeave={this.handleGridLeave}
          cellHandlers={this.state.cellHandlers}
        />
        {mode === "creator" && (
          <Fragment>
            <button onClick={this.copyWorld}>copy</button>
            <button onClick={this.pasteWorld}>paste</button>
          </Fragment>
        )}
        <button onClick={this.nextGeneration}>next generation</button>
        <button onClick={this.play}>play</button>
        <button onClick={this.pause}>pause</button>
        <button onClick={this.reset}>reset</button>
      </div>
    )
  }
}

export { Table }
