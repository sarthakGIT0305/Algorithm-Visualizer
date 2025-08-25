import React from 'react';
import { StraightEdge, EdgeLabelRenderer } from 'reactflow';

export default function EditableEdge({
    id,
    sourceX,
    sourceY,
    targetX,
    targetY,
    style = {},
    data,
    markerEnd,
}) {
    // Manually calculate the center coordinates for the label
    const edgeCenterX = (sourceX + targetX) / 2;
    const edgeCenterY = (sourceY + targetY) / 2;

    const handleWeightChange = (evt) => {
        if (data && data.onWeightChange) {
            data.onWeightChange(id, Number(evt.target.value));
        }
    };

    return (
        <>
            {/* Render the actual straight line */}
            <StraightEdge 
                id={id}
                sourceX={sourceX}
                sourceY={sourceY}
                targetX={targetX}
                targetY={targetY}
                style={style}
                markerEnd={markerEnd}
            />

            {/* Render the editable label for the edge weight */}
            <EdgeLabelRenderer>
                <div
                    style={{
                        position: 'absolute',
                        transform: `translate(-50%, -50%) translate(${edgeCenterX}px,${edgeCenterY}px)`,
                        fontSize: 12,
                        pointerEvents: 'all',
                    }}
                    className="nodrag nopan"
                >
                    <input
                        type="number"
                        className="edge-weight-input" // Added className here
                        value={data.weight || 1}
                        onChange={handleWeightChange}
                        min="1"
                    />
                </div>
            </EdgeLabelRenderer>
        </>
    );
}
