import React, { Component, createRef } from "react"
import styled from "styled-components"
import throttle from "lodash.throttle"
import { makePainter, makeRandomWorld } from "./modules/game-of-life"

let world = makeRandomWorld(100, 100)

let Canvas = styled.canvas`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: -1;
  opacity: 0.1;
`

class CanvasWorld extends Component {
  constructor() {
    super()

    this.canvas = createRef()
    this.width = window.innerWidth
    this.height = window.innerHeight
    this.stopPainting = null
    // this.handleResize = this.handleResize.bind(this)
  }

  componentDidMount() {
    if (this.canvas.current) {
      const { paint } = makePainter(this.canvas.current)

      this.stopPainting = paint(world, 400)
    }

    window.addEventListener("resize", this.handleResize)
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.handleResize)
  }

  // TODO clear animation on resize
  // handleResize() {
  //   if (this.stopPainting) {
  //     this.stopPainting()
  //   }
  //   console.log("resixe", this.stopPainting)

  //   const { paint } = makePainter(this.canvas.current)

  //   this.stopPainting = paint(world, 200)
  // }

  render() {
    return (
      <Canvas innerRef={this.canvas} width={this.width} height={this.height} />
    )
  }
}

export { CanvasWorld }
