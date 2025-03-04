// numberInputNode.js
import { BaseNode } from './baseNode'
import { Position } from 'reactflow'

export const NumberInputNode = ({ id, data }) => (
  <BaseNode
    id={id}
    data={{
      ...data,
      numberValue: data?.numberValue || 0,
    }}
    title="Numeric Input"
    fields={[
      {
        label: 'Enter Number',
        type: 'numberInput',
        key: 'numberValue',
        min: 0,
        max: 100,
        step: 1,
      },
    ]}
    handleConfigs={[
      { type: 'source', position: Position.Right, id: `${id}-output` },
    ]}
  />
)
