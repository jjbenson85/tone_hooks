import React, {useState, useEffect} from 'react'
import {Container} from './Track.styled.jsx'

export const Track = ({onClick, id})=>{


    return(
        <Container onClick={(e)=>onClick(id)}>
            {id}
        </Container>
    )
}