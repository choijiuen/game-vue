<template>
  <body>
    <nav class="navbar navbar-expand-md navbar-dark bg-dark mb-4">
      <div class="container-fluid">
        <a class="navbar-brand">제목 미정</a>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarCollapse" aria-controls="navbarCollapse" aria-expanded="false" aria-label="Toggle navigation">
          <a class="navbar-toggler-icon"></a>
        </button>
        <div class="collapse navbar-collapse" id="navbarCollapse">
          <ul class="navbar-nav me-auto mb-2 mb-md-0">
            <li class="nav-item">
              <router-link class="nav-link" to="/">Home</router-link>
            </li>
            <li class="nav-item">
              <router-link class="nav-link" to="/about">About</router-link>
            </li>
          </ul>
          <form class="d-flex">
            <router-link v-if="login == false" to="/login"><button type="button" class="btn btn-primary me-2">로그인</button></router-link>
            <button v-else  type="button" class="btn btn-primary me-2">로그아웃</button>
            <router-link to="/join"><button type="button" class="btn btn-outline-light">회원가입</button></router-link>
          </form>
        </div>
      </div>
    </nav>
    <router-view/>
  </body>
</template>

<style>
@import url('css/navbar-top.css');
.bd-placeholder-img {
  font-size: 1.125rem;
  text-anchor: middle;
  -webkit-user-select: none;
  -moz-user-select: none;
  user-select: none;
}

@media (min-width: 768px) {
  .bd-placeholder-img-lg {
    font-size: 3.5rem;
  }
}
</style>

<script>

export default {
  data(){
    
    return{
      login:false
    }
  }
}
</script>
