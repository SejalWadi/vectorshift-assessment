import { Position } from 'reactflow';
import { BaseNode } from './baseNode';

export const MathNode = ({ id }) => {
  const handles = [
    { type: 'target', position: Position.Left, id: `${id}-val1`, style: { top: '30%' } },
    { type: 'target', position: Position.Left, id: `${id}-val2`, style: { top: '70%' } },
    { type: 'source', position: Position.Right, id: `${id}-result` }
  ];
  return (
    <BaseNode id={id} label="Math Operation" handles={handles}>
      <span>Adds two numbers.</span>
    </BaseNode>
  );
};