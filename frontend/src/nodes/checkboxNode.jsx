// checkboxNode.js

import { useState } from 'react'
import { BaseNode } from './baseNode'
import { Position } from 'reactflow'

export const CheckboxNode = ({ id, data }) => {
  const [options, setOptions] = useState({
    normalize: data?.normalize || false,
    tokenize: data?.tokenize || false,
    removeStopWords: data?.removeStopWords || false,
    enableCaching: data?.enableCaching || false,
  })
  const [clearTrigger, setClearTrigger] = useState(false)

  const handleOptionChange = key => {
    setOptions(prevOptions => ({
      ...prevOptions,
      [key]: !prevOptions[key],
    }))
  }

  const clearFields = () => {
    setOptions({
      normalize: false,
      tokenize: false,
      removeStopWords: false,
      enableCaching: false,
    })
    setClearTrigger(prev => !prev)
  }

  return (
    <BaseNode
      id={id}
      data={options}
      title="Processing Options"
      fields={[
        {
          label: 'Normalize',
          type: 'checkbox',
          key: 'normalize',
          checked: options.normalize,
          onChange: () => handleOptionChange('normalize'),
        },
        {
          label: 'Tokenize',
          type: 'checkbox',
          key: 'tokenize',
          checked: options.tokenize,
          onChange: () => handleOptionChange('tokenize'),
        },
        {
          label: 'Remove Stop Words',
          type: 'checkbox',
          key: 'removeStopWords',
          checked: options.removeStopWords,
          onChange: () => handleOptionChange('removeStopWords'),
        },
        {
          label: 'Enable Caching',
          type: 'checkbox',
          key: 'enableCaching',
          checked: options.enableCaching,
          onChange: () => handleOptionChange('enableCaching'),
        },
      ]}
      handleConfigs={[
        { type: 'source', position: Position.Right, id: `${id}-output` },
      ]}
      extraContent={
        <button
          onClick={clearFields}
          style={{
            backgroundColor: '#f0f0f0',
            color: '#333',
            padding: '8px 16px',
            borderRadius: '12px',
            border: '1px solid #ccc',
            fontSize: '14px',
            cursor: 'pointer',
            transition: 'background-color 0.3s ease',
          }}
        >
          Clear Fields
        </button>
      }
      clearTrigger={clearTrigger}
    />
  )
}
