import React, {useState, useEffect} from 'react'
import {Container} from './Track.styled.jsx'

export const Track = ({onClick, id, active, onRemoveClick})=>{


    return(
        <Container  active={active}>
            {id}
            <button onClick={(e)=> onClick(id)}> View Grid</button>
            <button onClick={() => onRemoveClick(id)}>Remove Inst</button>
        </Container>
    )
}