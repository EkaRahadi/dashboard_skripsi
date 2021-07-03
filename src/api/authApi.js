import axios from 'axios';
import createAuthRefreshInterceptor from "axios-auth-refresh";
import { API_BASE_URL } from '../api/index';

const refreshToken = (failedRequest) => {
    console.log(failedRequest);
    let refresh_token = window.localStorage.getItem("refreshToken");
    const params = new URLSearchParams();

    return new Promise((resolve, reject) => {
        axios
            .post(API_BASE_URL + `/refreshToken`, params, {
                headers: {
                    'x-access-token': refresh_token,
                },
            })
            .then((response) => {
                console.log(response);
                const data = response.data;
                window.localStorage.setItem("token", data.token);
                // window.localStorage.setItem("refreshToken", data.refreshToken);
                failedRequest.response.config.headers["x-access-token"] = data.token;
                resolve();
            })
            .catch((error) => {
                console.log(error);
                window.localStorage.removeItem("token");
                window.localStorage.removeItem("refreshToken");
                window.localStorage.clear();
                window.location.replace("/login");
                reject(error);
            });
    });
};

createAuthRefreshInterceptor(axios, refreshToken, {
    statusCodes: [401],
});

export const login = (payload) => {
    const params = new URLSearchParams();
    const {email, password} = payload;
    params.append('email', email);
    params.append('password', password);

    return new Promise((resolve, reject) => {
        axios
            .post(API_BASE_URL + `/login`, params, {
                skipAuthRefresh: true
            })
            .then((response) => {
                const { data } = response ;
                resolve(data);
            })
            .catch((error) => {
                console.log(error);
                reject(error);
            });
    });
}

export const addUser = (payload, token) => {
    const params = new URLSearchParams();
    const { email, password, name } = payload;
    params.append('email', email);
    params.append('password', password);
    params.append('name', name);

    return new Promise((resolve, reject) => {
        axios
            .post(API_BASE_URL + `/users`, params, {
                headers: {
                    'x-access-token': token,
                },
            })
            .then((response) => {
                const { data } = response ;
                resolve(data);
            })
            .catch((error) => {
                console.log(error);
                reject(error);
            });
    });
}

export const updateUser = (payload, token) => {
    const params = new URLSearchParams();
    const {email, password, name, userId} = payload;
    params.append('email', email);
    params.append('password', password);
    params.append('name', name);

    return new Promise((resolve, reject) => {
        axios
            .put(API_BASE_URL + `/users/${userId}`, params, {
                headers: {
                    'x-access-token': token,
                },
            })
            .then((response) => {
                const { data } = response ;
                resolve(data);
            })
            .catch((error) => {
                console.log(error);
                reject(error);
            });
    });
}

export const getUser = (payload, token) => {
    const { userId } = payload;

    return new Promise((resolve, reject) => {
        axios
            .get(API_BASE_URL + `/users/${userId}`, {
                headers: {
                    'x-access-token': token,
                },
            })
            .then((response) => {
                const { data } = response ;
                resolve(data);
            })
            .catch((error) => {
                console.log(error.response);
                reject(error);
            });
    });
}

export const getAllUser = (token) => {
    return new Promise((resolve, reject) => {
        axios
            .get(API_BASE_URL + `/users`, {
                headers: {
                    'x-access-token': token,
                },
            })
            .then((response) => {
                const { data } = response ;
                resolve(data);
            })
            .catch((error) => {
                console.log(error.response);
                reject(error);
            });
    });
}

export const deleteUser = (payload, token) => {
    const { userId } = payload;
    return new Promise((resolve, reject) => {
        axios
            .delete(API_BASE_URL + `/users/${userId}`, {
                headers: {
                    'x-access-token': token,
                },
            })
            .then((response) => {
                const { data } = response ;
                resolve(data);
            })
            .catch((error) => {
                console.log(error.response);
                reject(error);
            });
    });
}