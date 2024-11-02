// fieldUtils.js

import React from 'react'
import 'reactflow/dist/style.css'

export const renderSelectField = ({
  value,
  onChange,
  options = ['Text', 'File'],
}) => (
  <select value={value} onChange={onChange}>
    {options.map(option => (
      <option key={option} value={option}>
        {option}
      </option>
    ))}
  </select>
)

export const renderCheckboxField = ({ checked, onChange }) => (
  <input type="checkbox" checked={checked} onChange={onChange} />
)

export const renderTextField = ({ value, onChange }) => (
  <input type="text" value={value} onChange={onChange} />
)
export const renderSliderField = ({
  value,
  onChange,
  min = 0,
  max = 100,
  step = 1,
}) => (
  <input
    type="range"
    value={value}
    onChange={e => {
      e.stopPropagation()
      onChange(e)
    }}
    onMouseDown={e => e.stopPropagation()}
    min={min}
    max={max}
    step={step}
    className="nodrag"
  />
)

export const renderNumberInputField = ({
  value,
  onChange,
  min = 0,
  max = 100,
  step = 1,
}) => (
  <input
    type="number"
    value={value}
    onChange={e => {
      onChange(e)
    }}
    min={min}
    max={max}
    step={step}
    className="nodrag"
  />
)
