import React, {useState, useEffect} from 'react'
// import styled from 'styled-components'
import Tone from 'tone'

import {Sequencer, Grid} from './GridSequencer.styled.jsx'

const rowArr = Array.from(Array(13), (x, i) => i)
const colArr = Array.from(Array(16), (x, i) => i)
const quarterArr = Array.from(Array(4), (x, i) => i)
const sixteenthArr = Array.from(Array(4), (x, i) => i)

const patternNames = ['A', 'B', 'C', 'D']
const blackRows = [1, 3, 6, 8, 10]
const downBeats = [0, 4, 8, 12]




const GridSequencer = (props) => {
    const handleClick=(col, row)=>{
        const {type, inst} = props
        const pitch = Tone.Frequency(row+36, 'midi').toNote()
        const quarter = col >> 2
        const sixteenth = col % 4
        // const pattern = JSON.parse(JSON.stringify(gridPattern));
        // pattern[0][col][row] = !gridPattern[0][col][row]
        // setGridPattern(pattern)
        
        props.handleCellClick(type, inst, pitch, '16n', 1, `0:${quarter}:${sixteenth}`, col, row)
    }

    const [gridPattern, setGridPattern] = useState()
    
    // useEffect(()=>{
    //     const pattern = []
    //     for (let x = 0; x <= 4; x++) {
    //         pattern[x] = []
    //         for (let i = 0; i <= 72; i++) {
    //             pattern[x][i] = []
    //             for (var j = 0; j < 16; j++) {
    //                 pattern[x][i][j] = false
    //             }
    //         }
    //     }
    //     setGridPattern(pattern)
    // },[])
    // useEffect(()=>{
    //     console.log(props.gridPattern)
    // },[props])

    const checkNote = (col, row) => {
        // console.log('checknote', col, row)
        return props.gridPattern.some(note=>{
            return (note.row===row && note.col===col)
        })
    }
    
    // if(!gridPattern) return null 
    return(
        <Sequencer>
            <Grid>
            {colArr.map(col =>
                <div
                key={col}
                className={`col ${props.beat === col ? 'active ' : ''}`} >
                    {rowArr.map(row =>
                        <div
                        key={row}
                        className={`cell ${blackRows.includes(row) ? 'black ' : ''} ${downBeats.includes(col) ? 'down-beat ' : ''}`}
                        onClick={() => handleClick(col,row)}
                        >
                            {checkNote(col, row) &&
                            <div className='note' style={{ width: '100%' }}></div>}
                        </div>)}
                </div>)}
            </Grid>
        </Sequencer>
    ) 
}
export default GridSequencer