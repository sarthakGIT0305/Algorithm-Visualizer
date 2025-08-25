// A utility function for the sleep delay
export const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

// A simple Priority Queue implementation for Dijkstra's algorithm
class PriorityQueue {
  constructor() {
    this.values = [];
  }
  enqueue(node, priority) {
    this.values.push({ node, priority });
    this.sort();
  }
  dequeue() {
    return this.values.shift();
  }
  sort() {
    this.values.sort((a, b) => a.priority - b.priority);
  }
  isEmpty() {
    return this.values.length === 0;
  }
}

/**
 * Runs Dijkstra's algorithm to find the shortest path between two nodes in a graph.
 * This version uses a more explicit priority queue for clarity and correctness.
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
  // Create an undirected representation of the graph to ensure bidirectional paths.
  const undirectedGraph = JSON.parse(JSON.stringify(graph));
  for (const node in graph) {
    for (const neighbor in graph[node]) {
      undirectedGraph[neighbor][node] = graph[node][neighbor];
    }
  }

  const distances = {};
  const previous = {};
  const pq = new PriorityQueue();
  const visitedNodes = new Set();

  // Initialize distances and priority queue using the undirected graph
  for (let node in undirectedGraph) {
    if (node === startNodeId) {
      distances[node] = 0;
      pq.enqueue(node, 0);
    } else {
      distances[node] = Infinity;
      pq.enqueue(node, Infinity);
    }
    previous[node] = null;
  }

  // Update the visual queue display initially
  setQueue(pq.values.map(item => ({ node: item.node, distance: item.priority })));
  await sleep(speed);

  while (!pq.isEmpty()) {
    const { node: currentNode } = pq.dequeue();

    // If we reached the end node, we are done.
    if (currentNode === endNodeId) {
      const shortestPath = [];
      let tempNode = endNodeId;
      while (tempNode) {
        shortestPath.unshift(tempNode);
        tempNode = previous[tempNode];
      }
      setPath(shortestPath);
      setQueue([]); // Clear the queue display
      return; // End the algorithm
    }

    // Process the node if it has a valid distance and hasn't been visited
    if (currentNode && distances[currentNode] !== Infinity) {
      if (!visitedNodes.has(currentNode)) {
        visitedNodes.add(currentNode);
        setVisited(prev => [...prev, currentNode]);
        await sleep(speed);

        // Relaxation step: check all neighbors using the undirected graph
        for (let neighbor in undirectedGraph[currentNode]) {
          const weight = undirectedGraph[currentNode][neighbor];
          const newDistance = distances[currentNode] + weight;

          if (newDistance < distances[neighbor]) {
            distances[neighbor] = newDistance;
            previous[neighbor] = currentNode;
            // Update the priority in the queue
            pq.enqueue(neighbor, newDistance);
          }
        }
        // Update the visual queue display after processing neighbors
        setQueue(pq.values.map(item => ({ node: item.node, distance: item.priority })));
      }
    }
  }

  // If the loop finishes and we haven't found the end node, no path exists
  setPath([]); 
  setQueue([]);
};
