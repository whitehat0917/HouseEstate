import {
    SETMULTIIP,
    SETMENU
} from '../actions/types';

const initialState = {
    multiIp: false,
    menuId: 1
}

const admin = (state = initialState, action) => {
    switch (action.type) {
        case SETMULTIIP:
            {
                const { multiIp } = action.payload;
                return {
                    ...state,
                    multiIp: multiIp
                }
            }
        case SETMENU:
            {
                const { menuId } = action.payload;
                return {
                    ...state,
                    menuId: menuId
                }
            }
        default:
            return state;
    }
}

export default admin;