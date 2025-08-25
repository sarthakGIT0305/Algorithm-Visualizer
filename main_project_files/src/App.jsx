import React from 'react';
import TopHeader from './components/TopHeaderFiles.jsx';
import { Routes, Route } from 'react-router-dom';
import SortingVisualizer from './components/SortingVisualizer.jsx';
import GraphVisualizer from './components/GraphVisualizer.jsx';
import TreeVisualizer from './components/TreeVisualizer.jsx';
import './styles/mainStyles.css';
import BottomFooter from './components/BottomFooterFiles.jsx';
import { ReactFlowProvider } from 'reactflow';

function App() {
    return (
        <>
            <TopHeader />
            <main className='main-content'>
                <Routes>
                    <Route path="/" element={<SortingVisualizer />} />
                    <Route 
                        path="/graphs" 
                        element={
                            <ReactFlowProvider>
                                <GraphVisualizer />
                            </ReactFlowProvider>
                        } 
                    />
                    <Route 
                        path="/trees" 
                        element={
                            <ReactFlowProvider>
                                <TreeVisualizer />
                            </ReactFlowProvider>
                        } 
                    />
                </Routes>
            </main>
            <BottomFooter />
        </>
    );
}

export default App;
