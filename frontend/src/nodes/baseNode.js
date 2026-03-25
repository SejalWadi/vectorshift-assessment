import { Handle } from 'reactflow';

export const BaseNode = ({ id, label, children, handles }) => {
  return (
    <div style={{ width: 200, minHeight: 80, border: '1px solid black', padding: '10px', borderRadius: '5px', backgroundColor: '#fff' }}>
      <div style={{ fontWeight: 'bold', borderBottom: '1px solid #ddd', paddingBottom: '5px', marginBottom: '10px' }}>
        <span>{label}</span>
      </div>
      
      <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
        {children}
      </div>

      {handles && handles.map((h, index) => (
        <Handle
          key={`${id}-handle-${index}`}
          type={h.type}
          position={h.position}
          id={h.id}
          style={h.style}
        />
      ))}
    </div>
  );
};