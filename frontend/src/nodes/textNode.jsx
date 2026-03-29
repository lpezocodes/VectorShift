// textNode.js
import { useRef, useEffect, useState, useCallback } from 'react'
import {
  useReactFlow,
  Position,
  Handle,
  useUpdateNodeInternals,
} from 'reactflow'
import { BaseNode } from './baseNode'
import { toolbarStyles } from '../styles/styles'
import { useTheme } from '@mui/material/styles'

const adjustTextAreaSize = textAreaRef => {
  if (textAreaRef.current) {
    textAreaRef.current.style.height = 'auto'
    textAreaRef.current.style.height = `${textAreaRef.current.scrollHeight}px`
  }
}

const extractVariables = text =>
  [...text.matchAll(/{{\s*([a-zA-Z_$][a-zA-Z_$0-9]*)\s*}}/g)].map(
    match => match[1]
  )

export const TextNode = ({ id, data }) => {
  const theme = useTheme()
  const styles = toolbarStyles(theme)
  const textAreaRef = useRef(null)
  const { getEdges, setEdges } = useReactFlow()
  const updateNodeInternals = useUpdateNodeInternals()
  const [variableHandles, setVariableHandles] = useState(['input'])

  const updateHandlesAndEdges = useCallback(
    text => {
      const validHandles = extractVariables(text)
      const currentEdges = getEdges()

      setEdges(
        currentEdges.filter(
          edge =>
            !(
              edge.target === id &&
              !validHandles.includes(edge.targetHandle.replace(`${id}-`, ''))
            )
        )
      )

      setVariableHandles(validHandles)
      updateNodeInternals(id)
    },
    [getEdges, setEdges, id, updateNodeInternals]
  )

  useEffect(() => {
    adjustTextAreaSize(textAreaRef)
    updateHandlesAndEdges(data?.text || '{{input}}')
  }, [data?.text, updateHandlesAndEdges])

  return (
    <BaseNode
      id={id}
      data={{ ...data, text: data?.text || '{{input}}' }}
      title="Text"
      handleConfigs={[
        { type: 'source', position: Position.Right, id: `${id}-output` },
      ]}
      customRender={(data, handleFieldChange) => (
        <div style={{ position: 'relative', marginBottom: '10px' }}>
          {/* Dynamic Handles */}
          {variableHandles.map((variable, index) => (
            <div
              key={variable}
              style={{
                position: 'absolute',
                left: -25,
                top: `${index * 20 + 10}px`,
                transform: 'translateX(-100%)',
                display: 'flex',
                alignItems: 'center',
                whiteSpace: 'nowrap',
                overflow: 'visible',
              }}
            >
              <Handle
                type="target"
                position={Position.Left}
                id={`${id}-${variable}`}
                isConnectable
                style={{ width: '8px', height: '8px' }}
              />
              <span
                style={{
                  marginLeft: '5px',
                  fontSize: '13px',
                  whiteSpace: 'nowrap',
                }}
              >
                {variable}
              </span>
            </div>
          ))}
          {/* Text area */}
          <textarea
            ref={textAreaRef}
            value={data.text || ''}
            onChange={e => {
              const newText = e.target.value
              handleFieldChange('text', newText)
              adjustTextAreaSize(textAreaRef)
              updateHandlesAndEdges(newText)
            }}
            maxLength={500}
            style={styles.textAreaField}
          />
          {/* Character count */}
          <small style={{ fontSize: '12px', display: 'block' }}>
            <b>Character Count:</b> {(data.text || '').length}/500
          </small>
        </div>
      )}
    />
  )
}
