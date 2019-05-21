import React, {useState, useEffect} from 'react'
// import styled from 'styled-components'
import Tone from 'tone'

import {Sequencer, Grid} from './GridSequencer.styled.jsx'

const rowArr = Array.from(Array(13), (x, i) => i)
const colArr = Array.from(Array(16), (x, i) => i)

const patternNames = ['A', 'B', 'C', 'D']
const blackRows = [1, 3, 6, 8, 10]
const downBeats = [0, 4, 8, 12]




const GridSequencer = ({
    type, 
    inst, 
    instId,
    handleCellClick,
    gridPattern,
    beat
    }) => {
    const handleClick=(col, row)=>{
        const pitch = Tone.Frequency(row+36, 'midi').toNote()
        const quarter = col >> 2
        const sixteenth = col % 4
        handleCellClick(instId, type, inst, pitch, '16n', 1, `0:${quarter}:${sixteenth}`, col, row)
    }

    const checkNote = (col, row) => gridPattern.some(
        note=>note.row===row && note.col===col
    )
    
    return(
        <Sequencer>
            <Grid>
            {colArr.map(col =>
                <div key={col} className={`col ${beat === col ? 'active ' : ''}`} >
                    {rowArr.map(row =>
                        <div key={row}
                            className={`cell ${blackRows.includes(row) ? 'black ' : ''} ${downBeats.includes(col) ? 'down-beat ' : ''}`}
                            onClick={() => handleClick(col,row)} >
                            {checkNote(col, row) &&
                            <div className='note' style={{ width: '100%' }}></div>}
                        </div>)}
                </div>)}
            </Grid>
        </Sequencer>
    ) 
}
export default GridSequencer