<template>
  <q-page class="row" >
    <vertical-drawer class="col-12" :logo-background="backgroundColor" drawer-background-class="bg-grey-2">

      <template v-slot:logo>
        <q-img v-if="service?.logo" :src="service?.logo" class="logo" ref="logoElement" crossorigin="anonymous" @load="getAverageColor"/>
        <h3 v-else-if="service?.name" class="text-center text-h3 text-weight-light" >{{ service.name[0] }}</h3>
        <!-- <dynamic-letter-logo v-else-if="service?.name" :name="service?.name" class="logo" ref="dyanmicLogoElement"/> -->
        <!-- <q-img src="https://www.usatoday.com/gcdn/presto/2019/08/16/USAT/bd6538e4-5535-41ce-857b-518451c3a958-Snapchat_Logo_H.png?crop=2499,1406,x1,y56&width=2499&height=1406&format=pjpg&auto=webp" class="logo" ref="logoElement" crossorigin="anonymous"/> -->
      </template>
      
      <template v-slot:content>
        <div class="col-12 row bg-grey-1 content q-pa-md">
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
            <div class="col-12 row" @click="togglePassword" v-touch-hold="copyPassword">
              <div class="col-auto password text-weight-bold">
                {{ showPassword ? 'WWWWWWWWWWWWWWWWW' : '●●●●●●●●●●●●●●●●'  }}
                <div class="password-copied text-caption text-weight-regular text-primary" :style="passwordCopyStyle">
                  Copied
                </div>
              </div>
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
              <q-input class="fit" autogrow filled type="textarea" :model-value="service?.note?.other"/>
            </div>
          </div>
        </div>
      </template>
      
    </vertical-drawer>
  </q-page>

</template>

<style scoped lang="scss">
.logo {
  width: 100%;
  aspect-ratio: 1;
}
.content {
  border-radius: 1em 1em 0 0;
}
.password {
  position: relative;
  letter-spacing: 3px;
}

.password-copied {
  position: absolute;
  top: 0;
  left: 50%;
  transform: translate(-50%, -150%);
  border-radius: 1em;
  background-color: white;
  padding: 0.25em 2em;
  box-shadow: 0 0 10px rgba(0,0,0,0.1);
  transition: all 0.5s ease-out;
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

import { useRoute, useRouter } from 'vue-router'
import { ref, computed, onActivated, onMounted } from 'vue';
import { FastAverageColor } from 'fast-average-color'
import { QImg } from 'quasar';

import { useServiceStore } from 'stores/service'

import VerticalDrawer from 'components/Layout/VerticalDrawer.vue'
import algorithmSelector from '../../components/Inputs/AlgoSelector.vue'
import { generateColors, generateSeed } from '../../components/App/misc/DynamicLetterLogo'


const router = useRouter()
const route = useRoute()
const serviceStore = useServiceStore()

const service = ref<Service | null | undefined>(null)


onMounted(() => {
  console.log('activated')

  // Get the Service information
  const listService = serviceStore.services.find(service => service.name === route.params.service)
  service.value = listService
  console.log(service.value)
}) 

const logoColor = ref('#000000')
const logoElement = ref<InstanceType<typeof QImg> | null>(null)
const getAverageColor = () => {
  if (!logoElement.value) return
  const element = logoElement.value.$el
  const imgContainer = element.querySelector('img')

  const fac = new FastAverageColor();
  const color = fac.getColor(imgContainer, { algorithm: 'dominant' });

  logoColor.value = color.hex
}

const showPassword = ref(false)
const togglePassword = () => {
  showPassword.value = !showPassword.value
}
const computedShowPassword = computed(() => {
  return showPassword.value ? 'true' : 'false'
})

const backgroundColor = computed(() => {
  if (!logoElement.value) {

    const seed = generateSeed(service.value?.name || '');
    const colors = generateColors(seed);

    return `linear-gradient(45deg, ${colors[0]}, ${colors[1]})`


    // if (!dyanmicLogoElement.value) return 'white'
    // const background = dyanmicLogoElement.value.backgroundColor
    // return `${background}`
  }

  return `${logoColor.value}`
})

let copied = ref(false)
const passwordCopyStyle = computed(() => {
  if (!copied.value) {
    return {
      opacity: 0,
      transform: 'translate(-50%, -100%)'
    }
  }
  return {
    opacity: 1,
    transform: 'translate(-50%, -150%)'
  }
})

const copyPassword = () => {
  copied.value = true
  setTimeout(() => {
    copied.value = false
  }, 2000)

  console.log('copied')
}
</script>
