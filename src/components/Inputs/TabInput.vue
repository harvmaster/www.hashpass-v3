<template>
  <div class="row auto-height">
    <div class="col-12 q-px-md text-center relative-position" style="height: 1.5em;">
      <transition
        appear
        :duration="250"
        enter-active-class="animated fadeInUp"
        leave-active-class="animated fadeOutUp"
        mode="out-in"
      >
        <div :key="description" >
          {{ description }}
        </div>
      </transition>
    </div>
    <div class="col-12 selector-container justify-between text-center">
      <div class="selector" :style="selectorTranslate"></div>
      <div class="alg-1 option" @click="handleClick" data-attribute="v1">
        v1
      </div>
      <div class="alg-2 option" @click="handleClick" data-attribute="v2">
        v2
      </div>
      <div class="alg-3 option" @click="handleClick" data-attribute="v3">
        v3
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.auto-height {
  height: max-content;
}
.relative-position {
  position: relative;
}
.selector-container {
  position: relative;
  display: flex;
  // aspect-ratio: 3/1;
  // max-height: 6em;
  height: auto;

  background-color: $grey-4;
  border-radius: 3em;
}

.selector {
    position: absolute;
    width: calc(100% / 3 - 10px); /* minus gap */
    aspect-ratio: 1;
    transition: all 0.5s cubic-bezier(0.52,-0.21, 0.47,1.22); /* This will give the "bounce" effect */
    border-radius: 50%;
    opacity: 0.3;
}
.option {
    width: calc(100% / 3); /* minus gap */
    aspect-ratio: 1;
    font-size: 1.25em;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    position: relative;
    z-index: 1; /* to make sure the option stays on top of the selector */
}
</style>
  
<script setup lang="ts">
import { ref, computed, onMounted, defineExpose, onUnmounted } from 'vue';


export interface ServiceItemProps {
  values: string[];
}
const props = defineProps<ServiceItemProps>()

defineExpose({
  getDefaultAlgorithm: () => getDefaultAlgorithm(),
  initInputClock: () => initInputClock()
})

const selected = ref()
const selectedWidth = ref()
const selectedDiv = ref()

const selectorTranslate = computed(() => {
  let backgroundColor
  if (selected.value == ' v1 ') backgroundColor = '#ef5350'
  if (selected.value == ' v2 ') backgroundColor = '#ffca28'
  if (selected.value == ' v3 ') backgroundColor = '#66bb6a'

  // const offset = selectedDiv.value?.offsetLeft + 5

  return {
    'background-color': backgroundColor,
    'transform': `translateX(${selectedWidth.value}px) translateY(5px)`
  }
})

const description = computed(() => {
  if (selected.value == ' v1 ') return '\'v1\' Insecure'
  if (selected.value == ' v2 ') return '\'v2\' Secure'
  if (selected.value == ' v3 ') return '\'v3\' Recommended'

  return ''
})

const handleClick = (e: MouseEvent) => {
  const target = e.target as HTMLElement;
  selectAlgoFromDiv(target)
}

const selectAlgoFromDiv = (div: HTMLElement) => {
  selectedWidth.value = div.offsetLeft + 5;
  selected.value = div.innerHTML;
  selectedDiv.value = div;
}

const getDefaultAlgorithm = () => {
  const algorithmDivs = document.querySelectorAll('.option');
  
  const defaultAlgorithm = algorithmDivs[algorithmDivs.length - 1] as HTMLElement;
  selectAlgoFromDiv(defaultAlgorithm)
}

// Due to width being smaller before its on the screen, we need to wait for it to be on the screen before we can get the width. This will ensure the selector moves to the correct position
let timer: any;
const initInputClock = () => {
  let startTime: number
  timer = setInterval(() => {
    getDefaultAlgorithm()
    if (startTime) {
      const time = new Date().getTime() - startTime
      if (time > 1000) {
        clearInterval(timer)
      }
    } else {
      startTime = new Date().getTime()
    }
  }, 100)
}
onUnmounted(() => {
  clearInterval(timer)
})

onMounted(() => {
  // getDefaultAlgorithm()
  // initInputClock()
})
</script>
  