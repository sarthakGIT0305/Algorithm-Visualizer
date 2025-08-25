import { sleep } from '../graph/dijkstra'; // Reusing the sleep utility

/**
 * Performs a Breadth-First Search traversal on a tree.
 * @param {object} adj - Adjacency list representation of the tree.
 * @param {string} startNodeId - The ID of the root node.
 * @param {function} setVisitedOrder - State setter to update the visited nodes for visualization.
 * @param {number} speed - Animation speed in milliseconds.
 */
export const runBFS = async (adj, startNodeId, setVisitedOrder, speed) => {
    const queue = [startNodeId];
    const visited = new Set([startNodeId]);
    const order = [];

    while (queue.length > 0) {
        const currentNodeId = queue.shift();
        order.push(currentNodeId);
        setVisitedOrder([...order]);
        await sleep(speed);

        const neighbors = adj[currentNodeId] || [];
        for (const neighborId of neighbors) {
            if (!visited.has(neighborId)) {
                visited.add(neighborId);
                queue.push(neighborId);
            }
        }
    }
};
