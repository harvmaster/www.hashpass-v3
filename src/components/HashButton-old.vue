<template>
  <div class="hasher row justify-center" :class="hashState ">
    <transition-group
      name="fade-in-out"
      :duration="1000"
      mode="out-in"
    >
      <div v-if="hashState == 'enlarged'" class="col-12 enlarged-content" v-touch-pan.mouse.stop.vertical="handlePan" :style="panStyles">
        <div class="col-12 row justify-center down-arrow">
          <q-icon class="col-auto" name="expand_more" />
        </div>
      </div>

      <div v-if="hashState != 'enlarged'">
        <q-btn round icon="lock" @click="enlarge" flat/>
      </div>

    </transition-group>
  </div>
</template>

<style scoped lang="scss">
.hasher {
  width: 3em;
  height: 3em;
  border-radius: 50%;
  transform: translate(-1em, -1em);

  position: fixed;
  bottom: 0;
  right: 0;
  background-color: $primary;
  transition: background-color 0.25s;
}

.enlarged {
  width: 100vw;
  height: 100vh;
  border-radius: 0;
  animation: enlarge 2s ease-out;
  transform: translate(0, 0);
  background-color: transparent;
}

.shrunk {
  animation: shrink 0.5s ease-out;
}

.enlarged-content {
  transition: transform 0.1s ease-out;
  background-color: white;
}

.down-arrow {
  background: linear-gradient($grey-5, white);
}

@keyframes enlarge {
  0% {
    width: 3em;
    height: 3em;
    border-radius: 50%;
    transform: translate(-1em, -1em);
    background-color: $primary;
  }

  20% {
    width: 4em;
    height: 4em;
    transform: translate(0, 0);
    // background-color: transparent;
  }
  30% {
    width: 4em;
    height: 4em;
    border-radius: 0;
  }
  50% {
    width: 100vw;
    height: 4em;
    border-radius: 0;
    transform: translate(0, 0);
    background-color: blue;
    // background-color: transparent;

  }
  100% {
    width: 100vw;
    height: 100vh;
    border-radius: 0;
    background-color: transparent;
  }
}

@keyframes shrink {
  0% {
    width: 100vw;
    height: 100vh;
    border-radius: 0;
    background-color: transparent;
    transform: translate(0, 0);

  }
  50% {
    background-color: transparent;
    width: 100vw;
    height: 3em;
    border-radius: 0;
  }
  90% {
    transform: translate(0, 0);
    background-color: transparent;
  }
  100% {
    background-color: $primary;
    width: 3em;
    height: 3em;
    border-radius: 50%;
    transform: translate(-1em, -1em);
  }
}
</style>

<script setup lang="ts">
import { ref, computed } from 'vue';

const hashState = ref('shrunk')
const panValue = ref(0)
const avgDelta = ref(0)

const panStyles = computed(() => {
  return {
    transform: `translateY(${panValue.value}px)`
  }
})

const enlarge = () => {
  if (hashState.value === 'enlarged') hashState.value = 'shrunk'
  else
  hashState.value = 'enlarged'
}

const handlePan = (value: TouchEvent) => {
  avgDelta.value = (avgDelta.value + value.delta.y) / 2
  panValue.value = value.offset.y
  if (value.offset.y < 0) panValue.value = 0

  if (value.isFinal) handlePanEnd(value)
  console.log(value)
}
const handlePanEnd = (value: TouchEvent) => {
  if (panValue.value > 300 || avgDelta.value > 7) {
    enlarge()
    avgDelta.value = 0
  }
  panValue.value = 0
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
  