import React, {useEffect, useState} from 'react'

import {settings, settings2, settings3, settings4 } from './synthSettings.js'
import {Row} from './Synth.styled.jsx'
import {RangeSlider} from '../controls/controls'

const presets = {
    1 : settings,
    2 : settings2,
    3 : settings3,
    4 : settings4,
}
const Synth = (props)=> {
    // useEffect(()=> {
    //     console.log('synth', props)
    // },[])

    // const [settings, setSettings] = useState({
    //     oscillator: {
    //         type: 'sawtooth',
    //         modulationFrequency: 0.2
    //     },
    //     envelope: {
    //         attack: 0.01,
    //         decay: 0.1,
    //         sustain: 0.9,
    //         release: 0.9
    //     },
    //     filterEnvelope: {
    //         attack: 0.01,
    //         decay: 0.2,
    //         sustain: 0.5,
    //         release: 0.9,
    //         baseFrequency: 1000,
    //         octaves: 2,
    //         exponent: 1
    //     },
    //     filter: {
    //         Q: 6,
    //         type: 'lowpass',
    //         rolloff: -24
    //     }
    // })

    // useEffect(()=>{
    //     console.log(settings.filterEnvelope.baseFrequency)
    //      props.inst.set(settings)
    // },[settings])

    // const changePreset = (num) => {
    //     setSettings(presets[num])
    // }
    // let isTicking
    // const debounce = (callback, id,e) => {
    //     e.persist()
    //     if (isTicking) return
    //     requestAnimationFrame(() => {
    //         callback(id,e);
    //         isTicking = false
    //     })
    //     isTicking = true
    // }

    // console.log('HERE', props.instId, props.settings.filterEnvelope.baseFrequency)
    return (
        <div>
            <Row className='row'>
                "SYNTH"
                <button onClick={()=>changePreset(1)}>Preset 1</button>
                <button onClick={()=>changePreset(2)}>Preset 2</button>
                <button onClick={()=>changePreset(3)}>Preset 3</button>
                <button onClick={()=>changePreset(4)}>Preset 4</button>
            </Row>
            <Row className='row'>
                <RangeSlider 
                
                    type='range' 
                    orient='vertical'

                    value={props.settings.filterEnvelope.baseFrequency}
                    data-mod='filterEnvelope' 
                    name='baseFrequency' 
                    min='50' 
                    max='4000' 
                    // onChange={(e) => debounce(props.handleChange, props.instId,e)} 
                    onChange={(e) => props.handleChange(props.instId,e)} 
                />
                <RangeSlider 
                    type='range' 
                    orient='vertical'
                    value={props.settings.envelope.attack}
                    data-mod='envelope' 
                    name='attack' 
                    min={0.01}
                    max={5}
                    step="0.01"
                    // onChange={(e) => debounce(props.handleChange, props.instId,e)} 
                    onChange={(e) => props.handleChange(props.instId,e)} 
                />
                <RangeSlider 
                    type='range' 
                    orient='vertical'
                    value={props.settings.envelope.decay}
                    data-mod='envelope' 
                    name='decay' 
                    min={0.01}
                    max={5}
                    step="0.01"
                    // onChange={(e) => debounce(props.handleChange, props.instId,e)} 
                    onChange={(e) => props.handleChange(props.instId,e)} 
                />
                <RangeSlider 
                    type='range' 
                    orient='vertical'
                    value={props.settings.envelope.sustain}
                    data-mod='envelope' 
                    name='sustain' 
                    min={0.0}
                    max={1.0}
                    step="0.01"
                    // onChange={(e) => debounce(props.handleChange, props.instId,e)} 
                    onChange={(e) => props.handleChange(props.instId,e)} 
                />
                <RangeSlider 
                    type='range' 
                    orient='vertical'
                    value={props.settings.envelope.release}
                    data-mod='envelope' 
                    name='release' 
                    min={0.01}
                    max={5}
                    step="0.01"
                    // onChange={(e) => debounce(props.handleChange, props.instId,e)} 
                    onChange={(e) => props.handleChange(props.instId,e)} 
                />
            </Row>
        </div>
        )
}

export default Synth