import axios from 'axios';
import authHeader from './auth-header';
import { config } from '../config.js';

const API_URL = 'http://' + config.serverAddress + '/api/test/';

class UserService {
    getDashboardData() {
        return axios.get(API_URL + 'getDashboardData', { headers: authHeader() });
    }

    getHouses(page) {
        return axios.post(API_URL + 'getHouses', { page: page }, { headers: authHeader() });
    }

    getHouseLength() {
        return axios.get(API_URL + 'getHouseLength', { headers: authHeader() });
    }
}

export default new UserService();