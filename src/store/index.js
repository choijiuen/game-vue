import jayeon from '../axios/jayeon-axios'
import { createStore } from 'vuex'

export default createStore({
  state: {
    user: null
  },
  getters: {
  },
  mutations: {  //commit
    setUser(state, _user){
      state.user = _user;
      localStorage.setItem('user', JSON.stringify(_user));
      jayeon.defaults.headers.common['Authorization'] = `Bearer ${_user.token}`;
    }
  },
  actions: {  //dispatch
    login:({commit}, _user) =>{
      jayeon.post('/member/login',_user)
      .then(res => {
          console.log(res.headers);
          const token = res.headers.token;
          const userId = res.headers.user_id;
          const user = {
            userId : userId,
            token : token
          };
          commit('setUser', user);
      })
      .catch(error => {
          console.log(error);
      })
    }
  },
  modules: {
  }
})
