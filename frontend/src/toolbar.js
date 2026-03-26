// toolbar.js

import { DraggableNode } from './draggableNode';

export const PipelineToolbar = () => {
    return (
        <div style={{ padding: '16px', borderBottom: '1px solid #e5e7eb', backgroundColor: '#fcfcfc' }}>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px' }}>
                <DraggableNode type='customInput' label='Input' icon='⇥' />
                <DraggableNode type='llm' label='LLM' icon='🤖' />
                <DraggableNode type='customOutput' label='Output' icon='➔' />
                <DraggableNode type='text' label='Text' icon='📝' />
                <DraggableNode type='math' label='Math' icon='➗' />
                <DraggableNode type='api' label='API' icon='🌐' />
                <DraggableNode type='display' label='Display' icon='📺' />
                <DraggableNode type='timer' label='Timer' icon='⏱️' />
                <DraggableNode type='note' label='Note' icon='🗒️' />
            </div>
        </div>
    );
};