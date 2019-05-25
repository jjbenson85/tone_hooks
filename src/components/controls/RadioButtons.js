import React from 'react'
import styled from 'styled-components'

const Input = styled.input`
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

const Group = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
`
export const RadioButtons = ({ label,  name, ...props }) => {
    return (
        <Container>
            {label.map(label=>
            (<Group key={label}>
                <label>{label}</label>
                <Input type='radio' name={name} value={label} {...props}/>
            </Group>
            )
            )}
        </Container>
    )
}

