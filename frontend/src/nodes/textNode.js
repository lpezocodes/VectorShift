import { useRef, useEffect } from 'react'
import { BaseNode } from './baseNode'
import { Position } from 'reactflow'

export const TextNode = ({ id, data }) => {
  const textAreaRef = useRef(null)

  const adjustTextAreaSize = () => {
    if (textAreaRef.current) {
      const textArea = textAreaRef.current
      textArea.style.height = 'auto'
      textArea.style.height = `${textArea.scrollHeight}px`
    }
  }

  useEffect(() => {
    adjustTextAreaSize()
  }, [])

  return (
    <BaseNode
      id={id}
      data={{
        ...data,
        text: data?.text || '{{input}}',
      }}
      title="Text"
      handleConfigs={[
        { type: 'source', position: Position.Right, id: `${id}-output` },
      ]}
      customRender={(data, handleFieldChange) => (
        <div style={{ position: 'relative', marginBottom: '10px' }}>
          <textarea
            ref={textAreaRef}
            value={data.text || ''}
            onChange={e => {
              handleFieldChange('text', e.target.value)
              adjustTextAreaSize()
            }}
            maxLength={500}
            style={{
              resize: 'none',
              overflow: 'hidden',
              width: '100%',
              height: 'auto',
              minHeight: '40px',
              padding: '5px',
              borderRadius: '5px',
            }}
          />
          <small
            style={{ marginTop: '5px', fontSize: '12px', display: 'block' }}
          >
            <b>Character Count:</b> {(data.text || '').length}/500
          </small>
        </div>
      )}
    />
  )
}
