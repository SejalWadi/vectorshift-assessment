// baseNode.js

import { Handle } from 'reactflow';

export const BaseNode = ({ id, label, children, handles }) => {
  return (
    <div 
      style={{ 
        minWidth: 220, 
        width: 'fit-content',
        minHeight: 80, 
        backgroundColor: '#ffffff',
        borderRadius: '12px', 
        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
        border: '1px solid #e5e7eb',
        display: 'flex',
        flexDirection: 'column',
        // We removed overflow: 'hidden' here so the handles are fully clickable!
      }}
    >
      {/* Node Header */}
      <div 
        style={{ 
          backgroundColor: '#6366f1', 
          color: 'white',
          padding: '8px 12px',
          fontWeight: '600',
          fontSize: '14px',
          boxShadow: '0 1px 2px rgba(0,0,0,0.05)',
          // We added rounded corners directly to the header to keep it looking clean
          borderTopLeftRadius: '11px',
          borderTopRightRadius: '11px'
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
            width: '12px', // Made slightly larger to grab easily
            height: '12px',
            backgroundColor: '#818cf8', 
            border: '2px solid white',
            boxShadow: '0 0 2px rgba(0,0,0,0.3)',
            ...h.style 
          }}
        />
      ))}
    </div>
  );
};