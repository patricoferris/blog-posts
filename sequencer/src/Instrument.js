import React, { Component } from 'react';
import styled from 'styled-components';
import { SEQ_NUM } from './Sequencer';

const SequenceLine = styled.div`
  height: 100px;
  display: grid;
  grid-template-columns: repeat(${SEQ_NUM}, 1fr);
  grid-column-gap: 20px;
  grid-row-gap: 20px;
`

const StyledInstrument = styled.div`
  background: ${props => props.activated ? "radial-gradient(circle, rgba(255,112,112,1) 0%, rgba(128,68,68,1) 36%, rgba(30,10,10,1) 100%)" : "radial-gradient(circle, rgba(112,112,112,1) 0%, rgba(68,68,68,1) 36%, rgba(10,10,10,1) 100%)"};
  cursor: pointer;
  float: left;
  height: 50px;
  width: 50px;
  border-radius: 10%;
  border: 2px solid #181818;
  align-self: center;
  justify-self: center;
  grid-column: ${props => props.number + 1};
  &:hover {
    box-shadow: 0px 0px 4px 4px rgba(255, 30, 30 , 0.2);
  }
`;

class Instrument extends Component {
  render() {
    return(
      <SequenceLine>
        {this.props.sequence.map((value, idx) => {
          return(
            <StyledInstrument key={idx} number={idx} activated={this.props.sequence[idx]} onClick={() => this.props.onClick(idx)}></StyledInstrument>
          );
        })}
      </SequenceLine>
    );
  }
}

export default Instrument;
