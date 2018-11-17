import React from "react"
import { Toggle } from "react-powerplug"
import styled from "styled-components"

// export const Cell = () => (
//   <div className="cell box alive">
//     <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
//       <circle cx="6" cy="8" r="2" />
//       <circle cx="18" cy="8" r="2" />
//     </svg>
//   </div>
// )

let Box = styled.div`
  border: 1px #006ec8 solid;
  fill: #006ec8;
  height: 32px;
  width: 32px;
  margin-right: 5px;
  margin-bottom: 5px;
  cursor: pointer;
  border-radius: 2px;

  background: ${props => (props.alive ? "#006ec8" : "#fff")};
`

// export let Cell = () => {
//   return (
//     <Toggle>{({ on, toggle }) => <Box alive={on} onClick={toggle} />}</Toggle>
//   )
// }

export let Cell = ({ alive, onClick }) => (
  <Box alive={alive} onClick={onClick} />
)
