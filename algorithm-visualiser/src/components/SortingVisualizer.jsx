import React, { useState, useEffect } from 'react';
import { bubbleSort } from '../algorithms/sorting/bubbleSort.jsx';
import { insertionSort } from '../algorithms/sorting/insertionSort.jsx';
import { mergeSort } from '../algorithms/sorting/mergeSort.jsx';
import { quickSort } from '../algorithms/sorting/quickSort';


function SortingVisualizer() {
    const [array, setArray] = useState([]);
    const [arrayLength, setArrayLength] = useState(50);
    const [speed, setSpeed] = useState(100);  // Default speed = 100ms
    const [originalArray, setOriginalArray] = useState([]);

    // const generateArray = () => {
    //     const randomArray = Array.from({ length: arrayLength }, () =>
    //         Math.floor(Math.random() * 250) + 30
    //     );
    //     setArray(randomArray);
    // };
    const generateArray = () => {
        const newArray = Array.from({ length: arrayLength }, () =>
            Math.floor(Math.random() * 250) + 30
        );
        setOriginalArray([...newArray]);  // store original
        setArray(newArray);               // display live copy
    };


    useEffect(() => {
        generateArray();
    }, []);

    const [selectedAlgo, setSelectedAlgo] = useState("bubble");
    const [highlightedIndices, setHighlightedIndices] = useState([]);


    // const handleSort = async () => {
    //     if (selectedAlgo === "bubble") {
    //         await bubbleSort(array, setArray, speed);
    //     }
    // };
    const handleSort = async () => {
        if (selectedAlgo === "bubble") {
            await bubbleSort(array, setArray, speed, setHighlightedIndices);
        } else if (selectedAlgo === "insertion") {
            await insertionSort(array, setArray, speed);
        } else if (selectedAlgo === "merge") {
            await mergeSort(array, setArray, speed);
        }
        else if (selectedAlgo === "quick") await quickSort(array, setArray, speed);
    };


    return (
        <main className="sorting-visualizer">
            <h2>🌀 Sorting Visualizer</h2>

            <div className="console-controls">
                <label>
                    Array Length: {arrayLength}
                    <input
                        type="range"
                        min="1"
                        max="100"
                        value={arrayLength}
                        onChange={(e) => setArrayLength(Number(e.target.value))}
                    />
                </label>

                <button onClick={generateArray}>Generate Array</button>

                <select
                    value={selectedAlgo}
                    onChange={(e) => setSelectedAlgo(e.target.value)}
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
                    />
                </label>

                <button onClick={handleSort}>Sort</button>

            </div>

            <div className='bar-container'>
                {array.map((value, index) => (
                    // <div
                    //     key={index}
                    //     className="bar"
                    //     style={{ height: `${value}px` }}
                    // ></div>
                    <div
                        key={index}
                        className="bar"
                        style={{
                            height: `${value}px`,
                            backgroundColor: highlightedIndices.includes(index)
                                ? '#E19898'  // highlight color
                                : '#A2678A', // default bar color
                            width: 'clamp(0.5rem, 1.5vw, 2rem)',
                            margin: '0 2px',
                            transition: 'all 0.2s ease',
                        }}
                    ></div>

                ))}
            </div>

            <div className='console-outputs'>
                <div className="array-displays">
                    <div className="array-box">
                        <label>Original Array:</label>
                        <textarea value={originalArray.join(', ')} readOnly />
                    </div>

                    <div className="array-box">
                        <label>Current Array:</label>
                        <textarea value={array.join(', ')} readOnly />
                    </div>
                </div>

            </div>
        </main>
    );
}

export default SortingVisualizer;







