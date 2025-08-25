import React from 'react';
import { Handle, Position } from 'reactflow';

export default function CircularNode({ data }) {
    return (
        <div className="circular-node-wrapper">
            {/* Handles allow edges to connect to the node */}
            <Handle type="target" position={Position.Top} />
            <Handle type="target" position={Position.Left} />
            <Handle type="source" position={Position.Right} />
            <Handle type="source" position={Position.Bottom} />

            <div className="circular-node-content">
                {data.label}
            </div>
        </div>
    );
}