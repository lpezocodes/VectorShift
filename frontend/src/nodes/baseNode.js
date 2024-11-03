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
import { toolbarStyles } from '../styles/styles'
import { useTheme } from '@mui/material/styles'
import { useStore } from '../store'
import IconButton from '@mui/material/IconButton'
import CloseIcon from '@mui/icons-material/Close'

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
  const { deleteNode } = useStore()

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
      <div
        style={{
          ...styles.topbarStyles,
          ...customStyles.topbarStyles,
          position: 'relative',
        }}
      >
        <span>{title}</span>
        <IconButton onClick={() => deleteNode(id)} sx={styles.deleteButton}>
          <CloseIcon />
        </IconButton>
      </div>

      {/* Fields */}
      {fields.length > 0 && (
        <div
          style={{ ...styles.fieldContainer, ...customStyles.fieldContainer }}
        >
          {fields.map(field => (
            <div
              key={field.key}
              style={
                field.type === 'checkbox'
                  ? {
                      display: 'flex',
                      alignItems: 'center',
                      marginBottom: '10px',
                    }
                  : { ...styles.fieldWrapper }
              }
            >
              <label
                style={{
                  ...styles.fieldLabel,
                  marginRight: field.type === 'checkbox' ? '10px' : '0',
                }}
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
          style={{
            width: '10px',
            height: '10px',
          }}
        />
      ))}
    </div>
  )
}
