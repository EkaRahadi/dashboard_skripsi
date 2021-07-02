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
                // auth: {
                //     username: "app-ihz-smartsurvey",
                //     password: "smartsurvey",
                // },
                'x-access-token': refresh_token
            })
            .then((response) => {
                console.log(response);
                const data = response.data.data;
                window.localStorage.setItem("token", data.accessToken);
                window.localStorage.setItem("refreshToken", data.refreshToken);
                failedRequest.response.config.headers["x-access-token"] = data.accessToken;
                resolve();
            })
            .catch((error) => {
                console.log(error.response);
                window.localStorage.removeItem("token");
                window.localStorage.removeItem("refreshToken");
                window.location.replace("/login");
                reject(error);
            });
    });
};

createAuthRefreshInterceptor(axios, refreshToken, {
    statusCodes: [401],
});

export const login = (payload, token) => {
    const params = new URLSearchParams();
    const {email, password} = payload;
    params.append('email', email);
    params.append('password', password);

    return new Promise((resolve, reject) => {
        axios
            .post(API_BASE_URL + `/login`, params, {})
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