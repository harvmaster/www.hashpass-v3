<template>
  <div class="relative">
    <div class="row" v-touch-hold:500="toggleHovered">
      <div class="col-auto row items-center">
        <service-icon class="service-logo square" :logo="logo" :name="service.name"/>
      </div>
      <div class="col row q-pl-md">
        <div class="col row">
          <div class="col-12 text-h6">
            {{ service.name }}
          </div>
          <div class="col-12 text-caption">
            {{ service.note }}
          </div>
        </div>
        <div class="col-auto row items-center">
          <q-btn class="" round flat icon="content_copy" size="sm"/>
        </div>
      </div>
    </div>
    
    <transition
      appear
      name="scale-fade"
    >
      <div v-if="hovered" class="hovered row" ref="hoveredElement">
        <div class="col-12 row">
          <div class="col-auto q-pb-xs">
            <service-icon class="service-logo square" :logo="logo" :name="service.name"/>
          </div>
          <div class="col text-right row subtitle">
            <!-- Not sure whether i should put the date information here -->
            <!-- <span class="col-12">
              Added {{ new Date(service.dateAdded).toLocaleDateString() }}
            </span>
            <span class="col-12">
              Last Used
              <span class="text-weight-bold">
                {{ new Date(service.dateUsed).toLocaleDateString() }}
              </span> 
            </span> -->
          </div>
        </div>
        <div class="col-12 row q-col-gutter-xs">
          <div class="col-12 text-h6">
            {{ service.name }}
          </div>
          <div class="col-12 text-subtitle">
            {{ service.domain }}
          </div>
        </div>
        <div class="col-12 row items-center q-col-gutter-xs">
          <div v-if="serviceUsername" class="col-auto">
            <q-input borderless dense hide-bottom-space input-class="text-weight-bold" :model-value="serviceUsername" />
          </div>
        </div>
        <div class="col-12 row items-center q-col-gutter-xs">
          <div class="col-auto">
            <q-btn class="" round flat :icon="!showPassword ? 'visibility' : 'visibility_off'" size="sm" @click="togglePassword"/>
          </div>
          <div class="col-auto">
            {{ showPassword ? 'WWWWWWWWWWWWWWWWW' : '●●●●●●●●●●●●●●●●'  }}
          </div>
        </div>
        <div class="col-12">
          <q-separator />
        </div>
        <div class="col-12 q-pt-sm row">
          <!-- Notes input -->
          <div class="col-12 bg-grey-2 rounded-borders">
            <q-input filled label="Notes" :model-value="serviceNotes"/>
          </div>
        </div>
      </div>
    </transition>

    
    <!-- <transition
      appear
      name="fade"
    >
      <div v-if="hovered" class="hovered-background" @click="toggleHovered" v-touch-pan="handlePan"/>
    </transition> -->
    <!-- <div class="checker">

    </div> -->
  </div>
</template>

<style scoped lang="scss">
.checker {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: v-bind(rectOffset);
  border: solid 1px red;
  // transform: translateY(v-bind(rectOffset));
  z-index: 4;
}
.relative {
  position: relative;
}
.service-logo {
  height: 3em;
  border-radius: 0.5em;
}
.square {
  aspect-ratio: 1;
}

.hovered {
  position: absolute;
  top: 50%;
  left: 50%;
  width:95%;
  height: auto;
  transform: translate(-50%, calc(-50% + v-bind(hoverOffset)));
  background-color: rgba(255,255,255,1);
  z-index: 2;
  padding: 1em;
  border-radius: 1em;
  // animation: scale-fade-in 0.2s ease-in-out;
}
.hovered-background {
  position: fixed;
  height: 100vh;
  width: 100vw;
  top: 0;
  left: 0;
  background-color: rgba(0,0,0,0.35);
  z-index: 1;
  -webkit-backdrop-filter: blur(5px);
  backdrop-filter: blur(8px);
  animation: fade-in 0.2s ease-in-out;
}
.hidden {
  display: none;
}


.scale-fade-enter-active {
  animation: scale-fade 0.2s ease-in-out;
}
.scale-fade-leave-active {
  animation: scale-fade 0.2s ease-in-out reverse;
}

