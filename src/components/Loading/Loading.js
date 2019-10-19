import React, { Component } from "react";
import styled, { keyframes } from "styled-components";

const BounceAnimation = keyframes`
  0% { margin-bottom: 0; }
  50% { margin-bottom: 15px }
  100% { margin-bottom: 0 }
`;

const DotWrapper = styled.div`
  display: flex;
  align-items: flex-end;
`;

const Dot = styled.div`
  background-color: #979797;
  width: 10px;
  height: 10px;
  margin: 0 5px;
  /* Animation */
  animation: ${BounceAnimation} 0.8s linear infinite;
  animation-delay: ${props => props.delay};
`;

var headerStyle = {
    margin: 0
};

class Loading extends Component {
    render() {
        return (
            <DotWrapper>
                <h1 style={headerStyle}>Loading</h1>
                <Dot delay="0s" />
                <Dot delay=".1s" />
                <Dot delay=".2s" />
            </DotWrapper>
        )
    }
}
export default Loading