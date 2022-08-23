import React, { useState } from "react";
import styled from "styled-components";

const ButtonStyle = styled.div`
  width: ${props => props.propsWidth ? props.propsWidth : 'auto'};
  background-color: ${({ primary }) => primary ? 'rgb(62, 200, 250)' : 'rgb(162, 224, 246)'};
  border-radius: 8px;
  height: 48px;
  margin: ${({buttonDown}) => buttonDown ? '2px -2px -2px 2px' : '0px'};
  cursor: pointer;
  user-select: none;
`

const ButtonLabel = styled.p`
  margin: 0px;
  font-size: ${props => props.propsFontSize ? props.propsFontSize : '20px'};
  color: white;
  width: 100%;
  text-align: center;
  line-height: 46px;
  font-family: Arial, Helvetica, sans-serif;
  font-weight: bold;
  text-transform: ${({ primary }) => primary ? 'uppercase' : ''};
  user-select: none;
`

function leftButtonDown(e) {
  const flags = e.buttons !== undefined ? e.buttons : e.which;
  return (flags & 1) === 1;
}

export function Button({ label, width, primary, fontSize, onClick }) {
  const [buttonDown, setButtonDown] = useState(false);
  const [buttonClicked, setButtonClicked] = useState(false);
  
  return (
    <ButtonStyle propsWidth={width} primary={primary} buttonDown={buttonDown} onClick={onClick}
      onMouseDown={() => {
        setButtonDown(true);
        setButtonClicked(true);
      }
      } onMouseUp={() => {
        setButtonDown(false);
        setButtonClicked(false);
      }
      }
      onMouseLeave={() => setButtonDown(false)}
      onMouseEnter={(e) => {
        if (leftButtonDown(e) && buttonClicked) {
          setButtonDown(true);
        }
        else {
          setButtonClicked(false);
        }
      }}
      >
      <ButtonLabel primary={primary} propsFontSize={fontSize}>{label}</ButtonLabel>
    </ButtonStyle>
  )
}