import React, { useState, useEffect } from 'react';
import { bubbleSort } from '../algorithms/sorting/bubbleSort.jsx';
import { insertionSort } from '../algorithms/sorting/insertionSort.jsx';
import { mergeSort } from '../algorithms/sorting/mergeSort.jsx';
import { quickSort } from '../algorithms/sorting/quickSort';
import '../styles/sorting.css'; // Import the new stylesheet

function SortingVisualizer() {
    const [array, setArray] = useState([]);
    const [arrayLength, setArrayLength] = useState(50);
    const [speed, setSpeed] = useState(100);
    const [originalArray, setOriginalArray] = useState([]);
    const [selectedAlgo, setSelectedAlgo] = useState("bubble");
    const [highlightedIndices, setHighlightedIndices] = useState([]);
    const [isSorting, setIsSorting] = useState(false);

    const generateArray = () => {
        const newArray = Array.from({ length: arrayLength }, () =>
            Math.floor(Math.random() * 250) + 30
        );
        setOriginalArray([...newArray]);
        setArray(newArray);
        setHighlightedIndices([]);
    };

    useEffect(() => {
        generateArray();
    }, [arrayLength]); // Regenerate array when length changes

    const handleSort = async () => {
        if (isSorting) return;
        setIsSorting(true);

        const sortingAlgorithm = {
            bubble: bubbleSort,
            insertion: insertionSort,
            merge: mergeSort,
            quick: quickSort,
        }[selectedAlgo];

        if (sortingAlgorithm) {
            await sortingAlgorithm(array, setArray, speed, setHighlightedIndices);
        }
        
        setIsSorting(false);
        // Clear highlights after a short delay
        setTimeout(() => setHighlightedIndices([]), 500);
    };

    return (
        <main className="sorting-visualizer">
            <h2 className="visualizer-title">🌀 Sorting Visualizer</h2>

            <div className="console-controls">
                <label>
                    Array Length: {arrayLength}
                    <input
                        type="range"
                        min="5"
                        max="100"
                        value={arrayLength}
                        onChange={(e) => setArrayLength(Number(e.target.value))}
                        disabled={isSorting}
                    />
                </label>

                <button onClick={generateArray} disabled={isSorting}>Generate Array</button>

                <select
                    value={selectedAlgo}
                    onChange={(e) => setSelectedAlgo(e.target.value)}
                    disabled={isSorting}
                >
                    <option value="bubble">Bubble Sort</option>
                    <option value="insertion">Insertion Sort</option>
                    <option value="merge">Merge Sort</option>
                    <option value="quick">Quick Sort</option>
                </select>

                <label>
                    Speed: {speed} ms
                    <input
                        type="range"
                        min="10"
                        max="1000"
                        step="10"
                        value={speed}
                        onChange={(e) => setSpeed(Number(e.target.value))}
                        disabled={isSorting}
                    />
                </label>

                <button onClick={handleSort} disabled={isSorting}>
                    {isSorting ? 'Sorting...' : 'Sort'}
                </button>
            </div>

            <div className='bar-container'>
                {array.map((value, index) => (
                    <div
                        key={index}
                        className={`bar ${highlightedIndices.includes(index) ? 'bar-highlight' : ''}`}
                        style={{ height: `${value}px` }}
                    ></div>
                ))}
            </div>

            <div className='console-outputs'>
                <div className="array-box">
                    <label>Original Array:</label>
                    <textarea value={originalArray.join(', ')} readOnly />
                </div>
                <div className="array-box">
                    <label>Current Array:</label>
                    <textarea value={array.join(', ')} readOnly />
                </div>
            </div>
        </main>
    );
}

export default SortingVisualizer;
