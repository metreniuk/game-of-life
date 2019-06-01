import React, { memo } from "react"
import styled from "styled-components"

let Box = styled.div`
  height: ${props => (props.size || 32) + "px"};
  width: ${props => (props.size || 32) + "px"};
  cursor: pointer;
  background: ${props => (props.alive ? "#006ec8" : "#fff")};
  fill: ${props => (props.alive ? "#fff" : "#006ec8")};
  border: ${props => (props.special ? "medium" : "thin")} solid
    ${props =>
      props.special ? (props.willDie ? "#DE2D32" : "#38C173") : "#006ec8"};

  /* hack for centering the inner svg */
  font-family: "sans serif";
`

// TODO make animation when the cell disappears
// TODO make the cell follow the mouse
export let Cell = memo(
  ({ alive, size, special = false, willDie = false, ...rest }) => {
    return (
      <Box
        {...rest}
        alive={alive}
        size={size}
        special={special}
        willDie={willDie}
      >
        {alive ? <LivingSvg /> : <DeadSvg />}
      </Box>
    )
  }
)

let LivingSvg = () => (
  <svg x="0px" y="0px" viewBox="0 0 1000 1000">
    <g>
      <g>
        <g>
          <g>
            <g>
              <rect x="687.59" y="283.52" width="49.91" height="49.91" />
            </g>
            <g>
              <rect x="637.69" y="283.52" width="49.91" height="49.91" />
            </g>
            <g>
              <rect x="687.59" y="333.43" width="49.91" height="49.91" />
            </g>
            <g>
              <rect x="637.69" y="333.43" width="49.91" height="49.91" />
            </g>
          </g>
          <g>
            <g>
              <rect x="311.3" y="283.52" width="49.91" height="49.91" />
            </g>
            <g>
              <rect x="261.39" y="283.52" width="49.91" height="49.91" />
            </g>
            <g>
              <rect x="311.3" y="333.43" width="49.91" height="49.91" />
            </g>
            <g>
              <rect x="261.39" y="333.43" width="49.91" height="49.91" />
            </g>
          </g>
        </g>
        <g>
          <rect x="674.12" y="585.28" width="49.91" height="49.91" />
        </g>
        <g>
          <rect x="624.21" y="618.55" width="49.91" height="49.91" />
        </g>
        <g>
          <rect x="324.77" y="618.55" width="49.91" height="49.91" />
        </g>
        <g>
          <rect x="274.87" y="585.28" width="49.91" height="49.91" />
        </g>
        <g>
          <g>
            <rect x="574.3" y="668.46" width="49.91" height="49.91" />
          </g>
          <g>
            <rect x="524.4" y="668.46" width="49.91" height="49.91" />
          </g>
          <g>
            <rect x="474.49" y="668.46" width="49.91" height="49.91" />
          </g>
          <g>
            <rect x="424.59" y="668.46" width="49.91" height="49.91" />
          </g>
          <g>
            <rect x="374.68" y="668.46" width="49.91" height="49.91" />
          </g>
        </g>
      </g>
    </g>
  </svg>
)

let DeadSvg = () => (
  <svg x="0px" y="0px" viewBox="0 0 1000 1000">
    <g>
      <g>
        <g>
          <g>
            <g>
              <g>
                <rect x="737.99" y="282.17" width="50" height="50" />
              </g>
              <g>
                <rect x="637.99" y="382.17" width="50" height="50" />
              </g>
              <g>
                <rect x="637.99" y="282.17" width="50" height="50" />
              </g>
              <g>
                <rect x="687.99" y="332.17" width="50" height="50" />
              </g>
              <g>
                <rect x="737.99" y="382.17" width="50" height="50" />
              </g>
            </g>
          </g>
          <g>
            <g>
              <g>
                <rect x="312.01" y="282.17" width="50" height="50" />
              </g>
              <g>
                <rect x="212.01" y="382.17" width="50" height="50" />
              </g>
              <g>
                <rect x="212.01" y="282.17" width="50" height="50" />
              </g>
              <g>
                <rect x="262.01" y="332.17" width="50" height="50" />
              </g>
              <g>
                <rect x="312.01" y="382.17" width="50" height="50" />
              </g>
            </g>
          </g>
        </g>
        <g>
          <g>
            <rect x="274.49" y="667.83" width="50" height="50" />
          </g>
          <g>
            <rect x="324.49" y="642.83" width="50" height="50" />
          </g>
          <g>
            <rect x="624.49" y="642.83" width="50" height="50" />
          </g>
          <g>
            <rect x="674.49" y="667.83" width="50" height="50" />
          </g>
          <g>
            <g>
              <rect x="374.49" y="613.67" width="50" height="50" />
            </g>
            <g>
              <rect x="424.49" y="613.67" width="50" height="50" />
            </g>
            <g>
              <rect x="474.49" y="613.67" width="50" height="50" />
            </g>
            <g>
              <rect x="524.49" y="613.67" width="50" height="50" />
            </g>
            <g>
              <rect x="574.49" y="613.67" width="50" height="50" />
            </g>
          </g>
        </g>
      </g>
    </g>
  </svg>
)
