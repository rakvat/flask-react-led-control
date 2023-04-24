import { MenuItem, Select, SelectChangeEvent } from "@mui/material";

interface Props {
    preset: string,
    onPresetChange: (event: SelectChangeEvent) => void,
}
export const INITIAL_PRESET = ' '

export default function PresetSelect(props: Props) {
    return (
        <Select className='presets-select' value={props.preset} onChange={props.onPresetChange} >
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
    )
}
