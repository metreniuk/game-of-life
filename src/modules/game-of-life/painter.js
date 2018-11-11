import { worldNextState } from "./engine"

function makePainter(canvas) {
  let ctx = canvas.getContext("2d"),
    gap = 0,
    cellSize,
    animationId

  return {
    paint,
  }

  function paint(world, frequency = 1000) {
    if (!cellSize) {
      let { innerWidth } = window

      // cellSize = Math.round(innerWidth / world.length)
      cellSize = (innerWidth / world.length).toFixed(1)

      console.log({ cellSize, innerWidth, length: world.length })
    }

    drawWorld(world)

    let nextWorld = worldNextState(world)

    setTimeout(() => {
      animationId = window.requestAnimationFrame(() =>
        paint(nextWorld, frequency)
      )
    }, frequency)

    return () => {
      window.cancelAnimationFrame(animationId)
      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight)
    }
  }

  function drawWorld(world) {
    world.forEach((row, j) => {
      row.forEach((cell, i) => {
        let x = i * cellSize + gap
        let y = j * cellSize + gap
        if (cell) {
          drawLivingCell(x, y)
        } else {
          drawDeadCell(x, y)
        }
      })
    })
  }

  function drawLivingCell(x, y) {
    ctx.fillStyle = "#006ec8"
    ctx.fillRect(x, y, cellSize, cellSize)
  }

  function drawDeadCell(x, y) {
    ctx.fillStyle = "#fff"
    ctx.fillRect(x, y, cellSize, cellSize)
  }
}

export { makePainter }
