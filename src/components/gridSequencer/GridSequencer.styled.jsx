import styled from 'styled-components'
import {col1, col2, col3} from '../../lib/colors'
// const col1 = '#bbb'
// const col2 = 'green'
// const col3 = 'black'

export const Sequencer = styled.div`
    height: 100%;
    display: flex;
    flex-direction: row;
`

export const Controls = styled.div`
    display: flex;
    flex-direction: column;
    width: 60px;
    margin-left: 4px;
    .button{
      height: 100%;
      width:100%;
      background: grey;
      margin: 0 4px;
      text-align: center;
      border: 1px solid black;
      user-select: none;
      &:hover{
        background-color: white;
      }
      &.active{
          background-color: green;
      }
      &.hidden{
          visibility: hidden;
          &:hover{
            background-color: none;
          }
      }
    }
`

export const Grid = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: stretch;
    height: 100%;
    width: 100%;
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