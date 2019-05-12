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
    attack: 0.01 ,
    decay: 0.2 ,
    sustain: 0.5 ,
    release: 0.9 ,
    baseFrequency: 1000 ,
    octaves: 2 ,
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
    attack: 0.01 ,
    decay: 0.01 ,
    sustain: 1 ,
    release: 0.01 ,
    baseFrequency: 1000 ,
    octaves: 3
  }
}
export const settings3 = {
  oscillator: {
    type: 'pwm',
    modulationFrequency: 0.2
  },
  envelope: {
    attack: 0.001,
    decay: 0.1,
    sustain: 1,
    release: 0.001
  },
  filterEnvelope: {
    attack: 0.001 ,
    decay: 0.01 ,
    sustain: 0 ,
    release: 0.001 ,
    baseFrequency: 50 ,
    octaves: 7
  }
}

export const settings4 = {
  oscillator: {
    type: 'fmsquare',
    modulationType: 'sawtooth',
    harmonicity: 0.3456
  },
  envelope: {
    attack: 0.001,
    decay: 0.1,
    sustain: 0,
    release: 0.001
  },
  filterEnvelope: {
    attack: 0.001 ,
    decay: 0.1 ,
    sustain: 0 ,
    release: 0.001 ,
    baseFrequency: 400 ,
    octaves: 1
  },
  filter: {
    type: 'highpass'
  }
}
