// textNode.js

import { useState, useRef, useEffect } from 'react';
import { Position } from 'reactflow';
import { BaseNode } from './baseNode';

export const TextNode = ({ id, data }) => {
  const [currText, setCurrText] = useState(data?.text || '{{input}}');
  const [variables, setVariables] = useState([]);
  const textAreaRef = useRef(null);

  // Effect to handle both Auto-Resizing and Variable Extraction
  useEffect(() => {
    // 1. EXTRACT VARIABLES using Regex
    // This regex looks for {{, optional spaces, valid JS variable name, optional spaces, }}
    const regex = /\{\{\s*([a-zA-Z_$][a-zA-Z0-9_$]*)\s*\}\}/g;
    const matches = [...currText.matchAll(regex)];
    const extractedVariables = matches.map(match => match[1]);
    
    // Remove duplicates so we don't render multiple handles for the same variable
    const uniqueVariables = [...new Set(extractedVariables)];
    setVariables(uniqueVariables);

    // 2. AUTO-RESIZE TEXTAREA
    if (textAreaRef.current) {
      // Temporarily reset dimensions to calculate true scroll size
      textAreaRef.current.style.height = 'auto';
      textAreaRef.current.style.width = 'auto';
      
      // Apply new scroll dimensions
      textAreaRef.current.style.height = `${textAreaRef.current.scrollHeight}px`;
      // We add a tiny buffer (10px) to the width to prevent text from wrapping awkwardly while typing
      textAreaRef.current.style.width = `${Math.max(180, textAreaRef.current.scrollWidth + 10)}px`;
    }
  }, [currText]);

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
      // Calculate 'top' percentage so handles are spaced evenly along the left edge
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
            resize: 'none', // Prevent manual dragging to resize
            overflow: 'hidden', // Hide scrollbars
            minHeight: '40px',
            minWidth: '180px',
            fontFamily: 'inherit'
          }}
        />
      </label>
    </BaseNode>
  );
};