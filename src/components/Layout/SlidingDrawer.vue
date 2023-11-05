<template>
  <!-- <div class="container" v-touch-pan.vertical="handleSwipe"> -->
  <div class="container">
    <div class="drawer" :class="drawerClasses">
      <slot name="drawer" class="drawer">
  
      </slot>
    </div>
    
    <transition
      name="fade"
    >
      <div v-if="visible" class="background" @click="toggleVisibility">
  
      </div>
    </transition>
  </div>
</template>

<style scoped lang="scss">
.container {
  position: relative;
}
.drawer {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100vw;
  height: v-bind(drawerHeight);
  z-index: 3;
  overflow: scroll;
  background-color: white;
  border-radius: 1em 1em 0 0;
  box-shadow: 0 0 1em rgba(0,0,0,0.5);
  transition: all 0.2s linear;
  transform: translateY(100%);
}
.background {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100%;
  z-index: -2;
  background-color: rgba(0,0,0,0.5);
}
.opened {
  transform: translateY(0%) !important;
}
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.2s linear;
}
.fade-enter, .fade-leave-to {
  opacity: 0;
}
</style>

<script setup lang="ts">
import { ref, computed, onMounted, defineProps } from 'vue'

interface Props {
  drawerHeight?: string;
}

const props = withDefaults(defineProps<Props>(), {
  drawerHeight: '75%',
})

const visible = ref(false)
const toggleVisibility = () => {
  visible.value = !visible.value
}

const drawerClasses = computed(() => {
  return {
    opened: visible.value,
  }
})

const handleSwipe = () => {
  console.log('swipe')
}

defineExpose({
  toggleVisibility,
  visible
})

</script>