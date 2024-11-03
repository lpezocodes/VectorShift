// baseNode.js

import { useState, useEffect } from 'react'
import { Handle } from 'reactflow'
import {
  renderSelectField,
  renderCheckboxField,
  renderTextField,
  renderSliderField,
  renderNumberInputField,
  renderDateField,
} from '../utils/fieldUtils'
import { toolbarStyles } from '../styles'
import { useTheme } from '@mui/material/styles'

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
 *      - type: Input type ("text", "select", "checkbox", "slider", "numberInput", "date").
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
  customRender,
  customStyles = {},
}) => {
  const theme = useTheme()
  const styles = toolbarStyles(theme)

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
      style: styles.inputField,
    }

    switch (field.type) {
      case 'select':
        return renderSelectField({ ...commonProps, options: field.options })
      case 'checkbox':
        return renderCheckboxField({
          checked: localData[field.key] || false,
          onChange: commonProps.onChange,
          style: { ...styles.inputField, width: 'auto' },
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
          style: { ...styles.inputField },
        })
      case 'numberInput':
        return renderNumberInputField({
          value: localData[field.key] || 0,
          onChange: commonProps.onChange,
          min: field.min,
          max: field.max,
          step: field.step,
          style: { ...styles.inputField },
        })
      case 'date':
        return renderDateField({
          value: localData[field.key] || '',
          onChange: commonProps.onChange,
          style: { ...styles.inputField },
        })
      default:
        return renderTextField({
          ...commonProps,
          style: { ...styles.inputField },
        })
    }
  }

  return (
    <div style={{ ...styles.nodeContainer, ...customStyles.nodeContainer }}>
      {/* Topbar */}
      <div style={{ ...styles.topbarStyles, ...customStyles.topbarStyles }}>
        <span>{title}</span>
      </div>

      {/* Fields */}
      {fields.length > 0 && (
        <div
          style={{ ...styles.fieldContainer, ...customStyles.fieldContainer }}
        >
          {fields.map(field => (
            <div
              key={field.key}
              style={{ ...styles.fieldWrapper, ...customStyles.fieldWrapper }}
            >
              <label
                style={{ ...styles.fieldLabel, ...customStyles.fieldLabel }}
              >
                {field.label}:
              </label>
              <div>{renderField(field)}</div>
            </div>
          ))}
        </div>
      )}
      {customRender && <div>{customRender(localData, handleFieldChange)}</div>}
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
