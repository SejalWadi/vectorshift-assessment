// baseNode.js

import { Handle, Position } from 'reactflow';

export const BaseNode = ({ id, label, children, handles }) => {
  return (
    <div 
      style={{ 
        minWidth: 220, 
        width: 'fit-content', // Allows the node to grow if children grow
        minHeight: 80, 
        backgroundColor: '#ffffff',
        borderRadius: '12px', 
        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
        border: '1px solid #e5e7eb',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden' // Keeps the header background contained
      }}
    >
      {/* Node Header */}
      <div 
        style={{ 
          backgroundColor: '#6366f1', // Indigo color for the header
          color: 'white',
          padding: '8px 12px',
          fontWeight: '600',
          fontSize: '14px',
          boxShadow: '0 1px 2px rgba(0,0,0,0.05)'
        }}
      >
        {label}
      </div>
      
      {/* Node Content Body */}
      <div style={{ padding: '12px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
        {children}
      </div>

      {/* Render Handles dynamically */}
      {handles && handles.map((h, index) => (
        <Handle
          key={`${id}-handle-${index}`}
          type={h.type}
          position={h.position}
          id={h.id}
          style={{
            width: '10px',
            height: '10px',
            backgroundColor: '#818cf8', // Lighter indigo for handles
            border: '2px solid white',
            boxShadow: '0 0 2px rgba(0,0,0,0.3)',
            ...h.style // Allow overriding styles (like 'top' position)
          }}
        />
      ))}
    </div>
  );
};