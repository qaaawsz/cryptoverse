import React, {useEffect, useState} from 'react'
import {useGetCryptoNewsQuery} from '../api/cryptoNewsApiHandler'
import {useGetCryptosInfoQuery} from '../api/cryptoApiHandler'
import {ICryptocurrencies} from './Cryptocurrencies'
import {Avatar, Card, Col, Row, Select, Typography} from 'antd'
import moment from 'moment'

const News: React.FC<ICryptocurrencies> = ({simplified}) => {
    const [newsCategory, setNewsCategory] = useState('Cryptocurrency')
    console.log(simplified)
    const {data, isLoading} = useGetCryptoNewsQuery(newsCategory, simplified ? 6 : 12)
    const [cryptoNews, setCryptoNews] = useState([])
    const {data: cryptosList, isFetching} = useGetCryptosInfoQuery(100)


    useEffect(() => {
        if (data) {
            setCryptoNews(data?.value)
        }
    }, [data])

    if (isLoading || !cryptoNews.length || isFetching) return <p>Loading...</p>

    return (
        <Row gutter={[24, 24]}>
            {!simplified && (
                <Col span={24}>
                    <Select
                        showSearch
                        className="select-news"
                        placeholder="Select a Crypto"
                        optionFilterProp="children"
                        onChange={(value) => setNewsCategory(value)}
                        //@ts-ignore
                        filterOption={(input, option) => option?.children?.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                    >
                        <Select.Option value="Cryptocurency">Cryptocurrency</Select.Option>
                        {cryptosList?.data?.coins?.map((currency: any) => <Select.Option
                            value={currency.name}>{currency.name}</Select.Option>)}
                    </Select>
                </Col>
            )}
            {cryptoNews.map((news: any, i: number) => (
                <Col xs={24} lg={12} xxl={8} key={i}>
                    <Card hoverable className="news-card">
                        <a href={news.url} target="_blank" rel="noreferrer">
                            <div className="news-image-container">
                                <Typography.Title className="news-title"
                                                  level={5}>{news.name.length > 80 ? news.name.substring(0, 80) + '...' : news.name}</Typography.Title>
                                <img width={100} height={100} src={news?.image?.thumbnail?.contentUrl}
                                     alt={news.name}/>
                            </div>
                            <p>{news.description.length > 100 ? `${news.description.substring(0, 100)}...` : news.description}</p>
                            <div className="provider-container">
                                <div>
                                    <Avatar src={news.provider[0]?.image?.thumbnail?.contentUrl}
                                            alt={news.name}/>
                                    <Typography.Text
                                        className="provider-name">{news.provider[0]?.name}</Typography.Text>
                                </div>
                                <Typography.Text>{moment(news.datePublished).startOf('seconds').fromNow()}</Typography.Text>
                            </div>
                        </a>
                    </Card>
                </Col>
            ))}
        </Row>
    )
}

export default News
