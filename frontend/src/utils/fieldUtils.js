// fieldUtils.js

import React from 'react'

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