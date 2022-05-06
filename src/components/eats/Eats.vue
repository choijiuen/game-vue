<template>
  <div class="bg-dark text-secondary px-4 py-5 text-center">
    <div class="py-5">
      <h1 class="display-5 fw-bold text-white">API 연동 테스트</h1>
      <div class="col-lg-6 mx-auto">
        <p class="fs-5 mb-4">정상 실행이 된다면 로그인 인증 후 정상적으로 API와 통신 중임</p>
        <div class="d-grid gap-2 d-sm-flex justify-content-sm-center">
          <button class="btn btn-secondary" @click="location">현재 위치로</button>
        </div>
      </div>
    </div>
  </div>

  <div class="b-example-divider mb-0"></div>
  <GoogleMap api-key="AIzaSyDd4q1fnJ_2BBXJo8TgMA1-0Csgf_y6Ya8" style="width: 100%; height: 500px" :center="center" :zoom="15">
  </GoogleMap>
</template>

<script>
import { GoogleMap } from "vue3-google-map";

export default {
  name: 'EatsComponent',
  props: {
    msg: String
  },
  components: { GoogleMap },
  data() {
    const center = { lat: 37.38231400000, lng: 127.11961300000 };
    return { center };
  },
  methods:{
    location(){
        if(!navigator.geolocation) {
            const msg = '위치 정보가 지원되지 않습니다.';
            alert(msg);
            throw msg;
        }
        navigator.geolocation.getCurrentPosition(position => {
            //console.log(position.timestamp);  //위치 변경을 반환한 시간
            this.center = {
              lat : position.coords.latitude,
              lng : position.coords.longitude
            }
        });
    },
    locationView(){
        window.open(`https://www.openstreetmap.org/#map=17/${this.latitude}/${this.longitude}`);
    }
    
  },
}
</script>