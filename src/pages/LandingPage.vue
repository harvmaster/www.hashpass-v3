<template>
  <q-page class="column signup-page fit" :class="leaving ? 'fade-out' : ''">
    <div class="top-element col-auto slide-down">
      <div class="logo row justify-center items-center q-pa-md">
        <q-img src="icons/hashpass-lock.svg" class="hashpass-logo"/>
      </div>
    </div>

    <div class="onboard col column justify-between">
      <div class="welcome text-center q-pt-lg col-auto">
        <h3 class="text-weight-light no-padding no-margin">Hashpass</h3>
        <h5 class="text-weight-light q-py-sm no-margin">Unlock your security potential</h5>
      </div>
      <div class="auth-options col-auto row justify-center q-pa-md">
        <div class="signup col-12 row justify-center q-pa-sm">
          <q-btn class="col-8" unelevated rounded label="Sign up" color="primary" @click="toSignup"/>
        </div>
        <div class="login col-12 row justify-center q-pa-sm">
          <q-btn class="col-8" outline rounded label="Login" color="primary" @click="toLogin"/>
        </div>
      </div>
    </div>
  </q-page>
</template>

<style scoped lang="scss">
.top-element {
  height: 40vh;
  width: 100vw;
  background-color: #1976D2;
  border-bottom-left-radius: 40%;
  border-bottom-right-radius: 40%;

  position: relative;
  animation: slide-down 0.5s ease-out;
}

@keyframes slide-down {
  0% {
    transform: translateY(-100%);
  }
  100% {
    transform: translateY(0%);
  }
}

@keyframes fade-in {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}

@keyframes fade-out {
  0% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
}

.fade-out {
  animation: fade-out 0.5s ease-out;
}

.logo {
  position: absolute;
  bottom: 0;
  right: 50%;
  transform: translateY(50%) translateX(50%);
  background-color: $grey-1;

  height: 25vw;
  width: 25vw;
  border-radius: 50%;
}
.hashpass-logo {
  transform: translateY(-5%)
}

.onboard {
  width: 100vw;
  padding-top: 12.5vw; // half of the logo to ensure all divs are below the logo

  animation: fade-in 0.5s ease-in;
}

.auth-options {
  padding-bottom: 15vw;
}
</style>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const leaving = ref(false)
const toSignup = () => {
  leaving.value = true
  setTimeout(() => {
    router.push('/signup')
  }, 500)
}

const toLogin = () => {
  leaving.value = true
  setTimeout(() => {
    router.push('/login')
  }, 500)
}

</script>
