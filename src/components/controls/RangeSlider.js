import React from 'react'
import styled from 'styled-components'

const Input = styled.input`
    width: 20px;
    height: 100px;
    writing-mode: bt-lr;
    -webkit-appearance: slider-vertical;
`
const Container = styled.div`
    display: flex;
    flex-direction: column;
    border: 1px solid #999;
    padding: 2px;
    align-items: center;
    justify-content: space-between;
    background-color: #CCC;
    font-family: 'Courier New', Courier, monospace;
    width: 100%;
`
export const RangeSlider = ({label, ...props}) => {
    return (
        <Container>
            <label>{label}</label>
            <Input type='range' orient='vertical' {...props} />
        </Container>
    )
}

