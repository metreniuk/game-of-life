import React from "react"
import styled from "styled-components"
import { Cell } from "./Cell"

let Wrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
`

// const Row = ({ x, onClick }) => (
//   <div>
//     {Array(8)
//       .fill()
//       .map((_, i) => (
//         <Cell key={i} x={x} y={i} onClick={() => onClick({ x, y: i })} />
//       ))}
//   </div>
// )

let noop = () => {}

export const Grid = ({ world, onClick = noop }) => (
  <Wrapper>
    {world.map((row, x) => (
      <div key={x}>
        {row.map((alive, y) => (
          <Cell
            alive={alive}
            key={y}
            x={x}
            y={y}
            onClick={() => onClick({ x, y })}
          />
        ))}
      </div>
    ))}
  </Wrapper>
)
