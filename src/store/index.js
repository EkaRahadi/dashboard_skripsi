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