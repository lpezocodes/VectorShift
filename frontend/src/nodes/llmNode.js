// llmNode.js
import { BaseNode } from './baseNode'
import { Position } from 'reactflow'

export const LLMNode = ({ id, data }) => (
  <BaseNode
    id={id}
    data={data}
    title="LLM"
    extraContent={<span>This is a LLM.</span>}
    handleConfigs={[
      {
        type: 'target',
        position: Position.Left,
        id: `${id}-system`,
        style: { top: `${100 / 3}%` },
      },
      {
        type: 'target',
        position: Position.Left,
        id: `${id}-prompt`,
        style: { top: `${200 / 3}%` },
      },
      { type: 'source', position: Position.Right, id: `${id}-response` },
    ]}
  />
)
