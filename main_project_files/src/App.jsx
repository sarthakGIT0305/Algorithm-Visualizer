import React from 'react';
import TopHeader from './components/TopHeaderFiles.jsx';
import { Routes, Route } from 'react-router-dom';
import SortingVisualizer from './components/SortingVisualizer.jsx';
import GraphVisualizer from './components/GraphVisualizer';
import TreeVisualizer from './components/TreeVisualizer';
import './styles/mainStyles.css';
import BottomFooter from './components/BottomFooterFiles.jsx';

function App() {
    return (
        <>
            <TopHeader />
            <main className='main-content'>
                <Routes>
                    <Route path="/" element={<SortingVisualizer />} />
                    <Route path="/graphs" element={<GraphVisualizer />} />
                    <Route path="/trees" element={<TreeVisualizer />} />
                </Routes>
            </main>
            <BottomFooter />
        </>
    );
}

export default App;