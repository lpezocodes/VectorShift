// inputNode.js
import { BaseNode } from './baseNode'
import { Position } from 'reactflow'

export const InputNode = ({ id, data }) => (
  <BaseNode
    id={id}
    data={{
      ...data,
      inputName: data?.inputName || id.replace('customInput-', 'input_'),
      inputType: data?.inputType || 'Text',
    }}
    title="Input"
    fields={[
      { label: 'Name', type: 'text', key: 'inputName' },
      { label: 'Type', type: 'select', key: 'inputType' },
    ]}
    handleConfigs={[
      { type: 'source', position: Position.Right, id: `${id}-value` },
    ]}
  />
)
