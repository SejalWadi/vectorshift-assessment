export const DraggableNode = ({ type, label }) => {
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
          minWidth: '80px', 
          height: '40px', // slightly shorter
          padding: '0 15px',
          display: 'flex', 
          alignItems: 'center', 
          borderRadius: '20px', // Pill shape
          backgroundColor: '#ffffff',
          border: '1px solid #6366f1', // Indigo border
          color: '#6366f1', // Indigo text
          fontWeight: '500',
          fontSize: '14px',
          justifyContent: 'center', 
          boxShadow: '0 2px 4px rgba(0,0,0,0.05)',
          transition: 'all 0.2s ease'
        }} 
        draggable
      >
          <span>{label}</span>
      </div>
    );
  };