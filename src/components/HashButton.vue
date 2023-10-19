<template>
  <div ref="hashFab" class="fab-button row justify-center items-stretch" :class="fabClasses" v-touch-pan.mouse.stop.prevent.vertical="handlePan" :style="panStyles">
    <div class="col-12 column justify-start" :class="contentClasses">
      
      <!-- UI Candy -->
      <div class="col-auto row full-width justify-center" @click="toggleMinimize">
        <q-icon class="col-12" name="expand_more" size="2em"/>
      </div>
      <div class="col-auto full-width row justify-center q-pb-lg">
        <q-img class="col-7 limit-h-10" ratio="1" fit="contain" src="https://cdn-icons-png.flaticon.com/512/8948/8948693.png"/>
      </div>

      <!-- Inputs -->
      <div class="col column justify-between">
        <div class="col-auto column justify-center q-px-xl">
          <q-input class="col-auto" filled v-model="service" label="Service" />
          <div class="col-auto row">
            <q-checkbox v-model="saveService" label="Save service to account" flat class=""/>
          </div>
          <div class="col-auto justify-center row q-py-md">
            <q-btn label="Generate Password" outline rounded color="primary" />
          </div>
        </div>

        <div class="col row justify-center items-center">
          <TabInput class="col-7" ref="algorithmSelector" :values="['legacy', 'hex', 'base58']"/>
        </div>

        <div class="col-2 justify-center row q-py-md">
          <div class="">
            <q-btn label="Change Master Password" flat rounded color="primary" />
          </div>
        </div>
      </div>
    </div>

    <!-- Flaoting Action Button -->
    <div class="lock-icon" :class="lockClasses">
      <q-btn round icon="lock" @click="toggleMinimize" flat text-color="white"/>
    </div>
  </div>
</template>
  
