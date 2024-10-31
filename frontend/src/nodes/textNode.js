// textNode.js
import { BaseNode } from './baseNode';
import { Position } from 'reactflow';

export const TextNode = ({ id, data }) => (
  <BaseNode
    id={id}
    data={{
      ...data,
      text: data?.text || '{{input}}'
    }}
    title="Text"
    fields={[
      { label: 'Text', type: 'text', key: 'text' }
    ]}
    handleConfigs={[
      { type: 'source', position: Position.Right, id: `${id}-output` }
    ]}
  />
);
