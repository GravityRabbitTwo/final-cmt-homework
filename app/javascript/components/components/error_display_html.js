import React from "react";
import styled from 'styled-components'

const ErrorContainer = styled.div`
  position: absolute;
  width: 50%;
  height: 75%;
  margin-left: calc(25%);
  margin-top: calc(4%);
  background-color: white;
  border-left: 1px solid rgb(62, 200, 250);
  border-bottom: 1px solid rgb(62, 200, 250);
  border-top: 12px solid red;
  border-right: 12px solid red;
  box-shadow: 5px 4px 10px 0px rgba(23,160,255,0.24);
  border-top-left-radius: 0;
  border-top-right-radius: 0px;
  border-bottom-right-radius: 0;
  border-bottom-left-radius: 10px;
  padding: 20px;
`

export function ErrorDisplayHtml({ htmlString }) {
  return (
    <ErrorContainer>
      <div dangerouslySetInnerHTML={{ __html: htmlString }} />
    </ErrorContainer>
  );
}