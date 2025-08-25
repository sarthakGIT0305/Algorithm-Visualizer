import React, { useState, useCallback } from 'react';
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
    const { getNodes } = useReactFlow();

    const addNodeToTree = useCallback((value) => {
        const newNodeId = String(nodes.length + 1);
        let newNode;

        if (nodes.length === 0) {
            // Add the root node
            newNode = {
                id: newNodeId,
                type: 'circular',
                position: { x: 0, y: 0 },
                data: { label: value },
            };
            setNodes([newNode]);
            return;
        }

        // Find the parent and position for the new node (simple binary tree logic)
        let parentNode = nodes[Math.floor((nodes.length - 1) / 2)];
        const isLeftChild = nodes.length % 2 !== 0;

        const xOffset = 100;
        const yOffset = 100;

        newNode = {
            id: newNodeId,
            type: 'circular',
            position: {
                x: parentNode.position.x + (isLeftChild ? -xOffset : xOffset),
                y: parentNode.position.y + yOffset,
            },
            data: { label: value },
        };

        const newEdge = {
            id: `e${parentNode.id}-${newNodeId}`,
            source: parentNode.id,
            target: newNodeId,
            animated: false,
        };

        setNodes((nds) => [...nds, newNode]);
        setEdges((eds) => [...eds, newEdge]);

    }, [nodes, setNodes, setEdges]);

    const handleAddNode = () => {
        const value = Math.floor(Math.random() * 100);
        addNodeToTree(value);
    };
    
    const handleRunTraversal = async () => {
        if (isAnimating || nodes.length === 0) return;
        setIsAnimating(true);
        setVisitedOrder([]);

        const allNodes = getNodes();
        
        // Build adjacency list from edges
        const adj = {};
        allNodes.forEach(node => adj[node.id] = []);
        edges.forEach(edge => {
            adj[edge.source].push(edge.target);
        });

        const traversalFunction = selectedAlgo === 'bfs' ? runBFS : runDFS;
        await traversalFunction(adj, allNodes[0].id, setVisitedOrder, speed);
        
        setIsAnimating(false);
    };

    const handleReset = () => {
        setNodes([]);
        setEdges([]);
        setVisitedOrder([]);
        setIsAnimating(false);
    };
    
    const getNodeClassName = (nodeId) => {
        let className = 'node-default';
        if (visitedOrder.includes(nodeId)) {
            const index = visitedOrder.indexOf(nodeId);
            // Stagger the animation effect
            if (index === visitedOrder.length - 1 && isAnimating) {
                 className = 'node-visited';
            } else if (index < visitedOrder.length -1) {
                 className = 'node-visited';
            }
        }
        return className;
    };


    return (
        <div className="tree-visualizer-container">
            <h2 className="visualizer-title">🌲 Tree Traversal Visualizer</h2>
            
            <div className="tree-controls">
                <button onClick={handleAddNode} disabled={isAnimating}>Add Node</button>
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
                    onConnect={useCallback((params) => setEdges((eds) => addEdge(params, eds)), [setEdges])}
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
