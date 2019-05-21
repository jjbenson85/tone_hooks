import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom'
import Tone from 'tone'


import './scss/app.scss';
import { settings, settings2, settings3, settings4 } from './js/synthSettings.js'
import { Main, Transport, LeftPanel, RightPanel, MainPanel } from './app.styled.jsx'

import GridSequencer from './components/gridSequencer/GridSequencer'
import { Track } from './components/track/Track'

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
const createDrum = (number) => {
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
            nextInstId: 0,
            tInsts: [],
            instruments: [],
            toneInstruments: [],
            displayId: 0,
            displayArr: [],
            synthPattern: [],
            transport: {
                beat: 0,
                time: 0
            }
        }

        console.log('loaded')
        this.synthPattern = []
        Tone.Transport.loop = true
        Tone.Transport.loopStart = '0:0:0'
        Tone.Transport.loopEnd = '1:0:0'

        this.toggleNote = this.toggleNote.bind(this)
        this.trackClick = this.trackClick.bind(this)
        // this.removeInstrument = this.removeInstrument.bind(this)
    }

    componentDidMount() {
        this.loop = new Tone.Sequence((time, beat) => {
            this.setState({ transport: { beat, time } })
        }, [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15], '16n').start()
    }

    getInstId() {
        const nextInstId = this.state.nextInstId + 1
        console.log('nextInstId', nextInstId)
        this.setState({ nextInstId }, () => console.log(this.state.nextInstId))
        return nextInstId - 1
    }

    addInstrument(type) {
        console.log('add')
        const { tInsts: oldtInsts, displayArr } = this.state
        const tInsts = [...oldtInsts]
        const id = this.getInstId()
        const x = tInsts.push({}) - 1
        const inst = tInsts[x]
        inst.instId = id
        inst.type = type
        inst.inst = toneInstrumentLookup[type]()
        displayArr.push(id)
        this.setState({ tInsts, display: id })
        return tInsts
    }

    // removeInstrument() {
    //   console.log('remove')
    //   let { tInsts, display, displayArr, synthPattern } = this.state
    //   //Remove instrument that is currentlyBeing displayed
    //   const { instId } = tInsts[display]
    //   const notesToRemove = synthPattern.filter((note) => note.instId === instId)
    //   notesToRemove.forEach(note => Tone.Transport.clear(note.id))
    //   tInsts = [...tInsts.slice(0, display), ...tInsts.slice(display + 1)]
    //   const x = displayArr.indexOf(display)
    //   if (x > -1) {
    //     displayArr.splice(x, 1)
    //     displayArr = [...displayArr]
    //   }
    //   if (display > tInsts.length - 1) display--
    //   this.setState({ tInsts, display, displayArr }, () => console.log(this.state))
    // }

    schedulePattern() {
        this.synthPattern.forEach((note) => {
            const { type, inst, pitch, duration, velocity, time } = note
            switch (type) {
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


    toggleNote(instId, type, inst, pitch, duration, velocity, time, col, row) {
        console.log('toggle', instId, type, inst, pitch, duration, velocity, time, col, row)
        //Check if present
        let synthPattern = [...this.state.synthPattern]
        const exists = this.state.synthPattern.some((note) =>
            note.type === type
            && note.instId === instId
            && note.pitch === pitch
            && note.time === time)


        //If it is remove it
        if (exists) {
            synthPattern = this.state.synthPattern.reduce((acc, note, i) => {
                if (note.type === type
                    && note.instId === instId
                    && note.pitch === pitch
                    && note.time === time) {
                    Tone.Transport.clear(note.id)
                    return acc
                } else {
                    acc.push(note)
                    return acc
                }
            }, [])

        } else {
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
            synthPattern.push({ instId, id, type, inst, pitch, duration, velocity, time, col, row })
        }
        this.setState({ synthPattern })
    }
    trackClick(id) {
        console.log(id)
        this.setState({ display: id })
    }

    render() {
        const beat = this.state.transport.beat
        const { displayArr, displayId, tInsts, synthPattern } = this.state

        if (!tInsts.length) return (
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
                        {/* <button onClick={() => {}}>Remove</button> */}
                    </Transport>
                </footer>
            </div>
        )
        // const tInst = tInsts.filter(tI => tI.id===display)

        const { inst, type, instId } = tInsts.filter(inst => inst.instId === displayId)
        // const { inst, type, instId, } = tInst
        const gridPattern = synthPattern.filter(note => note.instId === instId)
        return (
            <div className="app">
                <Main>
                    <MainPanel>
                        <LeftPanel>
                            {tInsts.map((inst, i) => (
                                <Track key={i} onClick={this.trackClick} id={tInsts[i].instId}></Track>
                            ))}
                        </LeftPanel>
                        <RightPanel>
                            {type && <GridSequencer
                                instId={instId}
                                beat={beat}
                                type={type}
                                inst={inst}
                                handleCellClick={this.toggleNote}
                                gridPattern={gridPattern}
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
                        {/* <button onClick={() => this.removeInstrument()}>Remove</button> */}
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

