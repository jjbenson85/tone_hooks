import React, { useState, useEffect } from 'react'

import Synth from './Synth'
import Drum from './Drum'

const instrumentLookup = {
    'synth':(props) => <Synth {...props}/>,
    'drum': (props) => <Drum {...props}/>,
}

const Instrument = ({type, ...props}) => {
    useEffect(()=>{
        console.log('Instrument',props)
    },[])
    return(
        instrumentLookup[type](props)
    )
}

export default Instrument