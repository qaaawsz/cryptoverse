import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react'

const HEADERS = {
    'X-RapidAPI-Host': 'coinranking1.p.rapidapi.com',
    'X-RapidAPI-Key': '4428404a58mshfd57b33dda06cbcp11b0a5jsn2b8ab8aee02b',
}

const URL = 'https://coinranking1.p.rapidapi.com'

const createRequest = (url: string) => ({
    url,
    headers: HEADERS,
})

export const cryptoApi = createApi({
    reducerPath: 'cryptoApi',
    baseQuery: fetchBaseQuery({baseUrl: URL}),
    endpoints: (builder: any) => ({
        getCryptosInfo: builder.query({
            query: (coinsLimit: number) => createRequest(`/coins?limit=${coinsLimit ? coinsLimit : 20}`)
        }),
        getCryptosDetails: builder.query({
            query: (coinId: string) => createRequest(`/coin/${coinId}`)
        }),
        getCryptoHistory: builder.query({
            query: (coinId: string, timeperiod: string) => createRequest(`coin/${coinId}/history?timeperiod=${timeperiod}`),
        }),
    })
})

export const {
    useGetCryptosInfoQuery,
    useGetCryptosDetailsQuery,
    useGetCryptoHistoryQuery,
}: any = cryptoApi
