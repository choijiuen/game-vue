<template>
  <div class="bg-dark text-secondary px-4 py-5 text-center">
    <div class="py-5">
      <h1 class="display-5 fw-bold text-white">API 연동 테스트</h1>
      <div class="col-lg-6 mx-auto">
        <p class="fs-5 mb-4">정상 실행이 된다면 로그인 인증 후 정상적으로 API와 통신 중임</p>
        <div class="d-grid gap-2 d-sm-flex justify-content-sm-center">
          현재 x : {{x}} y : {{y}}
        </div>
        <div class="d-grid gap-2 d-sm-flex justify-content-sm-center">
          <button class="btn btn-secondary" @click="location">위치변경</button>
        </div>
        
      </div>
    </div>
  </div>

  <div class="b-example-divider mb-0"></div>
</template>

<script>
export default {
  name: 'EatsComponent',
  props: {
    msg: String
  },
  data(){
    return {
      y : 1,
      x : 1
    }
  },
  methods:{
    location(){
      this.y = 2;
      this.x = 2;
    }
  }
}
</script>