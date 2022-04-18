import React, {useEffect, useState} from 'react'
import {useGetCryptosInfoQuery} from '../api/cryptoApiHandler'
import {Card, Col, Input, Row} from 'antd'
import {Link} from 'react-router-dom'
import millify from 'millify'

export interface ICryptocurrencies {
    simplified: boolean
}

const Cryptocurrencies: React.FC<ICryptocurrencies> = ({simplified}) => {
    const coinsLimit = simplified ? 10 : 50
    const {data: cryptosList, isFetching} = useGetCryptosInfoQuery(coinsLimit)
    const [cryptos, setCryptos] = useState<any[]>([])
    const [search, setSearch] = useState<string>('')

    useEffect(() => {

        const filteredData = cryptosList?.data?.coins.filter((coin: any) =>
            coin.name.toLowerCase().includes(search.toLowerCase()))

        setCryptos(filteredData)

    }, [cryptosList, search])


    if (isFetching || !cryptos) return <p>Loading...</p>

    return (
        <>
            {!simplified && <Row style={{marginBottom: 24, display: 'flex', justifyContent: 'center'}}>
                <Col span={24} xs={24} sm={12}>
                    <Input
                        style={{width: '100%'}}
                        placeholder="Search Cryptocurrency"
                        onChange={(e: any) => setSearch(e.target.value)}
                        value={search}
                    />
                </Col>
            </Row>}
            <Row gutter={[32, 32]} className="crypto-card-container">
                {cryptos?.map((coin: any) => (
                    <Col key={coin.name} xs={24} sm={12} lg={6} className="crypto-card">
                        <Link key={coin.uuid} to={`/crypto/${coin.uuid}`}>
                            <Card
                                title={`${coin.rank}. ${coin.name}`}
                                extra={<img alt={coin.name} src={coin.iconUrl} className="crypto-image"/>}
                                hoverable
                            >
                                <p>Price: {millify(coin.price)}</p>
                                <p>Market Cap: {millify(coin.marketCap)}</p>
                                <p>Daily change: {millify(coin.change)}%</p>

                            </Card>
                        </Link>
                    </Col>
                ))}
            </Row>
        </>
    )
}

export default Cryptocurrencies
