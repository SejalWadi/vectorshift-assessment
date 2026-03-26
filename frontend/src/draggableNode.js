// draggableNode.js

export const DraggableNode = ({ type, label, icon }) => {
    const onDragStart = (event, nodeType) => {
      const appData = { nodeType }
      event.target.style.cursor = 'grabbing';
      event.dataTransfer.setData('application/reactflow', JSON.stringify(appData));
      event.dataTransfer.effectAllowed = 'move';
    };
  
    return (
      <div
        className={type}
        onDragStart={(event) => onDragStart(event, type)}
        onDragEnd={(event) => (event.target.style.cursor = 'grab')}
        style={{ 
          cursor: 'grab', 
          width: '72px', 
          height: '72px',
          display: 'flex', 
          flexDirection: 'column',
          alignItems: 'center', 
          justifyContent: 'center', 
          borderRadius: '8px',
          backgroundColor: '#ffffff',
          border: '1px solid #e5e7eb',
          color: '#374151',
          boxShadow: '0 1px 2px rgba(0,0,0,0.05)',
          transition: 'all 0.2s ease',
          gap: '6px'
        }} 
        draggable
      >
          {/* Using simple text/emojis to simulate their SVG icons */}
          <div style={{ fontSize: '20px' }}>{icon}</div>
          <span style={{ fontSize: '12px', fontWeight: '500' }}>{label}</span>
      </div>
    );
  };