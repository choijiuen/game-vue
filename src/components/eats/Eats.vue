<template>
  <div class="bg-dark text-secondary px-4 py-5 text-center">
    <div class="py-5">
      <h1 class="display-5 fw-bold text-white">메뉴를 랜덤으로 추천해줍니다</h1>
      <div class="col-lg-6 mx-auto">
        <p class="fs-5 mb-4">메뉴 뽑기 시작</p>
        
        <p class="fs-5">1. 위치 선택</p>
        <div class="d-grid gap-2 d-sm-flex justify-content-sm-center">
          <button class="btn btn-secondary" @click="location">현재 위치로</button>
          <button class="btn btn-secondary" @click="execDaumPostcode">주소검색</button>
        </div>
        <p>lat : {{center.lat}}</p>
        <p>lng : {{center.lng}}</p>

        <p class="fs-5">2. 음식점 검색</p>
        <div class="d-grid gap-2 d-sm-flex justify-content-sm-center row">
          <div class="col-md-9"><input class="form-control" type="text" placeholder="ex) 한식, 맥도날드, 일식, 중식, 자장면, 탕수육 ..."/></div>
          <div class="col-md-3"><button class="btn btn-secondary" @click="makeMarkers">검색</button></div>
        </div>
      </div>
    </div>
  </div>

  <div class="b-example-divider mb-0"></div>
  <GoogleMap api-key="AIzaSyDd4q1fnJ_2BBXJo8TgMA1-0Csgf_y6Ya8" style="width: 100%; height: 500px" :center="center" :zoom="15">
    <div :key="index" v-for="(m, index) in markers">
      <Marker :options="m">
        <InfoWindow>
          <div>
            <h1 class="firstHeading">{{m.name}}</h1>
            <div>
              <p>
                <b>{{m.name}}</b>{{m.content}}
              </p>
            </div>
          </div>
        </InfoWindow>
      </Marker>
    </div>
  </GoogleMap>
</template>

<script>
import { GoogleMap, Marker, InfoWindow } from "vue3-google-map";
import axios from "axios";

export default {
  name: 'EatsComponent',
  props: {
    msg: String
  },
  components: { GoogleMap, Marker, InfoWindow },
  data() {
    const googleApiKey = process.env.VUE_APP_GOOGLE_API_KEY;
    const center = { lat: 37.382314, lng: 127.119613 };
    const markers = [
    ]
    return { googleApiKey, center, markers };
  },
  methods:{
    //지도 출력
    location(){
        if(!navigator.geolocation) {
            const msg = '위치 정보가 지원되지 않습니다.';
            alert(msg);
            throw msg;
        }
        navigator.geolocation.getCurrentPosition(position => {
            this.center = {
              lat : position.coords.latitude,
              lng : position.coords.longitude
            }
        });
    },
    //다음 주소 검색
    execDaumPostcode() {
      new window.daum.Postcode({
        oncomplete: (data) => {
          this.kakaoAddress(data.address);
        },
      }).open();
    },
    //주소를 기준으로 위도, 경도 정보 가져오기
    kakaoAddress(address){
      axios.get('https://dapi.kakao.com/v2/local/search/address',{
        params:{
          query: address
        },
        headers:{
          Authorization : 'KakaoAK '+ process.env.VUE_APP_KAKAO_REST_API_KEY
        }
      })
      .then(res=>{
        const roadAddress = res.data.documents[0].address;
        this.setCenter(roadAddress.x,roadAddress.y);
      })
      .catch(err=>{
        alert('주소를 불러오는데 실패했습니다...');
        console.log(err);
      });
    },
    //지도 위치 변경
    setCenter(x, y){
      const xx = Number(x);
      const yy = Number(y);
      this.center = {
        lat : yy,
        lng : xx
      }
    },
    //지도에 마크 찍어내기
    makeMarkers(){
      this.markers = [
        { position: { lat: 37.382314, lng: 127.119222 }, label: "L", title: "LADY LIBERTY", name: "test1", content: "내용1"},
        { position: { lat: 37.382314, lng: 127.119111 }, label: "B", title: "LADY LIBERTY", name: "test2", content: "내용2"},
        { position: { lat: 37.382314, lng: 127.119333 }, label: "C", title: "LADY LIBERTY", name: "test3", content: "내용3"},
      ];
      console.log(this.markers);
      console.log(this.googleApiKey);
    }
  },
}
</script>