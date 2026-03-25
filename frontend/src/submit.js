// submit.js

import { useStore } from './store';
import { shallow } from 'zustand/shallow';

export const SubmitButton = () => {
    // Extract nodes and edges from the Zustand store
    const { nodes, edges } = useStore((state) => ({
        nodes: state.nodes,
        edges: state.edges
    }), shallow);

    const handleSubmit = async () => {
        try {
            // Package the data exactly how FastAPI expects it (a stringified JSON inside a Form field)
            const pipelineData = { nodes, edges };
            const formData = new FormData();
            formData.append('pipeline', JSON.stringify(pipelineData));

            // Send the POST request to the backend
            const response = await fetch('http://localhost:8000/pipelines/parse', {
                method: 'POST',
                body: formData,
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const data = await response.json();
            
            // Display the required alert
            alert(
                `Pipeline Parsed Successfully!\n\n` +
                `Number of Nodes: ${data.num_nodes}\n` +
                `Number of Edges: ${data.num_edges}\n` +
                `Is a DAG (Directed Acyclic Graph): ${data.is_dag}`
            );
        } catch (error) {
            console.error("Error submitting pipeline:", error);
            alert("Failed to parse pipeline. Make sure the backend is running on port 8000!");
        }
    };

    return (
        <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px'}}>
            <button 
                type="button" 
                onClick={handleSubmit}
                style={{
                    backgroundColor: '#4f46e5', 
                    color: 'white',
                    border: 'none',
                    borderRadius: '8px',
                    padding: '12px 24px',
                    fontSize: '16px',
                    fontWeight: 'bold',
                    cursor: 'pointer',
                    boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
                    transition: 'background-color 0.2s'
                }}
                onMouseOver={(e) => e.target.style.backgroundColor = '#4338ca'}
                onMouseOut={(e) => e.target.style.backgroundColor = '#4f46e5'}
            >
                Submit Pipeline
            </button>
        </div>
    );
}