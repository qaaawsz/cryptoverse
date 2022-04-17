import React from 'react'
import {Routes, Route, Link} from 'react-router-dom'
import {Layout, Typography, Space} from 'antd'
import './app.css'
import {Homepage, Navbar, Cryptocurrencies, News, Exchanges} from './components/index'
import CryptoDetails from './components/CryptoDetails'

function App() {
    return (
        <div className="app">
            <div className="navbar">
                <Navbar/>
            </div>
            <div className="main">
                <Layout>
                    <div className="routes">
                        <Routes>
                            <Route path="/" element={<Homepage/>}/>
                            <Route path="/cryptocurrencies" element={<Cryptocurrencies simplified={false}/>}/>
                            <Route path="/exchanges" element={<Exchanges/>}/>
                            <Route path="/crypto/:coinid" element={<CryptoDetails/>}/>
                            <Route path="/news" element={<News simplified={false}/>}/>
                        </Routes>
                    </div>
                </Layout>
                <div className="footer">
                    <Typography.Title level={5}>
                        Cryptoverse <br/>
                        All rights reserved
                    </Typography.Title>
                    <Space>
                        <Link to="/">Home</Link>
                        <Link to="/exchanges">Exchanges</Link>
                        <Link to="/news">News</Link>
                    </Space>
                </div>
            </div>
        </div>
    )
}

export default App
