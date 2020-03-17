import { sessionStorage } from '../assets/js/storage';

const mutations = {
  SET_USER (state, user) {
    state.user = user;
    sessionStorage.setItem('user', user);
  },
  SET_TOKEN (state, token) {
    state.token = token;
    sessionStorage.setItem('token', token);
  },
  changeUserType (state, getters){
    state.role_type = getters;
    console.log(state)
  }
};

export default mutations;

