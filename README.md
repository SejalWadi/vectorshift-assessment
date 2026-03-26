# VectorShift Frontend Technical Assessment

Welcome to my submission for the VectorShift Frontend Technical Assessment! This project implements a modern, interactive node-based pipeline builder using React, React Flow, and FastAPI.

## 🚀 Quick Start

To run this application locally, you will need two terminal windows to run the frontend and backend concurrently.

### 1. Start the Backend (FastAPI)
Open a terminal, navigate to the `backend` directory, and start the server:
\`\`\`bash
cd backend
pip install fastapi uvicorn
uvicorn main:app --reload
\`\`\`
*The backend will run on `http://localhost:8000`.*

### 2. Start the Frontend (React)
Open a second terminal, navigate to the `frontend` directory, install dependencies, and start the app:
\`\`\`bash
cd frontend
npm install
npm start
\`\`\`
*The frontend will run on `http://localhost:3000`.*

---

## 🎯 Features & Implementation Details

I have completed all four parts of the assessment, along with a few UI/UX enhancements to ensure the application feels like a production-ready product.

### Part 1: Node Abstraction
To resolve code duplication, I engineered a highly reusable `<BaseNode />` component (`/frontend/src/nodes/baseNode.js`). 
* **Architecture:** It encapsulates the wrapper styling, header layout, and dynamic handle generation. 
* **Implementation:** Specific node types (Input, Output, LLM, Text) now strictly handle their internal data and pass their unique UI elements as `children` to the `BaseNode`.
* **Extensibility:** To demonstrate this flexibility, I added 5 new custom nodes (`Math`, `API`, `Display`, `Timer`, and `Note`) which were implemented in just a few lines of code each.

### Part 2: UI & Styling
I took the initiative to overhaul the default styling to closely match **VectorShift's actual design language**.
* **Design System:** Implemented a modern card-based design with the signature VectorShift lavender/purple theme (`#ede9fe`, `#c4b5fd`, `#6366f1`).
* **UX Enhancements:** * Redesigned the toolbar into a sleek grid of draggable cards.
    * Added interactive delete buttons (⊗) to the node headers to remove nodes and their connected edges from the canvas.
    * Styled the connection handles as hollow circles to match the platform's aesthetic.

### Part 3: Text Node Logic
The Text Node features dynamic resizing and intelligent variable parsing.
* **Auto-Resizing:** Replaced the standard `<input>` with a `<textarea>` hooked up to a `useRef` and `useEffect`. As the user types, it calculates the `scrollHeight` and `scrollWidth` to grow the node seamlessly without manual dragging.
* **Dynamic Variables:** Implemented a Regular Expression (`/\{\{\s*([a-zA-Z_$][a-zA-Z0-9_$]*)\s*\}\}/g`) to parse the text in real-time. When valid JavaScript variables wrapped in `{{ }}` are detected, it dynamically generates new target handles on the left side of the node.
* **React Flow Internals:** Utilized the `useUpdateNodeInternals` hook to ensure React Flow immediately recognizes dynamically added handles so connections can be made instantly.

### Part 4: Backend Integration & DAG Detection
The frontend pipeline data is validated against a Python backend.
* **Integration:** The React frontend uses the `fetch` API to serialize the Zustand store's `nodes` and `edges` into `FormData` and sends a POST request to the backend. CORS middleware was added to FastAPI to facilitate this.
* **Algorithm (Kahn's Topological Sort):** The `/pipelines/parse` endpoint calculates the total nodes and edges. To determine if the graph is a Directed Acyclic Graph (DAG), I implemented **Kahn's Algorithm**. 
    * It calculates the in-degree of all nodes.
    * It processes nodes with an in-degree of 0 via a queue.
    * If the number of processed nodes equals the total number of nodes, no cycles exist (`is_dag: true`). Otherwise, a cycle is detected (`is_dag: false`).

---

## 🛠 Tech Stack
* **Frontend:** React, Zustand (State Management), React Flow (Node Engine), CSS
* **Backend:** Python, FastAPI, Uvicorn

Thank you for the opportunity to work on this assessment! Please feel free to reach out if you have any questions about my implementation.