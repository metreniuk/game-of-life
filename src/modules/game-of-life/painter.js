import { worldNextState } from "./engine"

let animationId

function makePainter(canvas) {
  let ctx = canvas.getContext("2d"),
    gap = 0,
    cellSize

  return {
    paint,
  }

  function paint(world, size, frequency = 1000) {
    if (!cellSize) {
      cellSize = size
    }

    drawWorld(world)

    let nextWorld = worldNextState(world)

    setTimeout(() => {
      animationId = window.requestAnimationFrame(() =>
        paint(nextWorld, cellSize, frequency)
      )
    }, frequency)

    return () => {
      window.cancelAnimationFrame(animationId)
      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight)
    }
  }

  function drawWorld(world) {
    world.forEach((row, i) => {
      row.forEach((cell, j) => {
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
