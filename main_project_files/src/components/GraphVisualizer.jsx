import React, { useState, useCallback, useEffect } from 'react';
import ReactFlow, {
    useNodesState,
    useEdgesState,
    addEdge,
    MiniMap,
    Background,
    useReactFlow,
} from 'reactflow';
import 'reactflow/dist/style.css'; 

import { runDijkstra } from '../algorithms/graph/dijkstra.jsx';
import CircularNode from './CircularNode.jsx';
import EditableEdge from './EditableEdge.jsx';
import PriorityQueueDisplay from './PriorityQueueDisplay.jsx';
import '../styles/graphs.css'; // Import the new stylesheet

const nodeTypes = { circular: CircularNode };
const edgeTypes = { editable: EditableEdge };

const initialNodes = [];
const initialEdges = [];

function GraphVisualizer() {
    const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
    const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
    const [startNode, setStartNode] = useState('');
    const [endNode, setEndNode] = useState('');
    const [path, setPath] = useState([]);
    const [visited, setVisited] = useState([]);
    const [isAnimating, setIsAnimating] = useState(false);
    const [nextNodeId, setNextNodeId] = useState(0);
    const [queueState, setQueueState] = useState([]);
    const [speed, setSpeed] = useState(100);
    
    const { screenToFlowPosition } = useReactFlow();

    useEffect(() => {
        if (nodes.length > 0) {
            if (!nodes.some(node => node.id === startNode)) {
                setStartNode(nodes[0].id);
            }
            if (!nodes.some(node => node.id === endNode)) {
                setEndNode(nodes[nodes.length - 1].id);
            }
        } else {
            setStartNode('');
            setEndNode('');
        }
    }, [nodes, startNode, endNode]);

    const onConnect = useCallback((params) => {
        setEdges((eds) => addEdge({
            ...params,
            type: 'editable',
            data: { weight: 1, onWeightChange: handleEdgeWeightChange },
            markerEnd: { type: 'arrowclosed' },
        }, eds));
    }, [setEdges]);

    const onAddNode = useCallback(() => {
        const newNodeId = String.fromCharCode(65 + nextNodeId);
        const position = screenToFlowPosition({
            x: window.innerWidth / 2,
            y: window.innerHeight / 2,
        });

        const newNode = {
            id: newNodeId,
            type: 'circular',
            position: position,
            data: { label: newNodeId },
        };
        setNodes((prevNodes) => [...prevNodes, newNode]);
        setNextNodeId((prevId) => prevId + 1);
    }, [nextNodeId, setNodes, screenToFlowPosition]);

    const handleEdgeWeightChange = useCallback((edgeId, newWeight) => {
        setEdges((prevEdges) =>
            prevEdges.map((edge) =>
                edge.id === edgeId ? { ...edge, data: { ...edge.data, weight: newWeight } } : edge
            )
        );
    }, [setEdges]);

    const handleRunDijkstra = async () => {
        if (!startNode || !endNode || startNode === endNode) {
            alert('Please select valid and different start and end nodes.');
            return;
        }
        setIsAnimating(true);
        setPath([]);
        setVisited([]);
        
        const graph = {};
        nodes.forEach(node => {
            graph[node.id] = {};
        });
        edges.forEach(edge => {
            const weight = edge.data.weight || 1;
            graph[edge.source][edge.target] = weight;
        });

        await runDijkstra(graph, startNode, endNode, setPath, setVisited, setQueueState, speed);
        setIsAnimating(false);
    };

    const handleReset = () => {
        setNodes([]);
        setEdges([]);
        setPath([]);
        setVisited([]);
        setIsAnimating(false);
        setNextNodeId(0);
        setStartNode('');
        setEndNode('');
        setQueueState([]);
    };

    const getNodeClassName = (nodeId) => {
        let className = 'node-default';
        if (path.includes(nodeId)) className = 'node-path';
        else if (visited.includes(nodeId)) className = 'node-visited';
        
        if (nodeId === startNode) className += ' node-start';
        if (nodeId === endNode) className += ' node-end';
        
        return className;
    };

    const getEdgeClassName = (edge) => {
        const isPathEdge = path.includes(edge.source) && path.includes(edge.target) && path.indexOf(edge.target) === path.indexOf(edge.source) + 1;
        return isPathEdge ? 'edge-path' : 'edge-default';
    };

    return (
        <div className="graph-visualizer-container">
            <h2 className="visualizer-title">🧭 Graph Visualizer</h2>
            
            <div className="graph-controls">
                <button onClick={onAddNode} disabled={isAnimating}>Add Node</button>
                <label>
                    Start Node:
                    <select value={startNode} onChange={(e) => setStartNode(e.target.value)} disabled={isAnimating}>
                        <option value="" disabled>Select</option>
                        {nodes.map(node => <option key={node.id} value={node.id}>{node.id}</option>)}
                    </select>
                </label>
                <label>
                    End Node:
                    <select value={endNode} onChange={(e) => setEndNode(e.target.value)} disabled={isAnimating}>
                        <option value="" disabled>Select</option>
                        {nodes.map(node => <option key={node.id} value={node.id}>{node.id}</option>)}
                    </select>
                </label>
                <label>
                    Speed: {speed} ms
                    <input
                        type="range"
                        min="10"
                        max="1000"
                        step="10"
                        value={speed}
                        onChange={(e) => setSpeed(Number(e.target.value))}
                        disabled={isAnimating}
                    />
                </label>
                <button onClick={handleRunDijkstra} disabled={isAnimating || !startNode || !endNode}>
                    {isAnimating ? 'Animating...' : 'Run Dijkstra'}
                </button>
                <button onClick={handleReset} disabled={isAnimating}>Reset Graph</button>
            </div>
            
            <div className="react-flow-wrapper">
                <ReactFlow
                    nodes={nodes.map(n => ({...n, className: getNodeClassName(n.id)}))}
                    edges={edges.map(e => ({...e, className: getEdgeClassName(e), animated: getEdgeClassName(e) === 'edge-path' && isAnimating, data: {...e.data, onWeightChange: handleEdgeWeightChange}}))}
                    onNodesChange={onNodesChange}
                    onEdgesChange={onEdgesChange}
                    onConnect={onConnect}
                    nodeTypes={nodeTypes}
                    edgeTypes={edgeTypes}
                    fitView
                    attributionPosition="bottom-left"
                >
                    <MiniMap />
                    <Background variant="dots" gap={12} size={1} />
                </ReactFlow>
            </div>
            
            <PriorityQueueDisplay queueState={queueState} />

            <div className="path-display">
                <h4>Shortest Path:</h4>
                <p>{path.length > 0 ? path.join(' -> ') : 'No path found or algorithm not run.'}</p>
            </div>
        </div>
    );
}

export default GraphVisualizer;
