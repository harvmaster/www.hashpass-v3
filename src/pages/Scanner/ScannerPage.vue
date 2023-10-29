<template>
  <q-page class="flex items-center">
    <div class="viewfinder-container">
      <div class="switch-camera-button">
        <q-btn @click="switchCamera" icon="camera_front" color="white" flat/>
      </div>
      <div class="scanner-display">
        <q-img src="/public/scanner.svg" />
      </div>
      <video class="viewfinder" ref="viewfinder" autoplay>

      </video>
    </div>
  </q-page>
</template>

<style scoped lang="scss">
.viewfinder-container {
  width: 100%;
  height: calc(100vh - v-bind(footerHeight));
  position: relative;
  overflow: hidden;
  //   display: grid;
//   place-items: center;
}
.viewfinder {
  min-width: 100%; 
  min-height: 100%;
  width: auto;
  height: auto;

  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%,-50%);
}
.scanner-display {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 1;
  height: 75vw;
  width: 75vw;
}
.switch-camera-button {
  position: absolute;
  top: 1em;
  right: 1em;
  z-index: 2;
}
</style>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'

const scanner = ref<MediaStream | null>(null)

const viewfinder = ref<HTMLVideoElement | null>(null)
const selectedInputDevice = ref<MediaDeviceInfo | null>(null)

const switchCamera = async () => {
  const devices = await getDevices()

  if (devices.length === 0) {
    throw new Error('No devices found')
  }

  if (selectedInputDevice.value === null) {
    selectedInputDevice.value = devices[0]
  }

  const selected = devices.findIndex(device => device.deviceId === selectedInputDevice.value.deviceId)
  const nextDevice = devices[selected + 1] || devices[0]
  selectedInputDevice.value = nextDevice


  console.log(selected, nextDevice)

  const stream = await navigator.mediaDevices.getUserMedia({
    video: {
      deviceId: nextDevice.deviceId
    }
  })
  scanner.value = stream

  if (viewfinder.value) {
    console.log(viewfinder.value)
    viewfinder.value.srcObject = stream
    viewfinder.value.play()
  }

  return
}

// const getUserMedia = async () => {
//   const devices = await getDevices()

//   const stream = await navigator.mediaDevices.getUserMedia({
//     video: {
//       facingMode: 'user'
//     }
//   })
//   scanner.value = stream
//   return
// }

const getDevices = async () => {
  const devices = await navigator.mediaDevices.enumerateDevices()
  return devices.filter(device => device.kind === 'videoinput').sort((a, b) => a.deviceId > b.deviceId ? 1 : -1)
}

onMounted(() => {
  getDevices().then(console.log)

  switchCamera().then(() => {
    if (viewfinder.value) {
      // console.log(scanner.value)
      // viewfinder.value.srcObject = scanner.value
      // console.log(viewfinder.value.srcObject)
    }
  }).catch(() => {
    console.log('Failed to get user media')
  })
})

const footerHeight = computed(() => {
  const height = document.querySelector('.q-footer')?.clientHeight || 0
  return `${height}px`
})

</script>