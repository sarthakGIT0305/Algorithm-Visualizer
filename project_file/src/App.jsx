import React from 'react';
import TopHeader from './components/TopHeaderFiles.jsx';
import { Routes, Route } from 'react-router-dom';
import SortingVisualizer from './components/SortingVisualizer.jsx';
import GraphVisualizer from './components/GraphVisualizer';
import TreeVisualizer from './components/TreeVisualizer';
import './styles/mainStyles.css';

function App() {
    return (
        <>
            <TopHeader />
            <Routes>
                <Route path="/" element={<SortingVisualizer />} />
                <Route path="/graphs" element={<GraphVisualizer />} />
                <Route path="/trees" element={<TreeVisualizer />} />
            </Routes> 
        </>
    );
}

export default App;