import React, { useState, useCallback, useEffect } from 'react';
import ReactFlow, {
    useNodesState,
    useEdgesState,
    addEdge,
    Background,
    useReactFlow,
} from 'reactflow';
import 'reactflow/dist/style.css';

import { runBFS } from '../algorithms/tree/bfs.jsx';
import { runDFS } from '../algorithms/tree/dfs.jsx';
import CircularNode from './CircularNode.jsx';
import '../styles/trees.css'; // New stylesheet for the tree visualizer

const nodeTypes = { circular: CircularNode };

const initialNodes = [];
const initialEdges = [];

function TreeVisualizer() {
    const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
    const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
    const [visitedOrder, setVisitedOrder] = useState([]);
    const [isAnimating, setIsAnimating] = useState(false);
    const [speed, setSpeed] = useState(250);
    const [selectedAlgo, setSelectedAlgo] = useState('bfs');
    const [nodeInputValue, setNodeInputValue] = useState('');
    const [traversalRootId, setTraversalRootId] = useState('');
    const { getNodes, screenToFlowPosition } = useReactFlow();

    useEffect(() => {
        // Set the first node as the default traversal root when nodes are added
        if (nodes.length > 0 && !traversalRootId) {
            setTraversalRootId(nodes[0].id);
        }
        // If the selected root is deleted, reset it to the first node
        if (nodes.length > 0 && !nodes.some(n => n.id === traversalRootId)) {
            setTraversalRootId(nodes[0].id);
        }
        if (nodes.length === 0) {
            setTraversalRootId('');
        }
    }, [nodes, traversalRootId]);

    const addNodeToTree = useCallback((value) => {
        const newNodeId = String(nodes.length + 1);
        
        // Position the new node in the center of the view
        const position = screenToFlowPosition({ 
            x: window.innerWidth / 2, 
            y: window.innerHeight / 3 
        });

        const newNode = {
            id: newNodeId,
            type: 'circular',
            position,
            data: { label: value },
        };

        setNodes((nds) => [...nds, newNode]);

    }, [nodes.length, setNodes, screenToFlowPosition]);

    const handleAddNode = () => {
        const value = parseInt(nodeInputValue, 10);
        if (isNaN(value)) {
            // Reverted alert to a console log to avoid breaking the UI in some environments.
            console.error("Please enter a valid number.");
            return;
        }
        addNodeToTree(value);
        setNodeInputValue(''); // Clear input after adding
    };
    
    const handleRunTraversal = async () => {
        if (isAnimating || nodes.length === 0 || !traversalRootId) return;
        setIsAnimating(true);
        setVisitedOrder([]);

        const allNodes = getNodes();
        
        // Build an UNDIRECTED adjacency list from edges
        const adj = {};
        allNodes.forEach(node => adj[node.id] = []);
        edges.forEach(edge => {
            adj[edge.source].push(edge.target);
            adj[edge.target].push(edge.source); // This makes the graph undirected
        });

        const traversalFunction = selectedAlgo === 'bfs' ? runBFS : runDFS;
        await traversalFunction(adj, traversalRootId, setVisitedOrder, speed);
        
        setIsAnimating(false);
    };

    const handleReset = () => {
        setNodes([]);
        setEdges([]);
        setVisitedOrder([]);
        setIsAnimating(false);
        setNodeInputValue('');
    };
    
    const getNodeClassName = (nodeId) => {
        let className = 'node-default';
        if (visitedOrder.includes(nodeId)) {
            // Corrected logic: always apply 'node-visited' if the node is in the order.
            className = 'node-visited';
        }
        if (nodeId === traversalRootId) {
            className += ' node-start';
        }
        return className;
    };

    // Callback to create straight edges
    const onConnect = useCallback((params) => {
        setEdges((eds) => addEdge({ ...params, type: 'straight', animated: false }, eds));
    }, [setEdges]);


    return (
        <div className="tree-visualizer-container">
            <h2 className="visualizer-title">🌲 Tree Traversal Visualizer</h2>
            
            <div className="tree-controls">
                <div className="input-group">
                    <input
                        type="number"
                        value={nodeInputValue}
                        onChange={(e) => setNodeInputValue(e.target.value)}
                        placeholder="Node Value"
                        disabled={isAnimating}
                    />
                    <button onClick={handleAddNode} disabled={isAnimating || !nodeInputValue}>Add Node</button>
                </div>

                <label>
                    Traversal Root:
                    <select value={traversalRootId} onChange={(e) => setTraversalRootId(e.target.value)} disabled={isAnimating || nodes.length === 0}>
                        {nodes.map(node => <option key={node.id} value={node.id}>{node.data.label}</option>)}
                    </select>
                </label>

                <select value={selectedAlgo} onChange={(e) => setSelectedAlgo(e.target.value)} disabled={isAnimating}>
                    <option value="bfs">Breadth-First Search (BFS)</option>
                    <option value="dfs">Depth-First Search (DFS)</option>
                </select>
                <label>
                    Speed: {speed} ms
                    <input
                        type="range"
                        min="50"
                        max="1000"
                        step="50"
                        value={speed}
                        onChange={(e) => setSpeed(Number(e.target.value))}
                        disabled={isAnimating}
                    />
                </label>
                <button onClick={handleRunTraversal} disabled={isAnimating || nodes.length === 0}>
                    {isAnimating ? 'Animating...' : 'Run Traversal'}
                </button>
                <button onClick={handleReset} disabled={isAnimating}>Reset Tree</button>
            </div>
            
            <div className="react-flow-wrapper">
                <ReactFlow
                    nodes={nodes.map(n => ({...n, className: getNodeClassName(n.id)}))}
                    edges={edges}
                    onNodesChange={onNodesChange}
                    onEdgesChange={onEdgesChange}
                    onConnect={onConnect}
                    nodeTypes={nodeTypes}
                    fitView
                >
                    <Background variant="dots" gap={12} size={1} />
                </ReactFlow>
            </div>
            
            <div className="traversal-display">
                <h4>Traversal Order:</h4>
                <p>{visitedOrder.length > 0 ? visitedOrder.map(id => nodes.find(n => n.id === id)?.data.label).join(' -> ') : 'Traversal not run.'}</p>
            </div>
        </div>
    );
}

export default TreeVisualizer;
