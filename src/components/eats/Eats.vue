<template>
  <div class="bg-dark text-secondary px-4 py-5 text-center">
    <div class="py-5">
      <h1 class="display-5 fw-bold text-white">뽑기</h1>
      <div class="col-lg-6 mx-auto">
        <p class="fs-5 mb-4">뭐든 현재 위치를 기준으로 랜덤으로 추천해줍니다</p>
        
        <p class="fs-5">1. 위치 선택</p>
        <div class="d-grid gap-2 d-sm-flex justify-content-sm-center">
          <button class="btn btn-secondary" @click="location">현재 위치로</button>
          <button class="btn btn-secondary" @click="execDaumPostcode">주소검색</button>
        </div>

        <p class="fs-5">2. 검색</p>
        <div class="d-grid gap-2 d-sm-flex justify-content-sm-center row">
          <div class="col-md-6"><input class="form-control text-center" type="text" id="keyword" placeholder="ex) 대학교, 병원, 중국집, 한식 ..."/></div>
          <div class="col-md-6"><input class="form-control text-center" type="text" id="radius" placeholder="거리 입력 (m기준 / 기본 500m 반경, 최대 50,000m 검색)"/></div>
        </div>
        <div class="d-grid gap-2 d-sm-flex justify-content-sm-center row mt-1">
          <div class="col-md-3"><button class="btn btn-secondary" @click="makeMarkers">검색</button></div>
        </div>

        <p class="fs-5">3. 뽑기</p>
        <div class="d-grid gap-2 d-sm-flex justify-content-sm-center row mt-1">
          <div class="col-md-6"><button class="btn btn-secondary" @click="makeMarkersSelect">바로 뽑기</button></div>
          <div class="col-md-6"><button class="btn btn-secondary" @click="randomSelect">뽑기</button></div>
        </div>
      </div>
    </div>
  </div>

  <div class="b-example-divider mb-0"></div>
  <GoogleMap api-key="AIzaSyDd4q1fnJ_2BBXJo8TgMA1-0Csgf_y6Ya8" style="width: 100%; height: 500px" :center="center" :zoom="15">
    <div :key="index" v-for="(m, index) in markers">
      <Marker :options="m">
        <InfoWindow>
          <div class="card">
            <div class="card-header">
              영업 상태 : {{m.opennow}}
            </div>
            <div class="card-body">
              <h5 class="card-title">{{m.name}}</h5>
              <p class="card-text">
                평점 : {{m.rating}} (총 리뷰 {{m.userRatingsTotal}} 건)
              </p>
              <p class="card-text">
                가격대 : {{m.priceLevel}}
              </p>
              <p class="card-text">
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
import jayeon from "@/axios/jayeon-axios";

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
    async makeMarkers(){
      const keyword = document.getElementById('keyword').value;
      const radius = document.getElementById('radius').value;
      if(keyword == ''){
        alert('키워드는 필수값입니다!');
        return;
      }

      const data = {
        lat : this.center.lat,
        lng : this.center.lng,
        keyword : keyword,
        radius : radius,
      }
      await jayeon.post('/google/places',data)
      .then(async res =>{
        console.log(res);
        const result = res.data;
        if(result.status == 'ZERO_RESULTS'){
          alert('일치하는 결과가 존재하지 않습니다!');
          return;
        }
        const markers = [];

        await result.results.forEach(r => {
          let opennow = '알 수 없음';
          if(typeof r.opening_hours != 'undefined') opennow = r.opening_hours.open_now == true ? '열림':'닫힘';

          let priceLevel = '매우 저렴';
          if(typeof r.price_level != 'undefined'){
            priceLevel = r.price_level == 1 ? '매우 저렴' :
              r.price_level == 2 ? '저렴' :
              r.price_level == 3 ? '보통' :
              r.price_level == 4 ? '비쌈' : 
              r.price_level == 5 ? '매우 비쌈' : '알 수 없음';
          }

          const marker = {
            position : r.geometry.location, 
            label: r.name.substring(0,1),
            title: r.name, 
            opennow: opennow, 
            name: r.name, 
            content: r.vicinity, 
            rating : r.rating, 
            userRatingsTotal : r.user_ratings_total,
            priceLevel : priceLevel
          };
          markers.push(marker);
        });
        this.markers = markers;
      })
      .catch(err=>{
        alert('알 수 없는 오류 발생');
        console.err(err);
      });
    },
    //마커중 랜덤으로 뽑기
    randomSelect(){
      const range = document.querySelectorAll('[role=button]').length;
      if(range == 0){
        return ;
      }
      const random = Math.floor( ( Math.random() * range ));
      document.querySelectorAll('[role=button]')[random].querySelector('area').click();
    },
    makeMarkersSelect(){

      this.makeMarkers();

    }
  },
  
  beforeMount(){
    this.location();
  },
}
</script>