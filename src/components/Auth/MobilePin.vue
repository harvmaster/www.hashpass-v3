<template>
  <!-- Main Container -->
  <div class="flex items-center justify-center row">
    <!-- <div class="col-12 row justify-center q-pb-xl">
      <q-img src="icons/hashpass-lock.svg" class="col-3"/>
    </div> -->
    <!-- Pin Display -->
    <div class="pin-display col-12 row justify-center q-pb-xl">
      <div class="col-2">
      </div>
      <div class="pin-display-container row justify-center items-center col-auto">
        <transition-group
          name="pin-fill"
          v-for="(v, i) of new Array(4)"
          :key="i"
        >
          <div
            :key="i"
            class="pin-display-number col-3 q-pa-sm row justify-center items-center"
            :class="pinArray[i] ? 'filled-pin' : ''"
          ></div>
        </transition-group>

      </div>
      <!-- Backspace Button -->
      <div class="col-2 row items-center justify-center">
        <q-btn class="" flat round color="primary" icon="backspace" size="lg" @click="removeNumber" />
      </div>
    </div>
    <!-- Pin Input -->
    <div class="pin-input">
      <div class="row">
        <!-- Loop over buttons array to create pin buttons -->
        <div class="pin-button-container col-4 q-pa-sm row items-center justify-center" v-for="v of buttons" :key="v">
          <pin-button class="buttons-1-3" :value="v" @clicked="addNumber" />
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
/* Pin Display Number */
.pin-display-number {
  transition: background-color 0.25s, transform 0.25s;
  background-color: #fff;
  transform: scale(0.7);
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 50%;
  border: 1px solid $primary;
  margin: 0 0.5rem;
}

/* Filled Pin */
.filled-pin {
  background-color: #1976D2;
  transform: scale(1);
}

/* Pin Fill Transition */
.pin-fill-enter-active,
.pin-fill-leave-active {
  transition: background-color 0.25s, transform 0.25s;
}
s
.pin-fill-enter,
.pin-fill-leave-to {
  background-color: #fff;
  transform: scale(0.7);
}

.pin-fill-enter-to,
.pin-fill-leave {
  background-color: #1976D2;
  transform: scale(1);
}

/* Pin input Container */
.pin-input {
  // max width should be the smaller option between 40% vh and 70% vw
  width: min(40vh, 70vw);
}

/* Pin Button */
.buttons-1-3 {
  width: 100%;
  aspect-ratio: 1/1;
}

/* Pin Button Container */
.pin-button-container {
  width: 33.3333%;
  aspect-ratio: 1/1;
  border-radius: 50%;
}
</style>

<script setup lang="ts">
import { ref, computed, defineEmits, defineProps } from 'vue'
import PinButton from './PinButton.vue'

const emit = defineEmits(['update:pin', 'update:complete'])

// Define pin as a reactive variable
const pin = ref('')

// Compute pinArray based on the length of pin
const pinArray = computed(() => {
  return new Array(4).fill(false).map((v, i) => i < pin.value.length)
})

// Define an array of button values
const buttons = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '', '0']

// Function to add a number to the pin
const addNumber = (value: number) => {
  if (!value) return
  if (value == -1) {
    pin.value = pin.value.slice(0, -1)
    return
  }
  pin.value = pin.value + value
  emit('update:pin', pin.value)
  console.log(pin.value)

  // Check if pin is completely entered
  if (pin.value.length == 4) {
    emit('update:complete', pin.value)
    console.log('pin entered')
    setTimeout(() => {
      pin.value = ''
    }, 500)
  }
}

// Function to remove a number from the pin
const removeNumber = () => {
  pin.value = pin.value.slice(0, -1)
}

</script>
