import React from 'react';

function PriorityQueueDisplay({ queueState }) {
    return (
        <div className="priority-queue-box">
            <h4>Priority Queue</h4>
            <ul className="priority-queue-list">
                {queueState.map((item, index) => (
                    <li key={index} className="queue-item">
                        <span>{item.node}</span>
                        <span className="distance">{item.distance === Infinity ? '∞' : item.distance}</span>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default PriorityQueueDisplay;