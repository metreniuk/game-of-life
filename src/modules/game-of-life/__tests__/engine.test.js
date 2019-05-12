let {
  makeWorld,
  makeRandomWorld,
  neighborsSum,
  cellNextState,
  worldNextState,
} = require("../engine")

describe("makeWorld", () => {
  test("generates a bi-dimensional array filled with zeroes", () => {
    expect(makeWorld(2, 3)).toEqual([[0, 0, 0], [0, 0, 0]])
  })
})

describe("makeRandomWorld", () => {
  test("generates a bi-dimensional array", () => {
    let randomWorld = makeRandomWorld(2, 3)
    expect(randomWorld).toHaveLength(2)
    randomWorld.forEach(row => expect(row).toHaveLength(3))
  })
})

describe("neighborsSum", () => {
  test("adds all 8 neighboors", () => {
    let x = 1,
      y = 1,
      world = [
        //
        [0, 1, 0],
        [0, 0, 1],
        [1, 0, 0],
      ]

    expect(neighborsSum(x, y, world)).toBe(3)
  })

  test("excludes the current cell", () => {
    let x = 1,
      y = 1,
      world = [
        //
        [0, 1, 0],
        [0, 1, 1],
        [1, 0, 0],
      ]

    expect(neighborsSum(x, y, world)).toBe(3)
  })

  test("handles the zero margin", () => {
    let x = 0,
      y = 0,
      world = [
        //
        [0, 1, 0],
        [0, 1, 1],
        [1, 0, 0],
      ]

    expect(neighborsSum(x, y, world)).toBe(2)
  })

  test("handles the max length margin", () => {
    let world = [
        //
        [0, 1, 0],
        [0, 1, 1],
        [1, 1, 0],
      ],
      x = world.length - 1,
      y = world.length - 1

    expect(neighborsSum(x, y, world)).toBe(3)
  })
})

// TODO handle false positives
describe("cellNextState", () => {
  test("any live cell with fewer than two live neighbors DIES, as if by underpopulation", () => {
    let world = [
        //
        [0, 1, 0],
        [0, 1, 0],
        [0, 0, 0],
      ],
      x = 1,
      y = 1

    expect(cellNextState(world)(x, y)).toBe(0)
  })

  test("any live cell with two or three live neighbors LIVES on to the next generation", () => {
    let world = [
        //
        [0, 1, 1],
        [0, 1, 0],
        [0, 0, 0],
      ],
      x = 1,
      y = 1

    expect(cellNextState(world)(x, y)).toBe(1)

    world = [
      //
      [0, 1, 1],
      [0, 1, 1],
      [0, 0, 0],
    ]
    expect(cellNextState(world)(x, y)).toBe(1)
  })

  test("any live cell with more than three live neighbors DIES, as if by overpopulation", () => {
    let world = [
        //
        [0, 1, 1],
        [0, 1, 1],
        [0, 0, 1],
      ],
      x = 1,
      y = 1

    expect(cellNextState(world)(x, y)).toBe(0)
  })

  test("any dead cell with exactly three live neighbors becomes a LIVE cell, as if by reproduction", () => {
    let world = [
        //
        [0, 1, 1],
        [0, 0, 1],
        [0, 0, 0],
      ],
      x = 1,
      y = 1

    expect(cellNextState(world)(x, y)).toBe(1)
  })

  test("random", () => {
    let world = [
        //
        [1, 1, 0],
        [1, 0, 0],
        [0, 0, 0],
      ],
      x = 1,
      y = 1

    expect(cellNextState(world)(x, y)).toBe(1)
  })
})

describe("worldNextState", () => {
  test("kinda works", () => {
    let samples = [
      {
        prev: [
          //
          [0, 0, 0],
          [0, 0, 0],
          [0, 0, 0],
        ],
        next: [
          //
          [0, 0, 0],
          [0, 0, 0],
          [0, 0, 0],
        ],
      },
      {
        prev: [
          //
          [1, 1, 0],
          [1, 0, 0],
          [0, 0, 0],
        ],
        next: [
          //
          [1, 1, 0],
          [1, 1, 0],
          [0, 0, 0],
        ],
      },
      {
        prev: [
          //
          [0, 1, 0],
          [1, 0, 1],
          [0, 0, 0],
        ],
        next: [
          //
          [0, 1, 0],
          [0, 1, 0],
          [0, 0, 0],
        ],
      },
      {
        prev: [
          //
          [0, 1, 0],
          [0, 1, 0],
          [0, 0, 1],
        ],
        next: [
          //
          [0, 0, 0],
          [0, 1, 1],
          [0, 0, 0],
        ],
      },
      {
        prev: [
          //
          [0, 0, 1],
          [0, 1, 0],
          [1, 0, 0],
        ],
        next: [
          //
          [0, 0, 0],
          [0, 1, 0],
          [0, 0, 0],
        ],
      },
      {
        prev: [
          //
          [1, 1, 0],
          [1, 0, 0],
          [0, 0, 0],
        ],
        next: [
          //
          [1, 1, 0],
          [1, 1, 0],
          [0, 0, 0],
        ],
      },
      {
        // blinker
        prev: [
          //
          [0, 0, 0],
          [1, 1, 1],
          [0, 0, 0],
        ],
        next: [
          //
          [0, 1, 0],
          [0, 1, 0],
          [0, 1, 0],
        ],
      },
      {
        // block
        prev: [
          //
          [0, 1, 1],
          [0, 1, 1],
          [0, 0, 0],
        ],
        next: [
          //
          [0, 1, 1],
          [0, 1, 1],
          [0, 0, 0],
        ],
      },
      {
        // glider 0
        prev: [
          //
          [0, 1, 0, 0],
          [0, 0, 1, 0],
          [1, 1, 1, 0],
          [0, 0, 0, 0],
        ],
        next: [
          //
          [0, 0, 0, 0],
          [1, 0, 1, 0],
          [0, 1, 1, 0],
          [0, 1, 0, 0],
        ],
      },
      {
        // glider border edge case (vertical)
        prev: [
          //
          [0, 0, 1, 0, 0, 0],
          [0, 0, 0, 1, 0, 0],
          [0, 1, 1, 1, 0, 0],
          [0, 0, 0, 0, 0, 0],
        ],
        next: [
          //
          [0, 0, 0, 0, 0, 0],
          [0, 1, 0, 1, 0, 0],
          [0, 0, 1, 1, 0, 0],
          [0, 0, 1, 0, 0, 0],
        ],
      },
      {
        // glider border edge case (horizontal, when not square)
        prev: [
          //
          [0, 0, 0, 0, 0],
          [0, 0, 0, 1, 0],
          [0, 1, 0, 1, 0],
          [0, 0, 1, 1, 0],
          [0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0],
        ],
        next: [
          //
          [0, 0, 0, 0, 0],
          [0, 0, 1, 0, 0],
          [0, 0, 0, 1, 1],
          [0, 0, 1, 1, 0],
          [0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0],
        ],
      },
    ]

    samples.forEach(({ prev, next }) => {
      expect(worldNextState(prev)).toEqual(next)
    })
  })
})
