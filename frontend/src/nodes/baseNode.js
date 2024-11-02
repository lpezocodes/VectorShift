// baseNode.js

import { useState, useEffect } from 'react'
import { Handle } from 'reactflow'
import {
  renderSelectField,
  renderCheckboxField,
  renderTextField,
  renderSliderField,
  renderNumberInputField,
} from '../utils/fieldUtils'

// #region Documentation
/**
 * BaseNode Component
 *
 * A reusable, abstract node component for React Flow diagrams.
 *
 * Props:
 * @param {string} id - Unique identifier for the node.
 * @param {object} data - Initial data for the node's state.
 * @param {string} title - Node title (e.g., "Input", "Output").
 * @param {Array} fields - Configurations for node input fields.
 *    Each field object contains:
 *      - label: Display label for the field.
 *      - type: Input type ("text", "select", "checkbox", "slider", "numberInput").
 *      - key: Unique key for state storage.
 *      - options: Optional array of options for select fields.
 * @param {Array} handleConfigs - Node connection points (handles) configuration.
 *    Each handle object contains:
 *      - type: Handle type ("source" or "target").
 *      - position: Position on the node (e.g., Position.Right).
 *      - id: Unique handle ID.
 *      - style: Optional custom styling for the handle.
 * @param {JSX.Element} extraContent - Optional additional content rendered below fields.
 * @param {boolean} clearTrigger - Triggers a reset of node field values when toggled.
 */
// #endregion

export const BaseNode = ({
  id,
  data,
  title,
  fields = [],
  handleConfigs = [],
  extraContent,
  clearTrigger,
}) => {
  const [localData, setLocalData] = useState(data)

  const handleFieldChange = (fieldKey, value) => {
    setLocalData(prevData => ({ ...prevData, [fieldKey]: value }))
  }

  useEffect(() => {
    if (clearTrigger) {
      const resetData = fields.reduce((acc, field) => {
        acc[field.key] = field.type === 'checkbox' ? false : ''
        return acc
      }, {})
      setLocalData(resetData)
    }
  }, [clearTrigger, fields])

  const renderField = field => {
    const commonProps = {
      value: localData[field.key] || '',
      onChange: e =>
        handleFieldChange(
          field.key,
          field.type === 'checkbox' ? e.target.checked : e.target.value
        ),
    }

    switch (field.type) {
      case 'select':
        return renderSelectField({ ...commonProps, options: field.options })
      case 'checkbox':
        return renderCheckboxField({
          checked: localData[field.key] || false,
          onChange: commonProps.onChange,
        })
      case 'slider':
        return renderSliderField({
          value: localData[field.key] || 0,
          onChange: e => {
            handleFieldChange(field.key, e.target.value)
            field.onChange?.(e.target.value)
          },
          min: field.min,
          max: field.max,
          step: field.step,
        })
      case 'numberInput':
        return renderNumberInputField({
          value: localData[field.key] || 0,
          onChange: commonProps.onChange,
          min: field.min,
          max: field.max,
          step: field.step,
        })
      default:
        return renderTextField(commonProps)
    }
  }

  return (
    <div style={{ width: 200, height: 80, border: '1px solid black' }}>
      <div>
        <span>{title}</span>
      </div>
      {fields.length > 0 && (
        <div>
          {fields.map(field => (
            <label key={field.key}>
              {field.label}: {renderField(field)}
            </label>
          ))}
        </div>
      )}
      {extraContent && <div>{extraContent}</div>}
      {handleConfigs.map(({ type, position, id, style }) => (
        <Handle
          key={id}
          type={type}
          position={position}
          id={id}
          style={style}
        />
      ))}
    </div>
  )
}
