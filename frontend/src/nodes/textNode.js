// textNode.js

import { useState, useRef, useEffect } from 'react';
import { Position, useUpdateNodeInternals } from 'reactflow';
import { BaseNode } from './baseNode';

export const TextNode = ({ id, data }) => {
  const [currText, setCurrText] = useState(data?.text || '{{input}}');
  const [variables, setVariables] = useState([]);
  const textAreaRef = useRef(null);
  
  // 1. Hook to tell React Flow when handles change
  const updateNodeInternals = useUpdateNodeInternals();

  // Effect to handle Auto-Resizing and Variable Extraction
  useEffect(() => {
    const regex = /\{\{\s*([a-zA-Z_$][a-zA-Z0-9_$]*)\s*\}\}/g;
    const matches = [...currText.matchAll(regex)];
    const extractedVariables = matches.map(match => match[1]);
    const uniqueVariables = [...new Set(extractedVariables)];
    
    // Only update state if the variables actually changed to prevent infinite loops
    if (JSON.stringify(uniqueVariables) !== JSON.stringify(variables)) {
      setVariables(uniqueVariables);
    }

    // Auto-resize logic
    if (textAreaRef.current) {
      textAreaRef.current.style.height = 'auto';
      textAreaRef.current.style.width = 'auto';
      textAreaRef.current.style.height = `${textAreaRef.current.scrollHeight}px`;
      textAreaRef.current.style.width = `${Math.max(180, textAreaRef.current.scrollWidth + 10)}px`;
    }
  }, [currText, variables]);

  // 2. Tell React Flow to update its internal node state whenever 'variables' changes
  useEffect(() => {
    updateNodeInternals(id);
  }, [variables, id, updateNodeInternals]);

  const handleTextChange = (e) => {
    setCurrText(e.target.value);
  };

  // Base output handle on the right
  const handles = [{ type: 'source', position: Position.Right, id: `${id}-output` }];

  // Dynamically generate target handles for every variable found
  variables.forEach((variable, index) => {
    handles.push({
      type: 'target',
      position: Position.Left,
      id: `${id}-${variable}`,
      style: { top: `${((index + 1) * 100) / (variables.length + 1)}%` }
    });
  });

  return (
    <BaseNode id={id} label="Text" handles={handles}>
      <label className="node-label">
        Text:
        <textarea 
          ref={textAreaRef}
          className="node-input"
          value={currText} 
          onChange={handleTextChange} 
          style={{ 
            resize: 'none', 
            overflow: 'hidden', 
            minHeight: '40px',
            minWidth: '180px',
            fontFamily: 'inherit'
          }}
        />
      </label>
    </BaseNode>
  );
};