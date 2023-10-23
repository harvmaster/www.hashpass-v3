<template>
  <q-page class="row">
    <div class="logo-container" :style="logoTransform">
      <div class="fit" style="position: relative;">
        <q-img src="https://www.usatoday.com/gcdn/presto/2019/08/16/USAT/bd6538e4-5535-41ce-857b-518451c3a958-Snapchat_Logo_H.png?crop=2499,1406,x1,y56&width=2499&height=1406&format=pjpg&auto=webp" class="logo" @load="getAverageColor" ref="logoElement" crossorigin="anonymous"/>
      </div>
    </div>
    <div class="col-12 row shadow-up-1 bg-white content q-pa-md" :style="contentTransform" v-touch-pan.mouse.stop.prevent.vertical="handleScroll"> <!-- Content goes here -->
      <div class="col-12">
        {{ service?.name }}
      </div>
    </div>
  </q-page>

</template>

<style scoped lang="scss">
.logo-container {
  width: 100vw;
  aspect-ratio: 1;
  position: fixed;
  top: 0;
  left: 0;
  z-index: -1;
}
.logo {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 66%;
}
.content {
  height: fit-content;
  border-radius: 1em 1em 0 0;
}
</style>

<script setup lang="ts">
import { useRoute } from 'vue-router'
import { ref, computed, onMounted, onUnmounted } from 'vue';
import { FastAverageColor } from 'fast-average-color'
import { QImg } from 'quasar';

import { useServiceStore } from 'stores/service'

interface Service {
  name: string; 
  note?: string;
  legacy: boolean;
  encoding: string;   
  logo: string;
  domain: string;
  dateUsed?: number;
  dateAdded?: number;
  timesUsed?: number;
}

const route = useRoute()
const serviceStore = useServiceStore()

const service = ref<Service | null | undefined>(null)

const momentum = 0.9;
let momentumTimer: NodeJS.Timeout;
const lastFiveScrolls = ref([0,0,0,0,0])
const handleScroll = (value: TouchEvent) => {
  if (momentumTimer !== null) clearInterval(momentumTimer)
  if (value.isFirst) {
    lastFiveScrolls.value = [0,0,0,0,0]
  }

  const clampValue = (value: number) => {
    const minValue = getWindowWidth() / 5;
    const maxValue = getWindowWidth()
    if (value < minValue) return minValue
    if (value > maxValue) return maxValue
    return value
  }

  const scroll = value.delta.y
  lastFiveScrolls.value.shift()
  lastFiveScrolls.value.push(scroll)
  const currentValue = contentOffset.value

  const minValue = getWindowWidth() / 5;
  const maxValue = getWindowWidth()

  let newValue = clampValue(currentValue + scroll)

  contentOffset.value = newValue

  // Apply momentum to the scroll after its been released
  if (value.isFinal) {
    let velocity = lastFiveScrolls.value.reduce((a,b) => a + b, 0) / 5
    momentumTimer = setInterval(() => {
      newValue = clampValue(newValue + velocity)
      contentOffset.value = newValue
      velocity *= momentum
      if (Math.abs(velocity) < 1) clearInterval(momentumTimer)
    }, 10)

  }
}

const logoOffset = ref(-50)
const logoTransform = computed(() => {
  const transform = (contentOffset.value - (getWindowWidth())) / 2
  return {
    transform: `translateY(${transform}px)`,
    backgroundColor: logoColor.value
  }
})

const contentOffset = ref(0);
const contentTransform = computed(() => {
  return `transform: translateY(${contentOffset.value}px)`
})

const getWindowWidth = () => {
  return window.innerWidth
}

const computeDefaultOffset = () => {
  contentOffset.value = window.innerWidth/ 2
}

onMounted(() => {
  computeDefaultOffset()
  window.addEventListener('resize', computeDefaultOffset)

  // Get the Service information
  const listService = serviceStore.services.find(service => service.name === route.params.service)
  service.value = listService
  console.log(service.value)
}) 

onUnmounted(() => {
  window.removeEventListener('resize', computeDefaultOffset)
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


interface TouchEvent {
    evt: {
      isTrusted: boolean;
    };
    touch: boolean;
    mouse: boolean;
    position: {
      top: number;
      left: number;
    };
    direction: string;
    isFirst: boolean;
    isFinal: boolean;
    duration: number;
    distance: {
      x: number;
      y: number;
    };
    offset: {
      x: number;
      y: number;
    };
    delta: {
      x: number;
      y: number;
    };
  }
  
</script>
