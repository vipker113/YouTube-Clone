import React, { useState } from 'react';
import Navbar from './Components/Navbar/Navbar';
import './index.css';
import { Route, Routes } from 'react-router-dom';
import Home from './Pages/Home/Home';
import Video from './Pages/Video/Video';
import SearchVideo from './Components/SearchVideo/SearchVideo';

const App = () => {
    const [sidebar, setSidebar] = useState(true);
    return (
        <div>
            <Navbar setSidebar={setSidebar}></Navbar>
            <Routes>
                <Route path="/" element={<Home sidebar={sidebar} />} />
                <Route path="/video/:categoryId/:videoId" element={<Video />} />
                <Route path="/video/:dataSearch" element={<SearchVideo sidebar={sidebar} />} />
            </Routes>
        </div>
    );
};

export default App;
