<template>
  <div class="container" v-touch-pan.mouse.capture="handlePan">
    
    <!-- Logo -->
    <div class="background-container" :style="`background: ${logoBackground};`">
      <div class="logo-container" :style="logoStyle">
        <div class="logo" >
          <slot name="logo">

          </slot>

        </div>
      </div>
    </div>

    <!-- Drawer / Content -->
    <div class="drawer shadow-up-1" :style="drawerStyle" :class="drawerBackgroundClass">
      <q-scroll-area :style="`height: ${drawerHeight}`" ref="drawerContent" bar-style="display: none; opacity: 0;">
        <slot name="content">
  
        </slot>
      </q-scroll-area>
    </div>

  </div>
</template>

<style scoped lang="scss">
.container {
  position: relative;
}
.background-container {
  position: absolute;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100%;
  z-index: -2;
}
.logo-container {
  position: relative;
  width: 100vw;
  aspect-ratio: 1;
  z-index: -1;

  display: grid;
  place-items: center;
}
.logo {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 100%; // This is scaled down in js
  transform: translate(-50%, -50%);
  transition: all 0.2s linear;
}
.drawer {
  min-height: v-bind(drawerHeight);
  height: v-bind(drawerHeight);
  max-height: v-bind(drawerHeight);
  // padding-bottom: v-bind(footerHeight);
  border-radius: 1em 1em 0 0;
}
</style>

<script setup lang="ts">
import { QScrollArea } from 'quasar'
import { forEachTrailingCommentRange } from 'typescript'
import { ref, computed, onMounted, defineProps } from 'vue'

interface props {
  logoBackground?: string;
  drawerBackgroundClass?: string
}

const props = withDefaults(defineProps<props>(), {
  logoBackground: 'white',
  drawerBackgroundClass: 'bg-white'
})

const drawerContent = ref<InstanceType<typeof QScrollArea> | null>(null)

const minValue = computed(() => {
  return getWindowWidth() / 5
})
const maxValue = computed(() => {
  return getWindowWidth() - (getWindowWidth() / 5)
})

const clampTransform = (value: number) => {
  return Math.min(Math.max(value, minValue.value), maxValue.value)
}

const scrollWindow = (pixels: number) => {
  let newOffset = pixels + offset.value

  if (drawerContent.value?.getScrollPosition().top == 0) {
    if (newOffset == clampTransform(newOffset) || offset.value != clampTransform(newOffset)) {
      offset.value = clampTransform(newOffset)
      return
    }
  }

  const scrollAmount = drawerContent.value?.getScrollPosition().top || 0
  drawerContent.value?.setScrollPosition('vertical', Math.round(scrollAmount + pixels * -1))
}

let momentumTimer: NodeJS.Timeout;
let previousDeltas = [0, 0, 0, 0, 0]
const handlePan = (event: PanEvent) => {
  if (event.isFirst) {
    clearInterval(momentumTimer)
    previousDeltas = [0, 0, 0, 0, 0]
  }

  const scroll = event.delta.y
  event.evt.preventDefault()
  event.evt.stopPropagation()
  // console.log(scroll)

  // Handle Momentum for scroll
  previousDeltas.shift()
  previousDeltas.push(scroll)

  if (event.isFinal) {
    let velocity = previousDeltas.reduce((a,b) => a + b, 0) / 5
    momentumTimer = setInterval(() => {
      scrollWindow(velocity)
      // console.log('velocity')
      velocity *= 0.9
      if (Math.abs(velocity) < 1) clearInterval(momentumTimer)
    }, 16)
  } else {
    scrollWindow(scroll)
  }



  
  // console.log(newOffset)
  // console.log(event)
  // console.log(min, max, offset.value)
  // console.log('window scroll: ', window.scrollY)

  // if (oldOffset + scroll == clampTransform(oldOffset + scroll) && window.scrollY == 0) {
  //   // console.log('stopping')
  //   event.evt.preventDefault()
  //   event.evt.stopPropagation()
  //   event.evt.stopImmediatePropagation()
  //   // window.scroll(0, 0)
  //   return
  // }

  return
}

const offset = ref(0)
const setDefaultOffset = () => {
  offset.value = window.innerWidth / 2
}

const drawerStyle = computed(() => {
  return {
    transform: `translateY(${offset.value}px)`
  }
})

const logoStyle = computed(() => {
  const translate = (offset.value - (getWindowWidth())) / 2
  const scale = 1 - (translate / getWindowWidth()) * -0.5

  return {
    transform: `translateY(${translate}px) scale(${scale})`
  }
})

const getWindowWidth = () => {
  return window.innerWidth
}

const drawerHeight = computed(() => {
  return `calc(100vh - ${footerHeight.value} - ${getWindowWidth() / 5}px)`

})


const footerHeight = ref<string>('')
// const footerHeight = computed(() => {
//   const footer = document.querySelector('.q-footer')
//   console.log(footer)
//   const height = document.querySelector('.q-footer')?.clientHeight || 0
//   return `${height}px`
// })

const getFooterHeight = () => {
  const height = document.querySelector('.q-footer')?.clientHeight || 0
  return `${height}px`
}

onMounted(() => {
  setDefaultOffset()
  footerHeight.value = getFooterHeight()
})


interface PanEvent {
  delta: {
    x: number;
    y: number;
  };
  direction: string;
  distance: {
    x: number;
    y: number;
  };
  duration: number;
  evt: TouchEvent;
  isFirst: boolean;
  isFinal: boolean;
  mouse: boolean;
  offset: {
    x: number;
    y: number;
  };
  position: {
    top: number;
    left: number;
  };
  touch: boolean;
}

</script>