import React, { Component } from 'react';
import styled from 'styled-components';
import { SEQ_NUM } from './Sequencer';

const SequenceLine = styled.div`
  height: 100px;
  display: grid;
  grid-template-columns: repeat(${SEQ_NUM}, 1fr);
  grid-column-gap: 20px;
  grid-row-gap: 20px;
`;

/*
* LED CSS from - many thanks
* https://codepen.io/fskirschbaum/pen/MYJNaj
*/

const StyledCircle = styled.div`
  background-color: ${props => (props.onBeat) ? "#F00" : "#A00"};
  box-shadow: rgba(0, 0, 0, 0.2) 0 -1px 7px 1px, inset #441313 0 -1px 9px, rgba(255, 0, 0, 0.5) 0 2px 12px;
  cursor: pointer;
  float: left;
  height: 25px;
  width: 25px;
  border-radius: 50%;
  align-self: center;
  justify-self: center;
  grid-column: ${props => props.number + 1};
  text-align: center;
`;

class BeatLine extends Component {
  render() {
    return (
      <SequenceLine>
        {this.props.sequence.map((value, idx) => {
          console.log(this.props.width);
          return(
            <StyledCircle width={this.props.width} key={idx} number={idx} onBeat={value}></StyledCircle>
          );
        })}
      </SequenceLine>
    );
  }
}

export default BeatLine;
