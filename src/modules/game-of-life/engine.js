let makeWorld = (n, m) => new Array(n).fill(new Array(m).fill(0))

let mapWorld = (fn, world) =>
  world.map((row, x) => row.map((_, y) => fn(x, y, world[x][y])))

let makeRandomWorld = (n, m) =>
  mapWorld(() => (Math.random() > 0.5 ? 1 : 0), makeWorld(n, m))

let neighborsSum = (
  x,
  y,
  world,
  [xMargins, yMargins] = [[-1, world.length], [-1, world[0].length]]
) => {
  let sum = 0
  for (let i = x - 1; i <= x + 1; i++) {
    if (xMargins.includes(i)) continue
    for (let j = y - 1; j <= y + 1; j++) {
      if ((i === x && j === y) || yMargins.includes(j)) {
        continue
      }
      sum += world[i][j]
    }
  }
  
  return sum
}

/**
  Any live cell with fewer than two live neighbors dies, as if by underpopulation.
  Any live cell with two or three live neighbors lives on to the next generation.
  Any live cell with more than three live neighbors dies, as if by overpopulation.
  Any dead cell with exactly three live neighbors becomes a live cell, as if by reproduction.
 */

let shouldDie = sum => sum < 2 || sum > 3
let shouldBeBorn = sum => sum === 3

let handleLive = sum => (shouldDie(sum) ? 0 : 1)
let handleDead = sum => (shouldBeBorn(sum) ? 1 : 0)

let cellNextState = (world, margins) => (x, y) =>
  Boolean(world[x][y])
    ? handleLive(neighborsSum(x, y, world, margins))
    : handleDead(neighborsSum(x, y, world, margins))

let worldNextState = (world, margins) =>
  mapWorld(cellNextState(world, margins), world)

export {
  makeWorld,
  makeRandomWorld,
  mapWorld,
  neighborsSum,
  cellNextState,
  worldNextState,
}
