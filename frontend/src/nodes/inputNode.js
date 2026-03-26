// inputNode.js

import { useState } from 'react';
import { Position } from 'reactflow';
import { BaseNode } from './baseNode';

export const InputNode = ({ id, data }) => {
  const [currName, setCurrName] = useState(data?.inputName || id.replace('customInput-', 'input_'));
  const [inputType, setInputType] = useState(data.inputType || 'Text');

  const handles = [{ type: 'source', position: Position.Right, id: `${id}-value` }];

  return (
    <BaseNode id={id} label="Input" icon="⇥" handles={handles}>
      {/* Description from the screenshot */}
      <div style={{ fontSize: '12px', color: '#6b7280', lineHeight: '1.4' }}>
        Pass data of different types into your workflow
      </div>

      {/* Purple variable name input block */}
      <div style={{
        backgroundColor: '#e0e7ff', // Soft purple background for input
        padding: '8px',
        borderRadius: '6px',
      }}>
         <input
            type="text"
            value={currName}
            onChange={(e) => setCurrName(e.target.value)}
            style={{ 
                background: 'transparent', 
                border: 'none', 
                textAlign: 'center', 
                fontWeight: '600', 
                width: '100%', 
                outline: 'none',
                color: '#374151',
                fontSize: '14px'
            }}
         />
      </div>

      {/* Type dropdown with Badge */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span style={{ fontSize: '13px', fontWeight: '600', color: '#374151' }}>Type</span>
          <span style={{ backgroundColor: '#6366f1', color: 'white', fontSize: '10px', padding: '3px 8px', borderRadius: '12px' }}>Dropdown</span>
        </div>
        <select className="node-select" value={inputType} onChange={(e) => setInputType(e.target.value)}>
          <option value="Text">Text</option>
          <option value="File">File</option>
        </select>
      </div>
    </BaseNode>
  );
};