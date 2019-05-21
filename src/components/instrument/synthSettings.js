export const settings = {
    oscillator: {
        type: 'sawtooth',
        modulationFrequency: 0.2
    },
    envelope: {
        attack: 0.01,
        decay: 0.1,
        sustain: 0.9,
        release: 0.9
    },
    filterEnvelope: {
        attack: 0.01,
        decay: 0.2,
        sustain: 0.5,
        release: 0.9,
        baseFrequency: 1000,
        octaves: 2,
        exponent: 1
    },
    filter: {
        Q: 6,
        type: 'lowpass',
        rolloff: -24
    }
}
export const settings2 = {
    oscillator: {
        type: 'pwm',
        modulationFrequency: 0.2
    },
    envelope: {
        attack: 0.01,
        decay: 0.1,
        sustain: 0.9,
        release: 0.01
    },
    filterEnvelope: {
        attack: 0.01,
        decay: 0.01,
        sustain: 1,
        release: 0.01,
        baseFrequency: 1000,
        octaves: 3
    },
    filter: {
        Q: 2,
        type: 'lowpass',
        rolloff: -24
    }
}
export const settings3 = {
    oscillator: {
        type: 'square',
    },
    envelope: {
        attack: 0.2,
        decay: 0.2,
        sustain: 1,
        release: 0.7
    },
    filterEnvelope: {
        attack: 0.001,
        decay: 0.2,
        sustain: 0.5,
        release: 0.9,
        baseFrequency: 150,
        octaves: 4
    },
    filter: {
        Q: 2,
        type: 'lowpass',
        rolloff: -24
    }
}

export const settings4 = {
    oscillator: {
        type: 'fmsquare',
        modulationType: 'sawtooth',
        harmonicity: 1.5
    },
    envelope: {
        attack: 0.1,
        decay: 0.1,
        sustain: 1,
        release: 0.1
    },
    filterEnvelope: {
        attack: 0.001,
        decay: 0.1,
        sustain: 1,
        release: 0.5,
        baseFrequency: 4000,
        octaves: 4
    },
    filter: {
        Q: 1,
        type: 'lowpass',
        rolloff: -12
    }
}
