<template>
  <q-page class="flex items-center relative overflow-hidden">
    <div class="viewfinder-container">
      <div class="switch-camera-button">
        <q-btn @click="switchCamera" icon="camera_front" color="primary" flat/>
      </div>
      <div class="scanner-display">
        <q-img src="/public/scanner.svg" class="scanner-border" />
      </div>
      <video class="viewfinder" ref="viewfinder" autoplay>
        
      </video>
    </div>
    
    
    <!-- <div class="errors">
      <div class="error" v-for="error of errors" :key="error">
        {{ error }}
      </div>
    </div> -->
    
    <!-- Drawer -->
    <service-drawer ref="drawer" :services="services"/>



    <!-- <sliding-drawer class="service-drawer" ref="drawer">
      <template v-slot:drawer>
        <div class="row">
          <div class="col-3 q-pa-sm row" v-for="service of services" :key="service.name">
            <div class="col-12 square q-pa-sm row">
              <service-icon-wrapper :logo="service.logo" :name="service.name" class="col-12 service-icon"/>
            </div>
            <div class="col-12 text-center">
              {{ service.name }}
            </div>
          </div>
        </div>
      </template>
    </sliding-drawer> -->

    <!-- <div class="service-drawer row q-pa-md">
    </div> -->
  </q-page>
</template>

<style scoped lang="scss">
.errors {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 100;
  width: 100%;
  height: 100%;
  pointer-events: none;
}
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
  z-index: -1;
  transform: translate(-50%,-50%) !important;
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
.scanner-border {
  stroke: $primary;
}
.switch-camera-button {
  position: absolute;
  top: 1em;
  right: 1em;
  z-index: 2;
}
.relative {
  position: relative;
}
</style>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted, onActivated } from 'vue'
import { onBeforeRouteLeave } from 'vue-router'
import { useQuasar } from 'quasar'
import QrScanner from 'qr-scanner'

const $q = useQuasar()

import { useServiceStore } from 'src/stores/service'
import ServiceDrawer from 'src/components/Models/ServiceDrawer.vue'

const scanner = ref<MediaStream | null>(null)

const viewfinder = ref<HTMLVideoElement | null>(null)
const selectedInputDevice = ref<MediaDeviceInfo | null>(null)

const drawer = ref<InstanceType<typeof ServiceDrawer> | null>(null)
const serviceStore = useServiceStore()
const services = computed(() => serviceStore.services)

let qrScanner: QrScanner

const errors = ref([])

const getScanner = async () => {
  if (!qrScanner) {
    console.log('createScanner')
    debug('createScanner')
    if (!viewfinder.value) return

    console.log('creating')
    debug('creating')
    qrScanner = new QrScanner(
      viewfinder.value,
      result => handleScan(result),
      {
        maxScansPerSecond: 5,
        returnDetailedScanResult: true
      }
    )
    debug(qrScanner)
    await qrScanner.start().catch((err) => {
      debug(err)
      // get stacktrace of err
      debug(err.stack)
    })
  }

  return qrScanner
}

const switchCamera = async () => {
  const devices = await getDevices()
  devices.forEach(device => errors.value.push(device))

  if (devices.length === 0) {
    throw new Error('No devices found')
  }
  if (selectedInputDevice.value === null) {
    // const priority = devices.filter(device => priorityCameras.includes(device.label))
    // const priorityDevice = priority.findIndex(device => device.label === priorityCameras[0]) || 0
    // selectedInputDevice.value = devices[priorityDevice]
    selectedInputDevice.value = devices[0]
  }

  const selected = devices.findIndex(device => device.deviceId === selectedInputDevice.value?.deviceId)
  const nextDevice = devices[selected + 1] || devices[0]
  // if (selectedInputDevice.value === nextDevice) return
  selectedInputDevice.value = nextDevice

  if (!viewfinder.value) return

  const scanner = await getScanner()
  scanner?.setCamera(selectedInputDevice.value.deviceId)
  return
}

const handleScan = (value: QrScanner.ScanResult) => {
  console.log(value)
  if (value.data.length < 1) return
  if (!drawer.value) return
  if (drawer.value.visible) return

  // contact server and check if valid public key

  // if invalid, dont do anything

  // if valid, show drawer for selecting which password to send
  
  // open drawer
  drawer.value.toggleVisibility()

}

const getDevices = async () => {
  const devices = await navigator.mediaDevices.enumerateDevices()
  return devices.filter(device => device.kind === 'videoinput').sort((a, b) => a.deviceId > b.deviceId ? 1 : -1)
}

onActivated(() => {
  getDevices().then(console.log)
  console.log(qrScanner)

  switchCamera().catch((err) => {
    console.log('Failed to get user media')
    debug(err)
  })
})

onUnmounted(() => {
  destroyCamera()
})

onBeforeRouteLeave(async (to, from, next) => {
  destroyCamera()
  next()
})

const destroyCamera = async () => {
  qrScanner?.destroy()
  qrScanner = null
}

const footerHeight = computed(() => {
  const height = document.querySelector('.q-footer')?.clientHeight || 0
  return `${height}px`
})

const priorityCameras = [
  'Back Camera',
  'Front Camera',
  'Back Ultra Wide Camera'
]

const debug = (msg) => {
  if ($q.platform.is.mobile) {
    errors.value.push(msg)
  }
  console.log(msg)
}

</script>