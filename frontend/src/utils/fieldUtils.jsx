// fieldUtils.js

import React from 'react'
import 'reactflow/dist/style.css'

export const renderSelectField = ({
  value,
  onChange,
  options = ['Text', 'File'],
  style,
}) => (
  <select value={value} onChange={onChange} style={style}>
    {options.map(option => (
      <option key={option} value={option}>
        {option}
      </option>
    ))}
  </select>
)

export const renderCheckboxField = ({ checked, onChange, style }) => (
  <input type="checkbox" checked={checked} onChange={onChange} style={style} />
)

export const renderTextField = ({ value, onChange, style }) => (
  <input type="text" value={value} onChange={onChange} style={style} />
)

export const renderSliderField = ({
  value,
  onChange,
  min = 0,
  max = 100,
  step = 1,
  style,
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
    style={style}
  />
)

export const renderNumberInputField = ({
  value,
  onChange,
  min = 0,
  max = 100,
  step = 1,
  style,
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
    style={style}
  />
)

export const renderDateField = ({ value, onChange, style }) => (
  <input
    type="date"
    value={value}
    onChange={onChange}
    className="nodrag"
    style={style}
  />
)
