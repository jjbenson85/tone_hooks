import React, {useState, useEffect} from 'react'
import styled from 'styled-components'
import Tone from 'tone'

const rowArr = Array.from(Array(13), (x, i) => i)
const colArr = Array.from(Array(16), (x, i) => i)
const quarterArr = Array.from(Array(4), (x, i) => i)
const sixteenthArr = Array.from(Array(4), (x, i) => i)

const patternNames = ['A', 'B', 'C', 'D']
const blackRows = [1, 3, 6, 8, 10]
const downBeats = [0, 4, 8, 12]

const col1 = '#bbb'
const col2 = 'green'
const col3 = 'black'

const Sequencer = styled.div`
    height: 100%;
    display: flex;
    flex-direction: row;
`
const Grid = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: stretch;
    height: 100%;
    width: 100%;
    margin-left: 10px;
    border: 2px solid red;

    .col{
    display: flex;
    flex-direction: column-reverse;
    width:100%;
    height: 100%;

    .cell{
        display: flex;
      user-select: none;
      height:100%;
      border: 1px solid grey;
      background-color: ${col1};
      overflow: visible;
      .note{
        position: relative;
        left: 0;
        top: 0;
        z-index: 5;
        height:100%;
        width:100%;
        background-color: yellow;
      }
    }
    .cell.down-beat{
      background-color: #8AF;
    }
    .cell.black{
      background-color: ${col3};
    }
    .cell.down-beat.black{
        background-color: mix(#8AF, ${col3}, 50%);
    }
    .cell.active{
      background-color: green !important;
    }
    &.active{
      .cell{
        background-color: ${col2} ;
      }
      .cell.active{
        background-color: red;
      }
    }
}
`


const GridSequencer = (props) => {
    const handleClick=(col, row)=>{
        const {type, inst} = props
        const pitch = Tone.Frequency(row+36, 'midi').toNote()
        const quarter = col >> 2
        const sixteenth = col % 4
        const pattern = JSON.parse(JSON.stringify(gridPattern));
        pattern[0][col][row] = !gridPattern[0][col][row]
        setGridPattern(pattern)
        
        props.handleCellClick(type, inst, pitch, '16n', 1, `0:${quarter}:${sixteenth}`, col, row)
    }

    const [gridPattern, setGridPattern] = useState()
    
    useEffect(()=>{
        const pattern = []
        for (let x = 0; x <= 4; x++) {
            pattern[x] = []
            for (let i = 0; i <= 72; i++) {
                pattern[x][i] = []
                for (var j = 0; j < 16; j++) {
                    pattern[x][i][j] = false
                }
            }
        }
        setGridPattern(pattern)
    },[])
    
    if(!gridPattern) return null 
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
                            {gridPattern[0][col][row] &&
                            <div className='note' style={{ width: '100%' }}></div>}
                        </div>)}
                </div>)}
            </Grid>
        </Sequencer>
    ) 
}
export default GridSequencer