import axios from 'axios';
import config from '../config/config';


export const userService = {
    get,
    post,
    humanizeKey
};

function get(apiEndpoint) {
    return axios.get(config.baseUrl + apiEndpoint).then((response) => {
        return response;
    }).catch((err) => {
        console.log("Error in response");
        console.log(err);
    })
}

function post(apiEndpoint, payload) {
    return axios.post(config.baseUrl + apiEndpoint, payload).then((response) => {
        return response;
    }).catch((err) => {
        console.log(err);
    })
}

function humanizeKey(str) {
    if (str) {
        var frags = str.split('_');
        for (let i = 0; i < frags.length; i++) {
            frags[i] = frags[i].charAt(0).toUpperCase() + frags[i].slice(1);
        }
        return frags.join(' ');
    }
    return '';
}

