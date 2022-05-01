<template>
    <div class="row mt-5">
        <div class="col-3"></div>
        <main class="form-signin col-6">
            <form>
                <div class="form-floating">
                    <input type="text" class="form-control" id="id" placeholder="아이디">
                    <label for="id">아이디</label>
                </div>
                <div class="form-floating mt-1">
                    <input type="password" class="form-control" id="pw" placeholder="비밀번호">
                    <label for="pw">비밀번호</label>
                </div>

                <div class="checkbox mb-3">
                <!-- <label>
                    <input type="checkbox" value="remember-me"> Remember me
                </label> -->
                </div>
                <button class="w-100 btn btn-lg btn-primary" type="button" @click="login()">로그인</button>
                <router-link to="/join"><button type="button" class="w-100 btn btn-lg btn-dark mt-1">회원가입</button></router-link>
            </form>
        </main>
    </div>
</template>

<script>
export default {
  name: 'LoginComponent',
  props: {
    msg: String
  },
  methods:{
        login(){
            const id = document.getElementById('id').value;
            const pw = document.getElementById('pw').value;
            
            const user = {
                userId : id,
                pw : pw
            }
            //console.log(user)
            this.$store.dispatch('login', user);
        },
    }
}
</script>