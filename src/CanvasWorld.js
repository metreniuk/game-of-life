import React, { Component, createRef } from "react"
import { createPortal } from "react-dom"
import styled from "styled-components"
import { makePainter, makeRandomWorld } from "./modules/game-of-life"
import throttle from "lodash.throttle"

let Canvas = styled.canvas`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  opacity: 0.1;
`

class Modal extends React.Component {
  constructor(props) {
    super(props)
    this.el = document.createElement("div")
    document.getElementById("root").appendChild(this.el)
  }

  render() {
    return createPortal(this.props.children, this.el)
  }
}

// TODO clear animation on resize
// TODO Move the scripting to a web worker???
class CanvasWorld extends Component {
  constructor() {
    super()

    this.canvas = createRef()
    this.width = window.innerWidth
    this.height = window.innerHeight
    this.stopTimer = null
    this.paint = throttle(this.paint.bind(this), 2000)
    // this.handleResize = this.handleResize.bind(this)
  }

  componentDidMount() {
    this.paint()

    // window.addEventListener("resize", this.handleResize)
  }

  // componentWillUnmount() {
  //   window.removeEventListener("resize", this.handleResize)
  // }

  paint() {
    if (this.canvas.current) {
      let { innerWidth, innerHeight } = window
      let cellSize = 10
      let width = Math.round(innerWidth / cellSize)
      let height = Math.round(innerHeight / cellSize)
      let world = makeRandomWorld(width, height)

      const { paint } = makePainter(this.canvas.current)
      this.stopTimer = paint(world, cellSize, 500)
    }
  }

  // handleResize() {
  //   if (this.stopTimer) {
  //     this.stopTimer()
  //   }

  //   this.paint()
  // }

  render() {
    return (
      <Modal>
        <Canvas
          innerRef={this.canvas}
          width={this.width}
          height={this.height}
        />
      </Modal>
    )
  }
}

export { CanvasWorld }
