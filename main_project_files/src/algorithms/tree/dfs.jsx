import { sleep } from '../graph/dijkstra'; // Reusing the sleep utility

/**
 * Performs a Depth-First Search traversal on a tree.
 * @param {object} adj - Adjacency list representation of the tree.
 * @param {string} startNodeId - The ID of the root node.
 * @param {function} setVisitedOrder - State setter to update the visited nodes for visualization.
 * @param {number} speed - Animation speed in milliseconds.
 */
export const runDFS = async (adj, startNodeId, setVisitedOrder, speed) => {
    const stack = [startNodeId];
    const visited = new Set();
    const order = [];

    while (stack.length > 0) {
        const currentNodeId = stack.pop();
        
        if (!visited.has(currentNodeId)) {
            visited.add(currentNodeId);
            order.push(currentNodeId);
            setVisitedOrder([...order]);
            await sleep(speed);

            const neighbors = adj[currentNodeId] || [];
            // Push neighbors in reverse to visit them in the correct order (left to right)
            for (let i = neighbors.length - 1; i >= 0; i--) {
                const neighborId = neighbors[i];
                if (!visited.has(neighborId)) {
                    stack.push(neighborId);
                }
            }
        }
    }
};
