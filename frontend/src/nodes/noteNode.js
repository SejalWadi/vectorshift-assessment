import { BaseNode } from './baseNode';

export const NoteNode = ({ id }) => {
  return (
    <BaseNode id={id} label="Sticky Note" handles={[]}>
      <textarea placeholder="Type a note..." style={{ width: '100%', minHeight: '50px' }} />
    </BaseNode>
  );
};