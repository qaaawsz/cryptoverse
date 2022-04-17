import React from 'react'
import millify from 'millify'
import {Col, Row, Statistic, Typography} from 'antd'
import {useGetCryptosInfoQuery} from '../api/cryptoApiHandler'
import {Link} from 'react-router-dom'
import {Cryptocurrencies} from './index'
import News from './News'

const Homepage = () => {
    const {data, isFetching} = useGetCryptosInfoQuery()
    const globalStats = data?.data?.stats

    if (isFetching) return <p>Loading...</p>

    return (
        <main>
            <Typography.Title level={2} className="heading">
                Global Crypto Stats
            </Typography.Title>
            <Row>
                <Col xs={24} sm={12}>
                    <Statistic title="Total Crypto Currencies" value={globalStats.total}/>
                </Col>
                <Col xs={24} sm={12}>
                    <Statistic title="Total Exchanges" value={millify(globalStats.totalExchanges)}/>
                </Col>
                <Col xs={24} sm={12}>
                    <Statistic title="Total Market Cap" value={millify(globalStats.totalMarketCap)}/>
                </Col>
                <Col xs={24} sm={12}>
                    <Statistic title="Total 24h Volume" value={millify(globalStats.total24hVolume)}/>
                </Col>
                <Col xs={24} sm={12}>
                    <Statistic title="Total Markets" value={millify(globalStats.totalMarkets)}/>
                </Col>
            </Row>
            <div className="home-heading-container">
                <Typography.Title level={2} className="home-title">
                    Top 10 cryptocurrencies in the world
                </Typography.Title>
                <Typography.Title level={5} className="show-more">
                    <Link to="/cryptocurrencies">
                        Show more
                    </Link>
                </Typography.Title>
            </div>
            <Cryptocurrencies simplified={true}/>
            <div className="home-heading-container">
                <Typography.Title level={2} className="home-title">
                    Latest crypto news
                </Typography.Title>
                <Typography.Title level={5} className="show-more">
                    <Link to="/news">
                        Show more
                    </Link>
                </Typography.Title>
            </div>
            <News simplified={true}/>
        </main>
    )
}

export default Homepage
