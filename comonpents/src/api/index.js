import axios from 'axios'

const service = axios.create({
    baseURL: '',
    timeout: 60 * 1000 * 10
})

service.interceptors.request.use(config => {
    config.headers['Content-Type'] = 'application/json';
    return config;
})


service.interceptors.response.use(res => {
    let { status } = res
    if (status > 300 || status < 200) {
        return Promise.reject('error')
    } else {
        let { code, data } = res.data
        if (code === 0) {
            return data
        } else {
            return Promise.reject('error')
        }
    }

})

export default service