@keyframes scale-fade {
  // 0 frame is to get the height information of the element
  0% {
    transform: translate(-50%, calc(-50% + v-bind(hoverOffset))) scale(1);
    opacity: 0;
  }
  1% {
    transform: translate(-50%, calc(-50% + v-bind(hoverOffset))) scale(0.75);
    opacity: 0;
  }
  50% {
    transform: translate(-50%, calc(-50% + v-bind(hoverOffset))) scale(1.05);
    opacity: 0.5;
  }
  100% {
    transform: translate(-50%, calc(-50% + v-bind(hoverOffset))) scale(1);
    opacity: 1;
  }
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
import { computed, nextTick, ref } from 'vue'
import axios from 'axios'
// import DynamicLetterLogo from './dynamic-letter-logo.vue';
import ServiceIcon from './ServiceIconWrapper.vue'

  export interface ServiceItemProps {
    service: Service
  }


  const props = withDefaults(defineProps<ServiceItemProps>(), {
    service: () => ({
      name: '',
      legacy: false,
      encoding: 'base58',
      logo: '',
      domain: ''
    })
  });

  const logo = ref('');

  const defaultLogo = () => {
    logo.value = props.service.logo
  }
  defaultLogo();

  const getLogo = async () => {
    console.log('get logo')
    // This code is working. It just spams the server, so ive commented it out

    // const { data } = await axios.get(`https://api.faviconscraper.mc.hzuccon.com/icon?url=${props.service.domain}`);
    // console.log(data)
    // logo.value = data.icons[0];
  }
  getLogo()

  const openEdit = () => {
    console.log('click')
  }

  const showPassword = ref(false);

  const togglePassword = () => {
    showPassword.value = !showPassword.value;
  }

  const hovered = ref(false)
  let timer 
  const toggleHovered = () => {
    hovered.value = !hovered.value;
    nextTick(() => {
      if (hovered.value == true) {
        hoverOffset.value = getHoverOffset()
      } else {
        timer = setTimeout(() => {
          hoverOffset.value = '0px'
        }, 200)
      }
    })
  }
  // Stop hover when user pans on the background
  const handlePan = (event: TouchEvent) => {
    if (event.isFirst) toggleHovered()
  }

  const rectOffset = ref('0px')

  const hoveredElement = ref(null)
  const hoverOffset = ref('0px')
  const getHoverOffset = () => {
    // console.log('get hovered ')
    // console.log(hoveredElement.value)
    // console.log(hoveredElement.value.getBoundingClientRect())
    if (hoveredElement.value === null) return '0px'
    // const element = document.querySelector('.hovered') as HTMLElement
    const element = hoveredElement.value as HTMLElement
    const rect = element.getBoundingClientRect()
    const elementHeight = element.clientHeight
    const windowWidth = document.documentElement.clientWidth
    const windowHeight = document.documentElement.clientHeight

    const footer = document.querySelector('.q-footer')?.clientHeight || 0

    // console.log(windowWidth, rect.y)
    // console.log('bottom', rect.bottom, windowHeight, footer)
    
    // Too High
    if (rect.y < 0) {
      return `${(windowWidth * 0.025) + (rect.y * -1)}px` 
    }
    if (rect.y < windowWidth * 0.025) {
      return `${windowWidth * 0.025 - rect.y}px` 
    }

    // Too Low
    if (rect.y + elementHeight > (windowHeight - footer - (windowWidth * 0.025))) {
      return `${(windowHeight - footer - (rect.y + elementHeight)) - (windowWidth * 0.025)}px` 
    }
    return `0px`
  }

  const footerHeight = computed(() => {
    const footer = document.querySelector('.q-footer')
    return `${footer?.clientHeight}px`
  })

  const serviceUsername = computed(() => {
    // return props.service.note?.split('username: ')[1]?.split('\n')[0]
    return props.service.note?.username
  })
  const serviceNotes = computed(() => {
    // const preUsername = props.service.note?.split('username: ')[0] || ''
    // const postUsername = props.service.note?.split('username: ')[1]?.split('\n')[1] || ''
    // return `${preUsername}${postUsername}`
    return props.service.note?.other
  })
  
  // const cancelContextMenu = (event) => {
  //   event.preventDefault()
  //   event.stopPropagation()
  //   return false
  // }
  // Make sure the hover is within the screen
  // const offsetHover = () => {

  // }
</script>
  