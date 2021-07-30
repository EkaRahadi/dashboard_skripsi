import { atom } from 'recoil';
import { recoilPersist } from 'recoil-persist'

const { persistAtom } = recoilPersist()

export const userProfile = atom({
    key: 'userProfile',
    default: {},
    effects_UNSTABLE: [persistAtom],
});

export const userList = atom({
    key: 'userList',
    default: [],
});

export const resultCost = atom({
    key: 'resultCost',
    default: ``
})

export const parameterList = atom({
    key: 'parameterList',
    default: [],
});

export const datasetList = atom({
    key: 'datasetList',
    default: [],
});

export const resultParameter = atom({
    key: 'resultParameter',
    default: ``,
});