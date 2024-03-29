# Game of Life

This is an explorable explanation (in progress) about the Conway's Game of Life.

1. To see the canvas version of the game run `npm run canvas`.
1. To see the interactive versrion of the game run `npm run playground`.
1. To see the **explorable explanation** run `npm run mdx`.

The interactive version supports some of the following features:

- By clicking on a cell, it becomes _alive_ or _dead_.
- By clicking on the **copy** button, the pattern is copied to the clipboard. After reseting the game (**reset** button) and clicking on the **paste** button the pattern from the clipboard serves as an initial state to the game.
  **Copy** the pattern from `gosper-gun.txt` file and **paste** it to the game. Press **play** to see the Gosper Glider Gun in action!

### Main components

- [game-of-life module](https://github.com/metreniuk/game-of-life/tree/master/src/modules/game-of-life)
- [Table](https://github.com/metreniuk/game-of-life/blob/master/src/Table.js)
- [CanvasWorld](https://github.com/metreniuk/game-of-life/blob/master/src/CanvasWorld.js)
