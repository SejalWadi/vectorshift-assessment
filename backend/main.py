from fastapi import FastAPI, Form
from fastapi.middleware.cors import CORSMiddleware
import json

app = FastAPI()

# 1. Add CORS middleware so React (port 3000) can talk to FastAPI (port 8000)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], 
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get('/')
def read_root():
    return {'Ping': 'Pong'}

# 2. Change to POST to properly accept Form data
@app.post('/pipelines/parse')
def parse_pipeline(pipeline: str = Form(...)):
    # Parse the stringified JSON from the frontend
    pipeline_data = json.loads(pipeline)
    nodes = pipeline_data.get('nodes', [])
    edges = pipeline_data.get('edges', [])

    num_nodes = len(nodes)
    num_edges = len(edges)

    # 3. Algorithm to check if the graph is a DAG
    # Create an adjacency list and a dictionary to track in-degrees
    adj_list = {node['id']: [] for node in nodes}
    in_degree = {node['id']: 0 for node in nodes}

    # Populate adjacency list and in-degrees
    for edge in edges:
        source = edge['source']
        target = edge['target']
        if source in adj_list and target in adj_list:
            adj_list[source].append(target)
            in_degree[target] += 1

    # Kahn's Algorithm for Topological Sorting
    # Start with all nodes that have no incoming edges
    queue = [node_id for node_id in in_degree if in_degree[node_id] == 0]
    visited_count = 0

    while queue:
        current = queue.pop(0)
        visited_count += 1
        
        # "Remove" the node and subtract 1 from the in-degree of its neighbors
        for neighbor in adj_list[current]:
            in_degree[neighbor] -= 1
            if in_degree[neighbor] == 0:
                queue.append(neighbor)

    # If the number of visited nodes equals total nodes, there are no cycles
    is_dag = visited_count == num_nodes

    return {'num_nodes': num_nodes, 'num_edges': num_edges, 'is_dag': is_dag}