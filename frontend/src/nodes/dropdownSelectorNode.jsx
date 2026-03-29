// dropdownSelectorNode.js
import { BaseNode } from './baseNode'
import { Position } from 'reactflow'

export const DropdownSelectorNode = ({ id, data }) => (
  <BaseNode
    id={id}
    data={data}
    title="Parameter Type"
    fields={[
      {
        label: 'Option',
        type: 'select',
        key: 'dropdownOption',
        options: ['File', 'Text', 'Number', 'Boolean', 'Vector'],
      },
    ]}
    handleConfigs={[
      { type: 'source', position: Position.Right, id: `${id}-output` },
    ]}
  />
)
