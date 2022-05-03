import { createStore } from 'vuex'
import createPersistedState from 'vuex-persistedstate'
import axios from '@/axios/jayeon-axios'
import router from '@/router'

export default createStore({
  state: {
    user: {
      id : null,
      userId: null,
      userName: null,
      login : false
    }
  },
  getters: {
    getLogin : state => { 
      return state.user.login;
    }
  },
  mutations: {  //commit
    setUser(state, _user) {
      state.user = _user;
    },
    logout: (state) => {
      const user = {
        id: null,
        userId : null,
        userName: null,
        login : false
      };
      state.user = user;
    }
  },
  actions: {  //dispatch
    async login({ commit }, _user){
      axios.post('/member/login',_user)
      .then(res => {
        const user = {
          id: res.data.id,
          userId : res.data.user_id,
          userName: res.data.user_name,
          login : true
        };
        commit('setUser', user);
        router.push('/');
      })
      .catch(error => {
        if (error.response.status == 401) {
          alert('아이디 혹은 비밀번호를 확인해주세요!');
        } else { 
          alert('로그인 처리 중 알수 없는 오류 발생');
        }
      })
    },
    async logout({ commit }) { 
      commit('logout');
    }
  },
  modules: {
  },
  plugins: [
    createPersistedState({
    })
  ]
})
