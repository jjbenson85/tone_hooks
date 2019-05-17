import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom'
import Tone from 'tone'


import './scss/app.scss';
import { settings, settings2, settings3, settings4 } from './js/synthSettings.js'
import { Main, Transport, LeftPanel, RightPanel , MainPanel} from './app.styled.jsx'

import GridSequencer from './components/gridSequencer/GridSequencer'
import {Track} from './components/track/Track'

// Tone.Transport.scheduleRepeat(time => {
  //   const number = progress + 1;
  
  //   console.log('progress', number)
  //   setProgress(number)
// }, '16n')
// let progress
const toneInstrumentLookup = {
  'synth': () => new Tone.PolySynth(4, Tone.MonoSynth).toMaster(),
  'drum': () => createDrum(2)
}
const createDrum = (number) =>{
  const url = './assets/wav/sound-' + (number + 8) + '-'
  return new Tone.Players({
    'C2': url + '1.wav',
    'C#2': url + '2.wav',
    'D2': url + '3.wav',
    'D#2': url + '4.wav',
    'E2': url + '5.wav',
    'F2': url + '6.wav',
    'F#2': url + '7.wav',
    'G2': url + '8.wav',
    'G#2': url + '9.wav',
    'A2': url + '10.wav',
    'A#2': url + '11.wav',
    'B2': url + '12.wav',
    'C3': url + '13.wav',
    'C#3': url + '14.wav',
    'D3': url + '15.wav',
    'D#3': url + '16.wav'
  }).toMaster()
}

class App extends React.Component {
  constructor() {
    super()
    this.state = {
      instruments: [],
      toneInstruments:[],
      display:0,
      synthPattern: [],
      transport:{
        beat:0,
        time:0
      }
    }

    console.log('loaded')
    this.synthPattern= []
    Tone.Transport.loop = true
    Tone.Transport.loopStart = '0:0:0'
    Tone.Transport.loopEnd = '1:0:0'

    this.toggleNote = this.toggleNote.bind(this)
    this.trackClick = this.trackClick.bind(this)
    this.buildInstruments = this.buildInstruments.bind(this)
    this.removeInstrument = this.removeInstrument.bind(this)
  }
  
  componentDidMount(){
    this.buildInstruments()
    this.loop = new Tone.Sequence((time, beat) => {
      this.setState({ transport: { beat, time } })
    }, [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15], '16n').start()
  }

  buildInstruments(){
    const toneInstruments = this.state.instruments.map(inst => toneInstrumentLookup[inst]())
    this.setState({ toneInstruments })
  }

  addInstrument(type){
    const instruments = [...this.state.instruments, type]
    this.setState({ instruments }, this.buildInstruments)
  }

  schedulePattern(){
    this.synthPattern.forEach((note) => {
      const { type, inst, pitch, duration, velocity, time } = note
      switch(type){
        case 'synth': 
          note.id = Tone.Transport.schedule(time => {
            inst.triggerAttackRelease(pitch, duration, time, velocity)
          }, time);
          console.log('id', id)
          break
          
        case 'drum':
          note.id = Tone.Transport.schedule(time => {
            inst.get(pitch).start(time)
          }, time);
          break
      }
      
    })
  }
 

  toggleNote(type, inst, pitch, duration, velocity, time, col, row){
    console.log('toggle')
    //Check if present
    let synthPattern = [...this.state.synthPattern]
     const exists = this.state.synthPattern.some((note)=>
      note.type === type
      && note.inst === inst
      && note.pitch === pitch
      && note.time === time)
    

    //If it is remove it
    if(exists){
      synthPattern = this.state.synthPattern.reduce((acc, note, i) => {
        if (note.type === type
          && note.inst === inst
          && note.pitch === pitch
          && note.time === time) {
          Tone.Transport.clear(note.id)
          return acc
        } else {
          acc.push(note)
          return acc
        }
      }, [])

    }else{
      //If it isn't add it
      
      let id
      switch (type) {
        case 'synth':
          id = Tone.Transport.schedule(time => {
            inst.triggerAttackRelease(pitch, duration, time, velocity)
          }, time);
        break
        
        case 'drum':
          id = Tone.Transport.schedule(time => {
            inst.get(pitch).start(time)
          }, time);
        break
      }
      synthPattern.push({ id, type, inst, pitch, duration, velocity, time, col, row })
    }
    this.setState({ synthPattern })
  }
  trackClick(id){
    console.log(id)
    this.setState({display: id})
  }
  removeInstrument(){
    let {instruments, toneInstruments, display} = this.state
    console.log(this.state.display, instruments, toneInstruments)
    const inst=toneInstruments[display]
    const notesToRemove = this.state.synthPattern.filter((note)=>note.inst===inst)
    console.log(notesToRemove)
    notesToRemove.forEach(note=>Tone.Transport.clear(note.id))

    instruments = [...instruments.slice(0, display), ...instruments.slice(display+1)]
    toneInstruments = [...toneInstruments.slice(0, display), ...toneInstruments.slice(display+1)]
    this.setState({instruments, toneInstruments}, ()=>console.log(this.state))
  }
  render(){
    // console.log('this.state.toneInstruments', this.state.toneInstruments)
    const beat = this.state.transport.beat
    // if(this.state.toneInstruments.length<1) return null
    const { display, toneInstruments} = this.state
    const inst = toneInstruments[display]
    return (
      <div className="app">
      
        <Main>
          <Transport>
            {beat}
            <button onClick={() => Tone.Transport.start()}>Start</button>
            <button onClick={() => Tone.Transport.stop()}>Stop</button>
            <button onClick={() => this.addInstrument('synth')}>Add Synth</button>
            <button onClick={() => this.addInstrument('drum')}>Add Drum</button>
            <button onClick={() => this.removeInstrument()}>Remove</button>

          </Transport>
          <MainPanel>
            <LeftPanel>
              {this.state.instruments.map((inst, i)=>(
                <Track key={i} onClick={this.trackClick} id={i}></Track>
              ))}
            </LeftPanel>
            <RightPanel>
                <GridSequencer 
                  beat={beat} 
                  type={this.state.instruments[display]} 
                  inst={inst} 
                  handleCellClick={this.toggleNote}
                  gridPattern={this.state.synthPattern.filter(note=>note.inst===inst)}
                /> 
            </RightPanel>
          </MainPanel>
        </Main>
      </div>
    );
  }
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
)

