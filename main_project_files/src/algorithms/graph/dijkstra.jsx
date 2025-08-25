// A utility function for the sleep delay
export const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

/**
 * Runs Dijkstra's algorithm to find the shortest path between two nodes in a graph.
 *
 * @param {object} graph - The graph represented as an adjacency list.
 * @param {string} startNodeId - The ID of the starting node.
 * @param {string} endNodeId - The ID of the ending node.
 * @param {function} setPath - State setter to update the shortest path for visualization.
 * @param {function} setVisited - State setter to update the visited nodes for visualization.
 * @param {function} setQueue - State setter to update the priority queue display.
 * @param {number} speed - The speed of the animation in milliseconds.
 */
export const runDijkstra = async (graph, startNodeId, endNodeId, setPath, setVisited, setQueue, speed) => {
  const distances = {};
  const previous = {};
  const unvisitedNodes = new Set(Object.keys(graph));
  
  for (let node in graph) {
    distances[node] = Infinity;
  }
  distances[startNodeId] = 0;

  let pathFound = false;

  while (unvisitedNodes.size > 0) {
    const queueArray = Array.from(unvisitedNodes)
        .map(node => ({ node, distance: distances[node] }))
        .sort((a, b) => a.distance - b.distance);
    setQueue([...queueArray]);

    let minDistance = Infinity;
    let closestNodeId = null;

    for (const node of unvisitedNodes) {
      if (distances[node] < minDistance) {
        minDistance = distances[node];
        closestNodeId = node;
      }
    }
    
    if (closestNodeId === null || minDistance === Infinity) {
      break;
    }

    setVisited(prev => [...prev, closestNodeId]);
    await sleep(speed); // Use the speed parameter here

    if (closestNodeId === endNodeId) {
      pathFound = true;
      let current = endNodeId;
      const shortestPath = [];
      while (current) {
        shortestPath.unshift(current);
        current = previous[current];
      }
      setPath(shortestPath);
      setQueue([]);
      break;
    }

    for (let neighbor in graph[closestNodeId]) {
      const weight = graph[closestNodeId][neighbor];
      const newDistance = distances[closestNodeId] + weight;

      if (newDistance < distances[neighbor]) {
        distances[neighbor] = newDistance;
        previous[neighbor] = closestNodeId;
      }
    }
    unvisitedNodes.delete(closestNodeId);
  }
  if (!pathFound) {
    setPath([]);
  }
  setQueue([]);
};