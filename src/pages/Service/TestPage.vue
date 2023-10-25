<template>
  <q-page class="row" >
    <vertical-drawer class="col-12">

      <template v-slot:logo>
        <q-img v-if="" :src="service?.logo" class="logo" ref="logoElement" crossorigin="anonymous" @load="getAverageColor"/>
        <q-img src="https://www.usatoday.com/gcdn/presto/2019/08/16/USAT/bd6538e4-5535-41ce-857b-518451c3a958-Snapchat_Logo_H.png?crop=2499,1406,x1,y56&width=2499&height=1406&format=pjpg&auto=webp" class="logo" ref="logoElement" crossorigin="anonymous"/>
      </template>
      
      <template v-slot:content>
        <div class="col-12 row bg-grey-1 content q-pa-md" :style="contentTransform" v-touch-pan.mouse.stop.prevent.vertical="handleScroll"> <!-- Content goes here -->
      <div class="col-12 row">
        <div class="bg-white">
          <div class="col-12 text-h5 text-weight-bold no-margin">
            {{ service?.name }}
          </div>
          <div class="col-12 text-subtitle">
            {{ service?.domain }}
          </div>
        </div>
      </div>

      <div class="col-12 q-py-sm" />

      <div class="col-12 row content-container">
        <div class="col-12 text-primary">
          Username
        </div>
        <div class="col-12 content-focus q-py-sm">
          {{ service?.note?.username }}
        </div>
      </div>

      <div class="col-12 q-py-sm" />

      <div class="col-12 row content-container">
        <div class="col-12 text-primary">
          Password
        </div>
        <div class="col-12 text-weight-bold q-py-sm  password" @click="togglePassword">
          {{ showPassword ? 'WWWWWWWWWWWWWWWWW' : '●●●●●●●●●●●●●●●●'  }}
        </div>
      </div>

      <div class="col-12 q-py-sm" />

      <div class="col-12 row content-container">
        <div class="col-12 text-primary">
          Algorithm
        </div>
        <div class="col-12 q-py-sm">
          <algorithm-selector />
        </div>
      </div>

      <div class="col-12 q-py-sm" />

      <div class="col-12 row content-container">
        <div class="col-12 text-primary">
          Notes
        </div>
        <div class="col-12 text-weight-bold q-py-sm">
          <q-input class="fit" autogrow filled type="textarea" :model-value="service?.note?.username"/>
        </div>
      </div>



      <div class="col-12 q-py-xl"></div>

      <div class="col-12 row content-container shadow-10 q-pa-sm">
        <div class="col-12 row">
          <div class="col-auto q-pr-sm text-weight-light">
            Username: 
          </div>
          <div class="col-auto text-weight-light">
            {{ service?.note }}
          </div>
        </div>
        <div class="col-12 row items-center ">
          <!-- <div class="col-auto">
            <q-btn class="" round flat :icon="!showPassword ? 'visibility' : 'visibility_off'"  @click="togglePassword"/>
          </div> -->
          <div class="col-12 text-weight-bold  password" @click="togglePassword">
            <transition
              appear
              :duration="250"
              name="fade"
              mode="out-in"
            >
              <div :key="computedShowPassword">
                {{ showPassword ? 'WWWWWWWWWWWWWWWWW' : '●●●●●●●●●●●●●●●●'  }}
              </div>
            </transition>
          </div>
        </div>
      </div>
      <div class="col-12 q-py-sm">
        <!-- <q-separator class="" /> -->
      </div>
      <div class="col-12 row content-container shadow-10">
        <algorithm-selector class="col-12 shadow" />
        <!-- <q-input filled label="Notes" :model-value="service?.note"/> -->
      </div>
      <div class="col-12 q-py-sm">
        <!-- <q-separator class="" /> -->
      </div>
      <div class="col-12 row content-container shadow-10">
        <q-input class="fit" autogrow borderless filled label="Notes" type="textarea" :model-value="service?.note?.other"/>
      </div>
    </div>
      </template>
      
    </vertical-drawer>
  </q-page>

</template>

<style scoped lang="scss">
// .logo-container {
//   width: 100vw;
//   aspect-ratio: 1;
//   position: fixed;
//   top: 0;
//   left: 0;
//   z-index: -1;
// }
// .logo {
//   position: absolute;
//   top: 50%;
//   left: 50%;
//   transform: translate(-50%, -50%);
//   width: 66%;
// }
.content {
  // height: fit-content;
  border-radius: 1em 1em 0 0;
  padding-bottom: v-bind(footerHeight)px;
}
.password {
  letter-spacing: 3px;
}
.content-container {
  width: 100%;
  margin: auto;
  border-radius: 1em;
  padding: 1em;
  box-shadow: 0 0 10px rgba(0,0,0,0.1);
  background-color: white;
}
.content-focus {
  font-size: 1.25rem;
}
.square {
  aspect-ratio: 1;
}

.fade-enter-active {
  animation: fade 0.2s ease-in-out;
}
.fade-leave-active {
  animation: fade 0.2s ease-in-out reverse;
}
@keyframes fade {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}
</style>

<script setup lang="ts">
import VerticalDrawer from 'components/Layout/VerticalDrawer.vue'

import { useRoute, useRouter } from 'vue-router'
import { ref, computed, onActivated } from 'vue';
// import { FastAverageColor } from 'fast-average-color'
// import { QImg } from 'quasar';

import { useServiceStore } from 'stores/service'

import algorithmSelector from '../../components/Inputs/AlgoSelector.vue'

const router = useRouter()
const route = useRoute()
const serviceStore = useServiceStore()

const service = ref<Service | null | undefined>(null)

onActivated(() => {
  console.log('activated')

  // Get the Service information
  const listService = serviceStore.services.find(service => service.name === route.params.service)
  service.value = listService
  console.log(service.value)
}) 

// const logoColor = ref('#000000')
// const logoElement = ref<InstanceType<typeof QImg> | null>(null)
// const getAverageColor = () => {
//   if (!logoElement.value) return
//   const element = logoElement.value.$el
//   const imgContainer = element.querySelector('img')

//   const fac = new FastAverageColor();
//   const color = fac.getColor(imgContainer, { algorithm: 'dominant' });

//   logoColor.value = color.hex
// }

const showPassword = ref(false)
const togglePassword = () => {
  showPassword.value = !showPassword.value
}
const computedShowPassword = computed(() => {
  return showPassword.value ? 'true' : 'false'
})
</script>
