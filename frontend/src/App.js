// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import CoverPage from './components/CoverPage';
import Login from './components/Login';
import Upload from './components/Upload';
import Result from './components/Result';

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<CoverPage />} />
                <Route path="/login" element={<Login />} />
                <Route path="/upload" element={<Upload />} />
                <Route path="/result/:status" element={<Result />} />
            </Routes>
        </Router>
    );
}

export default App;
