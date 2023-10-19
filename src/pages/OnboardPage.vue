<template>
  <q-page class="column justify-start limit-size">
    <div class="onboard-page column" :class="transformAmount">
      <div class="logo-holder col-auto">
        <div class="logo-container q-pa-md">
          <q-img src="icons/hashpass-lock.svg" class="logo"/>
        </div>
      </div>
      <div class="title text-center pad-from-logo col-auto">
        <h3 class="text-weight-light no-padding no-margin">Hashpass</h3>
        <h5 class="text-weight-light q-py-sm no-margin">Unlock your security potential</h5>
      </div>
      <div class="content row col-auto">
        <transition
          name="fade"
          mode="out-in"
          duration="250"
        >
          <div v-if="page == 'onboard'" class="onboard-options col-12 column justify-center">
            <div class="signup row justify-center q-pa-sm col-auto">
              <q-btn class="col-8" unelevated rounded label="Sign up" color="primary" @click="toSignup"/>
            </div>
            <div class="login row justify-center q-pa-sm col-auto">
              <q-btn class="col-8" outline rounded label="Login" color="primary" @click="toLogin"/>
            </div>
          </div>

          <signup v-else-if="page == 'signup'" @toOnboard="toOnboard" />
          <login v-else-if="page == 'login'" @toOnboard="toOnboard"/>
        </transition>
      </div>
    </div>
  </q-page>
</template>

<style scoped lang="scss">
.onboard-page {
  width: 60em;
  
  transition: transform 0.5s ease-out;
}
// Mobile 
@media (max-width: 600px) {
  .onboard-page {
    width: 100vw;
  }
}

// .content {
  .logo-holder {
    // height: 40vh;
    height: 80vw;
    max-height: 40vh;
    width: 100vw;
    background-color: $primary;
    border-bottom-left-radius: 40%;
    border-bottom-right-radius: 40%;
  
    position: relative;
  }
//   width: 60em;
// }


.logo-container {
  position: absolute;
  bottom: 0;
  right: 50%;
  transform: translateY(50%) translateX(50%);
  background-color: $grey-1;

  height: 25vw;
  width: 25vw;
  border-radius: 50%;
}

.logo {
  transform: translateY(-5%)
}

.pad-from-logo {
  padding-top: 15.5vw; // half of the logo to ensure all divs are below the logo
}

.slide-up-20 {
  transform: translateY(-30vh);
}


.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>

<script setup>
import { ref, computed } from 'vue'

import Signup from '../components/Auth/SignupForm.vue'
import Login from '../components/Auth/LoginForm.vue'

// import { useRouter } from 'vue-router'

// const router = useRouter()

const page = ref('onboard')

const transformAmount = computed(() => {
  if (page.value == 'onboard') return ''
  return 'slide-up-20'
})

const toOnboard = () => {
  page.value = 'onboard'
}

const toSignup = () => {
  page.value = 'signup'
}

const toLogin = () => {
  page.value = 'login'
}
</script>
