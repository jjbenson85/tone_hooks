import styled from 'styled-components'

export const Container = styled.div`
    height: 150px;
    background: ${props => props.active ? 'white': 'grey'}
`