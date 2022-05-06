<template>

  <div class="bg-dark text-secondary px-4 py-5 text-center">
    <div class="py-5">
      <h1 class="display-5 fw-bold text-white">API 연동 테스트</h1>
      <div class="col-lg-6 mx-auto">
        <p class="fs-5 mb-4">정상 실행이 된다면 로그인 인증 후 정상적으로 API와 통신 중임</p>
        <div class="d-grid gap-2 d-sm-flex justify-content-sm-center">
          <button type="button" class="btn btn-outline-light" @click="test">테스트 버튼</button>
        </div>
      </div>
    </div>
  </div>

  <div class="b-example-divider mb-0"></div>
</template>


<style>
@import '@/css/heroes.css';
</style>

<script>
import axios from '@/axios/jayeon-axios'
import router from '@/router';
export default {
    methods:{
        test(){
            axios.get('/member/tokenCheck')
            .then(res => {
              console.log(res);
              if(res.status == '200'){
                  alert('정상실행');
              }
            })
            .catch((err) => {
              if(err.response.status == 401){
                alert('로그인 후 다시 시도해 주세요.');
                router.push({name:'login'});
              }
              console.log(err);
            })
        }
    }
}
</script>