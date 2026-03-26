// baseNode.js

import { Handle } from 'reactflow';
import { useStore } from '../store'; // Import the store

export const BaseNode = ({ id, label, children, handles, icon }) => {
  // Grab the delete action from our store
  const deleteNode = useStore((state) => state.deleteNode);

  return (
    <div 
      style={{ 
        minWidth: 260, 
        width: 'fit-content',
        backgroundColor: '#ffffff',
        borderRadius: '10px', 
        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
        border: '1px solid #c4b5fd', 
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {/* Node Header */}
      <div 
        style={{ 
          backgroundColor: '#ede9fe', 
          color: '#4c1d95', 
          padding: '10px 14px',
          borderTopLeftRadius: '9px',
          borderTopRightRadius: '9px',
          borderBottom: '1px solid #c4b5fd',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          fontWeight: '600',
          fontSize: '15px',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          {icon && <span style={{ fontSize: '18px' }}>{icon}</span>}
          <span>{label}</span>
        </div>
        
        {/* ADDED onClick HANDLER HERE */}
        <span 
          onClick={() => deleteNode(id)} 
          style={{ color: '#8b5cf6', cursor: 'pointer', fontSize: '16px' }}
        >
          ⊗
        </span>
      </div>
      
      {/* Node Content Body */}
      <div style={{ padding: '16px', display: 'flex', flexDirection: 'column', gap: '14px' }}>
        {children}
      </div>

      {/* Render Handles */}
      {handles && handles.map((h, index) => (
        <Handle
          key={`${id}-handle-${index}`}
          type={h.type}
          position={h.position}
          id={h.id}
          style={{
            width: '14px', 
            height: '14px',
            backgroundColor: '#ffffff', 
            border: '2px solid #6366f1', 
            ...h.style 
          }}
        />
      ))}
    </div>
  );
};