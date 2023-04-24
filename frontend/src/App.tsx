import './App.css';
import React, { useCallback, useState } from 'react';
import {
    CssBaseline,
    createTheme,
    Button,
    SelectChangeEvent,
    Slider,
    ThemeProvider
} from "@mui/material";
import { MuiColorInput } from 'mui-color-input';

import PresetSelect, { INITIAL_PRESET } from './PresetSelect'
import { useRequest } from './requestHook'


function App() {
    const darkTheme = createTheme({palette: { mode: 'dark' }});
    const [color, setColor] = useState('#ffffff')
    const [preset, setPreset] = useState(INITIAL_PRESET);
    const [speed, setSpeed] = useState(0);
    const [status, setStatus] = useState('Hello LED')
    const isInitialPreset = preset === INITIAL_PRESET;

    const onOnButton = useRequest('/on', {}, setStatus)
    const onOffButton = useRequest('/off', {}, setStatus)
    const onPresetPauseButton = useRequest('/pause', {}, setStatus)
    const onPresetRunButton = useRequest('/run', {}, setStatus)
    const onSetColorButton = useRequest('/set_color', {color}, setStatus)
    const onPresetButton = useRequest('/set_preset', {id: preset, speed}, setStatus)

    const handleColorChange = (color: string) => {
        setColor(color)
    }
    const onPresetChange = (event: SelectChangeEvent) => {
        setPreset(event.target.value)
    }
    const onSpeedChange = (_event: Event, newValue: number | number[]) => {
        setSpeed(newValue as number)
    }


    return (
      <ThemeProvider theme={darkTheme}>
        <CssBaseline />
        <div className="App">
          <h1>LED Control</h1>

          <div className='buttons-on-off'>
            <Button color='success' variant='contained' onClick={onOnButton}>On</Button>
            <Button color='warning' variant='contained' onClick={onOffButton}>Off</Button>
          </div>

          <div className='color-selector'>
            <MuiColorInput value={color} format="hex" isAlphaHidden={true} onChange={handleColorChange} />
            <Button color='primary' variant='contained' onClick={onSetColorButton}>Set Color</Button>
          </div>

          <div className='presets'>
              <PresetSelect preset={preset} onPresetChange={onPresetChange}/>
              <div className='speed-slider'>
                  <span>Speed</span>
                  <Slider value={speed} onChange={onSpeedChange} min={0} max={255} />
              </div>
              <Button
                  color='primary'
                  variant='contained'
                  disabled={isInitialPreset}
                  onClick={onPresetButton}
              >Set Preset</Button>
              <Button
                  color='primary'
                  variant='contained'
                  disabled={isInitialPreset}
                  onClick={onPresetPauseButton}
              >Pause</Button>
              <Button
                  color='primary'
                  variant='contained'
                  disabled={isInitialPreset}
                  onClick={onPresetRunButton}
              >Run</Button>
          </div>

          <div className='status'>{status}</div>
        </div>
      </ThemeProvider>
    );
}

export default App;
