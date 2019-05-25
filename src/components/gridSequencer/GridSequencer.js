import React, {useState, useEffect} from 'react'
// import styled from 'styled-components'
import Tone from 'tone'

import {Sequencer, Grid, Controls} from './GridSequencer.styled.jsx'

const rowArr = Array.from(Array(13), (x, i) => i)
const colArr = Array.from(Array(16), (x, i) => i)

const patternNames = ['A', 'B', 'C', 'D']
const blackRows = [1, 3, 6, 8, 10]
const downBeats = [0, 4, 8, 12]
const octaveRange = 7;


const durationLookup=[
    '32n',
    '16n',
    '8n',
    '4n',
    '2n',
    '1n'
    ]


const GridSequencer = ({
    type, 
    inst, 
    instId,
    handleCellClick,
    gridPattern,
    beat,
    gridSettings,
    handleControlChange
    }) => {

    const {
        selectedOctave,
        duration,
    }=gridSettings


        //MOVE THIS
    const handleClick=(col, row, octave)=>{
        const pitch = Tone.Frequency(row+(12*octave), 'midi').toNote()
        const quarter = col >> 2
        const sixteenth = col % 4
        handleCellClick(instId, type, inst, pitch, '16n', 1, `0:${quarter}:${sixteenth}`, col, row, octave)
    }

    const checkNote = (col, row, octave) => gridPattern.some(
        note=>note.row===row && note.col===col && note.octave===octave
    )
    
    return(
        <Sequencer>
            <Controls>
                <div className='button' onClick={() => handleControlChange(instId, 'selectedOctave', selectedOctave<octaveRange?selectedOctave+1:octaveRange )}>8ve+</div>
                <div className='button' onClick={() => handleControlChange(instId, 'selectedOctave', selectedOctave>0?selectedOctave-1:0)}>8ve-</div>
                <div className='button'>{selectedOctave}</div>
                <div className='button hidden'></div>
                <div
                    className='button'
                    onClick={() => handleControlChange(instId, 'duration', duration < durationLookup.length - 1 ? duration + 1 : durationLookup.length - 1)}
                >Length+</div>
                <div
                    className='button'
                    onClick={() => handleControlChange(instId, 'duration', duration > 0 ? duration-1 : 0)}
                >Length-</div>
                <div className='button'>{durationLookup[duration]}</div>
                <div className='button hidden'></div>
                <div className='button pattern active' onClick={(e) => this.handleControlChange(0, 'pattern', e)}>A</div>
                <div className='button pattern' onClick={(e) => this.handleControlChange(1, 'pattern', e)}>B</div>
                <div className='button pattern' onClick={(e) => this.handleControlChange(2, 'pattern', e)}>C</div>
                <div className='button pattern' onClick={(e) => this.handleControlChange(3, 'pattern', e)}>D</div>
                <div className='button' onClick={() => this.handleControlChange(0, 'patternChain')}>Add</div>
            </Controls>
            <Grid>
            {colArr.map(col =>
                <div key={col} className={`col ${beat === col ? 'active ' : ''}`} >
                    {rowArr.map(row =>
                        <div key={row}
                            className={`cell ${blackRows.includes(row) ? 'black ' : ''} ${downBeats.includes(col) ? 'down-beat ' : ''}`}
                            onClick={() => handleClick(col,row, selectedOctave)} >
                            {checkNote(col, row, selectedOctave) &&
                            <div className='note' style={{ width: '100%' }}></div>}
                        </div>)}
                </div>)}
            </Grid>
        </Sequencer>
    ) 
}
export default GridSequencer