import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom'
import Tone from 'tone'


import './scss/app.scss';
import { settings, settings2, settings3, settings4 } from './js/synthSettings.js'


import GridSequencer from './components/GridSequencer'

// Tone.Transport.scheduleRepeat(time => {
  //   const number = progress + 1;
  
  //   console.log('progress', number)
  //   setProgress(number)
// }, '16n')
// let progress


class App extends React.Component {
  constructor() {
    super()
    this.state = {
      transport:{
        beat:0,
        time:0
      }
    }

    console.log('loaded')
    this.synthPattern= []
    this.drum1= this.createDrum(2)
    this.synth = new Tone.PolySynth(4, Tone.MonoSynth).toMaster()
    this.synth2 = new Tone.PolySynth(4, Tone.MonoSynth).toMaster()
    this.synth2.set(settings2)
    Tone.Transport.loop = true
    Tone.Transport.loopStart = '0:0:0'
    Tone.Transport.loopEnd = '1:0:0'

    // this.gridPattern = []
    // for (let x = 0; x <= 4; x++) {
    //   this.gridPattern[x] = []
    //   for (let i = 0; i <= 72; i++) {
    //     this.gridPattern[x][i] = []
    //     for (var j = 0; j < 16; j++) {
    //       this.gridPattern[x][i][j] = false
    //     }
    //   }
    // }
    // this.setState({ noteArray: this.noteArray })
    
    this.toggleNote = this.toggleNote.bind(this)
  }
  
  componentDidMount(){
    this.loop = new Tone.Sequence((time, beat) => {
      console.log(this.state.transport.beat)
      this.setState({ transport: { beat, time } })
    }, [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15], '16n').start()
  }
  
  createDrum(number){
      const url = './assets/wav/sound-'+(number+8)+'-'
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
  

  schedulePattern(){
    // Tone.Transport.cancel()
    console.log('synthPattern', this.synthPattern)
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
     const exists = this.synthPattern.some((note)=>
      note.type === type
      && note.inst === inst
      && note.pitch === pitch
      && note.time === time)
    

    //If it is remove it
    if(exists){
      this.synthPattern = this.synthPattern.reduce((acc, note, i) => {
        if (note.type === type
          && note.inst === inst
          && note.pitch === pitch
          && note.time === time) {
          Tone.Transport.clear(note.id)
          // this.gridPattern[0][col][row] = false;
          return acc
        } else {
          acc.push(note)
          return acc
        }
      }, [])

    }else{
      //If it isn't add it
      
      let id
      console.log('synhnnth', type)
      switch (type) {
        case 'synth':
          id = Tone.Transport.schedule(time => {
          inst.triggerAttackRelease(pitch, duration, time, velocity)
        }, time);
        console.log('id', id)
        break
        
        case 'drum':
          id = Tone.Transport.schedule(time => {
          inst.get(pitch).start(time)
        }, time);
        break
      }
      this.synthPattern.push({ id, type, inst, pitch, duration, velocity, time, col, row })
      // this.gridPattern[0][col][row] = true;

    }

    // this.schedulePattern()
    console.log(this.synthPattern)
   
  }
 
  render(){
    const beat = this.state.transport.beat
    return (
      <div className="app">
        <main>
          {beat}
          <button onClick={() => Tone.Transport.start()}>Start</button>
          <button onClick={() => Tone.Transport.stop()}>Stop</button>
          {/* <button onClick={() => synthPattern1()}>Pattern 1</button>
          <button onClick={() => drumPattern1()}>Drum Pattern 1</button> */}

          {/* <div className='grid'>

            <div className='cell'  onClick={() => toggleNote('synth', synth, 'C3', '16n', 1, '0:0:0')} >Add 1</div>
            <div className='cell'  onClick={() => toggleNote('synth', synth, 'C3', '16n', 1, '0:1:0')} >Add 2</div>
            <div className='cell'  onClick={() => toggleNote('synth', synth, 'C3', '16n', 1, '0:2:0')} >Add 3</div>
            <div className='cell'  onClick={() => toggleNote('synth', synth, 'C3', '16n', 1, '0:3:0')} >Add 4</div>
            <div className='cell'  onClick={() => toggleNote('synth', synth, 'E3', '16n', 1, '0:0:0')} >Add 1</div>
            <div className='cell'  onClick={() => toggleNote('synth', synth, 'E3', '16n', 1, '0:1:0')} >Add 2</div>
            <div className='cell'  onClick={() => toggleNote('synth', synth, 'E3', '16n', 1, '0:2:0')} >Add 3</div>
            <div className='cell'  onClick={() => toggleNote('synth', synth, 'E3', '16n', 1, '0:3:0')} >Add 4</div>
            <div className='cell'  onClick={() => toggleNote('synth', synth, 'G3', '16n', 1, '0:0:0')} >Add 1</div>
            <div className='cell'  onClick={() => toggleNote('synth', synth, 'G3', '16n', 1, '0:1:0')} >Add 2</div>
            <div className='cell'  onClick={() => toggleNote('synth', synth, 'G3', '16n', 1, '0:2:0')} >Add 3</div>
            <div className='cell'  onClick={() => toggleNote('synth', synth, 'G3', '16n', 1, '0:3:0')} >Add 4</div>
            <div className='cell'  onClick={() => toggleNote('synth', synth, 'C4', '16n', 1, '0:0:0')} >Add 1</div>
            <div className='cell'  onClick={() => toggleNote('synth', synth, 'C4', '16n', 1, '0:1:0')} >Add 2</div>
            <div className='cell'  onClick={() => toggleNote('synth', synth, 'C4', '16n', 1, '0:2:0')} >Add 3</div>
            <div className='cell'  onClick={() => toggleNote('synth', synth, 'C4', '16n', 1, '0:3:0')} >Add 4</div>

          </div> */}
          <GridSequencer beat={beat} type='synth' inst={this.synth} handleCellClick={this.toggleNote}/> 
          <GridSequencer beat={beat} type='synth' inst={this.synth2} handleCellClick={this.toggleNote}/> 
          <GridSequencer beat={beat} type='drum' inst={this.drum1} handleCellClick={this.toggleNote}/> 
        </main>
      </div>
    );
  }
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
)

