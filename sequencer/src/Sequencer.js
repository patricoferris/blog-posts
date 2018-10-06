import React, { Component } from 'react';
import {Howl, Howler} from 'howler';
import Instrument from './Instrument';
import ControlPanel from './ControlPanel';
import BeatLine from './BeatLine';

import styled from 'styled-components';

import snare from './sounds/808-snare.wav';
import kick from './sounds/808-kick.wav';
import clap from './sounds/808-clap.wav';

const SEQ_NUM = 16;

const BackPanel = styled.div`
  background: linear-gradient(135deg, rgba(0,0,0,0.65) 0%,rgba(0,0,0,0) 100%);
`;

class Sequencer extends Component {

  state = {
    instruments: [
      new Array(SEQ_NUM).fill(false),
      new Array(SEQ_NUM).fill(false),
      new Array(SEQ_NUM).fill(false)
    ],
    instrumentSounds: [
      new Howl({
        src: snare
      }),
      new Howl({
        src: kick
      }),
      new Howl({
        src: clap
      })
    ],
    beatSequence: new Array(SEQ_NUM).fill(false),
    sequenceNumber: 0,
    sequenceLength: SEQ_NUM,
    intervalPeriod: 250,
    intervalId: 1,
    audioActivated: false
  }

  componentDidMount() {
    let intervalId = setInterval(this.timer, this.state.intervalPeriod);
    this.setState({
      intervalId: intervalId
    })
  }

  timer = () => {
    let { sequenceNumber, sequenceLength, audioActivated, instruments, instrumentSounds} = this.state;

    let newBeatSequence = new Array(sequenceLength).fill(false);
    newBeatSequence[sequenceNumber] = true;

    this.setState({
      sequenceNumber: (sequenceNumber + 1) % sequenceLength,
      beatSequence: newBeatSequence
    });

    for(let i = 0; i < instruments.length; i++) {
      if(instruments[i][sequenceNumber]) {
        instrumentSounds[i].play();
      }
    }
  }

  updateSequence = (idx, jdx) => {
    let seq = this.state.instruments[idx].map((val, kdx) => {
      if(jdx === kdx) {
        return !this.state.instruments[idx][jdx];
      } else {
        return this.state.instruments[idx][kdx];
      }
    });

    let inst = this.state.instruments;
    inst[idx] = seq;

    this.setState({
      instruments:  inst
    });
  }

  render() {
    return (
      <div style={{
        background: "linear-gradient(165deg, rgba(0,0,0,1) 3%, rgba(142,142,142,1) 51%, rgba(68,68,68,1) 100%)",
        border: "thick black solid",
        marginLeft: "50px",
        marginRight: "50px"
      }}>
        <ControlPanel ctx={Howler.ctx}/>
        <BeatLine sequence={this.state.beatSequence} currentBeat={this.state.sequenceNumber}/>
        {this.state.instruments.map((val, idx) =>
             <Instrument instrument={this.state.instrumentSounds[idx]} key={idx} sequence={this.state.instruments[idx]} onClick={(jdx) => this.updateSequence(idx, jdx)}/>
        )}
      </div>
    );
  }
}

export {Sequencer, SEQ_NUM};
