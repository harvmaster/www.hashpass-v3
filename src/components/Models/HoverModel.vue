<template>
  <div class="fit">

    <!-- Content Slot -->
    <transition
      appear
      name="scale-fade"
    >
      <div class="modal" ref="hoveredElement" v-if="isVisible">
        <slot name="content" />
      </div>
    </transition>

    <!-- Background Slot -->
    <transition
      appear
      name="fade"
    >
      <slot name="background">
        <div v-if="isVisible" class=" modal-background" @click="toggleVisibility" v-touch-pan="handlePan" />
      </slot>
    </transition>
  </div>
</template>

<style scoped lang="scss">
.modal {
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
}

.modal-background {
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
import { ref, defineEmits, defineExpose, nextTick } from 'vue'

const animation = ref('scale-fade')

// const emits = defineEmits(['opened', 'closed'])
defineExpose({
  toggleVisibility: () => toggleVisibility(),
})

// Handle Visibility
const isVisible = ref(false)
const toggleVisibility = () => {
  isVisible.value = !isVisible.value
  nextTick(() => {
    if (isVisible.value) hoverOffset.value = getModalOffset()
  })
}

// Close when user pans on background
const handlePan = (event: TouchEvent) => {
  if (event.isFirst) toggleVisibility()
}

// Keep the modal inside the screen
const hoveredElement = ref(null)
const hoverOffset = ref('0px');
const getModalOffset = () => {
  if (hoveredElement.value === null) return '0px'

  const element = hoveredElement.value as HTMLElement
  const rect = element.getBoundingClientRect()
  const elementHeight = element.clientHeight
  const windowWidth = document.documentElement.clientWidth
  const windowHeight = document.documentElement.clientHeight

  const footer = document.querySelector('.q-footer')?.clientHeight || 0

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

  // No Change
  return `0px`
}



export interface TouchEvent {
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