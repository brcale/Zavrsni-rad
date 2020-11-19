import axios from "axios";

const api = axios.create({
    baseURL: "https://cloud.iexapis.com/v1"
})

export const getQuotes = symbol => {
    return api.get(`/stock/${symbol}/quote?token=pk_8207a876013642979e0153f3cbdefa80`).then(res => res.data);
};

export const getLogo = symbol => {
    return api.get(`/stock/${symbol}/logo?token=pk_8207a876013642979e0153f3cbdefa80`).then(res => res.data);
};

export const getNews = symbol => {
    return api.get(`/stock/${symbol}/news?token=pk_8207a876013642979e0153f3cbdefa80`).then(res => res.data);
};

export const getChart = symbol => {
    return api.get(`/stock/${symbol}/chart/1m?token=pk_8207a876013642979e0153f3cbdefa80`).then(res => res.data);
};


/* API - TOKENS:
pk_781bf54e8484405a96678c943814cab9 - cr..
pk_bca9c940899c41febb6d61a6f3bac328 - ver..
pk_8207a876013642979e0153f3cbdefa80 - prv..
*/