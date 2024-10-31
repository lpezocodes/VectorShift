// baseNode.js

// #region  Documentation
/**
 * BaseNode Component
 * 
 * A reusable node template for various node types in React Flow diagrams.
 * 
 * Props:
 * @param {string} id - Unique identifier for the node.
 * @param {object} data - Initial data for the node's state.
 * @param {string} title - Title for the node (e.g., "Input", "Output").
 * @param {Array} fields - Configurations for node input fields.
 *    - Each field has:
 *      - label: Field label.
 *      - type: Field input type ("text" or "select").
 *      - key: Unique key for state storage.
 * @param {Array} handleConfigs - Configurations for node connection points (handles).
 *    - Each handle config has:
 *      - type: Handle type ("source" or "target").
 *      - position: Handle position on the node.
 *      - id: Unique handle ID.
 *      - style: (Optional) Custom styling for the handle.
 * @param {JSX.Element} extraContent - Optional custom content.
 */
// #endregion

import { useState } from 'react';
import { Handle } from 'reactflow';

export const BaseNode = ({ id, data, title, fields = [], handleConfigs = [], extraContent }) => {
  const [localData, setLocalData] = useState(data);

  const handleFieldChange = (fieldKey, value) => {
    setLocalData((prevData) => ({ ...prevData, [fieldKey]: value }));
  };

  return (
    <div style={{ width: 200, height: 80, border: '1px solid black' }}>
      <div>
        <span>{title}</span>
      </div>
      {fields.length > 0 && (
        <div>
          {fields.map(({ label, type, key }) => (
            <label key={key}>
              {label}:
              {type === 'select' ? (
                <select
                  value={localData[key]}
                  onChange={(e) => handleFieldChange(key, e.target.value)}
                >
                  <option value="Text">Text</option>
                  <option value="File">File</option>
                </select>
              ) : (
                <input
                  type="text"
                  value={localData[key]}
                  onChange={(e) => handleFieldChange(key, e.target.value)}
                />
              )}
            </label>
          ))}
        </div>
      )}
      {extraContent && <div>{extraContent}</div>}
      {handleConfigs.map(({ type, position, id, style }) => (
        <Handle key={id} type={type} position={position} id={id} style={style} />
      ))}
    </div>
  );
};