<style scoped lang="scss">
.limit-w-30 {
  max-width: 30em;
}
.limit-h-10 {
  max-height: 20vh;
}
  .fab-button {
    position: relative;
    // bottom: 0;
    // right: 0;
    z-index: 2;
    // overflow: auto;
  }

  .minimized {
    width: 3em;
    height: 3em;
    border-radius: 50%;
    
    transform: translate(-3em, -3em) scale(1.25);
    -webkit-transform: translate(-3em, -3em) scale(1.25);
    background-color: $primary;

    animation: shrink 0.5s ease-out;
  }
  
  .enlarged {
    width: 100vw;
    height: calc(100vh - v-bind(footerHeight));
    border-radius: 1em 1em 0 0;
    background-color: $grey-3;

    animation: enlarge 0.75s ease-out;
    overflow: hidden;
  }

  .cancel-animation {
    animation-duration: 0s !important;
  }
  
  .content-enter {
    animation: content-enter 0.5s ease-out;
    visibility: visible;
  }
  .content-leave {
    animation: content-leave 0.5s ease-out;
    visibility: hidden;
  }
  .lock-icon {
    position: absolute;
    bottom: 50%;
    right: 50%;
    transform: translate(50%, 50%);
    -webkit-transform: translate(50%, 50%);
  }
  .lock-enter {
    animation: content-enter 1s ease-out;
    visibility: visible;
  }
  .lock-leave {
    animation: content-leave 0.5s ease-out;
    visibility: hidden;
  }
  
  @keyframes enlarge {
    0% {
      width: 3em;
      height: 3em;
      border-radius: 50%;
      transform: translate(-3em, -3em) scale(1.25);
      -webkit-transform: translate(-3em, -3em) scale(1.25);
      background-color: $primary;
    }
  
    20% {
      // width: 4em;
      // height: 4em;
      transform: translate(0, 0) scale(1);
      -webkit-transform: translate(0, 0) scale(1);
      border-radius: 50%;
    }
    30% {
      width: 4em;
      height: 4em;
      border-radius: 0;
      transform: translate(0, 0) scale(1);
      -webkit-transform: translate(0, 0) scale(1);
    }
    50% {
      width: 100vw;
      height: 4em;
      border-radius: 0;
      transform: translate(0, 0);
      -webkit-transform: translate(0, 0);
      background-color: $primary;
  
    }
    100% {
      width: 100vw;
      height: calc(100vh - v-bind(footerHeight));
      border-radius: 0;
      background-color: $grey-3;
      transform: translate(0, 10px);
      -webkit-transform: translate(0, 10px);
    }
  }
  
  @keyframes shrink {
    0% {
      width: 100vw;
      height: calc(100vh - v-bind(footerHeight));
      border-radius: 0;
      background-color: $grey-3;
      transform: translate(0, v-bind(panEndHeight));
      -webkit-transform: translate(0, v-bind(panEndHeight));
    }
    50% {
      background-color: $grey-3;
      width: 100vw;
      height: 4em;
      border-radius: 0;
    }
    80% {
      width: 4em;
      height: 4em;
      border-radius: 0;
      transform: translate(0, 0);
      -webkit-transform: translate(0, 0);
      background-color: $grey-3;
    }
    90% {
      border-radius: 50%;
    }
    100% {
      background-color: $primary;
      width: 3em;
      height: 3em;
      border-radius: 50%;
      // transform: translate(-1em, -1em);
      // -webkit-transform: translate(-1em, -1em);
      transform: translate(-3em, -3em) scale(1.25);
      -webkit-transform: translate(-3em, -3em) scale(1.25);
    }
  }

  @keyframes content-enter {
    0% {
      display: none;
      visibility: hidden;
    }
    49% {
      display: none;
      opacity: 0;
      visibility: hidden;
    }
    50% {
      opacity: 0;
      visibility: visible;
    }
    100% {
      opacity: 1;
      visibility: visible;
    }
  }
  @keyframes content-leave {
    0% {
      opacity: 1;
      visibility: visible;
    }
    50% {
      opacity: 0;
      visibility: hidden;
    }
    100% {
      visibility: hidden;
    }
  }
  </style>
  
  <script setup lang="ts">
  import { ref, computed } from 'vue';
  import TabInput from './Inputs/TabInput.vue'
  import { useRouter } from 'vue-router';

  const router = useRouter()
  router.beforeEach((to, from, next) => {
    cancelAnimation.value = true
    next()
  })

  const defaultPanStyle = {
    transform: `translateY(10px)`,
    transition: `transform 0.1s ease-out`
  }

  const service = ref('')
  const saveService = ref(true)
  
  const isMinimized = ref(true)
  const cancelAnimation = ref(true)

  const panValue = ref(0)
  const avgDelta = ref(0)
  const panEndHeight = ref('0px')

  const hashFab = ref(null)
  const algorithmSelector = ref(null)
  
  const panStyles = computed(() => {
    if (isMinimized.value) return
    return {
      ...defaultPanStyle,
      transform: `translateY(${panValue.value + 10}px)`
      // transform: `translateY(${(panEndHeight.value == '0px' ? panValue.value : panEndHeight.value) }px)`
    }
  })

  const fabClasses = computed(() => {
    return {
      'minimized': isMinimized.value,
      'enlarged': !isMinimized.value,
      'cancel-animation': cancelAnimation.value,
      'shadow-up-3': !isMinimized.value
    }
  })

  const contentClasses = computed(() => {
    return {
      'content-enter': !isMinimized.value,
      'content-leave': isMinimized.value
    }
  })

  const lockClasses = computed(() => {
    return {
      'lock-enter': isMinimized.value,
      'lock-leave': !isMinimized.value
    }
  })
  
  const toggleMinimize = () => {
    if (cancelAnimation.value) {
      cancelAnimation.value = false
    }
    if (isMinimized.value) {
      saveService.value = true
      panEndHeight.value = 0
    }
    isMinimized.value = !isMinimized.value
    algorithmSelector.value.getDefaultAlgorithm()
    if (!isMinimized.value) algorithmSelector.value.initInputClock()
  }
  
  const handlePan = (value: TouchEvent) => {
    panEndHeight.value = '0px'
    avgDelta.value = (avgDelta.value + value.delta.y) / 2
    panValue.value = value.offset.y
    if (value.offset.y < 0) panValue.value = 0
  
    if (value.isFinal) {
      handlePanEnd(value)
    }
  }

  const handlePanEnd = (value: TouchEvent) => {
    if (panValue.value > 300 || avgDelta.value > 7) {
      panEndHeight.value = `${panValue.value + 10}px`
      toggleMinimize()
      avgDelta.value = 0
    }
    panValue.value = 0
    console.log(panEndHeight.value)
  }

  const footerHeight = computed(() => {
    const footer = document.querySelector('.q-footer')
    return `${footer?.clientHeight}px`
  })
  
  
  
  
  
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
    