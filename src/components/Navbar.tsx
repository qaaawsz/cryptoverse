import React, {useEffect, useState} from 'react'
import {Avatar, Button, Menu, Typography} from 'antd'
import {Link, NavLink, Route} from 'react-router-dom'
// @ts-ignore
import logoIcon from '../images/cryptocurrency.png'
import {HomeOutlined, MenuOutlined} from '@ant-design/icons'

const Navbar = () => {
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
        <nav className="nav-container">
            <div className="logo-container">
                <Avatar src={logoIcon} size="large"/>
                <Typography.Title level={2} className="logo">
                    <Link to="/">Cryptoverse</Link>
                </Typography.Title>
                <Button
                    onClick={() => setActiveMenu(prevState => !prevState)}
                    className="menu-control-container"
                >
                    <MenuOutlined/>
                </Button>
            </div>
            {
                activeMenu &&
                <Menu theme="dark" onClick={() => screenSize && screenSize < 768 && setActiveMenu(false)}>
                    <Menu.Item icon={<HomeOutlined/>}>
                        <Link to="/">Home</Link>
                    </Menu.Item>
                    <Menu.Item icon={<HomeOutlined/>}>
                        <Link to="/cryptocurrencies">Cryptocurrencies</Link>
                    </Menu.Item>
                    <Menu.Item icon={<HomeOutlined/>}>
                        <Link to="/exchanges">Exchanges</Link>
                    </Menu.Item>
                    <Menu.Item icon={<HomeOutlined/>}>
                        <Link to="/news">News</Link>
                    </Menu.Item>
                </Menu>
            }
        </nav>
    )
}

export default Navbar
