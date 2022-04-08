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
                        <button class="w-100 btn btn-primary btn-lg mt-2" type="submit">중복확인</button>
                    </div>
                    <div class="col-12">
                        <input type="text" class="form-control" id="pw" placeholder="비밀번호" value="" required>
                    </div>
                    <div class="col-12">
                        <input type="text" class="form-control" id="rePw" placeholder="비밀번호 재입력" value="" required>
                    </div>
                    <div class="col-12">
                        <input type="text" class="form-control" id="name" placeholder="이름" value="" required>
                    </div>
                </div>

                <hr class="my-4">

                <button class="w-100 btn btn-dark btn-lg" type="submit">회원가입</button>
                </form>
            </div>
            </div>
        </main>
    </div>
</template>

<style>
@import url('../css/form-validation.css');
</style>