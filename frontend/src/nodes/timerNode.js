import { Position } from 'reactflow';
import { BaseNode } from './baseNode';

export const TimerNode = ({ id }) => {
  const handles = [{ type: 'source', position: Position.Right, id: `${id}-trigger` }];
  return (
    <BaseNode id={id} label="Timer" handles={handles}>
      <span>Triggers every 5s</span>
    </BaseNode>
  );
};