
import { sessionStorage } from '../assets/js/storage';

const getters = {
    getUserType: function (state, getters) {
        return state.role_type;
    },
};

export default getters;