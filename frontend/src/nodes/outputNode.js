// outputNode.js
import { BaseNode } from './baseNode'
import { Position } from 'reactflow'

export const OutputNode = ({ id, data }) => (
  <BaseNode
    id={id}
    data={{
      ...data,
      outputName: data?.outputName || id.replace('customOutput-', 'output_'),
      outputType: data?.outputType || 'Text',
    }}
    title="Output"
    fields={[
      { label: 'Name', type: 'text', key: 'outputName' },
      { label: 'Type', type: 'select', key: 'outputType' },
    ]}
    handleConfigs={[
      { type: 'target', position: Position.Left, id: `${id}-value` },
    ]}
  />
)
