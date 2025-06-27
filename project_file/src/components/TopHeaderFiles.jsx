import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { Link } from 'react-router-dom';

function TopHeader() {
    return (
        <nav className='main-header'>
            <nav className='top-header'>
                <img className='bird-icon' src="./src/assets/mainIconBirb.svg" />
                <h1 className='main-title'>Algorithm Visualizer</h1>
            </nav>
            <NavigationBar />
        </nav>
    );
}

function NavigationBar() {
    return (
        <nav className='nav-bar'>
            <Link className="tab-link" to="/">Sorting</Link>
            <Link className="tab-link" to="/graphs">Graphs</Link>
            <Link className="tab-link" to="/trees">Trees</Link>
        </nav>
    );
}

export default TopHeader;