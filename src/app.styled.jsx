import React from 'react';
import styled from 'styled-components'

const transportHeight = '40px'

export const Main = styled.main`
    height: 100vh;
    width: 100vw;
    display: flex;
    flex-direction: column;
`
export const Transport = styled.div`
    background: yellow;
    border: 1px solid black;
    position: fixed;
    bottom: 0;
    height: ${transportHeight};
`
export const MainPanel = styled.div`
    display: flex;
    height: 100%;

`
export const LeftPanel = styled.div`
    display: flex;
    flex-direction: column;
    background: green;
    flex-grow: 1;
    height: 100%;

`
export const RightPanel = styled.div`
    background: red;
     flex-grow: 3;
    height: 100%;

`