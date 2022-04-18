import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react'

const URL = 'https://crypto-news-live3.p.rapidapi.com'

const HEADERS = {
    'X-BingApis-SDK': 'true',
    'X-RapidAPI-Host': 'bing-news-search1.p.rapidapi.com',
    'X-RapidAPI-Key': '4428404a58mshfd57b33dda06cbcp11b0a5jsn2b8ab8aee02b',
}

const createRequest = (url: string) => ({
    url,
    headers: HEADERS,
})

export const cryptoNewsApi = createApi({
    reducerPath: 'cryptoNewsApi',
    baseQuery: fetchBaseQuery({baseUrl: URL}),
    endpoints: (builder: any) => ({
        getCryptoNews: builder.query({
            query: ({newsCategory, articlesAmount}: { newsCategory: string, articlesAmount: number }) =>
                createRequest(`/news/search?q=${newsCategory}&safeSearch=Off&textFormat=Raw&freshness=Day&count=${articlesAmount}`)
        })
    })
})

export const {
    useGetCryptoNewsQuery,
}: any = cryptoNewsApi
