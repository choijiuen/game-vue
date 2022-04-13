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

            axios.post('/auth/join',user)
            .then(res => {
                if(res.data.code === '200'){
                    alert('회원가입 완료!');
                    router.push({name:'login'});
                }else if(res.data.code === '400'){
                    alert(res.data.errors[0].msg);
                    console.error('회원가입 실패');
                }else if(res.data.code === '401'){
                    alert(res.data.msg);
                    const target = document.getElementById('id');
                    target.value = '';
                    target.focus();
                    console.error('회원가입 실패');
                }
            })
            .catch(error => {
                alert('알 수 없는 이유로 실패했습니다!');
                console.log(error)
            })
        }
    }
}
</script>