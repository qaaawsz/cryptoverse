import React, {useEffect, useState} from 'react'
import {Routes, Route, Link} from 'react-router-dom'
import {Layout, Typography, Space} from 'antd'
import './app.css'
import {Homepage, Navbar, Cryptocurrencies, News} from './components/index'
import CryptoDetails from './components/CryptoDetails'

function App() {
    const [activeMenu, setActiveMenu] = useState<boolean>(true)
    const [screenSize, setScreenSize] = useState<number | null>(null)
    useEffect(() => {
        const handleResize = () => setScreenSize(window.innerWidth)
        window.addEventListener('resize', handleResize)
        handleResize()

        return () => {
            window.removeEventListener('resize', handleResize)
        }
    }, [])

    useEffect(() => {
        screenSize && screenSize < 768 ? setActiveMenu(false) : setActiveMenu(true)
    }, [screenSize])

    return (
        <div className="app">
            <div className="navbar">
                <Navbar activeMenu={activeMenu} setActiveMenu={setActiveMenu} screenSize={screenSize}/>
            </div>
            <div className="main">
                <Layout>
                    <div className="routes">
                        <Routes>
                            <Route path="/" element={<Homepage screenSize={screenSize}/>}/>
                            <Route path="/cryptocurrencies" element={<Cryptocurrencies simplified={false}/>}/>
                            <Route path="/crypto/:coinid" element={<CryptoDetails/>}/>
                            <Route path="/news" element={<News simplified={false}/>}/>
                        </Routes>
                    </div>
                </Layout>
                <div className="footer">
                    <Typography.Title level={5} style={{color: 'white', textAlign: 'center'}}>
                        Cryptoverse <br/>
                        All rights reserved
                    </Typography.Title>
                    <Space>
                        <Link to="/">Home</Link>
                        <Link to="/news">News</Link>
                    </Space>
                </div>
            </div>
        </div>
    )
}

export default App
