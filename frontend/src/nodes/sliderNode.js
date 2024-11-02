import { BaseNode } from './baseNode'
import { Position } from 'reactflow'
import { useState } from 'react'

export const SliderNode = ({ id, data }) => {
  const [sliderValue, setSliderValue] = useState(data?.sliderValue || 50)

  const handleSliderChange = value => {
    setSliderValue(value)
  }

  return (
    <BaseNode
      id={id}
      data={{
        ...data,
        sliderValue,
      }}
      title="Slider Node"
      fields={[
        {
          label: 'Adjust Value',
          type: 'slider',
          key: 'sliderValue',
          min: 0,
          max: 100,
          step: 5,
          onChange: handleSliderChange,
        },
      ]}
      handleConfigs={[
        { type: 'source', position: Position.Right, id: `${id}-output` },
      ]}
      extraContent={<span>Current Value: {sliderValue}</span>}
    />
  )
}
