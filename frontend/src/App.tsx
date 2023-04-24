import './App.css';
import React, { useCallback, useState } from 'react';
import {
    CssBaseline,
    createTheme,
    Button,
    MenuItem,
    Select,
    SelectChangeEvent,
    Slider,
    ThemeProvider
} from "@mui/material";
import { MuiColorInput } from 'mui-color-input';

const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
};

function App() {
  const darkTheme = createTheme({
    palette: {
      mode: 'dark',
    },
  });
  const INITIAL_PRESET = ' '
  const [color, setColor] = useState('#ffffff')
  const [preset, setPreset] = useState(INITIAL_PRESET);
  const [speed, setSpeed] = useState(0);
  const [status, setStatus] = useState('Hello LED')

  const onOnButton = useCallback(() => {
      fetch('/on', requestOptions)
          .then(response => response.json())
          .then(data => setStatus(data.message));
  },[setStatus])

  const onOffButton = useCallback(() => {
      fetch('/off', requestOptions)
          .then(response => response.json())
          .then(data => setStatus(data.message));
  },[setStatus])

  const onPresetPauseButton = useCallback(() => {
      fetch('/pause', requestOptions)
          .then(response => response.json())
          .then(data => setStatus(data.message));
  },[setStatus])

  const onPresetRunButton = useCallback(() => {
      fetch('/run', requestOptions)
          .then(response => response.json())
          .then(data => setStatus(data.message));
  },[setStatus])

  const onSetColorButton = useCallback(() => {
      fetch('/set_color', {...requestOptions, body: JSON.stringify({color})})
          .then(response => response.json())
          .then(data => setStatus(data.message));
  },[setStatus, color])

  const onPresetButton = useCallback(() => {
      fetch('/set_preset', {...requestOptions, body: JSON.stringify({id: preset, speed})})
          .then((response) => {
              if (response.status > 400) {
                  setStatus('Failed to connect :(');
              }
              return response.json()
          })
          .then(data => setStatus(data.message));
  },[setStatus, speed, preset])

  const handleColorChange = (color: string) => {
      setColor(color)
  }

  const onPresetChange = useCallback((event: SelectChangeEvent) => {
      setPreset(event.target.value)
  },[setPreset])

  const onSpeedChange = useCallback((_event: Event, newValue: number | number[]) => {
      setSpeed(newValue as number)
  },[setSpeed])


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
            <Select
              className='presets-select'
              value={preset}
              onChange={onPresetChange}
            >
                <MenuItem value={INITIAL_PRESET}>Pick a Preset</MenuItem>
                <MenuItem value={'25'}>seven color cross fade</MenuItem>
                <MenuItem value={'26'}>red gradual change</MenuItem>
                <MenuItem value={'27'}>green gradual change</MenuItem>
                <MenuItem value={'28'}>blue gradual change</MenuItem>
                <MenuItem value={'29'}>yellow gradual change</MenuItem>
                <MenuItem value={'2A'}>cyan gradual change</MenuItem>
                <MenuItem value={'2B'}>purple gradual change</MenuItem>
                <MenuItem value={'2C'}>white gradual change</MenuItem>
                <MenuItem value={'2D'}>red, green cross fade</MenuItem>
                <MenuItem value={'2E'}>red, blue cross fade</MenuItem>
                <MenuItem value={'2F'}>green, blue cross fade</MenuItem>
                <MenuItem value={'30'}>seven color strobe flash</MenuItem>
                <MenuItem value={'31'}>red strobe flash</MenuItem>
                <MenuItem value={'32'}>green strobe flash</MenuItem>
                <MenuItem value={'33'}>blue strobe flash</MenuItem>
                <MenuItem value={'34'}>yellow strobe flash</MenuItem>
                <MenuItem value={'35'}>cyan strobe flash</MenuItem>
                <MenuItem value={'36'}>purple strobe flash</MenuItem>
                <MenuItem value={'37'}>white strobe flash</MenuItem>
                <MenuItem value={'38'}>seven color jumbing change</MenuItem>

                <MenuItem value={'42'}>Rainbow</MenuItem>
                <MenuItem value={'43'}>Reds</MenuItem>
            </Select>
            <div className='speed-slider'>
                <span>Speed</span>
                <Slider value={speed} onChange={onSpeedChange} min={0} max={255} />
            </div>
            <Button
                color='primary'
                variant='contained'
                disabled={preset===INITIAL_PRESET}
                onClick={onPresetButton}
            >Set Preset</Button>
            <Button
                color='primary'
                variant='contained'
                disabled={preset===INITIAL_PRESET}
                onClick={onPresetPauseButton}
            >Pause</Button>
            <Button
                color='primary'
                variant='contained'
                disabled={preset===INITIAL_PRESET}
                onClick={onPresetRunButton}
            >Run</Button>
        </div>

        <div className='status'>{status}</div>
      </div>
    </ThemeProvider>
  );
}

export default App;
