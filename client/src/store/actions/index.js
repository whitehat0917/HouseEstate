import {
    SETMULTIIP,
    SETMENU
} from './types';

export const setMultiIp = (multiIp) => {
    return {
        type: SETMULTIIP,
        payload: { multiIp }
    }
}

export const setMenu = (menuId) => {
    return {
        type: SETMENU,
        payload: { menuId }
    }
}