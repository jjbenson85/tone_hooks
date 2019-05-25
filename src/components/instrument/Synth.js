import React, {useEffect, useState} from 'react'

import {settings, settings2, settings3, settings4 } from './synthSettings.js'
import {Row} from './Synth.styled.jsx'
import {RangeSlider, Container, RadioButtons} from '../controls/controls'

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
            <Row>
                SYNTH
                <button onClick={()=>changePreset(1)}>Preset 1</button>
                <button onClick={()=>changePreset(2)}>Preset 2</button>
                <button onClick={()=>changePreset(3)}>Preset 3</button>
                <button onClick={()=>changePreset(4)}>Preset 4</button>
            </Row>
            <Row>
                <RadioButtons
                    label={['sawtooth', 'square', 'triangle', 'sine', 'pwm']}
                    name="type"
                    data-mod='oscillator'
                    onChange={(e) => props.handleChange(props.instId, e)}
                />
                <RangeSlider
                    label='PWM Modulation'
                    value={props.settings.oscillator.modulationFrequency}
                    data-mod='oscillator'
                    name='modulationFrequency'
                    min={0}
                    max={20}
                    step="0.01"
                    // onChange={(e) => debounce(props.handleChange, props.instId,e)} 
                    onChange={(e) => props.handleChange(props.instId, e)}
                />
                <RangeSlider
                    label='Osc Detune'
                    value={props.settings.oscillator.detune}
                    data-mod='oscillator'
                    name='detune'
                    min={0}
                    max={100}
                    step="0.1"
                    // onChange={(e) => debounce(props.handleChange, props.instId,e)} 
                    onChange={(e) => props.handleChange(props.instId, e)}
                />
                <RangeSlider
                    label='Osc Count'
                    value={props.settings.oscillator.count}
                    data-mod='oscillator'
                    name='count'
                    min={0}
                    max={100}
                    step="1"
                    // onChange={(e) => debounce(props.handleChange, props.instId,e)} 
                    onChange={(e) => props.handleChange(props.instId, e)}
                />
                <RangeSlider
                    label='Osc Spread'
                    value={props.settings.oscillator.spread}
                    data-mod='oscillator'
                    name='spread'
                    min={0}
                    max={10}
                    step="1"
                    // onChange={(e) => debounce(props.handleChange, props.instId,e)} 
                    onChange={(e) => props.handleChange(props.instId, e)}
                />
            </Row>
            <Row>
               
                <Container>
                    
                    <RangeSlider 
                    label='Attack'
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
                    label='Decay'
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
                    label='Sustain'
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
                    label='Release'
                        value={props.settings.envelope.release}
                        data-mod='envelope' 
                        name='release' 
                        min={0.01}
                        max={5}
                        step="0.01"
                        // onChange={(e) => debounce(props.handleChange, props.instId,e)} 
                        onChange={(e) => props.handleChange(props.instId,e)} 
                    />
                </Container>
                <Container>
                    
                    <RangeSlider 
                        label='Filter Attack'
                        value={props.settings.filterEnvelope.attack}
                        data-mod='filterEnvelope' 
                        name='attack' 
                        min={0.01}
                        max={5}
                        step="0.01"
                        // onChange={(e) => debounce(props.handleChange, props.instId,e)} 
                        onChange={(e) => props.handleChange(props.instId,e)} 
                    />
                    
                    <RangeSlider 
                        label='Filter Decay'
                        value={props.settings.filterEnvelope.decay}
                        data-mod='filterEnvelope' 
                        name='decay' 
                        min={0.01}
                        max={5}
                        step="0.01"
                        // onChange={(e) => debounce(props.handleChange, props.instId,e)} 
                        onChange={(e) => props.handleChange(props.instId,e)} 
                    />
                    
                    <RangeSlider 
                        label='Filter Sustain'
                        value={props.settings.filterEnvelope.sustain}
                        data-mod='filterEnvelope' 
                        name='sustain' 
                        min={0.0}
                        max={1.0}
                        step="0.01"
                        // onChange={(e) => debounce(props.handleChange, props.instId,e)} 
                        onChange={(e) => props.handleChange(props.instId,e)} 
                    />
                    
                    <RangeSlider 
                        label='Filter Release'
                        value={props.settings.filterEnvelope.release}
                        data-mod='filterEnvelope' 
                        name='release' 
                        min={0.01}
                        max={5}
                        step="0.01"
                        // onChange={(e) => debounce(props.handleChange, props.instId,e)} 
                        onChange={(e) => props.handleChange(props.instId,e)} 
                    />
                </Container>
                <Container>
                    
                    <RangeSlider
                        label='Filter Base'

                        type='range'
                        orient='vertical'

                        value={props.settings.filterEnvelope.baseFrequency}
                        data-mod='filterEnvelope'
                        name='baseFrequency'
                        min='50'
                        max='4000'
                        // onChange={(e) => debounce(props.handleChange, props.instId,e)} 
                        onChange={(e) => props.handleChange(props.instId, e)}
                    />
                    
                    <RangeSlider
                        label='Filter Q'

                        type='range'
                        orient='vertical'

                        value={props.settings.filter.Q}
                        data-mod='filter'
                        name='Q'
                        min='0'
                        max='10'
                        step='0.1'
                        // onChange={(e) => debounce(props.handleChange, props.instId,e)} 
                        onChange={(e) => props.handleChange(props.instId, e)}
                    />
                    
                    <RangeSlider
                        label='Filter Exponent'

                        type='range'
                        orient='vertical'

                        value={props.settings.filterEnvelope.exponent}
                        data-mod='filterEnvelope'
                        name='exponent'
                        min='0'
                        max='5'
                        step='0.1'
                        // onChange={(e) => debounce(props.handleChange, props.instId,e)} 
                        onChange={(e) => props.handleChange(props.instId, e)}
                    />
                    
                    <RangeSlider
                        label='Filter Octaves'

                        type='range'
                        orient='vertical'

                        value={props.settings.filterEnvelope.octaves}
                        data-mod='filterEnvelope'
                        name='octaves'
                        min='0'
                        max='12'
                        step='0.1'
                        // onChange={(e) => debounce(props.handleChange, props.instId,e)} 
                        onChange={(e) => props.handleChange(props.instId, e)}
                    />
                </Container>
            </Row>
        </div>
        )
}

export default Synth