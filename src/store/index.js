import { atom, selector } from 'recoil';
import axios from 'axios';

export const userProfile = atom({
    key: "userProfile",
    default: {}
});
export const agePredict = selector({
    key: "agePredict",
    get: async () => {
        let agePredict = null;

        try {
            let { data } = axios.get('https://api.agify.io/?name=bella');
            agePredict = { agePredict: data };

        } catch (error) {
            agePredict = { agePredict: error.message };
        }


        return agePredict;
    }
})