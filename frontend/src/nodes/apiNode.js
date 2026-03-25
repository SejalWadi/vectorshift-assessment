import { Position } from 'reactflow';
import { BaseNode } from './baseNode';

export const ApiNode = ({ id }) => {
  const handles = [
    { type: 'target', position: Position.Left, id: `${id}-endpoint` },
    { type: 'source', position: Position.Right, id: `${id}-response` }
  ];
  return (
    <BaseNode id={id} label="API Request" handles={handles}>
      <span>Fetches external data.</span>
    </BaseNode>
  );
};