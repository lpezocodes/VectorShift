// dateNode.js
import { BaseNode } from './baseNode'
import { Position } from 'reactflow'

export const DateNode = ({ id, data }) => (
  <BaseNode
    id={id}
    data={{
      ...data,
      dateValue: data?.dateValue || '',
    }}
    title="Date Picker"
    fields={[
      {
        label: 'Select Date',
        type: 'date',
        key: 'dateValue',
      },
    ]}
    handleConfigs={[
      { type: 'source', position: Position.Right, id: `${id}-output` },
    ]}
  />
)
