import { BaseNode } from './baseNode'
import { Position } from 'reactflow'
import { useState } from 'react'
import { toolbarStyles } from '../styles'
import { useTheme } from '@mui/material/styles'
import Slider from '@mui/material/Slider'

export const SliderNode = ({ id, data }) => {
  const [sliderValue, setSliderValue] = useState(data?.sliderValue || 50)
  const theme = useTheme()
  const styles = toolbarStyles(theme)

  const handleSliderChange = (event, newValue) => {
    setSliderValue(newValue)
  }

  return (
    <BaseNode
      id={id}
      data={{
        ...data,
        sliderValue,
      }}
      title="Slider Value"
      extraContent={
        <div style={styles.sliderFieldContainer}>
          <label style={styles.sliderLabel}>Adjust Value:</label>
          <Slider
            value={sliderValue}
            onChange={handleSliderChange}
            min={0}
            max={100}
            step={5}
            className="nodrag"
            sx={styles.slider}
          />
          <span style={styles.currentValueText}>
            <b>Current Value:</b> {sliderValue}
          </span>
        </div>
      }
      handleConfigs={[
        { type: 'source', position: Position.Right, id: `${id}-output` },
      ]}
    />
  )
}
