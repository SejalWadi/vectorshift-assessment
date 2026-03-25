import { Position } from 'reactflow';
import { BaseNode } from './baseNode';

export const DisplayNode = ({ id }) => {
  const handles = [{ type: 'target', position: Position.Left, id: `${id}-input` }];
  return (
    <BaseNode id={id} label="Display" handles={handles}>
      <span style={{ color: 'gray' }}>Shows output here...</span>
    </BaseNode>
  );
};