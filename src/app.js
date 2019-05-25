import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom'
import Tone from 'tone'


import './scss/app.scss';
import { settings, settings2, settings3, settings4 } from './js/synthSettings.js'
import { Main, Transport, LeftPanel, RightPanel , MainPanel} from './app.styled.jsx'

import GridSequencer from './components/gridSequencer/GridSequencer'
import Instrument from './components/instrument/Instrument'
import {Track} from './components/track/Track'
import { __values } from 'tslib';


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
// const toneInstrumentSettingsLookup = {
//   0: settings,
//   1:  settings2,
//   'synth': {
//     oscillator: {
//       type: 'sawtooth',
//       modulationFrequency: 0.2
//     },
//     envelope: {
//       attack: 0.01,
//       decay: 0.1,
//       sustain: 0.9,
//       release: 0.9
//     },
//     filterEnvelope: {
//       attack: 0.01,
//       decay: 0.2,
//       sustain: 0.5,
//       release: 0.9,
//       baseFrequency: 1000,
//       octaves: 2,
//       exponent: 1
//     },
//     filter: {
//       Q: 6,
//       type: 'lowpass',
//       rolloff: -24
//     }
//   },
//   'drum': {}
// }
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
let isTicking
// const debounce = (callback, evt) => {
//   if (isTicking) return
//   requestAnimationFrame(() => {
//     console.log(callback)
//     callback(evt);
//     isTicking = false
//   })
//   isTicking = true
// }
class App extends React.Component {
  constructor() {
    super()
    this.state = {
      nextInstId:0,
      toneInstruments:{},
      displayId:0,
      displayCounter:0,
      displayArr:[],
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
    this.removeInstrument = this.removeInstrument.bind(this)
    this.handleInterfaceChange = this.handleInterfaceChange.bind(this)
    this.handleControlChange = this.handleControlChange.bind(this)
  }
  
  componentDidMount(){
    this.loop = new Tone.Sequence((time, beat) => {
      this.setState({ transport: { beat, time } })
    }, [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15], '16n').start()
  }

  getInstId(){
    const nextInstId = this.state.nextInstId+1
    // console.log('nextInstId', nextInstId)
    this.setState({ nextInstId})
    return nextInstId-1
  }
  toneInstrumentSettingsLookup(type){
    switch(type){
      case 'synth': 
      return {
        oscillator: {
          type: 'sawtooth',
          modulationFrequency: 0.2,
          detune: 0,
          count: 2,
          spread: 40,
        },
        envelope: {
          attack: 0.01,
          decay: 0.1,
          sustain: 0.9,
          release: 0.9
        },
        filterEnvelope: {
          attack: 0.01,
          decay: 0.2,
          sustain: 0.5,
          release: 0.9,
          baseFrequency: 1000,
          octaves: 4,
          exponent: 1
        },
        filter: {
          Q: 6,
          type: 'lowpass',
          rolloff: -24
        }
      }
      case 'drum': return {}
    }
  }
  addInstrument(type){
    console.log('add')
    let {toneInstruments} = this.state
    toneInstruments = {...toneInstruments}
    const id =  this.getInstId()
    const newInst = {
      instId: id,
      type: type,
      inst: toneInstrumentLookup[type](),
      gridPattern: [],
      settings: this.toneInstrumentSettingsLookup(type),
      gridSettings:{
        selectedOctave: 3,
        duration: 1
      }
    }
    newInst.inst.set(newInst.settings)
    toneInstruments[newInst.instId] = newInst
    

    this.setState({ toneInstruments, displayId: newInst.instId })
  }
  removeInstrument(id){
    // console.log('remove', id)

    let {toneInstruments, displayId} = this.state
    toneInstruments = {...toneInstruments}
    //get instrument from toneInstruments
    const inst = toneInstruments[id]
    //remove all its notes 
    inst.gridPattern.forEach(note => Tone.Transport.clear(note.id))
    const arr = Object.keys(toneInstruments)
    let currentIndex = arr.indexOf(''+id)

    //remove it from the toneInstruments
    delete toneInstruments[id]
    
    if(currentIndex--<0) currentIndex = 0
    displayId = parseInt(arr[currentIndex])
    // displayId = parseInt(Object.keys(toneInstruments)[0])

    this.setState({toneInstruments, displayId})


  }
  
  toggleNote(instId, type, inst, pitch, duration, velocity, time, col, row, octave){
    // console.log('toggle', instId, type, inst, pitch, duration, velocity, time, col, row )
    
    let {toneInstruments} = this.state
    
    toneInstruments = {...toneInstruments}
    
    let gridPattern = [...toneInstruments[instId].gridPattern]
    
    //Check if present
    const exists = gridPattern.some((note)=>
      note.pitch === pitch
      && note.time === time)
    

    //If it is remove it
    if(exists){
      gridPattern = gridPattern.reduce((acc, note, i) => {
        if (note.pitch === pitch
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
      let trigger
      switch (type) {
        case 'synth':
            trigger = (time)=>inst.triggerAttackRelease(pitch, duration, time, velocity)
        break
        
        case 'drum':
            trigger = (time)=>inst.get(pitch).start(time)
        break
      }

      const tiggerLookup = {
        'synth': (time) => inst.triggerAttackRelease(pitch, duration, time, velocity),
        'drum': (time) => inst.get(pitch).start(time)
      }
      const id = Tone.Transport.schedule(time => trigger(time), time);

      gridPattern.push({ instId, id, type, inst, pitch, duration, velocity, time, col, row, octave })
    }
    toneInstruments[instId].gridPattern = gridPattern
    this.setState({ toneInstruments })
  }
  trackClick(displayId){
    console.log(displayId)
    this.setState({displayId})
  }
  
  handleControlChange(instId, name, value){
    // console.log('handleControlChange',instId, name, value)
    let { toneInstruments } = this.state
    toneInstruments= {...toneInstruments}
    let { gridSettings } = toneInstruments[instId]
    console.log('pre', gridSettings)
    gridSettings = {...gridSettings, [name]: value}
    toneInstruments[instId].gridSettings = gridSettings;
    console.log(toneInstruments, name, value, gridSettings )
    this.setState({ toneInstruments })

  }
  handleInterfaceChange(id,e){
    const { name, value, dataset } = e.target
    let {toneInstruments} = this.state
    toneInstruments = {...toneInstruments}
    let { settings, inst} = toneInstruments[id]
    settings = { ...settings }
    const { mod } = dataset
    console.log(id, mod, name, value)
    if(name==='type')settings[mod][name] = value
    else settings[mod][name] = parseFloat(value)
    toneInstruments[id].settings = settings
    this.setState({ toneInstruments })
    // this.setState({toneInstruments:{[id]:{settings: newSettings}}}, console.log(this.state.toneInstruments[id]))
    
    if (isTicking) return
    // inst.set(settings)
      requestAnimationFrame(() => {
        inst.set(settings)
        isTicking = false
      })
    isTicking = true
    
    // debounce(inst.set, settings)
  }

  render(){
    const beat = this.state.transport.beat
    const { displayId, toneInstruments, view} = this.state
    const displayGrid = (view === 'grid')
    if (!toneInstruments[displayId]) return(
      <div className="app">
        <Main>
          <MainPanel>
            <LeftPanel>
            </LeftPanel>
            <RightPanel>
            </RightPanel>
          </MainPanel>
        </Main>
        <footer>
          <Transport>
            {beat}
            <button onClick={() => Tone.Transport.start()}>Start</button>
            <button onClick={() => Tone.Transport.stop()}>Stop</button>
            <button onClick={() => this.addInstrument('synth')}>Add Synth</button>
            <button onClick={() => this.addInstrument('drum')}>Add Drum</button>
            <button onClick={() => this.setState({view:'grid'})}>Grid</button>
            <button onClick={() => this.setState({view:'inst'})}>Instrument</button>
          </Transport>
        </footer>
      </div>
    )
    
    const { inst, type, instId, gridPattern, settings, gridSettings } = toneInstruments[displayId]
    // console.log(gridSettings)
    // if (toneInstruments[1]) console.log('HEEEEEERRE',toneInstruments[0].settings===toneInstruments[1].settings)
    return (
      <div className="app">
        <Main>
          <MainPanel>
            <LeftPanel>
              {Object.keys(toneInstruments).map((inst, i)=>
                {
                  
                //   console.log('toneInstruments[inst].instId', typeof toneInstruments[inst].instId)
                //   console.log('displayId', typeof displayId)
                // console.log('active', toneInstruments[inst].instId === displayId)
                  return <Track 
                  key={i} 
                  onClick={this.trackClick} 
                  id={toneInstruments[inst].instId} 
                  active={toneInstruments[inst].instId===displayId}
                  onRemoveClick={this.removeInstrument}
                >
                </Track>}
              )}
            </LeftPanel>
            <RightPanel>
              {displayGrid ? 
              <GridSequencer
                  instId={instId} 
                  beat={beat} 
                  type={type} 
                  inst={inst} 
                  handleCellClick={this.toggleNote}
                  gridPattern={gridPattern}
                  gridSettings={gridSettings}
                  handleControlChange={this.handleControlChange}
                /> 
                :
              <Instrument
                  instId={instId}
                  type={type}
                  inst={inst}
                  settings={settings}
                  handleChange={this.handleInterfaceChange}
                  {...toneInstruments[displayId]}
              />}
            </RightPanel>
          </MainPanel>
        </Main>
        <footer>
          <Transport>
            {beat}
            <button onClick={() => Tone.Transport.start()}>Start</button>
            <button onClick={() => Tone.Transport.stop()}>Stop</button>
            <button onClick={() => this.addInstrument('synth')}>Add Synth</button>
            <button onClick={() => this.addInstrument('drum')}>Add Drum</button>
            <button onClick={() => this.setState({ view: 'grid' })}>Grid</button>
            <button onClick={() => this.setState({ view: 'inst' })}>Instrument</button>
          </Transport>
        </footer>
      </div>
    );
  }
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
)

