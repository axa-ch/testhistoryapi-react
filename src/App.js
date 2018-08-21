import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

const api = (step, shouldPush = true) => {
    fetch(`step-${step}.json`).then(response  => {
        console.log(response)

        return response.json();
    } ).then(payload => {
        console.log(payload);

        if (shouldPush) {
            window.history.pushState(payload, 'Schadenmeldung', '#schadenmeldung')
        }
    })
}

class App extends Component {

    constructor() {
        super()

        this.state = {
            step: 1,
        }
    }

    componentDidMount() {
        let { state: { step } } = this

        window.onpopstate = this.onPopState;

        api(step)
    }

    goBack = () => {
        let { state: { step } } = this

        step--;

        this.setState({
            step,
        })

        api(step, false)
    }

    goForward = () => {
        let { state: { step } } = this

        step++;

        this.setState({
            step,
        })

        api(step)
    }

    onPopState = (event) => {
        const { state } = event;
        const { state: { step : lastStep } } = this
        console.log(event);

        if (state && 'step' in state) {
            const step = state.step;
            const isForward = step > lastStep
            console.log(step, lastStep);

            if(isForward) {
                console.error('History Forward is prohibited!');
                window.history.back();
            } else {
                this.setState({
                    step,
                })

                api(step, false)
            }
        } else {
            console.log('Empty state - not a programmatically pushed history item!');
        }
    }

  render() {
      const { state: { step } } = this

    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
          <h2>Step: {step}</h2>
          <button onClick={this.goBack} > back </button>
          <button onClick={this.goForward} > forward </button>
      </div>
    );
  }
}

export default App;
