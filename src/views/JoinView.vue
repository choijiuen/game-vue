<template>
    <div class="container">
        <main>
            <div class="py-5 text-center">
                <h2>회원가입</h2>
            </div>

            <div class="row g-5">
            <div class="col-md-12 col-lg-12">
                <form class="needs-validation" novalidate>
                <div class="row g-3">
                    <div class="col-12">
                        <input type="text" class="form-control" id="id" placeholder="아이디" value="" required>
                    </div>
                    <div class="col-12">
                        <input type="password" class="form-control" id="pw" placeholder="비밀번호" value="" required>
                    </div>
                    <div class="col-12">
                        <input type="password" class="form-control" id="rePw" placeholder="비밀번호 재입력" value="" required>
                    </div>
                    <div class="col-12">
                        <input type="text" class="form-control" id="name" placeholder="이름" value="" required>
                    </div>
                </div>

                <hr class="my-4">

                <button class="w-100 btn btn-dark btn-lg" type="button" @click="join">회원가입</button>
                </form>
            </div>
            </div>
        </main>
    </div>
</template>

<style>
@import url('../css/form-validation.css');
</style>

<script>
import axios from '../axios/jayeon-axios'
import router from '@/router';
export default {
    methods:{
        join(){
            const id = document.getElementById('id').value;
            const pw = document.getElementById('pw').value;
            const rePw = document.getElementById('rePw').value;
            const name = document.getElementById('name').value;

            const user = {
                userId : id,
                pw : pw,
                rePw : rePw,
                name : name
            }

            axios.post('/member/join',user)
            .then(res => {
                if(res.data.code === '200'){
                    alert('회원가입 완료!');
                    router.push({name:'login'});
                }
            })
            .catch((err) => {
                if(err.response.status == 503){
                    alert('잠시 후 다시 시도해주세요!');
                }
                const code = err.response.data.code;
                if(code == 400){
                    alert(err.response.data.errors[0].msg);
                }else if(code == 403){
                    alert(err.response.data.msg);
                }
                console.log();
                
            })
        }
    }
}
</script>