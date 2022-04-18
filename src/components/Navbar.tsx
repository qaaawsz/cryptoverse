import React from 'react'
import {Avatar, Button, Menu, Typography} from 'antd'
import {Link} from 'react-router-dom'
// @ts-ignore
import logoIcon from '../images/cryptocurrency.png'
import {BulbOutlined, FundOutlined, HomeOutlined, MenuOutlined, MoneyCollectOutlined} from '@ant-design/icons'

const Navbar: React.FC<{ screenSize: number | null, activeMenu: boolean, setActiveMenu: Function }> =
    ({
         screenSize,
         activeMenu,
         setActiveMenu
     }) => {
        return (
            <nav className="nav-container">
                <div className="logo-container">
                    <Avatar src={logoIcon} size="large"/>
                    <Typography.Title level={2} className="logo">
                        <Link to="/">Cryptoverse</Link>
                    </Typography.Title>
                    <Button
                        onClick={() => setActiveMenu((prevState: boolean) => !prevState)}
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
                        <Menu.Item icon={<FundOutlined/>}>
                            <Link to="/cryptocurrencies">Cryptocurrencies</Link>
                        </Menu.Item>
                        <Menu.Item icon={<BulbOutlined/>}>
                            <Link to="/news">News</Link>
                        </Menu.Item>
                    </Menu>
                }
            </nav>
        )
    }

export default Navbar
