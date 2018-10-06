import React, { Component } from 'react';

class ControlPanel extends Component {

  state = {
    paused: false
  }

  pause = (ctx) => {
    let { paused } = this.state;
    if(paused) {
      ctx.resume();
    } else {
      ctx.suspend();
    }

    this.setState({
      paused: !paused
    })
  }

  render() {
    return (
      <div>
        <h1 style={{color: 'white'}}> Control Panel </h1>
        <button onClick={() => this.pause(this.props.ctx)}> Pause/Play </button>
      </div>
    );
  }
}

export default ControlPanel;
