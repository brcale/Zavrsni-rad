import axios from "axios";

const api = axios.create({
    baseURL: "https://cloud.iexapis.com/v1"
})

export const getQuotes = symbol => {
    return api.get('/stock/${symbol}/quote?token=pk_bca9c940899c41febb6d61a6f3bac328').then(res => res.data);
};

export const getLogo = symbol => {
    return api.get('/stock/${symbol}/logo?token=pk_bca9c940899c41febb6d61a6f3bac328').then(res => res.data);
};

export const getNews = symbol => {
    return api.get('/stock/${symbol}/news?token=pk_bca9c940899c41febb6d61a6f3bac328').then(res => res.data);
};

export const getChart = symbol => {
    return api.get('/stock/${symbol}/chart/3m?token=pk_bca9c940899c41febb6d61a6f3bac328').then(res => res.data);
};